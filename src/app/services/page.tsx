import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { CoreServicesSection } from "@/components/services/core-services-section";
import { SolutionBundleSection } from "@/components/services/solution-bundle-section";
import { BrandsSection } from "@/components/home/brands-section";
import { FaqSection } from "@/components/home/faq-section";
import { ReachUsSection } from "@/components/home/reach-us-section";

// Replaced component imports:
// import { ServicesPageContent } from "@/components/services/services-page-content";
// import { AudienceSection } from "@/components/home/audience-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Transform your market research with boots on the ground. Eri deploys field teams into stores, markets, and communities across Nigeria to report verified evidence.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Eri",
    description:
      "Transform your market research with boots on the ground. Eri deploys field teams into stores, markets, and communities across Nigeria to report verified evidence.",
    url: "/services",
  },
};

export default function Page() {
  return (
    <>
      <SiteHeader variant="light" />

      {/* Sections replaced in the updated service page layout:
      <ServicesPageContent />
      <AudienceSection />
      */}

      <main id="main-content">
        <CoreServicesSection />
        <SolutionBundleSection />
        <BrandsSection className="mt-8 sm:mt-12 lg:mt-18" />
        <FaqSection />
        <ReachUsSection
          title="Need a custom solution that combines multiple services?"
          ctaText="Get in touch"
          ctaHref="/contact"
        />
      </main>

      {/* Original ReachUsSection replaced with customized version above:
      <ReachUsSection />
      */}
    </>
  );
}
