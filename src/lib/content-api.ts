import type { Insight, InsightSection } from "@/lib/insights-data";
import {
  type VideoDiary,
} from "@/lib/video-diaries-data";
import {
  type CaseStudy,
  type CaseStudySection,
} from "@/lib/case-studies-data";

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
  youtubeUrl?: string | null;
  videoEmbedUrl?: string | null;
  videoThumbnail?: string | null;
  mediaType?: string | null;
  description?: string;
  logo?: string | null;
};

export type FetchContentOptions = {
  space?: string;
  type?: string;
  slug?: string;
  id?: string;
  published?: boolean;
};

// In-memory cache & in-flight promise deduplication to mitigate concurrent DNS spikes
const inFlightRequests = new Map<string, Promise<unknown>>();
const memoryCache = new Map<string, unknown>();

function isTransientNetworkError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const cause = (error as { cause?: { code?: string; errno?: number; message?: string } }).cause;
  const code = cause?.code || (error as { code?: string }).code;
  const message = (error as Error).message || cause?.message || "";
  return (
    code === "EAI_AGAIN" ||
    code === "ENOTFOUND" ||
    code === "ECONNRESET" ||
    code === "ETIMEDOUT" ||
    code === "UND_ERR_CONNECT_TIMEOUT" ||
    message.includes("fetch failed") ||
    message.includes("getaddrinfo")
  );
}

/**
 * Fetch raw content from the Studio content API with automatic retry for transient DNS/network errors,
 * request deduplication, and in-memory fallback.
 */
