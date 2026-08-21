import SiteHeader from "@/components/SiteHeader";

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <SiteHeader />
      <div className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p
            className="text-2xl tracking-[0.18em]"
            style={{ fontFamily: "Aboreto, serif" }}
          >
            DELETE YOUR BUILDERIY ACCOUNT
          </p>

          <div className="mt-12 space-y-12">

            {/* OVERVIEW */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Overview
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY users can permanently delete their account directly
                  inside the BuilderiY app.
                </p>
              </div>
            </section>

            {/* DELETE IN APP */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Delete Your Account in the App
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Go to Profile → Delete Account and confirm the deletion.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Deleting your account permanently removes your BuilderiY
                  account and associated account and project data.
                </p>
              </div>
            </section>

            {/* NEED ASSISTANCE */}
            <section className="pb-12">
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Need Assistance?
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  If you cannot access the BuilderiY app or need assistance
                  deleting your account, contact:
                </p>

                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                    Support Email
                  </p>

                  <a
                    href="mailto:support@builderiy.app"
                    className="mt-4 block text-xl text-[#FFFFFF] transition hover:text-[#EDEBE4]"
                  >
                    support@builderiy.app
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
