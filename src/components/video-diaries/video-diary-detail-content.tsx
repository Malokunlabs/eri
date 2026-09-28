"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import type { VideoDiary } from "@/lib/video-diaries-data";
import { VideoDiaryCard } from "@/components/video-diaries/video-diaries-page-content";

type VideoDiaryDetailContentProps = {
  video: VideoDiary;
  relatedVideos?: VideoDiary[];
};

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;

  // Handles standard youtube.com/watch?v=ID and youtu.be/ID
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // fallback string regex
    const match = url.match(/(?:youtu\.be\/|watch\?v=)([\w-]+)/);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url;
}

export function VideoDiaryDetailContent({
  video,
  relatedVideos = [],
}: VideoDiaryDetailContentProps) {
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const isPlaying = playingSlug === video.slug;

  const embedUrl = useMemo(() => {
    return (
      getYouTubeEmbedUrl(video.videoEmbedUrl) ||
      getYouTubeEmbedUrl(video.youtubeUrl)
    );
  }, [video.videoEmbedUrl, video.youtubeUrl]);

  const moreVideos = useMemo(() => {
    const seen = new Set<string>([video.slug, video.id]);
    const list: VideoDiary[] = [];
    for (const item of relatedVideos) {
      if (!seen.has(item.slug) && !seen.has(item.id)) {
        seen.add(item.slug);
        seen.add(item.id);
        list.push(item);
      }
      if (list.length >= 3) break;
    }
    return list;
  }, [relatedVideos, video.slug, video.id]);

  return (
    <div className="min-h-screen bg-eri-white">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-16 pt-6 sm:pt-8 lg:pb-24 lg:pt-10">
        <Container size="insights">
          {/* Featured Video Player Area */}
          <section aria-label="Featured Video">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-black shadow-[0_8px_30px_rgba(41,41,41,0.08)] sm:rounded-[24px] lg:aspect-[16/9]">
              {isPlaying && embedUrl ? (
                <iframe
                  src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <div className="group relative size-full cursor-pointer">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 1096px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPlayingSlug(video.slug)}
                    aria-label={`Play video: ${video.title}`}
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full bg-white/40 shadow-md backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/60 sm:size-20">
                      <svg
                        className="size-6 translate-x-0.5 fill-white text-white drop-shadow-sm sm:size-8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Video Title and Author Badge */}
            <div className="mt-5 flex items-start gap-3 sm:mt-6 sm:gap-3.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DF5927] text-white shadow-xs sm:size-9">
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
                <h1 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.015em] text-eri-dark sm:text-[24px] lg:text-[28px]">
                  {video.title}
                </h1>
                <p className="mt-1 text-[13px] leading-tight text-eri-grey-11 sm:text-[14px]">
                  {video.brand} &bull; {video.date}
                </p>
              </div>
            </div>

            {/* Excerpt or body if present */}
            {video.body && (
              <div
                className="mt-6 text-[15px] leading-relaxed text-eri-dark sm:text-[16px]"
                dangerouslySetInnerHTML={{ __html: video.body }}
              />
            )}
          </section>

          {/* More like this Section */}
          {moreVideos.length > 0 && (
            <section
              aria-labelledby="more-like-this-heading"
              className="mt-14 sm:mt-18 lg:mt-22"
            >
              <h2
                id="more-like-this-heading"
                className="font-display text-[22px] font-semibold leading-tight tracking-[-0.015em] text-eri-dark sm:text-[26px]"
              >
                More like this
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-9">
                {moreVideos.map((item) => (
                  <VideoDiaryCard video={item} key={item.id} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
    </div>
  );
}
