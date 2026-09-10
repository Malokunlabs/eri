"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/container";

const categories = [
  "All",
  "Vox Pops",
  "Interviews",
  "Social Media",
  "Campaigns",
] as const;

type HomeVideoCategory = Exclude<(typeof categories)[number], "All">;

type HomeVideo = {
  image: string;
  category: HomeVideoCategory;
  title: string;
  brand: string;
  date: string;
};

const featuredVideo: HomeVideo = {
  image: "/images/video-dairies/older-woman.png",
  category: "Interviews",
  title: "Digital Trends Shaping the Future of Retail Experiences",
  brand: "Scout By Eri",
  date: "October 10, 2026",
};

const listVideos: HomeVideo[] = [
  {
    image: "/images/video-dairies/manonorange.png",
    category: "Vox Pops",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Moniepoint",
    date: "May 22, 2026",
  },
  {
    image: "/images/video-dairies/friendssitted.png",
    category: "Interviews",
    title: "Embracing the Power of Mobile Payment Solutions",
    brand: "Flutterwave",
    date: "August 15, 2026",
  },
  {
    image: "/images/video-dairies/manwithwheelbarrow.png",
    category: "Social Media",
    title: "Innovative E-commerce Models Revolutionizing Shopping",
    brand: "Jumia",
    date: "October 10, 2026",
  },
  {
    image: "/images/video-dairies/girlonglasses.png",
    category: "Campaigns",
    title: "The Rise of Smart Stores and Self-service tech in Urban Areas",
    brand: "Konga",
    date: "January 5, 2027",
  },
];

function PlayOverlay() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/60 sm:size-14">
        <svg
          className="size-5 translate-x-0.5 fill-white drop-shadow-xs sm:size-6"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

function BoxIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function ViewAllVideosLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/video-diaries"
      className={`eri-pill eri-pill--primary ${className}`}
    >
      View All Videos
    </Link>
  );
}

export function VideoDiariesSection() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const visibleVideos = useMemo(
    () =>
      listVideos.filter(
        (video) =>
          activeCategory === "All" || video.category === activeCategory,
      ),
    [activeCategory],
  );

  return (
    <section
      aria-labelledby="home-video-diaries-heading"
      className="bg-eri-white py-12 text-eri-dark lg:pb-20 lg:pt-8"
    >
      <Container size="insights">
        <div className="flex items-end justify-between gap-6 border-b border-eri-grey-6 pb-5">
          <h2
            id="home-video-diaries-heading"
            className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[40px] lg:text-[44px]"
          >
            Video Diaries
          </h2>
          <ViewAllVideosLink className="hidden lg:inline-flex" />
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
          <Link href="/video-diaries" className="group block min-w-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-eri-grey-3 shadow-[0_8px_24px_rgba(41,41,41,0.08)]">
              <Image
                src={featuredVideo.image}
                alt={featuredVideo.title}
                fill
                sizes="(max-width: 1023px) 100vw, 560px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <PlayOverlay />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DF5927] text-white shadow-xs">
                <BoxIcon />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.015em] transition-colors group-hover:text-eri-coral-dark sm:text-[20px] lg:text-[22px]">
                  {featuredVideo.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-tight text-eri-grey-11">
                  {featuredVideo.brand} &bull; {featuredVideo.date}
                </p>
              </div>
            </div>
          </Link>

          <div className="min-w-0">
            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border px-3.5 py-2 font-sans text-[13px] font-medium leading-none transition-colors ${
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

            <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:gap-7">
              {visibleVideos.length > 0 ? (
                visibleVideos.map((video) => (
                  <Link
                    key={`${video.category}-${video.title}`}
                    href="/video-diaries"
                    className="group flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="font-display text-[15px] font-semibold leading-[1.25] tracking-[-0.01em] text-eri-dark transition-colors group-hover:text-eri-coral-dark sm:text-[16px]">
                        {video.title}
                      </h3>
                      <p className="mt-1.5 text-[12px] leading-tight text-eri-grey-11">
                        {video.brand} &bull; {video.date}
                      </p>
                    </div>
                    <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-[12px] bg-eri-grey-3 shadow-[0_4px_14px_rgba(41,41,41,0.08)] sm:h-[80px] sm:w-[120px]">
                      <Image
                        src={video.image}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-[14px] text-eri-grey-11">
                  No videos in this category yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <ViewAllVideosLink className="mt-10 lg:hidden" />
      </Container>
    </section>
  );
}
