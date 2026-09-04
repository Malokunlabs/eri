"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import {
  videoCategories,
  videoDiaries,
  type VideoDiary,
} from "@/lib/video-diaries-data";

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 3;

function VideoDiaryCard({ video }: { video: VideoDiary }) {
  return (
    <article className="group cursor-pointer">
      <Link href="#" className="block">
        {/* Video Thumbnail with Play Button */}
        <div className="relative aspect-[336/200] w-full overflow-hidden rounded-[18px] bg-eri-grey-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <Image
            src={video.image}
            alt={video.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 340px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-white/40 shadow-sm backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/60 sm:size-12">
              <svg
                className="size-5 translate-x-0.5 fill-white text-white drop-shadow-xs"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="mt-3.5 flex items-start gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#DF5927] text-white shadow-xs">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-eri-dark transition-colors group-hover:text-eri-coral-dark sm:text-[16px]">
              {video.title}
            </h2>
            <p className="mt-1 text-[12px] leading-tight text-eri-grey-11">
              {video.brand} &bull; {video.date}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function VideoDiariesPageContent() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof videoCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videoDiaries.filter((video) => {
      const matchesCategory =
        activeCategory === "All" || video.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.brand.toLowerCase().includes(normalizedQuery) ||
        video.category.toLowerCase().includes(normalizedQuery) ||
        video.date.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredVideos.length;

  function handleCategoryChange(category: (typeof videoCategories)[number]) {
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

      <main id="main-content" className="pb-16 pt-8 lg:pb-24 lg:pt-14">
        <Container size="insights">
          {/* Section 1: Hero Section */}
          <section
            aria-labelledby="video-diaries-hero-heading"
            className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] lg:gap-14"
          >
            <div>
              <h1
                id="video-diaries-hero-heading"
                className="font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.025em] text-eri-dark sm:text-[50px] lg:text-[58px]"
              >
                Ground truth,
                <br />
                filmed where
                <br />
                it happens.
              </h1>
              <p className="mt-6 max-w-[390px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                Vox pops, interviews and field footage from our people across
                Nigeria, filmed while they work, and published as we get it.
              </p>
            </div>

            <div className="relative aspect-[552/331] w-full overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgba(41,41,41,0.06)]">
              <Image
                src="/images/workdone/workdone-image.png"
                alt="Field researcher examining goods at a market"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 552px"
                className="object-cover"
              />
            </div>
          </section>

          {/* Section 2: Video Catalog Filter & Grid Section */}
          <section
            aria-labelledby="video-catalog-heading"
            className="mt-16 sm:mt-20 lg:mt-24"
          >
            <h2 id="video-catalog-heading" className="sr-only">
              Video Catalog
            </h2>

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {videoCategories.map((category) => {
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
                <span className="sr-only">
                  Search for Videos, Brands or Dates
                </span>
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
                  placeholder="Search for Videos, Brands or Dates"
                  className="eri-field min-h-[40px] rounded-full border-eri-grey-7 bg-eri-white py-2 pl-11 pr-4 text-[13px] placeholder:text-eri-grey-10 sm:text-[14px]"
                />
              </label>
            </div>

            {/* Video Cards Grid */}
            {visibleVideos.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-9">
                {visibleVideos.map((video) => (
                  <VideoDiaryCard video={video} key={video.id} />
                ))}
              </div>
            ) : (
              <div className="mt-16 text-center">
                <p className="text-[16px] text-eri-grey-11">
                  No videos match your search. Try another category or keyword.
                </p>
              </div>
            )}

            {/* Load More Videos Button */}
            {canLoadMore && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + LOAD_MORE_STEP, filteredVideos.length),
                    )
                  }
                  className="rounded-full border border-eri-dark/70 bg-eri-white px-7 py-2.5 font-display text-[13px] font-medium text-eri-dark transition-all hover:bg-eri-grey-3 hover:border-eri-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-dark"
                >
                  Load More Videos
                </button>
              </div>
            )}
          </section>
        </Container>
      </main>
    </div>
  );
}
