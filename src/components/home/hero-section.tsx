import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-eri-coral text-eri-white lg:min-h-180">
      <SiteHeader />

      <Container className="grid items-center gap-6 pt-5 pb-3 sm:gap-8 sm:pt-8 sm:pb-6 lg:min-h-160 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-0 lg:py-0">
        <div className="flex flex-col items-start lg:pb-14">
          <div className="max-w-[536px]">
            <h1 className="font-display text-[34px] font-semibold leading-[1.06] tracking-tight sm:text-[48px] lg:text-[56px]">
              Ground truth, gathered in person across Nigeria.
            </h1>
            <p className="mt-3.5 max-w-[425px] text-[14px] leading-normal tracking-[-0.01em] text-eri-coral-light sm:mt-4 sm:text-[15px] lg:text-[16px]">
              Eri sends field teams into stores, markets and streets across
              Nigeria, then reports back what they saw. Mystery shopping,
              intercept surveys, verification and market research.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 lg:mt-12">
            <a
              href={siteConfig.contact.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="eri-pill eri-pill--primary"
            >
              Book a Signal
            </a>
            <Link href="#" className="eri-pill eri-pill--secondary">
              View Reports
            </Link>
          </div>
        </div>

        <div className="relative left-4 -mx-4 flex items-center justify-center sm:left-0 sm:mx-0 lg:min-h-140 lg:justify-end">
          <Image
            src="/images/landingpage/large-folder.svg"
            alt="A folder showing that Eri's research is collected by over 12,000 active field agents"
            width={571}
            height={518}
            preload
            className="eri-float h-auto w-full max-w-[720px]"
          />
        </div>
      </Container>
    </section>
  );
}
