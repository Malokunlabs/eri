"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/ui/container";

const insights = [
  {
    image: "/images/insights-section/man-on-suit.png",
    tag: "Day in the Life",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    date: "May 22, 2026",
  },
  {
    image: "/images/insights-section/two-girls.png",
    tag: "Consumer Signals",
    title: "The Rise of Sustainable Fashion: Consumer Expectations in 2026",
    date: "March 10, 2026",
  },
  {
    image: "/images/insights-section/man-on-table.png",
    tag: "Field Notes",
    title: "Navigating the New Normal: Retail Insights Post-Pandemic",
    date: "January 5, 2026",
  },
  {
    image: "/images/insights-section/girl-on-desk.png",
    tag: "Arguments",
    title: "E-commerce Strategies for Success in Nigeria’s Digital Market",
    date: "February 15, 2026",
  },
  {
    image: "/images/insights-section/girl-on-yellow.png",
    tag: "Market Pulse",
    title: "What Nigeria’s Next Generation Expects from Everyday Brands",
    date: "April 8, 2026",
  },
  {
    image: "/images/insights-section/girl-on-blue.png",
    tag: "Street Signals",
    title: "How Young Nigerians Are Redefining Modern Convenience",
    date: "June 2, 2026",
  },
] as const;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-6 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function InsightsSection() {
  const railRef = useRef<HTMLDivElement>(null);

  function moveRail(direction: -1 | 1) {
    const rail = railRef.current;

    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-insight-card]");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 20;
    const distance = (card?.offsetWidth ?? rail.clientWidth * 0.85) + gap;

    rail.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="insights-heading"
      className="overflow-hidden bg-eri-white py-8 text-eri-dark lg:pb-8 lg:pt-6"
    >
      <Container
        size="insights"
        className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <h2
          id="insights-heading"
          className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] lg:text-[44px]"
        >
          Insights from across Nigeria
        </h2>

        <div className="flex shrink-0 self-end gap-3 sm:self-auto">
          <button
            type="button"
            aria-label="Show previous insights"
            className="flex h-10 w-[54px] items-center justify-center rounded-full border border-eri-dark transition-colors hover:bg-eri-dark hover:text-eri-white"
            onClick={() => moveRail(-1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Show next insights"
            className="flex h-10 w-[54px] items-center justify-center rounded-full border border-eri-dark transition-colors hover:bg-eri-dark hover:text-eri-white"
            onClick={() => moveRail(1)}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </Container>

      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 lg:mt-7">
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory scroll-pl-3 gap-5 overflow-x-auto scroll-smooth pl-3 pr-3 [scrollbar-width:none] sm:scroll-pl-[max(32px,calc((100vw-1096px)/2+32px))] sm:pl-[max(32px,calc((100vw-1096px)/2+32px))] sm:pr-8 [&::-webkit-scrollbar]:hidden"
        >
          {insights.map((insight) => (
            <article
              data-insight-card
              className="w-[calc(100vw-48px)] max-w-[342px] shrink-0 snap-start lg:w-[329px]"
              key={insight.image}
            >
              <Link href="#" className="group block">
                <div className="relative aspect-[342/441] overflow-hidden rounded-lg bg-eri-grey-3">
                  <Image
                    src={insight.image}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 48px), 329px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white px-2 py-1 text-[10px] leading-none text-white backdrop-blur-sm">
                    {insight.tag}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.015em]">
                  {insight.title}
                </h3>
                <time
                  dateTime={new Date(insight.date).toISOString().slice(0, 10)}
                  className="mt-2 block text-[11px] text-eri-grey-11"
                >
                  {insight.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
