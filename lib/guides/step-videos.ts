export const GUIDE_STEP_VIDEOS_BUCKET = "guide-step-videos";

export const MAX_STEP_VIDEO_BYTES = 100 * 1024 * 1024;

export const ALLOWED_STEP_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
]);

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export function videoExtension(contentType: string): "mp4" | "mov" | null {
  if (contentType === "video/mp4") return "mp4";
  if (contentType === "video/quicktime") return "mov";
  return null;
}

export function stepVideoObjectPath(
  guideId: string,
  stepId: string,
  versionId: string,
  ext: "mp4" | "mov",
): string {
  return `guides/${guideId}/steps/${stepId}/${versionId}.${ext}`;
}

export function isSafeStepVideoPath(
  guideId: string,
  stepId: string,
  path: string,
): boolean {
  if (!isUuid(guideId) || !isUuid(stepId)) return false;
  const prefix = `guides/${guideId}/steps/${stepId}/`;
  return (
    path.startsWith(prefix) &&
    !path.includes("..") &&
    !path.includes("\\") &&
    /^guides\/[0-9a-f-]+\/steps\/[0-9a-f-]+\/[0-9a-f-]+\.(mp4|mov)$/i.test(path)
  );
}

export function safeVideoFileName(name: string): string {
  const base = name.split(/[/\\]/).pop() || "video";
  const cleaned = base.replace(/[^\w.\- ()]/g, "").slice(0, 120);
  return cleaned || "video";
}
