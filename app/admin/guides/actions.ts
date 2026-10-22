"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { requireGuideAdmin } from "@/lib/guides/auth";
import {
  extensionFromFile,
  heroPath,
  stepImagePath,
  vizReferencePath,
} from "@/lib/guides/paths";
import { uniqueSlug } from "@/lib/guides/storage";
import {
  ALLOWED_STEP_VIDEO_TYPES,
  GUIDE_STEP_VIDEOS_BUCKET,
  isSafeStepVideoPath,
  isUuid,
  MAX_STEP_VIDEO_BYTES,
  safeVideoFileName,
  stepVideoObjectPath,
  videoExtension,
} from "@/lib/guides/step-videos";
import {
  GUIDE_IMAGES_BUCKET,
  type GuideMaterial,
  type GuideStep,
  type GuideTool,
} from "@/lib/guides/types";

function parseMaterials(raw: string): GuideMaterial[] {
  const items = JSON.parse(raw || "[]") as GuideMaterial[];
  return items
    .map((item) => ({
      name: String(item.name || "").trim(),
      quantity: String(item.quantity || "").trim(),
      product_url: String(item.product_url || "").trim() || undefined,
    }))
    .filter((item) => item.name.length > 0);
}

function parseTools(raw: string): GuideTool[] {
  const items = JSON.parse(raw || "[]") as GuideTool[];
  return items
    .map((item) => ({
      name: String(item.name || "").trim(),
      quantity: String(item.quantity || "").trim() || undefined,
      product_url: String(item.product_url || "").trim() || undefined,
    }))
    .filter((item) => item.name.length > 0);
}

function parseStepsMeta(raw: string): Array<{
  id?: string;
  title: string;
  estimatedTime: string;
  instructions: string;
  materialsText: string;
  toolsText: string;
  existingImagePath: string;
}> {
  return JSON.parse(raw || "[]");
}

const VIDEO_STORAGE_NOT_READY =
  "Step video storage is not set up on staging yet. Save the Guide without a video, or apply the staging SQL first.";

type VideoOp = {
  stepId: string;
  op: "upsert" | "remove";
  storagePath?: string;
  fileName?: string;
  contentType?: string;
};

function isMissingVideoStorage(error: {
  code?: string;
  message?: string;
} | null): boolean {
  if (!error) return false;
  const message = `${error.code || ""} ${error.message || ""}`.toLowerCase();
  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    (message.includes("guide_step_videos") &&
      (message.includes("schema cache") ||
        message.includes("does not exist") ||
        message.includes("could not find"))) ||
    message.includes("bucket not found")
  );
}

function stepIdForSave(raw: string | undefined): string {
  const value = String(raw || "").trim();
  return isUuid(value) ? value : randomUUID();
}

export async function getStepVideoAdminState(guideId: string | null): Promise<{
  storageReady: boolean;
  videos: Array<{ stepId: string; fileName: string }>;
}> {
  const { supabase } = await requireGuideAdmin();
  if (!guideId || !isUuid(guideId)) {
    const { error } = await supabase
      .from("guide_step_videos")
      .select("step_id", { head: true, count: "exact" });
    return { storageReady: !error, videos: [] };
  }

  const { data, error } = await supabase
    .from("guide_step_videos")
    .select("step_id, file_name")
    .eq("guide_id", guideId);
  if (error) {
    return { storageReady: false, videos: [] };
  }

  return {
    storageReady: true,
    videos: (data || []).map((row) => ({
      stepId: String(row.step_id),
      fileName: String(row.file_name),
    })),
  };
}

export async function createStepVideoUploadUrl(input: {
  guideId: string;
  stepId: string;
  fileName: string;
  contentType: string;
  fileSize: number;
}): Promise<{ ok: true; path: string; token: string } | { ok: false; error: string }> {
  const { supabase } = await requireGuideAdmin();
  const guideId = String(input.guideId || "").trim();
  const stepId = String(input.stepId || "").trim();
  const contentType = String(input.contentType || "").trim();
  const fileSize = Number(input.fileSize);

  if (!isUuid(guideId) || !isUuid(stepId)) {
    return { ok: false, error: "The step video could not be attached to this step." };
  }
  if (!ALLOWED_STEP_VIDEO_TYPES.has(contentType)) {
    return { ok: false, error: "Please upload an MP4 or MOV video." };
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_STEP_VIDEO_BYTES) {
    return { ok: false, error: "Step videos must be 100 MB or smaller." };
  }

  const ext = videoExtension(contentType);
  if (!ext) {
    return { ok: false, error: "Please upload an MP4 or MOV video." };
  }

  const path = stepVideoObjectPath(guideId, stepId, randomUUID(), ext);
  const { data, error } = await supabase.storage
    .from(GUIDE_STEP_VIDEOS_BUCKET)
    .createSignedUploadUrl(path, { upsert: false });

  if (error || !data?.token) {
    if (isMissingVideoStorage(error)) {
      return { ok: false, error: VIDEO_STORAGE_NOT_READY };
    }
    return {
      ok: false,
      error: "The step video could not be prepared for upload.",
    };
  }

  return { ok: true, path, token: data.token };
}

