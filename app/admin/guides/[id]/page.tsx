import Link from "next/link";
import { notFound } from "next/navigation";
import GuideForm from "@/app/admin/guides/GuideForm";
import { requireGuideAdmin } from "@/lib/guides/auth";
import type { GuideRow } from "@/lib/guides/types";

export default async function EditGuidePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { supabase } = await requireGuideAdmin();
  const { id } = await params;
  const query = await searchParams;

  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const guide = data as GuideRow;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1
          className="text-2xl tracking-[0.14em]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          EDIT GUIDE
        </h1>
        <Link
          href="/admin/guides"
          className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
        >
          Back
        </Link>
      </div>
      <GuideForm
        guide={guide}
        error={query.error || null}
        saved={query.saved === "1"}
      />
    </div>
  );
}
