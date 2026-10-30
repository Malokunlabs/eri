import type { Metadata } from "next";

import { AudienceSection } from "@/components/home/audience-section";
import { BrandsSection } from "@/components/home/brands-section";
import { CaseStudySpotlightSection } from "@/components/home/case-study-spotlight-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { InsightsSection } from "@/components/home/insights-section";
import { ReachUsSection } from "@/components/home/reach-us-section";
import { ReportsSection } from "@/components/home/reports-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { VideoDiariesSection } from "@/components/home/video-diaries-section";
import { WorkDoneSection } from "@/components/home/work-done-section";

import {
  getStudioCaseStudies,
  getStudioInsights,
  getStudioVideoDiaries,
} from "@/lib/content-api";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Eri — Ground-Level Field Intelligence & Market Research Across Nigeria and the world",
  description:
    "We go to the places our clients can't be, and report back verified ground truth. Field interviews, retail store audits, consumer evidence, and trade spend tracking across Nigeria.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Eri — Ground-Level Field Intelligence & Market Research Across Nigeria and the world",
    description:
      "We go to the places our clients can't be, and report back verified ground truth across Nigeria.",
    url: "/",
  },
};

export default async function Home() {
  const [insights, videoDiaries, caseStudies] = await Promise.all([
    getStudioInsights("eri"),
    getStudioVideoDiaries("eri"),
    getStudioCaseStudies("eri"),
  ]);

  // Landing rail order: pin these four insights first, always in this order.
  // Matching is lenient (substring on normalized title or slug) so small
  // CMS wording/punctuation differences can't break the pin.
  // Full archive order on /insights is untouched.
  const pinnedPhrases = [
    "uber left us without closure",
    "everyone has tasted creamer",
    "what is good for the goose is good for the writer",
    "can we really touch grass",
  ];
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const pinned = pinnedPhrases.flatMap((phrase) => {
    const match = insights.find((insight) => {
      const title = normalize(insight.title);
      const slug = normalize(insight.slug).replace(/-/g, " ");
      return title.includes(phrase) || slug.includes(phrase);
    });
    if (!match) {
      console.warn(`[Home] Pinned insight not found: "${phrase}"`);
    }
    return match ? [match] : [];
  });
  const pinnedSlugs = new Set(pinned.map((insight) => insight.slug));
  const orderedInsights = [
    ...pinned,
    ...insights.filter((insight) => !pinnedSlugs.has(insight.slug)),
  ];

  const spotlightStudy = caseStudies.find((study) =>
    study.slug?.toLowerCase().includes("informal-market-survey"),
  );

  return (
    <main id="main-content">
      <HeroSection />
      <BrandsSection />
      <WorkDoneSection
        caseStudies={caseStudies}
        video={
          videoDiaries.find((v) => v.featured) ||
          videoDiaries.find((v) =>
            v.title?.toLowerCase().includes("body that sells"),
          ) ||
          videoDiaries.find((v) => v.title?.toLowerCase().includes("danfo")) ||
          videoDiaries[0]
        }
      />
      <AudienceSection />
      <TestimonialsSection />
      <CaseStudySpotlightSection study={spotlightStudy} />
      {/* <ReportsSection /> */}
      <VideoDiariesSection videos={videoDiaries} />
      <InsightsSection insights={orderedInsights} />
      <FaqSection />
      <ReachUsSection />
    </main>
  );
}
