"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

const indexes = [
  {
    id: "consumer-compression",
    tag: "Q1 2026",
    title: "Consumer Compresion Index",
    description:
      "Measures the degree to which consumers are compressing discretionary spending relative to essential needs.",
    image: "/images/report-page/consumer-compression.png",
    alt: "Dining area with colorful plastic chairs and tables",
  },
  {
    id: "payment-behavior",
    tag: "Q1 2026",
    title: "Payment Behavior Index",
    description:
      "Tracks shifts in payment method adoption, from cash to digital wallets and bank transfers.",
    image: "/images/report-page/payment-behavior.png",
    alt: "Gravel stones and building sand",
  },
  {
    id: "retail-migration",
    tag: "Q1 2026",
    title: "Retail Migration Index",
    description:
      "Observes consumer movement between formal retail, open markets, and informal channels across Nigeria.",
    image: "/images/report-page/retail-migration.png",
    alt: "Commercial buses in a Nigerian street",
  },
  {
    id: "consumer-confidence",
    tag: "Q1 2026",
    title: "Consumer Confidence Signal",
    description:
      "A composite signal reflecting consumer outlook on income stability and economic trajectory in Nigeria.",
    image: "/images/report-page/consumer-confidence.png",
    alt: "Person carrying a pink umbrella",
  },
] as const;

export function ReportsPageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="bg-eri-white">
      {/* Section 1: Hero Section */}
      <section className="relative w-full overflow-hidden bg-eri-grey-2 text-eri-dark">
        {/* Navbar */}
        <SiteHeader variant="light" />

        {/* Split Hero Image and Copy */}
        <div className="grid grid-cols-1 lg:min-h-[calc(100svh-116px)] lg:grid-cols-2">
          {/* Left: Full-bleed Monochrome Image */}
          <div className="relative aspect-[1470/1694] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-full">
            <Image
              src="/images/report-page/monochrome-image-large.jpg"
              alt="Four women walking along a bridge at dusk in Nigeria"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: Editorial Copy */}
          <div className="flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
            <div className="max-w-115">
              <h1 className="font-display text-[64px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-eri-dark sm:text-[84px] lg:text-[104px] xl:text-[116px]">
                AIYE
              </h1>
              <p className="mt-4 font-display text-[28px] font-normal leading-[1.12] tracking-[-0.02em] text-eri-dark sm:mt-5 sm:text-[34px] lg:text-[40px]">
                An observatory of
                <br />
                economic life
              </p>
              <p className="mt-6 max-w-105 font-sans text-[14px] font-normal leading-[1.55] tracking-[-0.01em] text-eri-grey-11 sm:mt-7 sm:text-[15.5px]">
                Tracking the pulse of markets, behaviors, and human adaptation
                across Nigeria
              </p>
              <p className="mt-5 font-sans text-[14px] font-medium leading-[1.55] tracking-[-0.01em] text-eri-dark sm:mt-6 sm:text-[15.5px]">
                Built on field infrastructure.
                <br />
                Grounded in lived reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Snapshot Section */}
      <section
        aria-labelledby="snapshot-heading"
        className="py-16 sm:py-20 lg:py-28"
      >
        <Container size="insights">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2
                id="snapshot-heading"
                className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-eri-dark sm:text-[38px] lg:text-[44px]"
              >
                Ask the real economy.
              </h2>
              <p className="mt-4 max-w-97.5 text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                Understand how merchants buy, sell and keep their businesses
                moving. Explore evidence from Lagos markets—and investigate what
                your next decision needs.
              </p>
              <div className="mt-8">
                <Link
                  target="_blank"
                  href={siteConfig.askEriHref}
                  className="eri-pill eri-pill--primary min-h-10 px-5 py-2.5 font-display text-[14px]"
                >
                  Ask Eri
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/report-page/ask-eri-image.jpg"
                alt="Merchants and shoppers in a Lagos market"
                fill
                sizes="(max-width: 1023px) 100vw, 640px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Living Intelligence Indexes */}
      <section
        aria-labelledby="indexes-heading"
        className="pb-20 sm:pb-24 lg:pb-32"
      >
        <Container size="insights">
          {/* Header */}
          <div className="text-left sm:text-center">
            <h2
              id="indexes-heading"
              className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-eri-dark sm:text-[38px] lg:text-[44px]"
            >
              Living Intelligence Indexes
            </h2>
            <p className="mt-3 sm:mx-auto sm:mt-4 max-w-[560px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
              Four measures we track every quarter, gathered the same way as
              everything else we publish, so you can see what is moving in the
              market and what isn&apos;t.
            </p>
          </div>

          {/* Desktop Interactive Expanding Cards Row */}
          <div className="mt-12 hidden lg:flex lg:h-[390px] xl:h-[410px] lg:gap-5 w-full">
            {indexes.map((item, index) => {
              const isExpanded = activeIndex === index;
              return (
                <article
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  className={`group relative overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer select-none transition-[flex-grow] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isExpanded ? "flex-[2.4]" : "flex-1"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={isExpanded ? "520px" : "220px"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                  />

                  {/* Tag */}
                  <span className="absolute left-5 top-5 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                    {item.tag}
                  </span>

                  {/* Bottom Content */}
                  <div className="absolute inset-x-5 bottom-6 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <h3
                        className={`font-display font-semibold leading-tight tracking-[-0.015em] transition-all duration-300 ${
                          isExpanded
                            ? "text-[22px] max-w-[190px]"
                            : "text-[19px] xl:text-[20px] max-w-[150px]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          isExpanded
                            ? "max-w-[270px] opacity-100 translate-x-0"
                            : "max-w-0 opacity-0 translate-x-4 pointer-events-none"
                        }`}
                      >
                        <p className="w-[270px] text-[13px] leading-[1.4] text-white/90">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dark Coming Soon Overlay */}
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/45 pb-8 transition-colors duration-300 group-hover:bg-black/35">
                    <span className="rounded-full border border-white/40 bg-black/60 px-4 py-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
                      Coming Soon
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile Vertically Stacked Cards */}
          <div className="mt-8 flex flex-col gap-4 sm:gap-5 lg:hidden">
            {indexes.map((item) => (
              <article
                key={item.id}
                className="relative min-h-[290px] sm:min-h-[330px] overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), 640px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />

                {/* Tag */}
                <span className="absolute left-4 top-4 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                  {item.tag}
                </span>

                {/* Bottom Content */}
                <div className="absolute inset-x-4 bottom-5 text-white">
                  <h3 className="font-display text-[20px] sm:text-[22px] font-semibold leading-tight tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-[340px] text-[12px] sm:text-[13px] leading-[1.4] text-white/90">
                    {item.description}
                  </p>
                </div>

                {/* Dark Coming Soon Overlay */}
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/45 pb-8">
                  <span className="rounded-full border border-white/40 bg-black/60 px-4 py-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
                    Coming Soon
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
