import type { Metadata } from "next";

import { InsightsPageContent } from "@/components/insights/insights-page-content";
import { FaqSection } from "@/components/home/faq-section";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field observations, consumer signals, and perspective from Eri teams across Nigeria.",
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
