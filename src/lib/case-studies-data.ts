export const caseStudyCategories = [
  "All",
] as const;

export type CaseStudyCategory = (typeof caseStudyCategories)[number] | string;

export type CaseStudySection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type CaseStudy = {
  id: string;
  company: string;
  title?: string;
  category: string;
  folder: string;
  description: string;
  slug: string;
  date?: string;
  author?: string;
  readTime?: string;
  body?: string;
  paragraphs?: string[];
  intro?: string[];
  sections?: CaseStudySection[];
  logo?: string | null;
};

export function getCaseStudyLogo(study: CaseStudy): string | null {
  if (study.logo) return study.logo;

  const name = (study.company || "").toLowerCase();
  const slug = (study.slug || "").toLowerCase();

  if (name.includes("moniepoint") || slug.includes("moniepoint")) {
    return "/icons/brand-icon/moniepoint.svg";
  }
  if (name.includes("quidax") || slug.includes("quidax")) {
    return "/icons/brand-icon/Quidax.svg";
  }
  if (name.includes("martell") || slug.includes("martell")) {
    return "/icons/brand-icon/martell.svg";
  }
  if (name.includes("chicken") || slug.includes("chicken")) {
    return "/icons/brand-icon/Chicken_Republic.svg";
  }
  if (name.includes("alara") || slug.includes("alara")) {
    return "/icons/brand-icon/Alara.svg";
  }
  if (name.includes("kora") || slug.includes("kora")) {
    return "/icons/brand-icon/kora.svg";
  }
  if (name.includes("landmark") || slug.includes("landmark")) {
    return "/icons/brand-icon/Landmark.svg";
  }
  if (name.includes("showmax") || slug.includes("showmax")) {
    return "/icons/brand-icon/Showmax.svg";
  }
  if (name.includes("google") || slug.includes("google")) {
    return "/icons/brand-icon/Google.svg";
  }

  return null;
}

export const caseStudies: CaseStudy[] = [];
