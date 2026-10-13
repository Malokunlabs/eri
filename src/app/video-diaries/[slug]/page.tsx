import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VideoDiaryDetailContent } from "@/components/video-diaries/video-diary-detail-content";
import {
  getStudioVideoDiaries,
  getStudioVideoDiaryBySlug,
} from "@/lib/content-api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const videos = await getStudioVideoDiaries("eri");
  return videos.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getStudioVideoDiaryBySlug(slug, "eri");

  if (!video) {
    return {
      title: "Video Diary Not Found",
    };
  }

  const description =
    video.excerpt ||
    `${video.title} - Ground-level footage and field interviews recorded by Eri teams across Nigeria.`;

  return {
    title: video.title,
    description,
    alternates: {
      canonical: `/video-diaries/${video.slug}`,
    },
    openGraph: {
      title: `${video.title} | Eri Video Diaries`,
      description,
      url: `/video-diaries/${video.slug}`,
      type: "article",
      publishedTime: (() => {
        const d = new Date(video.date);
        return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
      })(),
      images: [
        {
          url: video.image,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description,
      images: [video.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [video, allVideos] = await Promise.all([
    getStudioVideoDiaryBySlug(slug, "eri"),
    getStudioVideoDiaries("eri"),
  ]);

  if (!video) {
    notFound();
  }

  return (
    <VideoDiaryDetailContent
      key={video.slug}
      video={video}
      relatedVideos={allVideos}
    />
  );
}
