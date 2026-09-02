import type { Metadata } from "next";

import { InsightsPageContent } from "@/components/insights/insights-page-content";
import { FaqSection } from "@/components/home/faq-section";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field observations, consumer signals, and strategic perspective from Eri field teams deployed across informal and formal retail markets in Nigeria.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights | Eri",
    description:
      "Field observations, consumer signals, and strategic perspective from Eri field teams across Nigeria.",
    url: "/insights",
  },
};

export default function Page() {
  return (
    <>
      <InsightsPageContent />
      <FaqSection />
      <ReachUsSection />
    </>
  );
}
