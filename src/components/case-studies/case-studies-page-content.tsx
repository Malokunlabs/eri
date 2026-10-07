"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import {
  getCaseStudyLogo,
  type CaseStudy,
} from "@/lib/case-studies-data";

const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 4;

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const href = `/case-studies/${study.slug || study.id}`;
  const logoSrc = getCaseStudyLogo(study);

  return (
    <article className="group relative aspect-[244/232] w-full transition-transform duration-200 hover:-translate-y-1">
      <Link
        href={href}
        className="absolute inset-0 z-10 block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-dark"
        aria-label={`View case study: ${study.company}`}
      >
        <span className="sr-only">View case study {study.company}</span>
      </Link>

      <Image
        src={study.folder}
        alt={study.company}
        fill
        sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 260px"
        className="object-contain drop-shadow-sm"
      />

      {/* Brand logo placed inside the folder paper slot, replacing baked-in logo */}
      <div className="pointer-events-none absolute left-[12.3%] top-[19.4%] flex size-[9.8%] items-center justify-center overflow-hidden rounded-full border border-[#E3E1DD] bg-white shadow-xs">
        {logoSrc ? (
          <div className="relative size-full overflow-hidden rounded-full">
            <Image
              src={logoSrc}
              alt=""
              fill
              sizes="24px"
              className="size-full rounded-full object-cover object-center"
            />
          </div>
        ) : (
          <span className="font-display text-[9px] font-bold text-eri-dark">
            {study.company.charAt(0)}
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-[8.5%] bottom-[7.5%] text-eri-white sm:bottom-[8.5%]">
        <h3 className="font-display text-[clamp(13px,3.5vw,20px)] font-semibold leading-tight tracking-[-0.01em]">
          {study.company}
        </h3>
        {study.description ? (
          <p className="mt-[3%] line-clamp-2 max-w-[200px] text-[clamp(8px,1.8vw,11px)] leading-[1.45] text-white/95">
            {study.description}
          </p>
        ) : null}
        <span className="mt-[5%] inline-flex min-h-6 items-center justify-center rounded-full border border-eri-white px-[7%] py-[2.5%] font-display text-[clamp(8px,1.6vw,11px)] leading-none text-eri-white transition-colors group-hover:bg-white/20">
          View Details
        </span>
      </div>
    </article>
  );
}

type CaseStudiesPageContentProps = {
  initialStudies?: CaseStudy[];
  categories?: string[];
};

export function CaseStudiesPageContent({
  initialStudies = [],
  categories = ["All"],
}: CaseStudiesPageContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredStudies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialStudies.filter((study) => {
      const matchesCategory =
        activeCategory === "All" ||
        study.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        study.company.toLowerCase().includes(normalizedQuery) ||
        (study.title && study.title.toLowerCase().includes(normalizedQuery)) ||
        study.category.toLowerCase().includes(normalizedQuery) ||
        study.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [initialStudies, activeCategory, query]);

  const visibleStudies = filteredStudies.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredStudies.length;

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <div className="min-h-screen bg-eri-white">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-16 pt-8 lg:pb-24 lg:pt-12">
        <Container size="insights">
          {/* Header section */}
          <div className="flex flex-col gap-5 border-b border-eri-grey-5 pb-7 sm:flex-row sm:items-end sm:justify-between lg:gap-10">
            <div>
              <h1 className="font-display text-[38px] font-semibold leading-[1.05] tracking-[-0.025em] text-eri-dark sm:text-[44px] lg:text-[48px]">
                Case Studies
              </h1>
              <p className="mt-3 max-w-[480px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                Every brand we work with asks a different question, and every
                project gets built around that question.
              </p>
            </div>
            <p className="hidden max-w-[340px] text-[13px] leading-[1.5] text-eri-grey-11 sm:block sm:text-right sm:text-[14px]">
              We do not disclose confidential, classified, or sensitive detail
              about our work with brands.
            </p>
          </div>

          {/* Filters & Search section */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-[10px] border px-4 py-2 font-sans text-[13px] font-medium leading-none transition-colors sm:text-[14px] ${
                      isActive
                        ? "border-[#4a4947] bg-[#4a4947] text-eri-white"
                        : "border-eri-grey-7 bg-eri-white text-eri-grey-11 hover:border-eri-dark hover:text-eri-dark"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="relative block w-full sm:max-w-[320px]">
              <span className="sr-only">Search for Brands</span>
              <Image
                src="/icons/icons/search-icon.svg"
                alt=""
                width={18}
                height={18}
                className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 opacity-60"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search for Brands"
                className="eri-field min-h-[40px] rounded-full border-eri-grey-7 bg-eri-white py-2 pl-11 pr-4 text-[13px] placeholder:text-eri-grey-10 sm:text-[14px]"
              />
            </label>
          </div>

          {/* Grid section */}
          {visibleStudies.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
              {visibleStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-[16px] text-eri-grey-11">
                No case studies match your search. Try another category or brand
                name.
              </p>
            </div>
          )}

          {/* Load More section */}
          {canLoadMore && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(count + LOAD_MORE_STEP, filteredStudies.length),
                  )
                }
                className="rounded-full border border-eri-dark/70 bg-eri-white px-7 py-2.5 font-display text-[13px] font-medium text-eri-dark transition-all hover:border-eri-dark hover:bg-eri-grey-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-dark"
              >
                Load More
              </button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
