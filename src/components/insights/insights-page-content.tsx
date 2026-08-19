"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import {
  insightCategories,
  insights,
} from "@/lib/insights-data";

const INITIAL_VISIBLE = 6;

function InsightCard({ insight }: { insight: (typeof insights)[number] }) {
  return (
    <article>
      <Link href="#" className="group block">
        <div className="relative aspect-[342/441] overflow-hidden rounded-lg bg-eri-grey-3">
          <Image
            src={insight.image}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 329px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/80 px-2.5 py-1 text-[10px] leading-none text-white backdrop-blur-sm">
            {insight.tag}
          </span>
        </div>
        <h2 className="mt-3 font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.015em] text-eri-dark lg:text-[20px]">
          {insight.title}
        </h2>
        <time
          dateTime={new Date(insight.date).toISOString().slice(0, 10)}
          className="mt-2 block text-[11px] text-eri-grey-11"
        >
          {insight.date}
        </time>
      </Link>
    </article>
  );
}

export function InsightsPageContent() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof insightCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredInsights = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return insights.filter((insight) => {
      const matchesCategory =
        activeCategory === "All" || insight.tag === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        insight.title.toLowerCase().includes(normalizedQuery) ||
        insight.tag.toLowerCase().includes(normalizedQuery) ||
        insight.date.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visibleInsights = filteredInsights.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredInsights.length;

  function handleCategoryChange(category: (typeof insightCategories)[number]) {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <div className="bg-eri-grey-2">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-16 pt-10 lg:pb-24 lg:pt-12">
        <Container size="insights">
          <div className="flex flex-col gap-6 border-b border-eri-grey-5 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div>
              <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-eri-dark lg:text-[44px]">
                Insights
              </h1>
              <p className="mt-3 max-w-[520px] text-[14px] leading-[1.55] text-eri-grey-11">
                What our people see in the field, and what it means for the
                brands buying from them.
              </p>
            </div>
            <p className="max-w-[360px] text-[14px] leading-[1.55] text-eri-grey-11 lg:text-right">
              Everything here comes from our own fieldwork, and we publish it
              under our own name.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {insightCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`eri-pill min-h-[38px] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] ${
                      isActive
                        ? "border-eri-dark bg-eri-dark text-eri-white hover:bg-eri-dark"
                        : "border-eri-grey-5 bg-eri-white text-eri-dark hover:bg-eri-grey-3"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="relative block w-full lg:max-w-[320px]">
              <span className="sr-only">Search insights</span>
              <Image
                src="/icons/icons/search-icon.svg"
                alt=""
                width={18}
                height={18}
                className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search for Videos, Brands or Dates"
                className="eri-field min-h-[42px] rounded-full py-2.5 pl-11 pr-4"
              />
            </label>
          </div>

          {visibleInsights.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
              {visibleInsights.map((insight) => (
                <InsightCard insight={insight} key={insight.image} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-[15px] text-eri-grey-11">
              No insights match your search. Try another category or keyword.
            </p>
          )}

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              disabled={!canLoadMore}
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + INITIAL_VISIBLE, filteredInsights.length),
                )
              }
              className="eri-pill min-h-[42px] border-eri-grey-6 bg-eri-white px-6 py-2.5 text-[14px] font-medium text-eri-dark hover:bg-eri-grey-3 disabled:cursor-default disabled:opacity-60"
            >
              Load More Insights
            </button>
          </div>
        </Container>
      </main>
    </div>
  );
}
