import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page-content";
import { FaqSection } from "@/components/home/faq-section";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Eri exists because the most important things about a market in Nigeria are not written down anywhere, and someone has to go and see them. Meet our team and discover our field network.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Eri",
    description:
      "Eri exists because the most important things about a market in Nigeria are not written down anywhere, and someone has to go and see them.",
    url: "/about",
  },
};

export default function Page() {
  return (
    <>
      <AboutPageContent />
      <FaqSection />
      <ReachUsSection />
    </>
  );
}
