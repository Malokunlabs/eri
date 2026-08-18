"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const evidenceLinks = [
  { label: "Video Diaries", href: "/video-diaries" },
  { label: "Insights", href: "#" },
  { label: "Case Studies", href: "#" },
] as const;

type EvidenceMenuProps = {
  variant?: "dark" | "light";
};

export function EvidenceMenu({ variant = "dark" }: EvidenceMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isLight = variant === "light";
  const isEvidenceActive = evidenceLinks.some((link) => link.href === pathname);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="evidence-menu"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 rounded-sm font-display text-[18px] font-semibold leading-[1.2] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 ${
          isLight
            ? isEvidenceActive
              ? "text-eri-coral-dark underline decoration-eri-coral-dark decoration-2 underline-offset-[6px] focus-visible:outline-eri-dark"
              : "text-eri-grey-11 focus-visible:outline-eri-dark"
            : "focus-visible:outline-eri-white"
        }`}
      >
        Evidence
        <span
          aria-hidden="true"
          className={`text-[16px] leading-none transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        id="evidence-menu"
        className={`absolute left-0 top-full z-50 w-56 pt-4 transition duration-200 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[28px] border-2 border-black bg-eri-menu shadow-[0_18px_30px_rgba(77,26,8,0.3)]">
          {evidenceLinks.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block min-h-18 px-8 py-6 font-display text-[20px] leading-[1.2] text-eri-white transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none ${
                  isActive ? "bg-white/12" : index === 0 ? "bg-white/6" : ""
                } ${index > 0 ? "border-t border-black/15" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
