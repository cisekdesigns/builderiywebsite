export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return base || "guide";
}

export function uniqueSlug(title: string, existing?: string | null): string {
  if (existing) return existing;
  return `${slugifyTitle(title)}-${Date.now().toString(36).slice(-4)}`;
}
