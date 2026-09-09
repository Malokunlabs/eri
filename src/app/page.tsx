import type { Metadata } from "next";

import { AudienceSection } from "@/components/home/audience-section";
import { BrandsSection } from "@/components/home/brands-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { InsightsSection } from "@/components/home/insights-section";
import { ReachUsSection } from "@/components/home/reach-us-section";
import { ReportsSection } from "@/components/home/reports-section";
import { VideoDiariesSection } from "@/components/home/video-diaries-section";
import { WorkDoneSection } from "@/components/home/work-done-section";

export const metadata: Metadata = {
  title:
    "Eri — Ground-Level Field Intelligence & Market Research Across Nigeria",
  description:
    "We go to the places our clients can't be, and report back verified ground truth. Field interviews, retail store audits, consumer evidence, and trade spend tracking across Nigeria.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Eri — Ground-Level Field Intelligence & Market Research Across Nigeria",
    description:
      "We go to the places our clients can't be, and report back verified ground truth across Nigeria.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <BrandsSection />
      <WorkDoneSection />
      <AudienceSection />
      <ReportsSection />
      <VideoDiariesSection />
      <InsightsSection />
      <FaqSection />
      <ReachUsSection />
    </main>
  );
}
