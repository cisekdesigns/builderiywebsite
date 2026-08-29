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
  title: string;
  estimatedTime: string;
  instructions: string;
  materialsText: string;
  toolsText: string;
  existingImagePath: string;
}> {
  return JSON.parse(raw || "[]");
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
  const vizPlacementEnabled =
    formData.getAll("viz_placement_enabled").includes("true");
  const vizQuestion2 = String(formData.get("viz_question_2") || "").trim();
  const vizQuestion3 = String(formData.get("viz_question_3") || "").trim();
  const isPublished = formData.get("is_published") === "on";
  const isFeatured = formData.get("is_featured") === "on";
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

  const guideId = existingId || randomUUID();
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
      viz_placement_enabled: vizPlacementEnabled,
      viz_question_2: vizQuestion2 || null,
      viz_question_3: vizQuestion3 || null,
      is_published: isPublished,
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
