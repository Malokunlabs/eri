export const siteConfig = {
  name: "Eri",
  title: "Eri — Ground-Level Field Intelligence Across Nigeria",
  description:
    "Eri gathers verified ground truth across Nigeria through field teams, store audits, consumer interviews, and trade spend verification.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://useeri.africa",
  alternateUrls: ["https://useeri.com"],
  ogImage: "/images/about/folder.png",
  keywords: [
    "Eri",
    "useeri.africa",
    "useeri.com",
    "Field Intelligence Nigeria",
    "Market Research Nigeria",
    "Consumer Insights Africa",
    "Retail Audit Nigeria",
    "Boots on the Ground Research",
    "Field Surveys Lagos",
    "Trade Spend Verification",
    "Ground Truth Intelligence",
  ],
  authors: [
    {
      name: "Eri",
      url: "https://useeri.africa",
    },
  ],
  creator: "Eri",
  twitterHandle: "@useeri_africa",
  contact: {
    address: "97 Adeola Odeku Street, Victoria Island, Lagos",
    phoneDisplay: "+234 814 297 0965",
    phoneHref: "tel:+2348142970965",
    whatsappHref: "https://wa.me/2348142970965",
    email: "info@malokunlabs.com",
    emailHref: "mailto:info@malokunlabs.com",
    websiteLabel: "sales.malokunlabs.com",
    websiteHref: "https://sales.malokunlabs.com",
  },
} as const;

