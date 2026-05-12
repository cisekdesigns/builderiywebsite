export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#D8D6D1]/80 bg-[#F7F6F3]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
        <a
          href="/"
          className="text-lg tracking-[0.18em] text-[#2E2E2C]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          DesigniY
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#support"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Support
          </a>

          <a
            href="/#updates"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Updates
          </a>

          <a
            href="/privacy"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Terms
          </a>
        </nav>

        <a
          href="#"
          className="inline-flex items-center justify-center rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-2.5 text-sm font-medium text-[#2E2E2C] transition hover:bg-[#F7F6F3]"
        >
          Try DesigniY Now
        </a>
      </div>

      <nav
        className="md:hidden border-t border-[#D8D6D1]/80"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2 sm:px-10 lg:px-16">
          <a
            href="/#support"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Support
          </a>
          <a
            href="/#updates"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Updates
          </a>
          <a
            href="/privacy"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]"
          >
            Terms
          </a>
        </div>
      </nav>
    </header>
  );
}
