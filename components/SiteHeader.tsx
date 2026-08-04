import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[rgba(255,255,255,0.16)] bg-[#000000]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
        <a
          href="/"
          className="text-lg tracking-[0.18em] text-[#FFFFFF]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          <Image
            src="/builderiy-logo.svg"
            alt="BuilderiY"
            width={140}
            height={28}
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#support"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Support
          </a>

          <a
            href="/#updates"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Updates
          </a>

          <a
            href="/privacy"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Terms
          </a>
        </nav>

        <a
          href="https://builderiy.app"
          className="inline-flex items-center justify-center rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-2.5 text-sm font-medium text-[#1F1E1C] transition hover:bg-[#EDEBE4]"
        >
          Try BuilderiY Now
        </a>
      </div>

      <nav
        className="md:hidden border-t border-[rgba(255,255,255,0.16)]"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2 sm:px-10 lg:px-16">
          <a
            href="/#support"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Support
          </a>
          <a
            href="/#updates"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Updates
          </a>
          <a
            href="/privacy"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-sm text-[#9A9A9A] transition hover:text-[#FFFFFF]"
          >
            Terms
          </a>
        </div>
      </nav>
    </header>
  );
}
