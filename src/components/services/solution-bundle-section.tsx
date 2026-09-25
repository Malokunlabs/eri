import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";

type Bundle = {
  id: string;
  audience: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
  featured?: boolean;
};

const bundles: Bundle[] = [
  {
    id: "ground-truth",
    audience: "Start-ups & MSEs",
    title: "Ground Truth",
    description:
      "You bring the question. We put people where the answer is and bring back clean data.",
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    features: [
      "Geo-tagged photos for on-shelf reality",
      "Micro-surveys for on-shelf reality",
      "Blind product/message tests with selfie reactions",
      "Live QR feedback + shelf audits",
      "Monday dashboard mail",
    ],
  },
  {
    id: "field-research",
    audience: "Regional Organizations",
    title: "Field Research",
    description:
      "You bring the question. We put people where the answer is and bring back clean data.",
    ctaLabel: "Book Demo",
    ctaHref: "/contact",
    features: [
      "Geo-tagged photos for on-shelf reality",
      "Micro-surveys for on-shelf reality",
      "Blind product/message tests with selfie reactions",
      "Live QR feedback + shelf audits",
      "Monday dashboard mail",
    ],
    featured: true,
  },
  {
    id: "standing-intelligence",
    audience: "Established Multinationals",
    title: "Standing Intelligence",
    description:
      "Market intelligence on a subscription. You see the number every month it moves.",
    ctaLabel: "Book a Demo",
    ctaHref: "/contact",
    features: [
      "Geo-tagged photos for on-shelf reality",
      "Micro-surveys for on-shelf reality",
      "Blind product/message tests with selfie reactions",
      "Standing coverage on the market you choose, refreshed to a fixed schedule",
      "Built for teams watching a market month to month",
    ],
  },
];

export function SolutionBundleSection() {
  return (
    <section
      aria-labelledby="solution-bundles-heading"
      className="bg-eri-grey-2 py-16 sm:py-18 lg:py-16"
    >
      <Container size="insights">
        {/* Section header */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <h2
            id="solution-bundles-heading"
            className="font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] text-eri-dark sm:text-[36px] lg:text-[48px]"
          >
            Our Solution Bundles
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-[13px] leading-[1.6] text-eri-grey-11 sm:max-w-sm sm:text-[14px] lg:max-w-md lg:text-[15px]">
            Choose the perfect bundle to transform your market research and
            brand activation strategy
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`relative flex flex-1 flex-col rounded-2xl p-6 sm:p-7 lg:p-8 ${
                bundle.featured
                  ? "bg-eri-mauve text-eri-white"
                  : "border border-eri-grey-5 bg-eri-white text-eri-dark"
              }`}
            >
              {/* Card top: audience label + branded logo icon */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-[12px] font-medium leading-none tracking-[0.01em] sm:text-[13px] ${
                    bundle.featured ? "text-white/70" : "text-eri-grey-11"
                  }`}
                >
                  {bundle.audience}
                </span>
                <Image
                  src={
                    bundle.featured
                      ? "/icons/services-page/white-logo.svg"
                      : "/icons/services-page/grey-logo.svg"
                  }
                  alt=""
                  width={21}
                  height={20}
                  aria-hidden="true"
                />
              </div>

              {/* Bundle title */}
              <h3
                className={`font-display mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[32px] lg:text-[30px] xl:text-[34px] ${
                  bundle.featured ? "text-eri-white" : "text-eri-dark"
                }`}
              >
                {bundle.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-2.5 text-[13px] leading-[1.6] sm:text-[14px] ${
                  bundle.featured ? "text-white/75" : "text-eri-grey-11"
                }`}
              >
                {bundle.description}
              </p>

              {/* CTA */}
              <div className="mt-5">
                <Link
                  href={bundle.ctaHref}
                  className={`eri-pill inline-flex min-h-10 items-center px-5 py-2.5 text-[13px] sm:text-[14px] ${
                    bundle.featured ? "eri-pill--header border-transparent" : ""
                  }`}
                >
                  {bundle.ctaLabel}
                </Link>
              </div>

              {/* Divider */}
              <div
                className={`my-6 h-px w-full ${
                  bundle.featured ? "bg-white/20" : "bg-eri-grey-5"
                }`}
                aria-hidden="true"
              />

              {/* Features list */}
              <ul className="flex flex-col gap-3" role="list">
                {bundle.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Image
                      src={
                        bundle.featured
                          ? "/icons/services-page/white-correct-icon.svg"
                          : "/icons/services-page/dark-correct-icon.svg"
                      }
                      alt=""
                      width={12}
                      height={12}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[13px] leading-[1.55] sm:text-[14px] ${
                        bundle.featured ? "text-white/80" : "text-eri-grey-11"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
