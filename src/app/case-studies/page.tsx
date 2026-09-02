import type { Metadata } from "next";

import { CaseStudiesPageContent } from "@/components/case-studies/case-studies-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how leading brands partner with Eri to prove what spreadsheets cannot. Real stories of user verification, retail audits, and ground-level intelligence.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Eri",
    description:
      "Explore how leading brands partner with Eri to prove what spreadsheets cannot. Real stories of user verification, retail audits, and ground-level intelligence.",
    url: "/case-studies",
  },
};

export default function Page() {
  return (
    <>
      <CaseStudiesPageContent />
      <ReachUsSection />
    </>
  );
}