export async function fetchStudioContent<T = StudioDocument[]>(
  options: FetchContentOptions = {},
  retries = 2,
  backoffMs = 300,
): Promise<T> {
  const url = new URL(STUDIO_API_URL);

  if (options.space) url.searchParams.set("space", options.space);
  if (options.type) url.searchParams.set("type", options.type);
  if (options.slug) url.searchParams.set("slug", options.slug);
  if (options.id) url.searchParams.set("id", options.id);
  if (typeof options.published === "boolean") {
    url.searchParams.set("published", String(options.published));
  }

  const cacheKey = url.toString();

  // Deduplicate identical in-flight requests (e.g. concurrent calls in Promise.all)
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) as Promise<T>;
  }

  const fetchPromise = (async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          await new Promise((resolve) => setTimeout(resolve, backoffMs * attempt));
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

        const data = (await response.json()) as T;
        memoryCache.set(cacheKey, data);
        return data;
      } catch (error) {
        lastError = error;
        if (!isTransientNetworkError(error)) {
          throw error;
        }
      }
    }

    // If all retries failed due to network/DNS glitches, serve stale in-memory cache if available
    if (memoryCache.has(cacheKey)) {
      console.warn(
        `[Studio API] Network/DNS resolution failed for ${cacheKey}. Serving stale cached data.`,
      );
      return memoryCache.get(cacheKey) as T;
    }

    throw lastError;
  })().finally(() => {
    inFlightRequests.delete(cacheKey);
  });

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise as Promise<T>;
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

  const cleanHtml = joinContinuationLines(
    normalizeCmsHtml(rawHtml.replace(/\r\n|\r/g, "\n")),
  );

  // Normalize headings: <h[2-4]> or paragraph containing only bold/strong text (<p><strong>Heading</strong></p>)
  const strongParagraphRegex =
    /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi;

  let normalizedHtml = cleanHtml;
  // If no explicit h2/h3 tags exist but standalone bold paragraphs exist, treat them as h2 headings.
  // Guard the same way as the case-study parser: skip numeric/stat lines and
  // wrapped sentence fragments ("...toward", "...and"), which are body copy.
  const fragmentEnd =
    /\b(and|or|toward|towards|of|in|on|for|with|to|from|as|at|by|into|among|between|including|&)$/i;
  if (
    !/<h[2-4][^>]*>/i.test(cleanHtml) &&
    strongParagraphRegex.test(cleanHtml)
  ) {
    normalizedHtml = cleanHtml.replace(
      /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi,
      (match, p1) => {
        if (/<a[\s>]/i.test(p1)) return match;
        const text = cleanTextField(p1);
        if (
          text.length > 0 &&
          text.length < 120 &&
          /[A-Za-z]/.test(text) &&
          !/^\d/.test(text) &&
          !fragmentEnd.test(text)
        ) {
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
      const heading = cleanTextField(parts[i] || "");
      const bodyPart = parts[i + 1] || "";
      const paragraphs = extractParagraphs(bodyPart);

      if (heading) {
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

/**
 * Parses Case Study HTML content, normalizing headings and splitting into intro and sections.
 */
export function parseCaseStudyHtml(rawHtml: string): {
  intro: string[];
  sections: CaseStudySection[];
} {
  if (!rawHtml || typeof rawHtml !== "string") {
    return { intro: [], sections: [] };
  }

  let clean = joinContinuationLines(
    normalizeCmsHtml(rawHtml.replace(/\r\n|\r/g, "\n")),
  );

  // Fix <h2>/<h3> containing long intro text + <br><br> + heading
  clean = clean.replace(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi, (match, inner) => {
    if (inner.includes("<br")) {
      const parts = inner
        .split(/<br\s*\/?>/gi)
        .map((s: string) => s.trim())
        .filter(Boolean);
      if (parts.length > 1) {
        const heading = parts.pop();
        const introText = parts.join("<br>");
        return `<p>${introText}</p><h2>${heading}</h2>`;
      }
    }
    return match;
  });

  // Only guess headings when the author used none. If the CMS body already
  // has real <h2>-<h4> structure (e.g. <h2>Target</h2>), trust it — inventing
  // headings from short lines is what split the "Cryptocurrency Adoption"
  // intro into phantom "This study investigated..." sections.
  const hasExplicitHeadings = /<h[2-4][^>]*>/i.test(clean);

  // A line ending in a preposition/conjunction ("toward", "and", ...) is a
  // wrapped fragment of the next line, not a heading.
  const fragmentEnd =
    /\b(and|or|toward|towards|of|in|on|for|with|to|from|as|at|by|into|among|between|including|&)$/i;

  if (!hasExplicitHeadings) {
    // Convert standalone bold paragraphs <p><strong>Heading</strong></p> to <h2>
    // Skip numeric/stat lines (e.g. "2250") so they stay body copy, not headings.
    clean = clean.replace(
      /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi,
      (match, inner) => {
        const text = cleanTextField(inner);
        if (
          text.length > 0 &&
          text.length < 120 &&
          /[A-Za-z]/.test(text) &&
          !/^\d/.test(text) &&
          !fragmentEnd.test(text)
        ) {
          return `<h2>${text}</h2>`;
        }
        return match;
      },
    );

    // Convert short standalone paragraph lines without sentence endings (< 80 chars) to <h2>
    // Skip numeric/stat lines (e.g. "2250") so body copy under a sub stays a paragraph.
    clean = clean.replace(/<p[^>]*>([^<]+)<\/p>/gi, (match, inner) => {
      const text = cleanTextField(inner);
      if (
        text.length > 3 &&
        text.length < 80 &&
        !/[.!?]$/.test(text) &&
        !text.includes(". ") &&
        /[A-Za-z]/.test(text) &&
        !/^\d/.test(text) &&
        !fragmentEnd.test(text)
      ) {
        return `<h2>${text}</h2>`;
      }
      return match;
    });
  }

  return parseHtmlContent(clean);
}

function decodeHtmlEntities(text: string): string {
  let decoded = text;
  // Run twice so double-escaped entities from the CMS (e.g. "&amp;nbsp;")
  // fully resolve to a space instead of leaving a literal "&nbsp;" behind.
  for (let pass = 0; pass < 2; pass++) {
    decoded = decoded
      .replace(/&nbsp;/gi, " ")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&#x([0-9a-f]+);/gi, (_match: string, hex: string) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
      .replace(/&#(\d+);/g, (_match: string, dec: string) =>
        String.fromCharCode(Number(dec)),
      )
      .replace(/&amp;/gi, "&");
  }
  return decoded.replace(/ /g, " ");
}

// Strip tags, decode entities ("&nbsp;" etc.), and collapse whitespace so
// CMS copy never leaks literal entity text into rendered paragraphs,
// headings, or meta descriptions. Also normalizes spacing around
// punctuation ("Port Harcourt , capturing" → "Port Harcourt, capturing",
// "premium,aspirational" → "premium, aspirational").
function cleanTextField(value: string): string {
  let text = decodeHtmlEntities(value.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
  // Remove space before closing punctuation: "word ," → "word,"
  text = text.replace(/\s+([,;:.!?%)\]}])/g, "$1");
  // Remove space after opening brackets: "( word" → "(word"
  text = text.replace(/([([{])\s+/g, "$1");
  // Ensure a space after comma/semicolon/colon when followed by a letter
  // (skips numbers like "12,000" and times like "10:30").
  text = text.replace(/([,;:])(?=[A-Za-z(])/g, "$1 ");
  return text.replace(/\s{2,}/g, " ").trim();
}

// Collapse double-escaped entities from the CMS ("&amp;nbsp;") back to a
// single-escaped form ("&nbsp;") so browsers render them instead of showing
// the literal "&nbsp;" text seen in raw-HTML slots (dangerouslySetInnerHTML,
// meta descriptions).
function normalizeCmsHtml(value: string): string {
  return value.replace(
    /&amp;((?:nbsp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/gi,
    "&$1",
  );
}

// Join soft-wrapped CMS lines: some CMS bodies emit every visual line as its
// own <p>, which renders as gappy one-line paragraphs. The Studio blog view
// renders those same breaks as soft line-wraps inside one paragraph, so the
// site should too. Join a boundary when:
//   - the next block starts lowercase (wrapped continuation), or
//   - the previous block ends mid-sentence (no terminal . ! ? … or colon).
// A real paragraph break ends with terminal punctuation AND starts the next
// block capitalized — only that combination is kept as a split.
function joinContinuationLines(html: string): string {
  return html.replace(
    /<\/(?:p|div)>\s*<(?:p|div)[^>]*>\s*/g,
    (boundary, offset: number, full: string) => {
      const before = full
        .slice(0, offset)
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;| /gi, " ")
        .trimEnd();
      const afterRaw = full
        .slice(offset + boundary.length)
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;| /gi, " ")
        .trimStart();
      const lastChar = before.slice(-1);
      const nextChar = afterRaw.charAt(0) || "";
      const endsSentence = /[.!?…:]$/.test(lastChar);
      const nextIsLower = /^[a-zà-öø-ÿ]/.test(nextChar);
      const nextIsUpper = /^[A-ZÀ-ÖØ-Þ]/.test(nextChar);
      // Keep the break only for a true paragraph boundary: sentence ends
      // AND the next block starts capitalized ("...contexts.</p><p>We...").
      if (endsSentence && nextIsUpper) return boundary;
      // Also keep it when a closing quote/paren ends the sentence and the
      // next block starts capitalized ("...expression."</p><p>Particular...).
      if (/["'”’)\]}]$/.test(before.slice(-2)) && nextIsUpper) return boundary;
      // Otherwise it's a wrapped continuation — join with a space.
      void nextIsLower;
      return " ";
    },
  );
}

function extractParagraphs(htmlSnippet: string): string[] {
  // Join CMS soft-wraps first: every visual line as its own <p> renders as
  // gappy one-line paragraphs, so stitch continuations back into one block.
  // A single <br> inside a block is also a soft wrap — join it with a space.
  // Two or more consecutive <br>s are a real paragraph break, so keep those
  // as a split point alongside closing </p>/</div> tags.
  const joined = joinContinuationLines(htmlSnippet);
  const withParaBreaks = joined.replace(
    /<br\s*\/?>(?:\s*<br\s*\/?>\s*)+/gi,
    "</p><p>",
  );
  const raw = withParaBreaks
    .split(/<\/(?:p|div)>/i)
    .map((p) => cleanTextField(p.replace(/<br\s*\/?>/gi, " ")))
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
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
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

/**
 * Maps a raw Studio document to a VideoDiary data structure.
 */
export function mapStudioDocToVideoDiary(
  doc: StudioDocument,
  allDocs?: StudioDocument[],
): VideoDiary {
  let authorName = "Scout By Eri";
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

  let categoryTitle = "Vox Pops";
  if (doc.category && allDocs) {
    const matchingCat = allDocs.find(
      (d) =>
        (d.contentType === "video-diary-category" ||
          d.contentType === "category") &&
        (d.id === doc.category || d.slug === doc.category),
    );
    if (matchingCat) categoryTitle = matchingCat.title;
  } else if (doc.tags && doc.tags.length > 0) {
    const firstTag = doc.tags[0];
    categoryTitle =
      typeof firstTag === "object" && firstTag?.title
        ? firstTag.title
        : String(firstTag);
  }

  const image =
    doc.videoThumbnail ||
    doc.coverImage ||
    doc.featuredImage ||
    "/images/video-dairies/older-woman.png";

  return {
    id: doc.id,
    slug: doc.slug,
    image,
    category: categoryTitle,
    title: doc.title,
    brand: authorName,
    date: formatPublishDate(doc.publishDate || doc.createdAt),
    youtubeUrl: doc.youtubeUrl || undefined,
    videoEmbedUrl: doc.videoEmbedUrl || undefined,
    videoThumbnail: doc.videoThumbnail || undefined,
    author: authorName,
    excerpt: doc.excerpt ? cleanTextField(doc.excerpt) : "",
    body: doc.body ? normalizeCmsHtml(doc.body) : "",
    featured: doc.featured ?? false,
  };
}

/**
 * Fetch all video diaries under the specified space (default: 'eri') from the Studio API.
 */
export async function getStudioVideoDiaries(
  space = "eri",
): Promise<VideoDiary[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const videoDocs = docs.filter(
      (d) => d.status === "published" && d.contentType === "video-diary",
    );

    const seenSlugs = new Set<string>();
    const studioVideos: VideoDiary[] = [];

    for (const doc of videoDocs) {
      let slug = doc.slug?.trim() || "";
      if (!slug || seenSlugs.has(slug)) {
        const suffix = doc.id ? doc.id.slice(0, 8) : Math.random().toString(36).slice(2, 6);
        slug = slug ? `${slug}-${suffix}` : `video-${suffix}`;
      }
      seenSlugs.add(slug);

      const mapped = mapStudioDocToVideoDiary(doc, docs);
      mapped.slug = slug;
      studioVideos.push(mapped);
    }

    return studioVideos;
  } catch (error) {
    console.error("Failed to fetch video diaries from Studio API:", error);
    return [];
  }
}

/**
 * Fetch a single video diary by slug under the specified space (default: 'eri').
 */
export async function getStudioVideoDiaryBySlug(
  slug: string,
  space = "eri",
): Promise<VideoDiary | undefined> {
  try {
    const allVideos = await getStudioVideoDiaries(space);
    const videoMatch = allVideos.find(
      (v) =>
        v.slug === slug ||
        v.id === slug ||
        (v.id && slug.includes(v.id.slice(0, 8))),
    );
    if (videoMatch) {
      return videoMatch;
    }

    if (slug === "video" && allVideos.length > 0) {
      return allVideos[0];
    }

    return undefined;
  } catch (error) {
    console.error(`Failed to fetch video diary with slug '${slug}':`, error);
    return undefined;
  }
}

/**
 * Fetch all video categories under the specified space (default: 'eri') from the Studio API.
 */
export async function getStudioVideoCategories(
  space = "eri",
): Promise<string[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const categoryDocs = docs.filter(
      (d) =>
        (d.contentType === "video-diary-category" ||
          d.contentType === "category") &&
        d.status === "published",
    );
    const titles = categoryDocs.map((c) => c.title).filter(Boolean);
    if (titles.length > 0) {
      return Array.from(new Set(["All", ...titles]));
    }
    return ["All"];
  } catch (error) {
    console.error("Failed to fetch studio video categories:", error);
    return ["All"];
  }
}

/**
 * Maps a raw Studio document to a CaseStudy data structure.
 */
export function mapStudioDocToCaseStudy(
  doc: StudioDocument,
  allDocs?: StudioDocument[],
  index = 0,
): CaseStudy {
  const rawContent = doc.body || doc.excerpt || "";
  const { intro, sections } = parseCaseStudyHtml(rawContent);
  const paragraphs = intro.length > 0 ? intro : extractParagraphs(rawContent);

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

  let categoryName = "General";
  if (doc.category && allDocs) {
    const matchingCat = allDocs.find(
      (d) =>
        (d.contentType === "case-study-category" ||
          d.contentType === "category") &&
        (d.id === doc.category || d.slug === doc.category),
    );
    if (matchingCat) categoryName = matchingCat.title;
  } else if (doc.tags && doc.tags.length > 0) {
    const firstTag = doc.tags[0];
    categoryName =
      typeof firstTag === "object" && firstTag?.title
        ? firstTag.title
        : String(firstTag);
  }

  const folderImages = [
    "/images/small-folders/orange-folder.svg",
    "/images/small-folders/purple-file.svg",
    "/images/small-folders/orange-folder.svg",
    "/images/small-folders/purple-file.svg",
  ];
  const folder = folderImages[index % folderImages.length];

  const company = doc.title || "Case Study";
  const title = doc.title || "";
  const description = doc.description
    ? cleanTextField(doc.description)
    : doc.excerpt
      ? cleanTextField(doc.excerpt)
      : "";

  let readTimeStr: string | undefined = undefined;
  if (doc.readTime) {
    readTimeStr = `${doc.readTime}min read`;
  } else if (paragraphs.length > 0) {
    const wordCount = paragraphs.join(" ").split(/\s+/).length;
    readTimeStr = `${Math.max(1, Math.ceil(wordCount / 200))}min read`;
  }

  return {
    id: doc.id,
    company,
    title,
    slug: doc.slug,
    category: categoryName,
    folder,
    description,
    body: doc.body ? normalizeCmsHtml(doc.body) : "",
    paragraphs,
    intro,
    sections,
    date: formatPublishDate(doc.publishDate || doc.createdAt),
    author: authorName,
    readTime: readTimeStr,
    logo: doc.logo || doc.featuredImage || null,
  };
}

/**
 * Fetch all case studies under the specified space (default: 'eri') from the Studio API.
 */
export async function getStudioCaseStudies(
  space = "eri",
): Promise<CaseStudy[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const rawDocs = Array.isArray(docs) ? docs : [];
    const caseDocs = rawDocs.filter(
      (d) => d.status === "published" && d.contentType === "case-study",
    );

    return caseDocs.map((doc, idx) =>
      mapStudioDocToCaseStudy(doc, rawDocs, idx),
    );
  } catch (error) {
    console.error("Failed to fetch case studies from Studio API:", error);
    return [];
  }
}

/**
 * Fetch a single case study by slug under the specified space (default: 'eri').
 */
export async function getStudioCaseStudyBySlug(
  slug: string,
  space = "eri",
): Promise<CaseStudy | undefined> {
  try {
    const all = await getStudioCaseStudies(space);
    const match = all.find((cs) => cs.slug === slug || cs.id === slug);
    if (match) return match;

    const raw = await fetchStudioContent<StudioDocument | StudioDocument[]>({
      space,
      slug,
      type: "case-study",
    });
    const doc = Array.isArray(raw) ? raw[0] : raw;
    if (doc && doc.id) {
      const allDocs = await fetchStudioContent<StudioDocument[]>({ space });
      return mapStudioDocToCaseStudy(doc, Array.isArray(allDocs) ? allDocs : []);
    }

    return undefined;
  } catch (error) {
    console.error(`Failed to fetch case study '${slug}':`, error);
    return undefined;
  }
}

/**
 * Fetch all case study categories under the specified space (default: 'eri') from the Studio API.
 */
export async function getStudioCaseStudyCategories(
  space = "eri",
): Promise<string[]> {
  try {
    const docs = await fetchStudioContent<StudioDocument[]>({ space });
    const rawDocs = Array.isArray(docs) ? docs : [];
    const catDocs = rawDocs.filter(
      (d) =>
        (d.contentType === "case-study-category" ||
          d.contentType === "category") &&
        d.status === "published",
    );

    const apiTitles = catDocs.map((c) => c.title).filter(Boolean);
    const unique = Array.from(new Set(["All", ...apiTitles]));
    return unique;
  } catch (error) {
    console.error("Failed to fetch case study categories:", error);
    return ["All"];
  }
}
