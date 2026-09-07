"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { EvidenceMenu } from "@/components/layout/evidence-menu";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] satisfies { label: string; href: string }[];

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
      <Container className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <Link
          href="/"
          aria-label="Eri home"
          className={`shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${
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
            className="h-7 w-auto md:h-7.5 lg:h-8"
            loading="eager"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-3.5 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-9">
            <li>
              <EvidenceMenu variant={variant} />
            </li>
            {navigation.map((item) => {
              const isActive = item.href !== "#" && item.href !== "" && pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-sm font-display text-[15px] font-semibold leading-[1.2] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 lg:text-[16px] xl:text-[18px] ${
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

        <Link
          href="/contact"
          className="eri-pill eri-pill--header shrink-0 whitespace-nowrap px-3.5 py-2 text-[13px] md:min-h-9 md:px-4 md:py-2 md:text-[14px] lg:min-h-10.5 lg:px-4.5 lg:py-2.5 lg:text-[15px]"
        >
          Book a Signal
        </Link>
      </Container>
    </header>
  );
}
