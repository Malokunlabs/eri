import type { Metadata } from "next";

import { VideoDiariesPageContent } from "@/components/video-diaries/video-diaries-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Video Diaries",
  description:
    "Vox pops, authentic consumer interviews, and raw field footage recorded by Eri teams while investigating markets across Nigeria.",
  alternates: {
    canonical: "/video-diaries",
  },
  openGraph: {
    title: "Video Diaries | Eri",
    description:
      "Vox pops, consumer interviews, and field footage from our people across Nigeria, filmed while they work.",
    url: "/video-diaries",
  },
};

export default function Page() {
  return (
    <>
      <VideoDiariesPageContent />
      <ReachUsSection />
    </>
  );
}
