export const insightCategories = [
  "All",
  "Perspective",
  "Day in the Life",
  "Consumer Signals",
  "Field Notes",
  "Behind the Work",
] as const;

export type InsightCategory = string;

export type InsightSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Insight = {
  slug: string;
  image: string;
  tag: InsightCategory;
  title: string;
  date: string;
  author: string;
  readTime: string;
  intro: string[];
  sections: InsightSection[];
};

export const insights: Insight[] = [];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((item) => item.slug === slug);
}
