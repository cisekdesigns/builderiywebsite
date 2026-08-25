import Link from "next/link";
import { signOut } from "@/app/admin/login/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isGuideAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_guide_admin")
      .eq("id", user.id)
      .maybeSingle();
    isGuideAdmin = Boolean(profile?.is_guide_admin);
  }

  if (!user || !isGuideAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <header className="border-b border-[rgba(255,255,255,0.16)] bg-[#000000]/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/admin/guides"
              className="text-sm tracking-[0.14em]"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              GUIDE ADMIN
            </Link>
            <Link
              href="/admin/guides"
              className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
            >
              Guides
            </Link>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
