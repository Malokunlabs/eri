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
      <p className="inline-flex items-center rounded-full bg-white px-4 py-2 shadow-sm">
        <Image
          src="/logo/header/new-malokun-logo.png"
          alt="A Malokun Labs Company"
          width={202}
          height={24}
          className="h-5 w-auto sm:h-6"
        />
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
