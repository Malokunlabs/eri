"use client";

import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/ui/container";

const faqs = [
  {
    question: "What is ERI?",
    answer:
      "Eri is a field intelligence company that gathers verified evidence directly from people, places and markets across Nigeria.",
    color: "bg-[#efc0ad] text-eri-dark",
  },
  {
    question: "How is ERI different from a research agency?",
    answer:
      "We combine local field teams, direct observation and evidence trails so every finding can be traced back to what happened on the ground.",
    color: "bg-[#bd6446] text-eri-white",
  },
  {
    question: "What happens after I Book a Signal?",
    answer:
      "We clarify the question, agree the locations and evidence required, then return with a practical field plan and timeline.",
    color: "bg-[#c5b2c6] text-eri-dark",
  },
  {
    question: "How do you protect what you find?",
    answer:
      "Access is controlled, sensitive information is handled confidentially, and findings are shared only with the agreed project team.",
    color: "bg-[#945797] text-eri-white",
  },
  {
    question: "How quickly can a project start?",
    answer:
      "Most projects can begin shortly after the scope is confirmed. Timing depends on the locations, sample size and evidence required.",
    color: "bg-[#efc0ad] text-eri-dark",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We support fintech, retail, consumer goods, media, entertainment and other teams that need reliable ground-level intelligence.",
    color: "bg-[#bd6446] text-eri-white",
  },
  {
    question: "Can engagements be customised?",
    answer:
      "Yes. Every engagement is shaped around the question, audience, geography, evidence format and decision you need to make.",
    color: "bg-[#c5b2c6] text-eri-dark",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-label="Frequently asked questions"
      className="overflow-x-clip bg-eri-white pb-14 pt-14 text-eri-dark lg:pb-16 lg:pt-37"
    >
      <Container>
        <div className="mb-8 lg:hidden">
          <h2
            id="faq-heading"
            className="font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px]"
          >
            FAQs
          </h2>
          <p className="mt-3 max-w-[310px] text-[14px] leading-[1.55] text-eri-grey-9 sm:text-[15px]">
            A selection of projects that show how organizations ERI to answer
            important
          </p>
        </div>

        {/* Mobile: cards inside the folder */}
        <div className="flex w-full flex-col pb-2 lg:hidden">
          <div className="relative w-full">
            <Image
              src="/images/large-folder/mobile-folder-back.svg"
              alt=""
              fill
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 1032px"
              unoptimized
              className="pointer-events-none object-fill"
            />
            <div className={`relative px-[3.5%] pt-[16%] transition-[padding] duration-300 ease-out ${openIndex === null ? "z-10 pb-[7.5%]" : "z-30 pb-[20%]"}`}>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    className={`relative -mt-px overflow-hidden rounded-lg first:mt-0 ${faq.color}`}
                    key={faq.question}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-mobile-${index}`}
                      className="flex min-h-11 w-full items-center justify-between gap-3 px-3.5 py-2 text-left font-display text-[13px] font-semibold leading-tight"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className={`relative block size-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      >
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                      </span>
                    </button>
                    <div
                      id={`faq-answer-mobile-${index}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-3.5 pb-3 text-[12px] leading-normal opacity-85">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative z-20 mt-[-9%] aspect-358/115 w-full">
            <Image
              src="/images/large-folder/mobile-folder-front.svg"
              alt=""
              fill
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 1032px"
              unoptimized
              className="pointer-events-none object-fill"
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="relative hidden w-full lg:block lg:aspect-[1072/958.34]">
          {/* Back folder illustration: scaled and shifted so visible folder (x: 140.59 to 1212.59) aligns 100% with container width */}
          <div className="pointer-events-none absolute -left-[13.115%] top-0 z-0 h-[129.39%] w-[126.31%]">
            <Image
              src="/images/large-folder/cover-folder.svg"
              alt=""
              fill
              sizes="(max-width: 1023px) calc(100vw - 48px), 1354px"
              className="object-fill"
            />
          </div>

          {/* Front flap folder illustration: natural rounded corners and soft drop shadow preserved */}
          <div className="pointer-events-none absolute -left-[13.115%] top-0 z-20 h-[129.39%] w-[126.31%]">
            <Image
              src="/images/large-folder/cover-folder.svg"
              alt=""
              fill
              sizes="(max-width: 1023px) calc(100vw - 48px), 1354px"
              className="object-fill [clip-path:inset(55.5%_0_0_0)]"
            />
          </div>

          {/* Desktop FAQs heading on the folder shelf */}
          <h2
            id="faq-heading-desktop"
            className="absolute left-[48.5%] top-0 z-10 hidden font-display text-[38px] font-semibold leading-tight tracking-[-0.02em] lg:block lg:text-[44px]"
          >
            FAQs
          </h2>

          {/* Desktop subtitle on the far right of the folder shelf */}
          <p className="absolute right-[3.5%] top-1.5 z-10 hidden max-w-[280px] text-[12px] leading-[1.35] text-eri-grey-9 sm:text-[13px] lg:block">
            A selection of projects that show how
            <br />
            organizations ERI to answer important
          </p>

          <div className="relative z-10 mx-[4%] pt-24 lg:mx-[3.5%] lg:pt-[11%]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  className={`relative transition-[margin] duration-300 ease-out ${isOpen ? "mb-0" : "-mb-12"}`}
                  style={{ zIndex: index + 1 }}
                  key={faq.question}
                >
                <div
                  className={`relative overflow-hidden rounded-2xl transition-[padding] duration-300 ease-out ${isOpen ? "pb-0" : "pb-12"} ${faq.color}`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-black/15 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="relative flex min-h-17 w-full items-center justify-between gap-6 px-6 text-left font-display text-[18px] font-semibold leading-tight lg:px-7 lg:text-[22px]"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`relative block size-7 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-190 px-6 pb-6 text-[13px] leading-[1.55] opacity-85 lg:px-7 lg:text-[14px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
