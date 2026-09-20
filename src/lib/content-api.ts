import type { Insight, InsightSection } from "@/lib/insights-data";

export const STUDIO_API_KEY =
  process.env.STUDIO_API_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY2N5bG11aGhpYmN2eXFtbnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NzE0MDAsImV4cCI6MjA4ODE0NzQwMH0.a00JqIazJvVqgq8CnTSaRSgLkPLJnK0PnLRRC4ky3Wk";

export const STUDIO_API_URL =
  "https://isccylmuhhibcvyqmntw.supabase.co/functions/v1/content-api";

export type StudioAuthor = {
  id?: string;
  title?: string;
  slug?: string;
  avatar?: string | null;
  bio?: string;
  role?: string;
};

export type StudioTag = {
  id: string;
  title: string;
  slug: string;
};

export type StudioDocument = {
  id: string;
  title: string;
  slug: string;
  status: string;
  space?: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
  publishDate?: string;
  author?: StudioAuthor | string;
  excerpt?: string;
  body?: string;
  readTime?: number;
  featured?: boolean;
  featuredImage?: string | null;
  coverImage?: string | null;
  tags?: StudioTag[];
  category?: string;
  sections?: Array<{
    id?: string;
    heading?: string;
    paragraphs?: string[];
  }>;
};

export type FetchContentOptions = {
  space?: string;
  type?: string;
  slug?: string;
  id?: string;
  published?: boolean;
};

/**
 * Fetch raw content from the Studio content API.
 */