function parseVideoOps(raw: string): VideoOp[] {
  const items = JSON.parse(raw || "[]") as VideoOp[];
  if (!Array.isArray(items)) return [];
  return items;
}

async function applyStepVideoOps(
  supabase: Awaited<ReturnType<typeof requireGuideAdmin>>["supabase"],
  guideId: string,
  savedStepIds: Set<string>,
  raw: string,
) {
  const ops = parseVideoOps(raw);
  if (ops.length === 0) return;

  for (const op of ops) {
    const stepId = String(op.stepId || "").trim();
    if (!isUuid(stepId)) {
      throw new Error("The step video could not be attached to this step.");
    }

    if (op.op === "remove") {
      const { data: existing, error: readError } = await supabase
        .from("guide_step_videos")
        .select("storage_path")
        .eq("guide_id", guideId)
        .eq("step_id", stepId)
        .maybeSingle();
      if (readError) {
        if (isMissingVideoStorage(readError)) throw new Error(VIDEO_STORAGE_NOT_READY);
        throw new Error(readError.message);
      }
      if (existing?.storage_path) {
        await supabase.storage
          .from(GUIDE_STEP_VIDEOS_BUCKET)
          .remove([String(existing.storage_path)]);
      }
      const { error: deleteError } = await supabase
        .from("guide_step_videos")
        .delete()
        .eq("guide_id", guideId)
        .eq("step_id", stepId);
      if (deleteError && !isMissingVideoStorage(deleteError)) {
        throw new Error(deleteError.message);
      }
      continue;
    }

    if (op.op !== "upsert") continue;
    if (!savedStepIds.has(stepId)) {
      throw new Error("Add a title or instructions before attaching a step video.");
    }
    const storagePath = String(op.storagePath || "").trim();
    const contentType = String(op.contentType || "").trim();
    if (
      !isSafeStepVideoPath(guideId, stepId, storagePath) ||
      !ALLOWED_STEP_VIDEO_TYPES.has(contentType)
    ) {
      throw new Error("The step video upload was rejected.");
    }

    const { data: existing, error: readError } = await supabase
      .from("guide_step_videos")
      .select("storage_path")
      .eq("guide_id", guideId)
      .eq("step_id", stepId)
      .maybeSingle();
    if (readError) {
      if (isMissingVideoStorage(readError)) throw new Error(VIDEO_STORAGE_NOT_READY);
      throw new Error(readError.message);
    }

    const row = {
      guide_id: guideId,
      step_id: stepId,
      storage_path: storagePath,
      file_name: safeVideoFileName(String(op.fileName || "video")),
      content_type: contentType,
      updated_at: new Date().toISOString(),
    };
    const { error: writeError } = existing
      ? await supabase
          .from("guide_step_videos")
          .update(row)
          .eq("guide_id", guideId)
          .eq("step_id", stepId)
      : await supabase.from("guide_step_videos").insert(row);
    if (writeError) {
      if (isMissingVideoStorage(writeError)) throw new Error(VIDEO_STORAGE_NOT_READY);
      throw new Error(writeError.message);
    }

    const previousPath = String(existing?.storage_path || "");
    if (previousPath && previousPath !== storagePath) {
      await supabase.storage.from(GUIDE_STEP_VIDEOS_BUCKET).remove([previousPath]);
    }
  }
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);
const IMAGE_TYPE_ERROR = "Please upload a JPEG or PNG image.";

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

function assertAllowedImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error(IMAGE_TYPE_ERROR);
  }
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof requireGuideAdmin>>["supabase"],
  file: File | null,
  path: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  assertAllowedImage(file);

  const { error } = await supabase.storage
    .from(GUIDE_IMAGES_BUCKET)
    .upload(path, file, {
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(`Image upload failed (${path}): ${error.message}`);
  }

  return path;
}

