import Link from "next/link";
import { requireGuideAdmin } from "@/lib/guides/auth";
import type { GuideRow } from "@/lib/guides/types";

export default async function AdminGuidesPage() {
  const { supabase } = await requireGuideAdmin();

  const { data, error } = await supabase
    .from("guides")
    .select(
      "id, title, is_published, is_featured, updated_at, sort_order, created_at",
    )
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  const guides = (data || []) as Pick<
    GuideRow,
    "id" | "title" | "is_published" | "is_featured" | "updated_at"
  >[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1
          className="text-2xl tracking-[0.14em]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          GUIDES
        </h1>
        <Link
          href="/admin/guides/new"
          className="rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-2.5 text-sm font-medium text-[#1F1E1C] transition hover:bg-[#EDEBE4]"
        >
          + NEW GUIDE
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-[#A64632]/50 bg-[#A64632]/15 px-4 py-3 text-sm text-[#EDEBE4]">
          Failed to load Guides: {error.message}
        </p>
      ) : null}

      <div className="mt-8 space-y-3">
        {guides.length === 0 ? (
          <p className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-6 text-sm text-[#9A9A9A]">
            No Guides yet. Create your first one.
          </p>
        ) : (
          guides.map((guide) => (
            <div
              key={guide.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[#2A2A2A] bg-[#121212] px-5 py-4"
            >
              <div>
                <p className="text-base text-[#FFFFFF]">{guide.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9A9A9A]">
                  {guide.is_published ? "Published" : "Draft"}
                  {guide.is_featured ? " · Featured" : ""}
                </p>
              </div>
              <Link
                href={`/admin/guides/${guide.id}`}
                className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-2 text-sm text-[#EDEBE4] transition hover:border-[#D8D6D1]"
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
