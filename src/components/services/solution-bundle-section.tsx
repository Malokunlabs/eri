import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";

type Bundle = {
  id: string;
  tier: string;
  titleLines: string[];
  ctaLabel: string;
  ctaHref: string;
  paragraphs: string[];
};

const bundles: Bundle[] = [
  {
    id: "nationwide-field-network",
    tier: "Tier 1 — Lead with these",
    titleLines: ["Nationwide", "Field Network"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "11,000+ verified agents across urban, peri-urban and rural Nigeria, six zones. The reach no competitor can sublease.",
    ],
  },
  {
    id: "field-research-data-collection",
    tier: "Tier 1 — Lead with these",
    titleLines: ["Field Research", "& Data Collection"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "Quantitative deployment (CAPI face-to-face or digital, geo-aware, multilingual, with recruitment, incentives, quota control, QC and clean data delivery)",
      "Qualitative fieldwork (FGDs, IDIs, mobile diaries, ride-alongs, trade visits — recruitment through transcripts)",
      "Qualitative fieldwork: FGDs, IDIs, mobile diaries, ride-alongs, and trade visits.",
      "Full-service research when Eri owns design, field, analysis, and reporting.",
    ],
  },
  {
    id: "ground-truth-data-verification",
    tier: "Tier 2 — The proof layer",
    titleLines: ["Ground-Truth Data &", "Verification (GroundAPI)"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "Prices, presence, conditions and sentiment verified by agents physically in place.",
      "For \u201Cprove-it\u201D buyers — DFIs, FMCG, fintech — where a claim has to survive a skeptic.",
    ],
  },
  {
    id: "trade-retail-diagnostics",
    tier: "Tier 2 — The proof layer",
    titleLines: ["Trade & Retail", "Diagnostics"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "Retail audits, availability and distribution checks, and a rapid commercial pulse when direction is needed in weeks, not quarters.",
    ],
  },
  {
    id: "ethnographic-video-cultural-intelligence",
    tier: "Tier 2 — The proof layer",
    titleLines: ["Ethnographic Video", "& Cultural Intelligence"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "Documentary-grade field capture, video ethnography, culture-and-codes readouts. Your Monochrome Lagos credibility, commercialised.",
    ],
  },
  {
    id: "ground-intelligence-network",
    tier: "Tier 3 — Subscription",
    titleLines: ["Ground Intelligence", "Network"],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    paragraphs: [
      "Standing market intelligence on subscription, tiered Signal / Current / Infrastructure.",
    ],
  },
];

export function SolutionBundleSection() {
  return (
    <section
      aria-labelledby="solution-bundles-heading"
      className="bg-eri-white py-16 sm:py-18 lg:py-16"
    >
      <Container size="insights">
        {/* Section header */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <h2
            id="solution-bundles-heading"
            className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-eri-dark sm:text-[38px] lg:text-[44px]"
          >
            Our Solution Bundles
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-[14px] leading-[1.55] text-eri-grey-11 sm:max-w-sm sm:text-[15px] lg:max-w-md">
            Choose the perfect bundle to transform your market research and
            brand activation strategy
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="group relative flex flex-col rounded-2xl border border-eri-grey-5 bg-eri-grey-3 p-6 text-eri-dark transition-colors duration-200 hover:border-eri-mauve hover:bg-eri-mauve hover:text-eri-white sm:p-7"
            >
              {/* Card top: tier label + branded logo icon */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-medium leading-none tracking-[-0.01em] text-eri-grey-11 transition-colors duration-200 group-hover:text-white/90 sm:text-[15px]">
                  {bundle.tier}
                </span>
                <div className="relative h-5 w-[21px] shrink-0">
                  <Image
                    src="/icons/services-page/grey-logo.svg"
                    alt=""
                    width={21}
                    height={20}
                    aria-hidden="true"
                    className="transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <Image
                    src="/icons/services-page/white-logo.svg"
                    alt=""
                    width={21}
                    height={20}
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </div>
              </div>

              {/* Bundle title */}
              <h3 className="font-display mt-5 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-eri-dark transition-colors duration-200 group-hover:text-eri-white sm:text-[26px]">
                {bundle.titleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              {/* CTA */}
              <div className="mt-5">
                <Link
                  href={bundle.ctaHref}
                  className="eri-pill inline-flex min-h-10 items-center px-5 py-2.5 text-[13px] transition-colors duration-200 group-hover:border-eri-dark group-hover:bg-eri-coral-dark group-hover:text-eri-white sm:text-[14px]"
                >
                  {bundle.ctaLabel}
                </Link>
              </div>

              {/* Divider */}
              <div
                className="my-6 h-px w-full bg-eri-grey-5 transition-colors duration-200 group-hover:bg-white/25"
                aria-hidden="true"
              />

              {/* Paragraphs */}
              <div className="flex flex-col gap-3">
                {bundle.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[12px] leading-[1.55] text-eri-grey-11 transition-colors duration-200 group-hover:text-white/90 sm:text-[12.5px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