export async function fetchStudioContent<T = StudioDocument[]>(
  options: FetchContentOptions = {},
): Promise<T> {
  const url = new URL(STUDIO_API_URL);

  if (options.space) url.searchParams.set("space", options.space);
  if (options.type) url.searchParams.set("type", options.type);
  if (options.slug) url.searchParams.set("slug", options.slug);
  if (options.id) url.searchParams.set("id", options.id);
  if (typeof options.published === "boolean") {
    url.searchParams.set("published", String(options.published));
  }

  const response = await fetch(url.toString(), {
    headers: {
      apikey: STUDIO_API_KEY,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Studio API error: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as T;
}

/**
 * Parses HTML content into introductory text and structured sections with headings.
 */
export function parseHtmlContent(rawHtml: string): {
  intro: string[];
  sections: InsightSection[];
} {
  if (!rawHtml || typeof rawHtml !== "string") {
    return { intro: [], sections: [] };
  }

  const cleanHtml = rawHtml.replace(/\r\n|\r/g, "\n");

  // Normalize headings: <h[2-4]> or paragraph containing only bold/strong text (<p><strong>Heading</strong></p>)
  const strongParagraphRegex =
    /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi;

  let normalizedHtml = cleanHtml;
  // If no explicit h2/h3 tags exist but standalone bold paragraphs exist, treat them as h2 headings
  if (
    !/<h[2-4][^>]*>/i.test(cleanHtml) &&
    strongParagraphRegex.test(cleanHtml)
  ) {
    normalizedHtml = cleanHtml.replace(
      /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi,
      (match, p1) => {
        const text = p1.replace(/<[^>]+>/g, "").trim();
        if (text.length > 0 && text.length < 120) {
          return `<h2>${text}</h2>`;
        }
        return match;
      },
    );
  }

  // Split by headings if present
  const hasHeadings = /<h[2-4][^>]*>/i.test(normalizedHtml);

  if (hasHeadings) {
    const parts = normalizedHtml.split(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi);
    // parts[0] is the content before the first heading (the intro)
    const introParagraphs = extractParagraphs(parts[0] || "");
    const sections: InsightSection[] = [];

    for (let i = 1; i < parts.length; i += 2) {
      const heading = (parts[i] || "").replace(/<[^>]+>/g, "").trim();
      const bodyPart = parts[i + 1] || "";
      const paragraphs = extractParagraphs(bodyPart);

      if (heading && paragraphs.length > 0) {
        sections.push({
          id: slugify(heading) || `section-${sections.length + 1}`,
          heading,
          paragraphs,
        });
      }
    }

    return {
      intro: introParagraphs,
      sections,
    };
  }

  // If no explicit headings, treat all paragraphs as intro/body content without inventing fake headings
  const allParagraphs = extractParagraphs(cleanHtml);

  return {
    intro: allParagraphs,
    sections: [],
  };
}

function extractParagraphs(htmlSnippet: string): string[] {
  const raw = htmlSnippet
    .split(/<\/(?:p|div)>|<br\s*\/?>/i)
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter((p) => p.length > 0);

  return raw.filter((p, index) => index === 0 || p !== raw[index - 1]);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

function formatPublishDate(dateStr?: string): string {
  if (!dateStr) return "March 20, 2026";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Maps a raw Studio document to the Eri Insight data structure.
 */
export function mapStudioDocToInsight(
  doc: StudioDocument,
  allDocs?: StudioDocument[],
): Insight {
  const content = doc.body || doc.excerpt || "";
  const { intro, sections } = parseHtmlContent(content);

  let authorName = "Eri Field Team";
  if (typeof doc.author === "object" && doc.author?.title) {
    authorName = doc.author.title;
  } else if (typeof doc.author === "string" && doc.author) {
    const matchingAuthor = allDocs?.find(
      (d) =>
        d.contentType === "author" &&
        (d.id === doc.author || d.slug === doc.author),
    );
    authorName = matchingAuthor ? matchingAuthor.title : doc.author;
  }

  let tagTitle = "Field Notes";
  if (doc.category && allDocs) {
    const matchingCat = allDocs.find(
      (d) =>
        d.contentType === "insight-category" &&
        (d.id === doc.category || d.slug === doc.category),
    );
    if (matchingCat) tagTitle = matchingCat.title;
  } else if (doc.tags && doc.tags.length > 0) {
    const firstTag = doc.tags[0];
    tagTitle =
      typeof firstTag === "object" && firstTag?.title
        ? firstTag.title
        : String(firstTag);
  }

  return {
    slug: doc.slug,
    image:
      doc.featuredImage ||
      doc.coverImage ||
      "/images/insights-section/man-on-suit.png",
    tag: tagTitle,
    title: doc.title,
    date: formatPublishDate(doc.publishDate || doc.createdAt),
    author: authorName,
    readTime: `${doc.readTime || 4}min read`,
    intro,
    sections,
  };
}

/**
 * Fetch all insights under the 'eri' space from the Studio API.
 */
export async function getStudioInsights(space = "eri"): Promise<Insight[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const insightDocs = docs.filter(
      (d) =>
        d.status === "published" &&
        (d.contentType === "insight" || d.contentType === "post"),
    );

    return insightDocs.map((d) => mapStudioDocToInsight(d, docs));
  } catch (error) {
    console.error("Failed to fetch insights from Studio API:", error);
    return [];
  }
}

/**
 * Fetch a single insight by slug under the 'eri' space.
 */
export async function getStudioInsightBySlug(
  slug: string,
  space = "eri",
): Promise<Insight | undefined> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const doc = docs.find(
      (d) =>
        d.slug === slug &&
        d.status === "published" &&
        (d.contentType === "insight" || d.contentType === "post"),
    );

    if (!doc) return undefined;

    return mapStudioDocToInsight(doc, docs);
  } catch (error) {
    console.error(`Failed to fetch insight with slug '${slug}':`, error);
    return undefined;
  }
}

/**
 * Fetch all categories under the 'eri' space from the Studio API.
 */
export async function getStudioCategories(space = "eri"): Promise<string[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const categoryDocs = docs.filter(
      (d) => d.contentType === "insight-category" && d.status === "published",
    );
    const titles = categoryDocs.map((c) => c.title).filter(Boolean);
    return Array.from(new Set(titles));
  } catch (error) {
    console.error("Failed to fetch studio categories:", error);
    return [];
  }
}

/**
 * Fetch all insights from the Studio API (space=eri).
 * Returns only the live posts from the API.
 */
export async function getAllInsights(space = "eri"): Promise<Insight[]> {
  return await getStudioInsights(space);
}
