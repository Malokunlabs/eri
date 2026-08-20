import type { Metadata } from "next";

import { VideoDiariesPageContent } from "@/components/video-diaries/video-diaries-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Video Diaries",
  description:
    "Vox pops, interviews and field footage from our people across Nigeria, filmed while they work, and published as we get it.",
};

export default function Page() {
  return (
    <>
      <VideoDiariesPageContent />
      <ReachUsSection />
    </>
  );
}
