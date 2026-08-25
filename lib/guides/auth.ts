import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireGuideAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_guide_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_guide_admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user };
}
