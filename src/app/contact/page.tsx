import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your next project and find out how Eri can bring ground truth to your team.",
};

export default function Page() {
  return (
    <>
      <ContactPage />
      <ReachUsSection />
    </>
  );
}
