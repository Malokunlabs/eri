import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export function ReportsPageContent() {
  return (
    <div className="bg-eri-white">
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[560px] w-full overflow-hidden bg-[#241a15] text-eri-white sm:min-h-[620px] lg:min-h-[680px]">
        {/* Background Hero Image */}
        <Image
          src="/images/report-page/Reports Hero.png"
          alt="Woman carrying a tray in a Nigerian rural setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.92]"
        />

        {/* Subtle Dark Gradient Overlay for optimal text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:from-black/75 lg:via-black/35"
        />

        {/* Navbar overlaid on hero */}
        <div className="relative z-20">
          <SiteHeader variant="dark" />
        </div>

        {/* Hero Title and Copy */}
        <div className="relative z-10 flex min-h-[460px] items-center pb-20 pt-8 sm:min-h-[520px] lg:min-h-[580px]">
          <Container size="insights">
            <div className="max-w-[560px]">
              <h1 className="font-display text-[44px] font-semibold leading-[1.04] tracking-[-0.025em] text-eri-white sm:text-[54px] lg:text-[62px]">
                Reports by Eri
              </h1>
              <p className="mt-5 max-w-[460px] text-[15px] leading-[1.55] text-eri-white/90 sm:text-[16px]">
                Eri publishes its own field research, gathered by our people in
                markets and stores across Nigeria, and every report is free to
                read.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Section 2: Featured Snapshot Section */}
      <section
        aria-labelledby="snapshot-heading"
        className="py-16 sm:py-20 lg:py-28"
      >
        <Container size="insights">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h2
                id="snapshot-heading"
                className="font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.025em] text-eri-dark sm:text-[46px] lg:text-[50px]"
              >
                The Nigerian Urban Consumer 2026 Snapshot Q1
              </h2>
              <p className="mt-5 max-w-[430px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                A selection of projects that show how organizations have used
                ERI to answer important business and brand growth questions.
              </p>
              <div className="mt-8">
                <Link
                  href="#"
                  className="eri-pill eri-pill--primary min-h-[42px] px-6 py-2.5 font-display text-[14px]"
                >
                  View Snapshot
                </Link>
              </div>
            </div>

            <div className="relative aspect-[552/340] w-full overflow-hidden rounded-[24px] shadow-[0_12px_36px_rgba(41,41,41,0.08)]">
              <Image
                src="/images/report-page/Frame 2147208325.png"
                alt="A consumer counting currency in Nigeria"
                fill
                sizes="(max-width: 1023px) 100vw, 552px"
                className="object-cover"
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
          <div className="text-center">
            <h2
              id="indexes-heading"
              className="font-display text-[38px] font-semibold leading-[1.05] tracking-[-0.02em] text-eri-dark sm:text-[46px] lg:text-[52px]"
            >
              Living Intelligence Indexes
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
              Four measures we track every quarter, gathered the same way as
              everything else we publish, so you can see what is moving in the
              market and what isn&apos;t.
            </p>
          </div>

          {/* 4 Cards Row: Card 1 (Wide) + 3 Portrait Cards */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {/* Card 1: Consumer Compression Index (Wide - 2 columns on lg) */}
            <article className="group relative min-h-[360px] overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:col-span-2 md:col-span-2 lg:col-span-2">
              <Image
                src="/images/report-page/two-girls.png"
                alt="Consumers shopping in a retail store"
                fill
                sizes="(max-width: 1023px) 100vw, 440px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              />

              {/* Tag */}
              <span className="absolute left-5 top-5 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                Q1 2026
              </span>

              {/* Bottom Content */}
              <div className="absolute inset-x-5 bottom-6 flex flex-col justify-between gap-3 text-white sm:flex-row sm:items-end">
                <h3 className="max-w-[170px] font-display text-[22px] font-semibold leading-tight tracking-[-0.015em]">
                  Consumer Compression Index
                </h3>
                <p className="max-w-[240px] text-[12px] leading-[1.4] text-white/90">
                  Measures the degree to which consumers are compressing
                  discretionary spending relative to essential needs.
                </p>
              </div>
            </article>

            {/* Card 2: Payment Behavior Index */}
            <article className="group relative min-h-[360px] overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] lg:col-span-1">
              <Image
                src="/images/report-page/darkboy.png"
                alt="Young man in casual orange shirt"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />

              <span className="absolute left-5 top-5 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                Q1 2026
              </span>

              <div className="absolute inset-x-5 bottom-6 text-white">
                <h3 className="font-display text-[19px] font-semibold leading-tight tracking-[-0.015em]">
                  Payment Behavior Index
                </h3>
              </div>
            </article>

            {/* Card 3: Retail Migration Index */}
            <article className="group relative min-h-[360px] overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] lg:col-span-1">
              <Image
                src="/images/report-page/girlwithbook.png"
                alt="Women reading a book together"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />

              <span className="absolute left-5 top-5 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                Q1 2026
              </span>

              <div className="absolute inset-x-5 bottom-6 text-white">
                <h3 className="font-display text-[19px] font-semibold leading-tight tracking-[-0.015em]">
                  Retail Migration Index
                </h3>
              </div>
            </article>

            {/* Card 4: Consumer Confidence Signal */}
            <article className="group relative min-h-[360px] overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] lg:col-span-1">
              <Image
                src="/images/report-page/girlonglasses.png"
                alt="Woman in white scarf and glasses"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />

              <span className="absolute left-5 top-5 rounded-full border border-white/80 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm">
                Q1 2026
              </span>

              <div className="absolute inset-x-5 bottom-6 text-white">
                <h3 className="font-display text-[19px] font-semibold leading-tight tracking-[-0.015em]">
                  Consumer Confidence Signal
                </h3>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
