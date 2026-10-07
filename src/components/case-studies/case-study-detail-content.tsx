"use client";

import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { getCaseStudyLogo, type CaseStudy } from "@/lib/case-studies-data";

type CaseStudyDetailContentProps = {
  study: CaseStudy;
};

function formatCaseStudyBody(html: string): string {
  if (!html) return "";
  let clean = html.replace(/\r\n|\r/g, "\n");

  // Fix <h2> containing long intro text + <br><br> + heading
  clean = clean.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (match, inner) => {
    if (inner.includes("<br")) {
      const parts = inner
        .split(/<br\s*\/?>/gi)
        .map((s: string) => s.trim())
        .filter(Boolean);
      if (parts.length > 1) {
        const heading = parts.pop();
        const intro = parts.join("<br>");
        return `<p>${intro}</p><h2>${heading}</h2>`;
      }
    }
    return match;
  });

  // Convert standalone bold paragraphs <p><strong>Heading</strong></p> to <h2>
  clean = clean.replace(
    /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi,
    (match, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (text.length > 0 && text.length < 120) {
        return `<h2>${text}</h2>`;
      }
      return match;
    },
  );

  // Convert short standalone paragraph lines without sentence endings (< 80 chars) to <h2>
  clean = clean.replace(/<p[^>]*>([^<]+)<\/p>/gi, (match, inner) => {
    const text = inner.trim();
    if (
      text.length > 3 &&
      text.length < 80 &&
      !/[.!?]$/.test(text) &&
      !text.includes(". ")
    ) {
      return `<h2>${text}</h2>`;
    }
    return match;
  });

  return clean;
}

export function CaseStudyDetailContent({ study }: CaseStudyDetailContentProps) {
  const logoSrc = getCaseStudyLogo(study);

  return (
    <div className="min-h-screen bg-eri-white">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-20 pt-8 sm:pt-12 lg:pb-32 lg:pt-14">
        <Container size="insights">
          {/* Breadcrumb / Back link */}
          <div className="mb-8 lg:mb-12">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 font-display text-[14px] font-medium text-eri-grey-11 transition-colors hover:text-eri-dark"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 rotate-180"
                fill="none"
              >
                <path
                  d="M5 12h14m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              Back to Case Studies
            </Link>
          </div>

          {/* Centered Folder Graphic Card */}
          <div className="mx-auto flex justify-center">
            <div className="relative aspect-[244/232] w-full max-w-[300px] transition-transform duration-200 hover:-translate-y-1 sm:max-w-[340px]">
              <Image
                src={study.folder}
                alt={study.company}
                fill
                priority
                sizes="(max-width: 639px) 300px, 340px"
                className="object-contain drop-shadow-md"
              />

              {/* Brand logo placed inside the folder paper slot, replacing baked-in logo */}
              <div className="pointer-events-none absolute left-[12.3%] top-[19.4%] flex size-[9.8%] items-center justify-center overflow-hidden rounded-full border border-[#E3E1DD] bg-white shadow-xs">
                {logoSrc ? (
                  <div className="relative size-full overflow-hidden rounded-full">
                    <Image
                      src={logoSrc}
                      alt=""
                      fill
                      sizes="32px"
                      className="size-full rounded-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <span className="font-display text-[10px] font-bold text-eri-dark">
                    {study.company.charAt(0)}
                  </span>
                )}
              </div>

              <div className="pointer-events-none absolute inset-x-[8.5%] bottom-[8%] text-eri-white sm:bottom-[9%]">
                <h2 className="font-display text-[clamp(17px,4.5vw,23px)] font-semibold leading-tight tracking-[-0.01em]">
                  {study.company}
                </h2>
                {study.description ? (
                  <p className="mt-1.5 line-clamp-2 max-w-[220px] text-[clamp(9.5px,2vw,12px)] leading-[1.4] text-white/95 sm:mt-2">
                    {study.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Article Header & Body */}
          <article className="mx-auto mt-16 max-w-[720px] sm:mt-24 lg:mt-28">
            <header className="text-left">
              <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] text-eri-dark sm:text-[44px] lg:text-[52px]">
                {study.title || study.company}
              </h1>

              {(study.date || study.author || study.readTime) && (
                <div className="mt-3.5 flex flex-wrap items-center gap-2 font-sans text-[14px] text-eri-grey-11 sm:mt-4 sm:text-[15px]">
                  {study.date && <time>{study.date}</time>}
                  {study.date && study.author && (
                    <span className="text-eri-grey-7" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {study.author && <span>By {study.author}</span>}
                  {(study.date || study.author) && study.readTime && (
                    <span className="text-eri-grey-7" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {study.readTime && <span>{study.readTime}</span>}
                </div>
              )}
            </header>

            {/* Content Body */}
            <div className="mt-8 space-y-6 text-justify [text-align:justify] [text-justify:inter-word] text-[15px] leading-[1.8] text-eri-dark sm:mt-10 sm:text-[16px] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:block [&_h2]:font-sans [&_h2]:text-[20px] [&_h2]:font-bold sm:[&_h2]:text-[24px] lg:[&_h2]:text-[26px] [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.015em] [&_h2]:text-eri-dark [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:block [&_h3]:font-sans [&_h3]:text-[18px] [&_h3]:font-bold sm:[&_h3]:text-[21px] [&_h3]:leading-[1.3] [&_h3]:tracking-[-0.01em] [&_h3]:text-eri-dark [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:block [&_h4]:font-sans [&_h4]:text-[16px] [&_h4]:font-bold sm:[&_h4]:text-[18px] [&_h4]:leading-[1.3] [&_h4]:text-eri-dark [&_strong]:font-bold [&_strong]:text-eri-dark [&_b]:font-bold [&_b]:text-eri-dark [&_p]:leading-[1.8] [&_p]:text-eri-dark [&_p:has(>strong:only-child)]:mt-8 [&_p:has(>strong:only-child)]:mb-3 [&_p:has(>strong:only-child)]:font-bold [&_p:has(>strong:only-child)]:text-[20px] sm:[&_p:has(>strong:only-child)]:text-[22px]">
              {study.body ? (
                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: formatCaseStudyBody(study.body),
                  }}
                />
              ) : study.paragraphs && study.paragraphs.length > 0 ? (
                study.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : study.description ? (
                <p>{study.description}</p>
              ) : null}
            </div>
          </article>
        </Container>
      </main>
    </div>
  );
}
