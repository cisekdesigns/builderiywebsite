import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <SiteHeader />

      <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl items-center px-6 py-6 sm:px-10 lg:px-16 lg:py-6">
        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
              Full Step-by-Step Build Plans in Minutes
            </p>

            <h1
              className="text-3xl leading-tight tracking-[0.04em] text-[#FFFFFF] sm:text-4xl lg:text-4xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              Plan Your Next DIY Project
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#EDEBE4] sm:text-xl">
              BuilderiY helps you plan, visualize, and complete DIY home improvement projects with confidence. Upload a photo, describe your project, and receive a complete step-by-step build plan tailored to your idea.
            </p>

            <div className="mt-8 max-w-xl rounded-[1.75rem] border border-[#2A2A2A] bg-[#121212] p-6 pb-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[#1C1C1C] p-4">
                  <p className="text-sm text-[#FFFFFF]">
                    “It's like having an experienced contractor in your back pocket.”
                  </p>
                  <p className="mt-2 text-xs text-[#EDEBE4]">— Early user</p>
                </div>

                <div className="rounded-xl bg-[#1C1C1C] p-4">
                  <p className="text-sm text-[#FFFFFF]">
                    “If you're into DIY, this is definitely a must have app.”
                  </p>
                  <p className="mt-2 text-xs text-[#EDEBE4]">— Beta tester</p>
                </div>

                <div className="rounded-xl bg-[#1C1C1C] p-4 sm:col-span-2">
                  <p className="text-sm text-[#FFFFFF]">
                    “Being able to see the project in my own space before building was a game changer.”
                  </p>
                  <p className="mt-2 text-xs text-[#EDEBE4]">— Early user</p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://apps.apple.com/us/app/builderiy/id6783095666"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-10 py-4 text-lg font-semibold text-[#1F1E1C] backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition hover:bg-[#EDEBE4]"
                  style={{ fontFamily: "Aboreto, serif" }}
                >
                  Try BuilderiY Now
                </a>
              </div>
            </div>

          </div>

          <div className="mx-auto flex w-full justify-center lg:justify-end">
            <div className="rounded-[2.0rem] border border-[#2A2A2A] bg-[#121212] p-3 shadow-[0_20px_60px_rgba(31,30,28,0.08)]">
            <div className="relative w-[290px] overflow-hidden rounded-[1.0rem] border border-[#2A2A2A] bg-black sm:w-[320px]">
                <video
                  className="h-[590px] w-full object-cover sm:h-[650px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  <source src="/builderiy-preview.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="support" className="border-t border-[#2A2A2A] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl rounded-[2.25rem] border border-[#2A2A2A] bg-[#121212] px-8 py-12 sm:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
              Support
            </p>

            <h2
              className="mt-4 text-3xl leading-tight tracking-[0.04em] text-[#FFFFFF] sm:text-4xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              Need help? We’ve got you.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#EDEBE4] sm:text-lg">
              Reach out anytime and we’ll point you in the right direction.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:16312920141"
              className="block rounded-xl bg-[#1C1C1C] p-6 border border-[#2A2A2A]"
            >
              <p className="text-sm text-[#EDEBE4]">Phone</p>
              <p className="mt-2 text-lg text-[#FFFFFF]">(631) 292-0141</p>
            </a>

            <a
              href="mailto:support@builderiy.app"
              className="block rounded-xl bg-[#1C1C1C] p-6 border border-[#2A2A2A]"
            >
              <p className="text-sm text-[#EDEBE4]">Email</p>
              <p className="mt-2 text-lg text-[#FFFFFF]">
                support@builderiy.app
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="updates" className="border-t border-[#2A2A2A] px-6 pb-20 sm:px-10 lg:px-16 lg:pb-24">
        <div className="mx-auto mt-6 w-full max-w-5xl rounded-[2.25rem] border border-[#2A2A2A] bg-[#121212] px-8 py-12 sm:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
              Recent App Updates
            </p>
            <h2
              className="mt-4 text-3xl leading-tight tracking-[0.04em] text-[#FFFFFF] sm:text-4xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              What’s new in BuilderiY.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#EDEBE4] sm:text-lg">
              Follow product progress, feature drops, and quality improvements as we ship.
            </p>
          </div>

          <div className="mt-8 grid max-h-[22rem] gap-4 overflow-y-auto pr-1">
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
                July 2026
              </p>
              <p className="mt-2 text-base text-[#FFFFFF]">
                BuilderiY Portfolio Agent: Our Portfolio Agent is now available for everyone, free to use.
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
                June 2026
              </p>
              <p className="mt-2 text-base text-[#FFFFFF]">
                Build Plan Improvements: Added our BuilderiY Project Agent to answer all questions about your project.
              </p>
            </div>
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
                May 2026
              </p>
              <p className="mt-2 text-base text-[#FFFFFF]">
                Updated Build Plan Models: More detailed build plans with improved material lists and tool recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2A2A2A] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#9A9A9A]">© 2026 BuilderiY</p>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-[#EDEBE4] transition hover:text-[#FFFFFF]"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-[#EDEBE4] transition hover:text-[#FFFFFF]"
            >
              Terms
            </a>
            <a
              href="mailto:support@builderiy.app"
              className="text-sm text-[#EDEBE4] transition hover:text-[#FFFFFF]"
            >
              support@builderiy.app
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}