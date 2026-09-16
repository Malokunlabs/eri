"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const evidenceLinks = [
  { label: "Video Diaries", href: "/video-diaries" },
  { label: "Insights", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
] as const;

const navigationLinks = [
  { label: "Services", href: "/services" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

type MobileMenuProps = {
  variant?: "dark" | "light";
};

export function MobileMenu({ variant = "dark" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(true);
  const pathname = usePathname();
  const isLight = variant === "light";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const isEvidenceActive = evidenceLinks.some((link) => link.href === pathname);

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isLight
            ? "text-eri-dark hover:bg-eri-dark/10 focus-visible:outline-eri-dark"
            : "text-eri-white hover:bg-white/10 focus-visible:outline-eri-white"
        }`}
      >
        <span className="sr-only">Toggle navigation</span>
        <div className="flex flex-col items-center justify-center gap-1.25">
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-250 ease-out ${
              isLight ? "bg-eri-dark" : "bg-eri-white"
            } ${isOpen ? "translate-y-1.75 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-200 ease-out ${
              isLight ? "bg-eri-dark" : "bg-eri-white"
            } ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-250 ease-out ${
              isLight ? "bg-eri-dark" : "bg-eri-white"
            } ${isOpen ? "-translate-y-1.75 -rotate-45" : ""}`}
          />
        </div>
      </button>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-eri-menu text-eri-white"
          >
            {/* Header row with logo and close button */}
            <div className="flex h-20 shrink-0 items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                aria-label="Eri home"
                className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
              >
                <Image
                  src="/logo/header/logo.svg"
                  alt="Eri"
                  width={91}
                  height={32}
                  className="h-7 w-auto"
                  priority
                />
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-eri-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-1 flex-col justify-between px-6 py-6 sm:px-8">
              <nav aria-label="Mobile primary navigation" className="space-y-6">
                {/* Evidence Accordion / Group */}
                <div className="border-b border-white/10 pb-5">
                  <button
                    type="button"
                    onClick={() => setIsEvidenceOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between py-1 text-left font-display text-[26px] font-semibold leading-tight tracking-[-0.01em] text-eri-white transition-colors"
                  >
                    <span
                      className={
                        isEvidenceActive ? "text-eri-coral" : "text-eri-white"
                      }
                    >
                      Evidence
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-[16px] text-eri-grey-8 transition-transform duration-200 ${
                        isEvidenceOpen ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isEvidenceOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-3.5 pl-3">
                          {evidenceLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block font-display text-[18px] transition-colors ${
                                    isActive
                                      ? "font-semibold text-eri-coral"
                                      : "text-eri-grey-6 hover:text-eri-white"
                                  }`}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary pages */}
                <ul className="space-y-4 border-b border-white/10 pb-6">
                  {navigationLinks.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block py-1 font-display text-[26px] font-semibold leading-tight tracking-[-0.01em] transition-colors ${
                            isActive
                              ? "text-eri-coral underline decoration-eri-coral decoration-2 underline-offset-8"
                              : "text-eri-white hover:text-eri-grey-6"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="mt-8 pt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="eri-pill eri-pill--primary flex min-h-12 w-full items-center justify-center text-[16px] font-semibold"
                >
                  Book a Signal
                </Link>

                <div className="mt-6 flex items-center justify-between text-[13px] text-eri-grey-8">
                  <span>Ground truth across Nigeria</span>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="underline hover:text-eri-white"
                  >
                    Need assistance?
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
