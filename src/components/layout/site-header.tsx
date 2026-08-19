import Image from "next/image";
import Link from "next/link";

import { EvidenceMenu } from "@/components/layout/evidence-menu";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Services", href: "#" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "#" },
  { label: "Contact", href: "/contact" },
] as const;

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

export function SiteHeader({ variant = "dark" }: SiteHeaderProps) {
  const isLight = variant === "light";

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
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-sm font-display text-[18px] font-semibold leading-[1.2] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    isLight
                      ? "text-eri-grey-11 focus-visible:outline-eri-dark"
                      : "focus-visible:outline-eri-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="eri-pill eri-pill--header">
          Book a Signal
        </Link>
      </Container>
    </header>
  );
}
