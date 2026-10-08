"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

type AudienceCardStackProps = {
  description: string;
};

const audienceSlides = [
  {
    title: ["Fintechs,", "Wallets &", "Neobanks"],
    roles:
      "CEO · Head of Growth · Head of Risk & Fraud · Head of Distribution · VP Product",
  },
  {
    title: ["Retail, FMCG", "& Marketplaces"],
    roles:
      "COO · Head of Operations · Head of Retail · Customer Experience · Expansion",
  },
  {
    title: ["Agencies, Media", "& Entertainment"],
    roles:
      "CEO · Creative Director · Strategy Director · Head of Production · Brand Lead",
  },
] as const;

const cardClassName =
  "absolute top-0 aspect-[304/596] w-[304px] max-w-[79.2vw] origin-top";

export function AudienceCardStack({ description }: AudienceCardStackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.25,
    restDelta: 0.0005,
  });

  const frontCardY = useTransform(
    smoothProgress,
    [0.1, 0.34],
    ["0px", "-720px"],
  );
  const middleCardY = useTransform(
    smoothProgress,
    [0.42, 0.66],
    ["0px", "-720px"],
  );
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const nextSlide = progress >= 0.7 ? 2 : progress >= 0.38 ? 1 : 0;

    setActiveSlide((currentSlide) =>
      currentSlide === nextSlide ? currentSlide : nextSlide,
    );
  });

  const currentSlide = audienceSlides[activeSlide];

  return (
    <>
      <div
        ref={trackRef}
        data-audience-card-track=""
        className="relative mt-1 h-[240svh] lg:mt-0"
      >
        <div className="sticky top-0 flex flex-col overflow-hidden lg:h-svh">
          <div className="relative mx-auto h-[calc(min(304px,79.2vw)*596/304)] w-full max-w-96 shrink-0 lg:h-149">
            <div className={`${cardClassName} left-0`}>
              <Image
                src="/images/this-for/director.svg"
                alt="Creative Director identification card"
                fill
                sizes="(max-width: 1023px) 79vw, 304px"
                className="object-fill"
              />
            </div>

            <div className={`${cardClassName} left-1/2 -translate-x-1/2`}>
              <motion.div
                className="relative size-full will-change-transform"
                style={reduceMotion ? undefined : { y: middleCardY }}
              >
                <Image
                  src="/images/this-for/headofoperation.svg"
                  alt="Head of Operations identification card"
                  fill
                  sizes="(max-width: 1023px) 79vw, 304px"
                  className="object-fill"
                />
              </motion.div>
            </div>

            <div className={`${cardClassName} right-0`}>
              <motion.div
                className="relative size-full will-change-transform"
                style={reduceMotion ? undefined : { y: frontCardY }}
              >
                <Image
                  src="/images/this-for/headofgrowth.png"
                  alt="Head of Growth identification card"
                  fill
                  sizes="(max-width: 1023px) 79vw, 304px"
                  className="object-fill"
                  priority
                />
              </motion.div>
            </div>
          </div>

          <p className="mx-auto mt-6 hidden max-w-[368px] text-[14px] leading-[1.55] text-eri-coral-light lg:block">
            {description}
          </p>

          <div className="mt-2 px-1 lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                <h3 className="font-display text-[22px] font-semibold leading-[1.08] tracking-[-0.02em]">
                  {currentSlide.title.join(" ")}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.55] text-eri-coral-light">
                  {currentSlide.roles}
                </p>
              </motion.div>
            </AnimatePresence>

            <div
              aria-label={`Audience ${activeSlide + 1} of ${audienceSlides.length}`}
              className="mt-3 flex h-5 w-25 items-center justify-center gap-1.5 rounded-full bg-eri-bone/60"
              role="status"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  aria-hidden="true"
                  className={`rounded-full transition-[width,background-color] duration-200 ${
                    index === activeSlide
                      ? "h-2 w-4 bg-eri-mauve"
                      : "size-2 bg-eri-coral-light/80"
                  }`}
                  key={index}
                />
              ))}
            </div>

            <p className="mt-3 text-[12px] leading-[1.55] text-eri-coral-light">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-svh lg:pt-[88px]">
        <div className="lg:min-h-[246px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <h3 className="font-display text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
                {currentSlide.title.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < currentSlide.title.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.55] text-eri-coral-light">
                {currentSlide.roles}
              </p>
            </motion.div>
          </AnimatePresence>

          <div
            aria-label={`Audience ${activeSlide + 1} of ${audienceSlides.length}`}
            className="mt-4 flex h-5 w-[100px] items-center justify-center gap-1.5 rounded-full bg-eri-bone/60"
            role="status"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                aria-hidden="true"
                className={`rounded-full transition-[width,background-color] duration-200 ${
                  index === activeSlide
                    ? "h-2 w-4 bg-eri-mauve"
                    : "size-2 bg-eri-coral-light/80"
                }`}
                key={index}
              />
            ))}
          </div>
        </div>

        <Image
          src="/images/this-for/3lines.svg"
          alt=""
          width={274}
          height={102}
          className="mt-10 h-auto w-full max-w-[274px]"
        />
      </div>

      <div className="mt-8 px-3 lg:hidden">
        <Image
          src="/images/this-for/3lines.svg"
          alt=""
          width={274}
          height={102}
          className="mx-auto h-auto w-full max-w-[274px]"
        />
      </div>
    </>
  );
}
