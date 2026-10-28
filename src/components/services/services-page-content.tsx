import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

/**
 * Replaced Section: Previous dark hero section with tallies and dark header.
 * Kept for reference or future re-activation.
 */
export function ServicesPageContent() {
  return (
    <>
      {/* Section 1: Hero (Replaced) */}
      <section
        id="main-content"
        aria-labelledby="services-hero-heading"
        className="flex min-h-dvh flex-col overflow-hidden bg-eri-dark text-eri-white lg:min-h-0 lg:block"
      >
        <SiteHeader variant="dark" />

        <Container
          size="insights"
          className="flex flex-none flex-col pt-3 pb-8 sm:pt-6 sm:pb-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24"
        >
          {/* Left: big heading */}
          <h1
            id="services-hero-heading"
            className="font-display text-[34px] font-semibold leading-[1.06] tracking-tight sm:text-[44px] lg:text-[56px]"
          >
            Transform Your Market Research &amp; Brand Activations
          </h1>

          {/* Right: description + CTAs */}
          <div className="mt-4 flex flex-col items-start gap-4 sm:mt-6 sm:gap-6 lg:mt-0 lg:items-end lg:gap-8">
            <p className="max-w-115 text-[14px] leading-normal text-eri-grey-6 sm:text-[15px] lg:max-w-95 lg:text-[16px]">
              Empowering brands with rapid, data-driven insights and
              on-the-ground activations, all backed by a vibrant community of
              skilled gig professionals.
            </p>
            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:items-center sm:gap-3">
              <Link
                href="/contact"
                className="flex min-h-11 items-center justify-center rounded-full border border-white bg-eri-coral-dark px-4 py-2.5 font-display text-[14px] font-medium whitespace-nowrap text-white shadow-sm transition-all hover:bg-eri-coral-dark/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:px-7 sm:py-3 sm:text-[15px]"
              >
                Get Free Plan
              </Link>
              <Link
                href="/reports"
                className="flex min-h-11 items-center justify-center rounded-full border border-transparent bg-eri-grey-8 px-4 py-2.5 font-display text-[14px] font-medium whitespace-nowrap text-eri-dark transition-all hover:bg-eri-grey-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:px-7 sm:py-3 sm:text-[15px]"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </Container>

        {/* Bottom tally-mark illustration — mobile image fills all the way to the bottom edge with no margin, desktop on lg+ */}
        <div className="relative w-full flex-1 min-h-48 overflow-hidden lg:flex-none lg:min-h-0">
          <Image
            src="/images/services-page/mobile-services-hero.PNG"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-top mix-blend-screen lg:hidden"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
          />
          <Image
            src="/images/services-page/desktop-services-hero.PNG"
            alt=""
            aria-hidden="true"
            width={5120}
            height={1312}
            className="hidden h-auto w-full mix-blend-screen lg:block"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
          />
        </div>
      </section>
    </>
  );
}
