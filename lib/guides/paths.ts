import { GUIDE_IMAGES_BUCKET } from "@/lib/guides/types";

export function publicGuideImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${GUIDE_IMAGES_BUCKET}/${path}`;
}

export function extensionFromFile(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName) && fromName.length <= 5) {
    return fromName;
  }
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

export function heroPath(guideId: string, ext: string, versionId: string) {
  return `guides/${guideId}/hero-${versionId}.${ext}`;
}

export function vizReferencePath(guideId: string, ext: string, versionId: string) {
  return `guides/${guideId}/viz-reference-${versionId}.${ext}`;
}

export function stepImagePath(
  guideId: string,
  stepIndex: number,
  ext: string,
  versionId: string,
) {
  const n = String(stepIndex + 1).padStart(2, "0");
  return `guides/${guideId}/steps/${n}-${versionId}.${ext}`;
}
