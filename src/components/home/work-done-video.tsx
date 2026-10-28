"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { VideoDiary } from "@/lib/video-diaries-data";


function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;

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
    const match = url.match(/(?:youtu\.be\/|watch\?v=)([\w-]+)/);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url;
}

function getCleanYouTubeThumbnail(url?: string): string {
  if (!url) return "https://img.youtube.com/vi/hNY1f4MbLqQ/maxresdefault.jpg";
  if (url.includes("img.youtube.com/vi/") && url.includes("/hqdefault.jpg")) {
    return url.replace("/hqdefault.jpg", "/maxresdefault.jpg");
  }
  return url;
}

export function WorkDoneVideo({ video }: { video: VideoDiary }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayedRef = useRef(false);

  const embedUrl =
    getYouTubeEmbedUrl(video.videoEmbedUrl) ||
    getYouTubeEmbedUrl(video.youtubeUrl);

  const rawThumbnail =
    video.videoThumbnail ||
    video.image ||
    "https://img.youtube.com/vi/hNY1f4MbLqQ/maxresdefault.jpg";
  const thumbnail = getCleanYouTubeThumbnail(rawThumbnail);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !embedUrl || hasAutoPlayedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAutoPlayedRef.current) {
          hasAutoPlayedRef.current = true;
          setIsAutoplay(true);
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [embedUrl]);

  return (
    <div
      ref={containerRef}
      className={`relative mt-8 aspect-video w-full overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(41,41,41,0.08)] ${isPlaying ? "bg-black" : "group bg-eri-grey-3"}`}
    >
      {isPlaying && embedUrl ? (
        <>
          <iframe
            src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1${isAutoplay ? "&mute=1" : ""}&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full scale-[1.04] border-0"
          />
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setIsAutoplay(false);
            }}
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close video"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <Image
            src={thumbnail}
            alt={video.title || "Video diary"}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover scale-[1.05] transition-transform duration-300 group-hover:scale-[1.08]"
          />

          {/* Centered Play Button */}
          <button
            type="button"
            onClick={() => {
              setIsAutoplay(false);
              setIsPlaying(true);
            }}
            aria-label={`Play video: ${video.title || "video diary"}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/images/this-for/Play Button.png"
              alt=""
              width={56}
              height={56}
              className="size-11 drop-shadow-md transition-transform duration-200 group-hover:scale-110 sm:size-14"
            />
          </button>

          {/* Video title overlay */}
          {video.title && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 sm:p-4.5">
              <p className="font-display text-[13px] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] sm:text-[15px]">
                {video.title}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
