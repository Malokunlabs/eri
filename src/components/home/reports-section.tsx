import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function ReportsSection() {
  return (
    <section
      aria-labelledby="reports-heading"
      className="overflow-x-clip bg-eri-mauve text-eri-white"
    >
      <Container
        size="reports"
        className="grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16 lg:pb-2 lg:pt-12"
      >
        <div className="w-full lg:max-w-105">
          <p className="font-display text-[15px] font-semibold leading-tight sm:text-[16px]">
            Reports by Eri
          </p>
          <h2
            id="reports-heading"
            className="mt-3 w-full font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:text-[38px]"
          >
            Ask the real economy.
          </h2>
          <p className="mt-3 w-full text-[14px] leading-[1.55] text-eri-coral-light sm:text-[15px] lg:max-w-105">
            Understand how merchants buy, sell and keep their businesses moving.
            Explore evidence from Lagos markets—and investigate what your next
            decision needs.
          </p>
          <Link
            target="_blank"
            href={siteConfig.askEriHref}
            className="eri-pill eri-pill--primary mt-8 min-h-[40px] px-4 py-2.5 text-[14px]"
          >
            Ask Eri
          </Link>
        </div>

        <div className="relative w-full">
          <Image
            src="/images/reports/reports-image.png"
            alt="A motion-blurred street scene featuring a yellow and green vehicle"
            width={714}
            height={434}
            sizes="(max-width: 1023px) 100vw, 680px"
            className="-mx-[6.57%] -mb-[12.68%] h-auto w-[113.15%] max-w-none"
          />
        </div>
      </Container>
    </section>
  );
}
