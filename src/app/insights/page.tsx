import type { Metadata } from "next";

import { InsightsPageContent } from "@/components/insights/insights-page-content";
import { FaqSection } from "@/components/home/faq-section";
import { ReachUsSection } from "@/components/home/reach-us-section";
import { getAllInsights, getStudioCategories } from "@/lib/content-api";

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

export default async function Page() {
  const [insights, categories] = await Promise.all([
    getAllInsights("eri"),
    getStudioCategories("eri"),
  ]);

  return (
    <>
      <InsightsPageContent
        initialInsights={insights}
        initialCategories={categories}
      />
      <FaqSection />
      <ReachUsSection />
    </>
  );
}
