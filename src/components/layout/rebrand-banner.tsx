"use client";

import Image from "next/image";
import { useState } from "react";

export function RebrandBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Rebrand announcement"
      className="relative z-50 flex h-14 items-center justify-center bg-[#4db6ff] px-12"
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-display text-[11px] font-semibold leading-none text-[#0a8fe8] shadow-sm sm:text-[12px]">
        <span>Was Formerly</span>
        <Image
          src="/logo/header/Malokunlabs.svg"
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0"
        />
        <span>Malokun Labs</span>
      </p>

      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 lg:right-[max(24px,calc((100vw-1096px)/2+32px))]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </svg>
      </button>
    </div>
  );
}
