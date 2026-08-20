"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { EvidenceMenu } from "@/components/layout/evidence-menu";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Services", href: "#" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

export function SiteHeader({ variant = "dark" }: SiteHeaderProps) {
  const isLight = variant === "light";
  const pathname = usePathname();

  return (
    <header
      className={`relative z-40 h-20 ${isLight ? "bg-eri-grey-2 text-eri-dark" : "text-eri-white"}`}
    >
      <Container className="flex h-full items-center justify-between">
        <Link
          href="/"
          aria-label="Eri home"
          className={`rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isLight
              ? "focus-visible:outline-eri-dark"
              : "focus-visible:outline-eri-white"
          }`}
        >
          <Image
            src={isLight ? "/logo/header/logo-dark.svg" : "/logo/header/logo.svg"}
            alt="Eri"
            width={91}
            height={32}
            loading="eager"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-9">
            <li>
              <EvidenceMenu variant={variant} />
            </li>
            {navigation.map((item) => {
              const isActive = item.href !== "#" && pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-sm font-display text-[18px] font-semibold leading-[1.2] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                      isActive
                        ? isLight
                          ? "text-eri-coral-dark underline decoration-eri-coral-dark decoration-2 underline-offset-[6px] focus-visible:outline-eri-dark"
                          : "text-eri-grey-6 underline decoration-eri-grey-6 decoration-2 underline-offset-[6px] focus-visible:outline-eri-white"
                        : isLight
                          ? "text-eri-grey-11 hover:text-eri-dark focus-visible:outline-eri-dark"
                          : "text-eri-white hover:text-eri-grey-6 focus-visible:outline-eri-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="eri-pill eri-pill--header">
          Book a Signal
        </Link>
      </Container>
    </header>
  );
}
