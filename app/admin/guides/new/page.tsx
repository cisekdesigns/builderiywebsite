import Link from "next/link";
import GuideForm from "@/app/admin/guides/GuideForm";
import { requireGuideAdmin } from "@/lib/guides/auth";

export default async function NewGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireGuideAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1
          className="text-2xl tracking-[0.14em]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          NEW GUIDE
        </h1>
        <Link
          href="/admin/guides"
          className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
        >
          Back
        </Link>
      </div>
      <GuideForm error={params.error || null} />
    </div>
  );
}
