"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  createStepVideoUploadUrl,
  getStepVideoAdminState,
  saveGuide,
} from "@/app/admin/guides/actions";
import { publicGuideImageUrl } from "@/lib/guides/paths";
import {
  ALLOWED_STEP_VIDEO_TYPES,
  GUIDE_STEP_VIDEOS_BUCKET,
  isUuid,
  MAX_STEP_VIDEO_BYTES,
  safeVideoFileName,
} from "@/lib/guides/step-videos";
import { GLOBAL_VIZ_QUESTION_1, type GuideRow } from "@/lib/guides/types";
import { createClient } from "@/lib/supabase/client";

const NEW_GUIDE_DRAFT_KEY = "builderiy.admin.newGuideDraft.v1";

type MaterialDraft = {
  name: string;
  quantity: string;
  product_url: string;
};

type ToolDraft = {
  name: string;
  quantity: string;
  product_url: string;
};

type StepDraft = {
  id: string;
  title: string;
  estimatedTime: string;
  instructions: string;
  materialsText: string;
  toolsText: string;
  existingImagePath: string;
  previewUrl: string | null;
  existingVideoName: string | null;
  pendingVideoFile: File | null;
  removeExistingVideo: boolean;
  videoPickerKey: number;
};

type NewGuideDraft = {
  title: string;
  overview: string;
  materials: MaterialDraft[];
  tools: ToolDraft[];
  steps: Array<{
    id?: string;
    title: string;
    estimatedTime: string;
    instructions: string;
    materialsText: string;
    toolsText: string;
  }>;
  viz_dimensions: string;
  viz_question_2: string;
  viz_question_3: string;
  is_published: boolean;
  is_featured: boolean;
};

function emptyMaterial(): MaterialDraft {
  return { name: "", quantity: "", product_url: "" };
}

function emptyTool(): ToolDraft {
  return { name: "", quantity: "", product_url: "" };
}

function blankStep(id = ""): StepDraft {
  return {
    id,
    title: "",
    estimatedTime: "",
    instructions: "",
    materialsText: "",
    toolsText: "",
    existingImagePath: "",
    previewUrl: null,
    existingVideoName: null,
    pendingVideoFile: null,
    removeExistingVideo: false,
    videoPickerKey: 0,
  };
}

function emptyStep(): StepDraft {
  return blankStep(crypto.randomUUID());
}

function stepFromGuide(step: GuideRow["steps"][number]): StepDraft {
  return {
    id: step.id && isUuid(step.id) ? step.id : "",
    title: step.title || "",
    estimatedTime: step.estimatedTime || "",
    instructions: step.instructions || "",
    materialsText: (step.materials || []).join(", "),
    toolsText: (step.tools || []).join(", "),
    existingImagePath: step.image_path || "",
    previewUrl: publicGuideImageUrl(step.image_path),
    existingVideoName: null,
    pendingVideoFile: null,
    removeExistingVideo: false,
    videoPickerKey: 0,
  };
}

function clearNewGuideDraft() {
  try {
    localStorage.removeItem(NEW_GUIDE_DRAFT_KEY);
  } catch {
    // Ignore storage errors.
  }
}

