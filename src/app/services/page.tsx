import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/services/services-page-content";
import { CoreServicesSection } from "@/components/services/core-services-section";
import { BrandsSection } from "@/components/home/brands-section";
import { AudienceSection } from "@/components/home/audience-section";

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
      <ServicesPageContent />
      <AudienceSection />
      <CoreServicesSection />
      <BrandsSection />
    </>
  );
}
