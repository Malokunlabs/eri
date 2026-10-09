"use client";

import Image from "next/image";
import { useState } from "react";

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

export function WorkDoneVideo({ video }: { video: VideoDiary }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl =
    getYouTubeEmbedUrl(video.videoEmbedUrl) ||
    getYouTubeEmbedUrl(video.youtubeUrl);

  const thumbnail =
    video.videoThumbnail ||
    video.image ||
    "https://img.youtube.com/vi/hNY1f4MbLqQ/hqdefault.jpg";

  if (isPlaying && embedUrl) {
    return (
      <div className="relative mt-8 aspect-[487/267] w-full overflow-hidden rounded-[18px] bg-black shadow-[0_8px_24px_rgba(41,41,41,0.08)]">
        <iframe
          src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
        <button
          type="button"
          onClick={() => setIsPlaying(false)}
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
      </div>
    );
  }

  return (
    <div className="group relative mt-8 aspect-[487/267] w-full overflow-hidden rounded-[18px] bg-eri-grey-3 shadow-[0_8px_24px_rgba(41,41,41,0.08)]">
      <Image
        src={thumbnail}
        alt={video.title || "Video diary"}
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Centered Play Button */}
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`Play video: ${video.title || "video diary"}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-white/40 shadow-md backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/60 sm:size-14">
          <svg
            className="size-5 translate-x-0.5 fill-white text-white drop-shadow-xs sm:size-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      {/* Video title overlay */}
      {video.title && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3.5 sm:p-4.5">
          <p className="font-display text-[13px] font-semibold text-white drop-shadow-xs sm:text-[15px]">
            {video.title}
          </p>
        </div>
      )}
    </div>
  );
}
