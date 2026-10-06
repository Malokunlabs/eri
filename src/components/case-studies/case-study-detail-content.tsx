"use client";

import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { getCaseStudyLogo, type CaseStudy } from "@/lib/case-studies-data";

type CaseStudyDetailContentProps = {
  study: CaseStudy;
};

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
                  <div className="relative size-full">
                    <Image
                      src={logoSrc}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-contain p-0.5"
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

            {/* Content Paragraphs */}
            <div className="mt-8 space-y-6 text-justify [text-align:justify] [text-justify:inter-word] text-[15px] leading-[1.8] text-eri-dark sm:mt-10 sm:text-[16px]">
              {study.paragraphs && study.paragraphs.length > 0 ? (
                study.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : study.body ? (
                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{ __html: study.body }}
                />
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
