export const insightCategories = [
  "All",
  "Perspective",
  "Day in the Life",
  "Consumer Signals",
  "Field Notes",
  "Behind the Work",
] as const;

export type InsightCategory = Exclude<
  (typeof insightCategories)[number],
  "All"
>;

export type Insight = {
  image: string;
  tag: InsightCategory;
  title: string;
  date: string;
};

export const insights: Insight[] = [
  {
    image: "/images/insights-section/man-on-suit.png",
    tag: "Field Notes",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    date: "May 22, 2026",
  },
  {
    image: "/images/insights-section/two-girls.png",
    tag: "Day in the Life",
    title: "The Rise of Sustainable Fashion: Consumer Expectations in 2026",
    date: "March 10, 2026",
  },
  {
    image: "/images/insights-section/man-on-table.png",
    tag: "Consumer Signals",
    title: "Navigating the New Normal: Retail Insights Post-Pandemic",
    date: "January 5, 2026",
  },
  {
    image: "/images/insights-section/girl-on-desk.png",
    tag: "Field Notes",
    title: "E-commerce Strategies for Success in Nigeria’s Digital Market",
    date: "February 15, 2026",
  },
  {
    image: "/images/insights-section/girl-on-yellow.png",
    tag: "Perspective",
    title: "What Nigeria’s Next Generation Expects from Everyday Brands",
    date: "April 8, 2026",
  },
  {
    image: "/images/insights-section/girl-on-blue.png",
    tag: "Day in the Life",
    title: "How Young Nigerians Are Redefining Modern Convenience",
    date: "June 2, 2026",
  },
];
