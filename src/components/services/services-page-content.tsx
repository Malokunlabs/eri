import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export function ServicesPageContent() {
  return (
    <>
      {/* Section 1: Hero */}
      <section
        id="main-content"
        aria-labelledby="services-hero-heading"
        className="bg-eri-dark text-eri-white"
      >
        <SiteHeader variant="dark" />

        <Container
          size="insights"
          className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24"
        >
          {/* Left: big heading */}
          <h1
            id="services-hero-heading"
            className="font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[50px] lg:text-[56px]"
          >
            Transform Your Market Research &amp; Brand Activations
          </h1>

          {/* Right: description + CTAs */}
          <div className="flex flex-col items-start gap-6 lg:items-end lg:gap-8">
            <p className="max-w-115 text-[15px] leading-[1.55] text-eri-grey-6 sm:text-[16px] lg:max-w-95">
              Empowering brands with rapid, data-driven insights and on-the-ground
              activations, all backed by a vibrant community of skilled gig
              professionals.
            </p>
            <div className="grid w-full grid-cols-2 gap-3.5 sm:flex sm:w-auto sm:items-center sm:gap-3">
              <Link
                href="/contact"
                className="flex min-h-12 items-center justify-center rounded-full border border-white bg-eri-coral-dark px-5 py-3 font-display text-[15px] font-medium whitespace-nowrap text-white shadow-sm transition-all hover:bg-eri-coral-dark/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-7"
              >
                Get Free Plan
              </Link>
              <Link
                href="/reports"
                className="flex min-h-12 items-center justify-center rounded-full border border-transparent bg-eri-grey-8 px-5 py-3 font-display text-[15px] font-medium whitespace-nowrap text-eri-dark transition-all hover:bg-eri-grey-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-7"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
