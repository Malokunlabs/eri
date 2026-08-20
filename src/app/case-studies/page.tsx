import type { Metadata } from "next";

import { CaseStudiesPageContent } from "@/components/case-studies/case-studies-page-content";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Every brand we work with asks a different question, and every project gets built around that question.",
};

export default function Page() {
  return (
    <>
      <CaseStudiesPageContent />
      <ReachUsSection />
    </>
  );
}
