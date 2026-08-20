import type { Metadata } from "next";

import { ReportsPageContent } from "@/components/reports/reports-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Eri publishes its own field research, gathered by our people in markets and stores across Nigeria, and every report is free to read.",
};

export default function Page() {
  return (
    <>
      <ReportsPageContent />
      <ReachUsSection />
    </>
  );
}
