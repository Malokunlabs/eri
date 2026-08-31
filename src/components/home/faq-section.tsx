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
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      aria-label="Frequently asked questions"
      className="overflow-x-clip bg-eri-white pb-0 pt-14 text-eri-dark lg:pb-0 lg:pt-37"
    >
      <Container size="wide">
        <div className="mb-8 lg:hidden">
          <h2
            id="faq-heading"
            className="font-display text-[40px] font-semibold leading-none tracking-tight"
          >
            FAQs
          </h2>
          <p className="mt-3 max-w-77.5 text-[13px] leading-normal text-eri-grey-9">
            A selection of projects that show how organizations ERI to answer
            important questions.
          </p>
        </div>

        <div className="relative -mb-16 min-h-170 w-full lg:mb-[-12%] lg:-ml-16 lg:aspect-1354/1240 lg:min-h-0 lg:w-[calc(100%+128px)]">
          <Image
            src="/images/large-folder/cover-folder.svg"
            alt=""
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 1354px"
            className="pointer-events-none object-fill"
          />

          <Image
            src="/images/large-folder/cover-folder.svg"
            alt=""
            fill
            sizes="1354px"
            className="pointer-events-none z-20 hidden object-fill [clip-path:inset(55.5%_0_0_0)] lg:block"
          />

          <div className="absolute left-1/2 top-0 hidden w-[38%] items-start justify-between lg:flex">
            <h2
              id="faq-heading-desktop"
              className="font-display text-[48px] font-semibold leading-none tracking-tight"
            >
              FAQs
            </h2>
            <p className="mt-1 max-w-62.5 text-[14px] leading-normal text-eri-grey-9">
              A selection of projects that show how organizations ERI to answer
              important questions.
            </p>
          </div>

          <div className="relative z-10 mx-[4%] pb-24 pt-24 lg:mx-[13.5%] lg:pb-10 lg:pt-[9.5%] ">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  className={`relative -mt-px overflow-hidden rounded-2xl first:mt-0 ${faq.color}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex min-h-19.5 w-full items-center justify-between gap-6 px-6 text-left font-display text-[18px] font-semibold leading-tight lg:px-7 lg:text-[22px]"
                    onClick={() => setOpenIndex(index)}
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
