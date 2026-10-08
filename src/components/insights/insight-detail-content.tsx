"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import type { Insight } from "@/lib/insights-data";

type InsightDetailContentProps = {
  insight: Insight;
};

export function InsightDetailContent({ insight }: InsightDetailContentProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    insight.sections[0]?.id ?? "",
  );
  const asideRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState<number>(32);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate sticky offset so as the user scrolls the whole page,
  // the sidebar scrolls along until all subheadings are fully in view, then sticks.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateStickyTop = () => {
      if (!asideRef.current) return;
      const asideHeight = asideRef.current.offsetHeight;
      const vh = window.innerHeight;
      if (asideHeight + 64 > vh) {
        setStickyTop(vh - asideHeight - 32);
      } else {
        setStickyTop(32);
      }
    };

    updateStickyTop();
    window.addEventListener("resize", updateStickyTop);
    return () => window.removeEventListener("resize", updateStickyTop);
  }, [insight.sections]);

  useEffect(() => {
    if (typeof window === "undefined" || insight.sections.length === 0) return;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const sectionElements = insight.sections
        .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (sectionElements.length === 0) return;

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveSectionId(sectionElements[sectionElements.length - 1].id);
        return;
      }

      let currentId = sectionElements[0].id;
      for (const { id, el } of sectionElements) {
        const rect = el.getBoundingClientRect();
        // Activate section when its top edge enters the reading zone
        if (rect.top <= 240) {
          currentId = id;
        } else {
          break;
        }
      }
      setActiveSectionId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [insight.sections]);

  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSectionId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-eri-grey-2">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-20 pt-8 sm:pt-12 lg:pb-32 lg:pt-14">
        <Container size="insights">
          {/* Breadcrumb / Back link */}
          <div className="mb-6 lg:mb-8">
            <Link
              href="/insights"
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
              Back to Insights
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[330px_1fr] lg:gap-14 xl:gap-20">
            {/* Left Column: Featured Image + Table of Contents (Sticky on desktop) */}
            <aside
              ref={asideRef}
              className="lg:sticky lg:self-start"
              style={{ top: `${stickyTop}px` }}
            >
              <div className="relative aspect-[330/360] w-full max-w-[340px] shrink-0 overflow-hidden rounded-[20px] bg-eri-grey-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] xl:aspect-[330/400]">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 340px"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-black/25 px-3 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-md">
                  {insight.tag}
                </span>
              </div>

              {/* Table of contents */}
              {insight.sections.length > 0 &&
                insight.sections.some((s) => s.heading?.trim()) && (
                  <nav
                    aria-label="Table of contents"
                    className="mt-6 flex flex-col space-y-3 pb-8 lg:mt-7"
                  >
                    <span className="sr-only">Table of contents</span>
                    {insight.sections
                      .filter((section) => section.heading?.trim())
                      .map((section) => {
                        const isActive = activeSectionId === section.id;
                        return (
                          <div
                            key={section.id}
                            data-section-id={section.id}
                            className={`border-b pb-3.5 transition-colors duration-200 ${
                              isActive ? "border-eri-dark" : "border-eri-grey-5"
                            }`}
                          >
                            <a
                              href={`#${section.id}`}
                              onClick={(e) => handleTocClick(e, section.id)}
                              className={`flex items-start gap-2.5 font-sans text-[15px] leading-[1.4] transition-colors duration-150 lg:text-[16px] ${
                                isActive
                                  ? "font-medium text-eri-dark"
                                  : "font-normal text-eri-grey-11 hover:text-eri-dark"
                              }`}
                            >
                              <span
                                className={`mt-1.5 size-1.5 shrink-0 rounded-full transition-all duration-200 ${
                                  isActive
                                    ? "bg-eri-coral scale-100 opacity-100"
                                    : "bg-transparent scale-0 opacity-0"
                                }`}
                                aria-hidden="true"
                              />
                              <span className="flex-1">{section.heading}</span>
                            </a>
                          </div>
                        );
                      })}
                  </nav>
                )}
            </aside>

            {/* Right Column: Article Header & Body */}
            <article className="min-w-0 max-w-[680px]">
              <header className="border-b border-eri-grey-5 pb-6 lg:pb-8">
                <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] text-eri-dark sm:text-[42px] lg:text-[48px]">
                  {insight.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[14px] text-eri-grey-11 font-sans sm:mt-5 sm:text-[15px]">
                  <time
                    dateTime={(() => {
                      const d = new Date(insight.date);
                      return Number.isNaN(d.getTime())
                        ? undefined
                        : d.toISOString().slice(0, 10);
                    })()}
                  >
                    {insight.date}
                  </time>
                  <span className="text-eri-grey-7" aria-hidden="true">
                    ·
                  </span>
                  <span>By {insight.author}</span>
                  <span className="text-eri-grey-7" aria-hidden="true">
                    ·
                  </span>
                  <span>{insight.readTime}</span>
                </div>
              </header>

              {/* Intro paragraphs */}
              {insight.intro.length > 0 && (
                <div className="mt-8 space-y-6 text-justify [text-align:justify] [text-justify:inter-word] text-[15px] leading-[1.75] text-eri-dark sm:text-[16px]">
                  {insight.intro.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Article content sections */}
              {insight.sections.length > 0 && (
                <div className="mt-10 space-y-10 lg:space-y-12">
                  {insight.sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-20 lg:scroll-mt-24"
                    >
                      {section.heading?.trim() && (
                        <h2 className="font-sans text-[20px] font-semibold leading-[1.3] tracking-[-0.015em] text-eri-dark sm:text-[22px] lg:text-[24px] text-justify [text-align:justify] [text-justify:inter-word]">
                          {section.heading}
                        </h2>
                      )}
                      <div className="mt-4 space-y-5 text-justify [text-align:justify] [text-justify:inter-word] text-[15px] leading-[1.75] text-eri-dark sm:text-[16px]">
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </article>
          </div>
        </Container>
      </main>
    </div>
  );
}
