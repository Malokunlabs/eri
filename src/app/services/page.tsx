import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/services/services-page-content";
import { BrandsSection } from "@/components/home/brands-section";

export const metadata: Metadata = {
  title: "Services | ERI",
  description:
    "Transform your market research and brand activations. ERI sends field teams into stores, markets and streets across Nigeria and reports back what they saw.",
};

export default function Page() {
  return (
    <>
      <ServicesPageContent />
      <BrandsSection />
    </>
  );
}
