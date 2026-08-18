import Image from "next/image";
import Link from "next/link";

import { EvidenceMenu } from "@/components/layout/evidence-menu";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Services", href: "#" },
  { label: "Reports", href: "#" },
  { label: "About", href: "#" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-40 h-20 text-eri-white">
      <Container className="flex h-full items-center justify-between">
        <Link
          href="#"
          aria-label="Eri home"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
        >
          <Image
            src="/logo/header/logo.svg"
            alt="Eri"
            width={91}
            height={32}
            loading="eager"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-9">
            <li>
              <EvidenceMenu />
            </li>
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-sm font-display text-[18px] font-semibold leading-[1.2] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="#" className="eri-pill eri-pill--header">
          Book a Signal
        </Link>
      </Container>
    </header>
  );
}
