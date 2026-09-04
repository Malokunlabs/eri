import type { Metadata } from "next";

import { ReportsPageContent } from "@/components/reports/reports-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Download and read Eri's proprietary field research reports. Comprehensive, on-the-ground studies of consumer behavior and market dynamics in Nigeria.",
  alternates: {
    canonical: "/reports",
  },
  openGraph: {
    title: "Reports | Eri",
    description:
      "Eri publishes its own field research, gathered by our people in markets and stores across Nigeria. Every report is free to read.",
    url: "/reports",
  },
};

export default function Page() {
  return (
    <>
      <ReportsPageContent />
      <ReachUsSection />
    </>
  );
}
