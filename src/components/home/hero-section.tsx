import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="min-h-[720px] overflow-hidden bg-eri-coral text-eri-white">
      <SiteHeader />

      <Container className="grid min-h-[640px] items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-0 lg:py-0">
        <div className="flex flex-col items-start lg:pb-14">
          <div className="max-w-[536px]">
            <h1 className="font-display text-[43px] font-semibold leading-none tracking-[-0.02em] sm:text-[52px] lg:text-[57px]">
              Ground truth, gathered in person across Nigeria.
            </h1>
            <p className="mt-4 max-w-[425px] text-[15px] leading-[1.5] tracking-[-0.01em] text-eri-coral-light">
              Eri sends field teams into stores, markets and streets across
              Nigeria, then reports back what they saw. Mystery shopping,
              intercept surveys, verification and market research.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2">
            <Link href="#" className="eri-pill eri-pill--primary">
              Book a Signal
            </Link>
            <Link href="#" className="eri-pill eri-pill--secondary">
              View Reports
            </Link>
          </div>
        </div>

        <div className="relative -mx-4 flex min-h-[360px] items-center justify-center sm:mx-0 lg:min-h-[560px] lg:justify-end">
          <Image
            src="/images/landingpage/large-folder.svg"
            alt="A folder showing that Eri's research is collected by over 12,000 active field agents"
            width={571}
            height={518}
            preload
            className="h-auto w-full max-w-[720px]"
          />
        </div>
      </Container>
    </section>
  );
}