export async function saveGuide(formData: FormData) {
  const { supabase } = await requireGuideAdmin();

  const existingId = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const overview = String(formData.get("overview") || "").trim();
  const vizDimensions = String(formData.get("viz_dimensions") || "").trim();
  const vizQuestion2 = String(formData.get("viz_question_2") || "").trim();
  const vizQuestion3 = String(formData.get("viz_question_3") || "").trim();
  const isPublished = formData.get("is_published") === "on";
  const isFeatured = formData.get("is_featured") === "on";
  const proExclusive = formData.get("pro_exclusive") === "true";
  const existingSlug = String(formData.get("slug") || "").trim() || null;
  const existingHero = String(formData.get("existing_hero_path") || "").trim();
  const existingViz = String(
    formData.get("existing_viz_reference_path") || "",
  ).trim();

  if (!title) {
    redirect(
      existingId
        ? `/admin/guides/${existingId}?error=${encodeURIComponent("Title is required.")}`
        : `/admin/guides/new?error=${encodeURIComponent("Title is required.")}`,
    );
  }

  if (!overview) {
    redirect(
      existingId
        ? `/admin/guides/${existingId}?error=${encodeURIComponent("Overview is required.")}`
        : `/admin/guides/new?error=${encodeURIComponent("Overview is required.")}`,
    );
  }

  const proposedNewId = String(formData.get("new_guide_id") || "").trim();
  const guideId =
    existingId || (isUuid(proposedNewId) ? proposedNewId : randomUUID());
  const slug = uniqueSlug(title, existingSlug);
  const materials = parseMaterials(String(formData.get("materials_json") || "[]"));
  const tools = parseTools(String(formData.get("tools_json") || "[]"));
  const stepsMeta = parseStepsMeta(String(formData.get("steps_json") || "[]"));

  const heroFile = formData.get("hero_image");
  const vizFile = formData.get("viz_reference_image");

  const uploadedImages: File[] = [];
  if (isUploadedFile(heroFile)) uploadedImages.push(heroFile);
  if (isUploadedFile(vizFile)) uploadedImages.push(vizFile);
  for (let i = 0; i < stepsMeta.length; i += 1) {
    const stepFile = formData.get(`step_image_${i}`);
    if (isUploadedFile(stepFile)) uploadedImages.push(stepFile);
  }
  for (const file of uploadedImages) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      redirect(
        existingId
          ? `/admin/guides/${existingId}?error=${encodeURIComponent(IMAGE_TYPE_ERROR)}`
          : `/admin/guides/new?error=${encodeURIComponent(IMAGE_TYPE_ERROR)}`,
      );
    }
  }

  try {
    let heroImagePath = existingHero || null;
    let vizReferencePathValue = existingViz || null;

    if (isUploadedFile(heroFile)) {
      const path = heroPath(
        guideId,
        extensionFromFile(heroFile),
        randomUUID(),
      );
      heroImagePath = await uploadImage(supabase, heroFile, path);
    }

    if (isUploadedFile(vizFile)) {
      const path = vizReferencePath(
        guideId,
        extensionFromFile(vizFile),
        randomUUID(),
      );
      vizReferencePathValue = await uploadImage(supabase, vizFile, path);
    }

    const steps: GuideStep[] = [];
    for (let i = 0; i < stepsMeta.length; i += 1) {
      const meta = stepsMeta[i];
      const titleStep = String(meta.title || "").trim();
      if (!titleStep && !String(meta.instructions || "").trim()) {
        continue;
      }

      let imagePath = String(meta.existingImagePath || "").trim() || null;
      const stepFile = formData.get(`step_image_${i}`);
      if (isUploadedFile(stepFile)) {
        const path = stepImagePath(
          guideId,
          i,
          extensionFromFile(stepFile),
          randomUUID(),
        );
        imagePath = await uploadImage(supabase, stepFile, path);
      }

      steps.push({
        id: stepIdForSave(meta.id),
        title: titleStep || `Step ${i + 1}`,
        estimatedTime: String(meta.estimatedTime || "").trim(),
        instructions: String(meta.instructions || "").trim(),
        materials: String(meta.materialsText || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tools: String(meta.toolsText || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        image_path: imagePath,
      });
    }

    const payload = {
      title,
      slug,
      overview,
      hero_image_path: heroImagePath,
      materials,
      tools,
      steps,
      viz_reference_image_path: vizReferencePathValue,
      viz_dimensions: vizDimensions || null,
      viz_question_2: vizQuestion2 || null,
      viz_question_3: vizQuestion3 || null,
      is_published: isPublished,
      pro_exclusive: proExclusive,
    };

    if (existingId) {
      const { error } = await supabase
        .from("guides")
        .update(payload)
        .eq("id", existingId);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("guides").insert({
        id: guideId,
        ...payload,
        sort_order: 0,
      });
      if (error) throw new Error(error.message);
    }

    await applyStepVideoOps(
      supabase,
      guideId,
      new Set(steps.map((step) => step.id).filter((id): id is string => Boolean(id))),
      String(formData.get("step_videos_json") || "[]"),
    );

    if (isFeatured) {
      if (!isPublished) {
        throw new Error("A Guide must be Published before it can be Featured.");
      }
      const { error: featureError } = await supabase.rpc("set_featured_guide", {
        p_guide_id: guideId,
      });
      if (featureError) throw new Error(featureError.message);
    }

    redirect(`/admin/guides/${guideId}?saved=1`);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save Guide.";
    // Next.js redirect() throws a special error — rethrow it.
    if (
      typeof err === "object" &&
      err &&
      "digest" in err &&
      String((err as { digest?: string }).digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    redirect(
      `/admin/guides/${guideId}?error=${encodeURIComponent(message)}`,
    );
  }
}
