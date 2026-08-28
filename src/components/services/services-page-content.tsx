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
          <div className="flex flex-col items-end gap-8">
            <p className="max-w-[380px] text-[15px] leading-relaxed text-eri-grey-6">
              Empowering brands with rapid, data-driven{" "}
              <br className="sm:hidden" /> insights and on-the-ground
              activations, all backed by a vibrant community of skilled field
              professionals.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="eri-pill eri-pill--primary">
                Get Free Plan
              </Link>
              <Link href="/reports" className="eri-pill eri-pill--secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
