"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { CSSProperties } from "react";

const APPLE_APP_STORE_URL =
  "https://apps.apple.com/us/app/builderiy/id6783095666";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.builderiy.app";

type TryBuilderiYButtonProps = {
  className?: string;
  style?: CSSProperties;
};

export default function TryBuilderiYButton({
  className,
  style,
}: TryBuilderiYButtonProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        Try BuilderiY Now
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative w-full max-w-sm rounded-[1.75rem] border border-[#2A2A2A] bg-[#121212] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close platform chooser"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1C1C1C] text-lg leading-none text-[#EDEBE4] transition hover:border-[#D8D6D1] hover:text-[#FFFFFF]"
              onClick={close}
            >
              ×
            </button>

            <p
              id={titleId}
              className="pr-10 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]"
            >
              GET BUILDERIY
            </p>
            <p id={descriptionId} className="mt-3 text-base text-[#EDEBE4]">
              Choose your platform
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={APPLE_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-3.5 text-sm font-medium text-[#1F1E1C] transition hover:bg-[#EDEBE4]"
              >
                Apple App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-2xl border border-[#2A2A2A] bg-[#1C1C1C] px-5 py-3.5 text-sm font-medium text-[#EDEBE4] transition hover:border-[#D8D6D1] hover:text-[#FFFFFF]"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
