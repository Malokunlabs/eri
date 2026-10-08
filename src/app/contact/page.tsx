import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { ReachUsSection } from "@/components/home/reach-us-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eri. Tell us about your project or research question, and find out how our field teams can uncover verified ground truth for your brand.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Eri",
    description:
      "Tell us about your next project and find out how Eri can bring verified ground truth to your team.",
    url: "/contact",
  },
};

export default function Page() {
  return (
    <>
      <ContactPage />
      <ReachUsSection />
    </>
  );
}
