import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F6F3] text-[#2E2E2C]">
      <SiteHeader />

      <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl items-center px-6 py-6 sm:px-10 lg:px-16 lg:py-6">
        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#9C9A94]">
              Learn your design style in minutes
            </p>

            <h1
              className="text-3xl leading-tight tracking-[0.04em] text-[#2E2E2C] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              Bringing fun back to designing your home.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B6A66] sm:text-xl">
              Explore design ideas the easy way. Swipe through visuals, react to
              what you like, and DesigniY helps uncover the style that fits your
              home.
            </p>

            <div className="mt-8 max-w-xl rounded-[1.75rem] border border-[#D8D6D1] bg-[#E6E1D8] p-6 pb-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[#F7F6F3] p-4">
                  <p className="text-sm text-[#2E2E2C]">
                    “Easiest design app I've ever used.”
                  </p>
                  <p className="mt-2 text-xs text-[#6B6A66]">— Early user</p>
                </div>

                <div className="rounded-xl bg-[#F7F6F3] p-4">
                  <p className="text-sm text-[#2E2E2C]">
                    “You'll end up doing every room in your house, then your entire backyard.”
                  </p>
                  <p className="mt-2 text-xs text-[#6B6A66]">— Beta tester</p>
                </div>

                <div className="rounded-xl bg-[#F7F6F3] p-4 sm:col-span-2">
                  <p className="text-sm text-[#2E2E2C]">
                    “Finally a design app that gives realistic results and keeps your room dimensions.”
                  </p>
                  <p className="mt-2 text-xs text-[#6B6A66]">— Early user</p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://apps.apple.com/us/app/designiy/id6760857302"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 px-10 py-4 text-lg font-semibold text-white backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition hover:bg-black/50"
                  style={{ fontFamily: "Aboreto, serif" }}
                >
                  Try DesigniY Now
                </a>
              </div>
            </div>

          </div>

          <div className="mx-auto flex w-full justify-center lg:justify-end">
            <div className="rounded-[2.0rem] border border-[#D8D6D1] bg-[#E6E1D8] p-3 shadow-[0_20px_60px_rgba(31,30,28,0.08)]">
            <div className="relative w-[290px] overflow-hidden rounded-[1.0rem] border border-[#D8D6D1] bg-black sm:w-[320px]">
                <video
                  className="h-[590px] w-full object-cover sm:h-[650px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  <source src="/designiy-preview.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="support" className="border-t border-[#D8D6D1] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl rounded-[2.25rem] border border-[#D8D6D1] bg-[#E6E1D8] px-8 py-12 sm:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9C9A94]">
              Support
            </p>

            <h2
              className="mt-4 text-3xl leading-tight tracking-[0.04em] text-[#2E2E2C] sm:text-4xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              Need help? We’ve got you.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#6B6A66] sm:text-lg">
              Reach out anytime and we’ll point you in the right direction.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:16312920141"
              className="block rounded-xl bg-[#F7F6F3] p-6 border border-[#D8D6D1]"
            >
              <p className="text-sm text-[#6B6A66]">Phone</p>
              <p className="mt-2 text-lg text-[#2E2E2C]">(631) 292-0141</p>
            </a>

            <a
              href="mailto:support@designiy.app"
              className="block rounded-xl bg-[#F7F6F3] p-6 border border-[#D8D6D1]"
            >
              <p className="text-sm text-[#6B6A66]">Email</p>
              <p className="mt-2 text-lg text-[#2E2E2C]">
                support@designiy.app
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="updates" className="border-t border-[#D8D6D1] px-6 pb-20 sm:px-10 lg:px-16 lg:pb-24">
        <div className="mx-auto mt-6 w-full max-w-5xl rounded-[2.25rem] border border-[#D8D6D1] bg-[#E6E1D8] px-8 py-12 sm:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#9C9A94]">
              Recent App Updates
            </p>
            <h2
              className="mt-4 text-3xl leading-tight tracking-[0.04em] text-[#2E2E2C] sm:text-4xl"
              style={{ fontFamily: "Aboreto, serif" }}
            >
              What’s new in DesigniY.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#6B6A66] sm:text-lg">
              Follow product progress, feature drops, and quality improvements as we ship.
            </p>
          </div>

          <div className="mt-8 grid max-h-[22rem] gap-4 overflow-y-auto pr-1">
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                June 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Completely refreshed the bathroom and living room swipe session image libraries with all-new design inspiration.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                May 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Expanded swipe session image libraries and upgraded image generation for more realistic design results.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                April 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
              Added a Design Brief feature which helps turn ideas into a clear plan with layout direction, style decisions, and next steps.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                March 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Improved room-dimension handling for more realistic results.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                February 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Updated the onboarding flow to help users start projects faster.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                January 2026
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Improved swipe responsiveness and reduced loading time between cards.
              </p>
            </div>
            <div className="rounded-xl border border-[#D8D6D1] bg-[#F7F6F3] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9C9A94]">
                December 2025
              </p>
              <p className="mt-2 text-base text-[#2E2E2C]">
                Added better project setup guidance for first-time users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D8D6D1] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#9C9A94]">© 2026 DesigniY</p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
            >
              Terms
            </a>
            <a
              href="mailto:support@designiy.app"
              className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
            >
              support@designiy.app
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}