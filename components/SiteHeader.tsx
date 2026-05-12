"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#support", label: "Support" },
  { href: "/#updates", label: "Updates" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

const linkClassName =
  "text-sm text-[#6B6A66] transition hover:text-[#2E2E2C]";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8D6D1]/80 bg-[#F7F6F3]/90 backdrop-blur">
      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <div className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between bg-[#F7F6F3]/90 px-6 py-3 sm:px-10 lg:px-16">
        <a
          href="/"
          className="text-lg tracking-[0.18em] text-[#2E2E2C]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          DesigniY
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={linkClassName}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D8D6D1] bg-[#F7F6F3] text-[#2E2E2C] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-header-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-2.5 text-sm font-medium text-[#2E2E2C] transition hover:bg-[#F7F6F3]"
          >
            Try DesigniY Now
          </a>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="site-header-mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-t border-[#D8D6D1] bg-[#F7F6F3]/95 shadow-[0_12px_24px_rgba(31,30,28,0.08)] backdrop-blur md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 sm:px-10 lg:px-16"
            aria-label="Mobile"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`rounded-lg px-3 py-3 ${linkClassName}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
