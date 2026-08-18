import type { Metadata } from "next";

import { VideoDiariesPage } from "@/components/video-diaries/video-diaries-page";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Video Diaries",
  description:
    "Tell us about your next project and learn how Eri video diaries can bring ground truth to your team.",
};

export default function Page() {
  return (
    <>
      <VideoDiariesPage />
      <ReachUsSection />
    </>
  );
}