function readNewGuideDraft(): NewGuideDraft | null {
  try {
    const raw = localStorage.getItem(NEW_GUIDE_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NewGuideDraft;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function GuideForm({
  guide,
  error,
  saved,
}: {
  guide?: GuideRow | null;
  error?: string | null;
  saved?: boolean;
}) {
  const isNewGuide = !guide?.id;

  const [title, setTitle] = useState(guide?.title || "");
  const [overview, setOverview] = useState(guide?.overview || "");
  const [vizDimensions, setVizDimensions] = useState(
    guide?.viz_dimensions || "",
  );
  const [vizQuestion2, setVizQuestion2] = useState(guide?.viz_question_2 || "");
  const [vizQuestion3, setVizQuestion3] = useState(guide?.viz_question_3 || "");
  const [isPublished, setIsPublished] = useState(Boolean(guide?.is_published));
  const [isFeatured, setIsFeatured] = useState(Boolean(guide?.is_featured));
  const [draftReady, setDraftReady] = useState(!isNewGuide);

  const [materials, setMaterials] = useState<MaterialDraft[]>(
    guide?.materials?.length
      ? guide.materials.map((m) => ({
          name: m.name || "",
          quantity: m.quantity || "",
          product_url: m.product_url || "",
        }))
      : [emptyMaterial()],
  );

  const [tools, setTools] = useState<ToolDraft[]>(
    guide?.tools?.length
      ? guide.tools.map((t) => ({
          name: t.name || "",
          quantity: t.quantity || "",
          product_url: t.product_url || "",
        }))
      : [emptyTool()],
  );

  const [steps, setSteps] = useState<StepDraft[]>(
    guide?.steps?.length ? guide.steps.map(stepFromGuide) : [blankStep()],
  );
  const [removedVideoStepIds, setRemovedVideoStepIds] = useState<string[]>([]);
  const [videoStorageReady, setVideoStorageReady] = useState(false);
  const videoSubmitReady = useRef(false);
  const newGuideIdRef = useRef("");
  const stepsJsonRef = useRef<HTMLInputElement>(null);

  const [heroPreview, setHeroPreview] = useState<string | null>(
    publicGuideImageUrl(guide?.hero_image_path),
  );
  const [vizPreview, setVizPreview] = useState<string | null>(
    publicGuideImageUrl(guide?.viz_reference_image_path),
  );
  const [pending, setPending] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);
  const IMAGE_TYPE_ERROR = "Please upload a JPEG or PNG image.";

  function validateImageFiles(form: HTMLFormElement): string | null {
    const inputs = form.querySelectorAll<HTMLInputElement>(
      'input[type="file"]',
    );
    for (const input of inputs) {
      const isImageInput =
        input.name === "hero_image" ||
        input.name === "viz_reference_image" ||
        input.name.startsWith("step_image_");
      if (!isImageInput) continue;
      const file = input.files?.[0];
      if (!file || file.size === 0) continue;
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        return IMAGE_TYPE_ERROR;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        return `"${file.name}" is larger than 10 MB. Please choose a smaller image.`;
      }
    }
    return null;
  }

  useEffect(() => {
    let cancelled = false;
    getStepVideoAdminState(guide?.id || null).then((result) => {
      if (cancelled) return;
      setVideoStorageReady(result.storageReady);
      if (result.videos.length === 0) return;
      setSteps((current) =>
        current.map((step) => {
          const match = result.videos.find((video) => video.stepId === step.id);
          return match ? { ...step, existingVideoName: match.fileName } : step;
        }),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [guide?.id]);

  function ensureStepId(step: StepDraft): StepDraft {
    return step.id && isUuid(step.id)
      ? step
      : { ...step, id: crypto.randomUUID() };
  }

  async function prepareStepVideos(form: HTMLFormElement) {
    const prepared = steps.map(ensureStepId);
    let guideId = guide?.id || "";
    if (!guideId) {
      if (!isUuid(newGuideIdRef.current)) {
        newGuideIdRef.current = crypto.randomUUID();
      }
      guideId = newGuideIdRef.current;
      const newGuideInput = form.querySelector<HTMLInputElement>(
        'input[name="new_guide_id"]',
      );
      if (newGuideInput) newGuideInput.value = guideId;
    }

    const ops: Array<{
      stepId: string;
      op: "upsert" | "remove";
      storagePath?: string;
      fileName?: string;
      contentType?: string;
    }> = [];

    for (const stepId of removedVideoStepIds) {
      if (isUuid(stepId)) ops.push({ stepId, op: "remove" });
    }

    for (const step of prepared) {
      const willSave =
        step.title.trim().length > 0 || step.instructions.trim().length > 0;
      if (step.removeExistingVideo && step.existingVideoName) {
        ops.push({ stepId: step.id, op: "remove" });
      }
      const file = step.pendingVideoFile;
      if (!file) continue;
      if (!willSave) {
        throw new Error(
          "Add a title or instructions before attaching a step video.",
        );
      }
      if (!ALLOWED_STEP_VIDEO_TYPES.has(file.type)) {
        throw new Error("Please upload an MP4 or MOV video.");
      }
      if (file.size > MAX_STEP_VIDEO_BYTES) {
        throw new Error("Step videos must be 100 MB or smaller.");
      }

      const ticket = await createStepVideoUploadUrl({
        guideId,
        stepId: step.id,
        fileName: safeVideoFileName(file.name),
        contentType: file.type,
        fileSize: file.size,
      });
      if (!ticket.ok) throw new Error(ticket.error);

      const supabase = createClient();
      const { error } = await supabase.storage
        .from(GUIDE_STEP_VIDEOS_BUCKET)
        .uploadToSignedUrl(ticket.path, ticket.token, file, {
          contentType: file.type,
        });
      if (error) {
        throw new Error("The step video could not be uploaded.");
      }
      ops.push({
        stepId: step.id,
        op: "upsert",
        storagePath: ticket.path,
        fileName: safeVideoFileName(file.name),
        contentType: file.type,
      });
    }

    const stepsInput = form.querySelector<HTMLInputElement>(
      'input[name="steps_json"]',
    );
    if (stepsInput) {
      stepsInput.value = JSON.stringify(
        prepared.map((step) => ({
          id: step.id,
          title: step.title,
          estimatedTime: step.estimatedTime,
          instructions: step.instructions,
          materialsText: step.materialsText,
          toolsText: step.toolsText,
          existingImagePath: step.existingImagePath,
        })),
      );
    }
    const videosInput = form.querySelector<HTMLInputElement>(
      'input[name="step_videos_json"]',
    );
    if (videosInput) videosInput.value = JSON.stringify(ops);
  }

  // Editing an existing Guide (including after a successful create redirect):
  // clear any leftover New Guide draft so it cannot overwrite edit state later.
  useEffect(() => {
    if (!isNewGuide) {
      clearNewGuideDraft();
    }
  }, [isNewGuide]);

  // Restore New Guide draft client-side after mount (avoids hydration mismatch).
  useEffect(() => {
    if (!isNewGuide) return;

    const draft = readNewGuideDraft();
    if (draft) {
      setTitle(draft.title || "");
      setOverview(draft.overview || "");
      setVizDimensions(draft.viz_dimensions || "");
      setVizQuestion2(draft.viz_question_2 || "");
      setVizQuestion3(draft.viz_question_3 || "");
      setIsPublished(Boolean(draft.is_published));
      setIsFeatured(Boolean(draft.is_featured));
      setMaterials(
        draft.materials?.length
          ? draft.materials.map((m) => ({
              name: m.name || "",
              quantity: m.quantity || "",
              product_url: m.product_url || "",
            }))
          : [emptyMaterial()],
      );
      setTools(
        draft.tools?.length
          ? draft.tools.map((t) => ({
              name: t.name || "",
              quantity: t.quantity || "",
              product_url: t.product_url || "",
            }))
          : [emptyTool()],
      );
      setSteps(
        draft.steps?.length
          ? draft.steps.map((s) => ({
              ...blankStep(s.id && isUuid(s.id) ? s.id : ""),
              title: s.title || "",
              estimatedTime: s.estimatedTime || "",
              instructions: s.instructions || "",
              materialsText: s.materialsText || "",
              toolsText: s.toolsText || "",
            }))
          : [blankStep()],
      );
    }

    setDraftReady(true);
  }, [isNewGuide]);

  // Autosave New Guide text state while editing.
  useEffect(() => {
    if (!isNewGuide || !draftReady) return;

    const draft: NewGuideDraft = {
      title,
      overview,
      materials,
      tools,
      steps: steps.map((s) => ({
        id: s.id,
        title: s.title,
        estimatedTime: s.estimatedTime,
        instructions: s.instructions,
        materialsText: s.materialsText,
        toolsText: s.toolsText,
      })),
      viz_dimensions: vizDimensions,
      viz_question_2: vizQuestion2,
      viz_question_3: vizQuestion3,
      is_published: isPublished,
      is_featured: isFeatured,
    };

    try {
      localStorage.setItem(NEW_GUIDE_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Ignore quota / private-mode errors.
    }
  }, [
    isNewGuide,
    draftReady,
    title,
    overview,
    materials,
    tools,
    steps,
    vizDimensions,
    vizQuestion2,
    vizQuestion3,
    isPublished,
    isFeatured,
  ]);

  const materialsJson = useMemo(() => JSON.stringify(materials), [materials]);
  const toolsJson = useMemo(() => JSON.stringify(tools), [tools]);
  const stepsJson = useMemo(
    () =>
      JSON.stringify(
        steps.map((s) => ({
          id: s.id,
          title: s.title,
          estimatedTime: s.estimatedTime,
          instructions: s.instructions,
          materialsText: s.materialsText,
          toolsText: s.toolsText,
          existingImagePath: s.existingImagePath,
        })),
      ),
    [steps],
  );

  useEffect(() => {
    if (stepsJsonRef.current) stepsJsonRef.current.value = stepsJson;
  }, [stepsJson]);

  return (
    <form
      action={saveGuide}
      onSubmit={async (e) => {
        const validationError = validateImageFiles(e.currentTarget);
        if (validationError) {
          e.preventDefault();
          videoSubmitReady.current = false;
          setClientError(validationError);
          setPending(false);
          return;
        }

        const needsVideoWork =
          removedVideoStepIds.length > 0 ||
          steps.some(
            (step) => step.pendingVideoFile || step.removeExistingVideo,
          );
        if (needsVideoWork && !videoSubmitReady.current) {
          e.preventDefault();
          setPending(true);
          setClientError(null);
          const form = e.currentTarget;
          try {
            await prepareStepVideos(form);
            videoSubmitReady.current = true;
            form.requestSubmit();
          } catch (err) {
            videoSubmitReady.current = false;
            setPending(false);
            setClientError(
              err instanceof Error
                ? err.message
                : "The step video could not be uploaded.",
            );
          }
          return;
        }

        videoSubmitReady.current = false;
        setClientError(null);
        setPending(true);
      }}
      className="space-y-10"
    >
      {guide?.id ? <input type="hidden" name="id" value={guide.id} /> : null}
      {!guide?.id ? <input type="hidden" name="new_guide_id" defaultValue="" /> : null}
      {guide?.slug ? <input type="hidden" name="slug" value={guide.slug} /> : null}
      <input type="hidden" name="materials_json" value={materialsJson} />
      <input type="hidden" name="tools_json" value={toolsJson} />
      <input
        ref={stepsJsonRef}
        type="hidden"
        name="steps_json"
        defaultValue={stepsJson}
      />
      <input type="hidden" name="step_videos_json" defaultValue="[]" />
      <input
        type="hidden"
        name="existing_hero_path"
        value={guide?.hero_image_path || ""}
      />
      <input
        type="hidden"
        name="existing_viz_reference_path"
        value={guide?.viz_reference_image_path || ""}
      />

      {saved ? (
        <p className="rounded-xl border border-[#3DDC84]/40 bg-[#3DDC84]/10 px-4 py-3 text-sm text-[#EDEBE4]">
          Guide saved.
        </p>
      ) : null}
      {clientError ? (
        <p className="rounded-xl border border-[#A64632]/50 bg-[#A64632]/15 px-4 py-3 text-sm text-[#EDEBE4]">
          {clientError}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-xl border border-[#A64632]/50 bg-[#A64632]/15 px-4 py-3 text-sm text-[#EDEBE4]">
          {error}
        </p>
      ) : null}
      {isNewGuide && draftReady ? (
        <p className="text-xs text-[#9A9A9A]">
          Draft autosaved in this browser. Images must be re-selected after a
          refresh.
        </p>
      ) : null}

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
          Basic
        </h2>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Title</span>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4] outline-none focus:border-[#D8D6D1]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Overview</span>
          <textarea
            name="overview"
            required
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4] outline-none focus:border-[#D8D6D1]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Hero Image</span>
          <input
            type="file"
            name="hero_image"
            accept="image/jpeg,image/png"
            className="mt-2 block w-full text-sm text-[#EDEBE4]"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setHeroPreview(file ? URL.createObjectURL(file) : heroPreview);
            }}
          />
          {heroPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroPreview}
              alt="Hero preview"
              className="mt-3 h-40 w-full rounded-xl object-cover"
            />
          ) : null}
        </label>
        <p className="text-xs text-[#9A9A9A]">
          Slug is generated automatically from the title.
          {guide?.slug ? ` Current: ${guide.slug}` : ""}
        </p>
      </section>

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
            Materials
          </h2>
          <button
            type="button"
            onClick={() => setMaterials((prev) => [...prev, emptyMaterial()])}
            className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-3 py-2 text-sm text-[#EDEBE4]"
          >
            + ADD MATERIAL
          </button>
        </div>
        {materials.map((item, index) => (
          <div
            key={`material-${index}`}
            className="grid gap-3 rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-4 sm:grid-cols-3"
          >
            <input
              placeholder="Name"
              value={item.name}
              onChange={(e) =>
                setMaterials((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, name: e.target.value } : row,
                  ),
                )
              }
              className="rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <input
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                setMaterials((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, quantity: e.target.value } : row,
                  ),
                )
              }
              className="rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <div className="flex gap-2">
              <input
                placeholder="Product link (optional)"
                value={item.product_url}
                onChange={(e) =>
                  setMaterials((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, product_url: e.target.value }
                        : row,
                    ),
                  )
                }
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
              />
              <button
                type="button"
                onClick={() =>
                  setMaterials((prev) => prev.filter((_, i) => i !== index))
                }
                className="shrink-0 px-2 text-sm text-[#9A9A9A]"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
            Tools
          </h2>
          <button
            type="button"
            onClick={() => setTools((prev) => [...prev, emptyTool()])}
            className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-3 py-2 text-sm text-[#EDEBE4]"
          >
            + ADD TOOL
          </button>
        </div>
        {tools.map((item, index) => (
          <div
            key={`tool-${index}`}
            className="grid gap-3 rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-4 sm:grid-cols-3"
          >
            <input
              placeholder="Name"
              value={item.name}
              onChange={(e) =>
                setTools((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, name: e.target.value } : row,
                  ),
                )
              }
              className="rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <input
              placeholder="Quantity (optional)"
              value={item.quantity}
              onChange={(e) =>
                setTools((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, quantity: e.target.value } : row,
                  ),
                )
              }
              className="rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <div className="flex gap-2">
              <input
                placeholder="Product link (optional)"
                value={item.product_url}
                onChange={(e) =>
                  setTools((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, product_url: e.target.value }
                        : row,
                    ),
                  )
                }
                className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
              />
              <button
                type="button"
                onClick={() =>
                  setTools((prev) => prev.filter((_, i) => i !== index))
                }
                className="shrink-0 px-2 text-sm text-[#9A9A9A]"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
            Steps
          </h2>
          <button
            type="button"
            onClick={() => setSteps((prev) => [...prev, emptyStep()])}
            className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-3 py-2 text-sm text-[#EDEBE4]"
          >
            + ADD STEP
          </button>
        </div>
        {steps.map((step, index) => (
          <div
            key={step.id || `step-${index}`}
            className="space-y-3 rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#9A9A9A]">Step {index + 1}</p>
              <button
                type="button"
                onClick={() => {
                  if (step.id && step.existingVideoName) {
                    setRemovedVideoStepIds((current) =>
                      current.includes(step.id) ? current : [...current, step.id],
                    );
                  }
                  setSteps((prev) => prev.filter((_, i) => i !== index));
                }}
                className="text-sm text-[#9A9A9A]"
              >
                Remove
              </button>
            </div>
            <input
              type="file"
              name={`step_image_${index}`}
              accept="image/jpeg,image/png"
              className="block w-full text-sm text-[#EDEBE4]"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, previewUrl: url } : row,
                  ),
                );
              }}
            />
            {step.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={step.previewUrl}
                alt={`Step ${index + 1} preview`}
                className="h-36 w-full rounded-xl object-cover"
              />
            ) : null}
            <div className="space-y-2">
              <p className="text-sm text-[#9A9A9A]">Step video (optional)</p>
              <input
                key={step.videoPickerKey}
                type="file"
                accept="video/mp4,video/quicktime"
                disabled={!videoStorageReady || pending}
                className="block w-full text-sm text-[#EDEBE4] disabled:opacity-60"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSteps((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? {
                            ...row,
                            pendingVideoFile: file,
                            removeExistingVideo: false,
                          }
                        : row,
                    ),
                  );
                }}
              />
              <p className="text-xs text-[#9A9A9A]">
                {!videoStorageReady
                  ? "Video upload is not available until staging storage is set up."
                  : step.pendingVideoFile
                    ? `Selected: ${step.pendingVideoFile.name}. Uploads when you save.`
                    : step.removeExistingVideo
                      ? "This video will be removed when you save."
                      : step.existingVideoName
                        ? `Current video: ${step.existingVideoName}`
                        : "No video"}
              </p>
              {step.existingVideoName || step.pendingVideoFile ? (
                <button
                  type="button"
                  className="text-sm text-[#9A9A9A]"
                  onClick={() =>
                    setSteps((prev) =>
                      prev.map((row, i) =>
                        i === index
                          ? {
                              ...row,
                              pendingVideoFile: null,
                              removeExistingVideo: Boolean(row.existingVideoName),
                              videoPickerKey: row.videoPickerKey + 1,
                            }
                          : row,
                      ),
                    )
                  }
                >
                  Remove video
                </button>
              ) : null}
            </div>
            <input
              placeholder="Title"
              value={step.title}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, title: e.target.value } : row,
                  ),
                )
              }
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <input
              placeholder="Estimated time"
              value={step.estimatedTime}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index
                      ? { ...row, estimatedTime: e.target.value }
                      : row,
                  ),
                )
              }
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <textarea
              placeholder="Instructions"
              rows={4}
              value={step.instructions}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index
                      ? { ...row, instructions: e.target.value }
                      : row,
                  ),
                )
              }
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <input
              placeholder="Materials used (comma-separated)"
              value={step.materialsText}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index
                      ? { ...row, materialsText: e.target.value }
                      : row,
                  ),
                )
              }
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
            <input
              placeholder="Tools used (comma-separated)"
              value={step.toolsText}
              onChange={(e) =>
                setSteps((prev) =>
                  prev.map((row, i) =>
                    i === index ? { ...row, toolsText: e.target.value } : row,
                  ),
                )
              }
              className="w-full rounded-lg border border-[#2A2A2A] bg-[#121212] px-3 py-2 text-sm text-[#EDEBE4]"
            />
          </div>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
          See Project In My Space
        </h2>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Reference Image</span>
          <input
            type="file"
            name="viz_reference_image"
            accept="image/jpeg,image/png"
            className="mt-2 block w-full text-sm text-[#EDEBE4]"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setVizPreview(file ? URL.createObjectURL(file) : vizPreview);
            }}
          />
          {vizPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vizPreview}
              alt="Visualization reference preview"
              className="mt-3 h-40 w-full rounded-xl object-cover"
            />
          ) : null}
        </label>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">PROJECT DIMENSIONS</span>
          <textarea
            name="viz_dimensions"
            rows={4}
            value={vizDimensions}
            onChange={(e) => setVizDimensions(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4] outline-none focus:border-[#D8D6D1]"
          />
        </label>
        <div className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
            Question 1 (global — not editable)
          </p>
          <p className="mt-2 text-sm text-[#EDEBE4]">{GLOBAL_VIZ_QUESTION_1}</p>
        </div>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Question 2</span>
          <input
            name="viz_question_2"
            value={vizQuestion2}
            onChange={(e) => setVizQuestion2(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[#9A9A9A]">Question 3</span>
          <input
            name="viz_question_3"
            value={vizQuestion3}
            onChange={(e) => setVizQuestion3(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4]"
          />
        </label>
      </section>

      <section className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 space-y-4">
        <h2 className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A]">
          Publishing
        </h2>
        <label className="flex items-center gap-3 text-sm text-[#EDEBE4]">
          <input
            type="checkbox"
            name="is_published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4"
          />
          Published
        </label>
        <label className="flex items-center gap-3 text-sm text-[#EDEBE4]">
          <input
            type="checkbox"
            name="is_featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4"
          />
          Featured
        </label>
        <p className="text-xs text-[#9A9A9A]">
          Featured uses the approved set_featured_guide() RPC and requires
          Published. To remove Featured from this Guide, unpublish it or feature
          a different Guide.
        </p>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-8 py-3 text-sm font-medium text-[#1F1E1C] transition hover:bg-[#EDEBE4] disabled:opacity-60"
      >
        {pending ? "Saving…" : "SAVE"}
      </button>
    </form>
  );
}
