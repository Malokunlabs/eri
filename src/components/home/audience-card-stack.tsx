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
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";

const audienceSlides = [
  {
    title: ["Fintechs,", "Wallets &", "Neobanks"],
    roles:
      "CEO · Head of Growth · Head of Risk & Fraud · Head of Distribution · VP Product",
    description:
      "You’re measured on active users, but sign-ups can be farmed, and everyone knows it. Eri delivers activation you can defend: real people, onboarded by someone they already trust, every action stamped with place, time and proof. Traction that survives diligence.",
    image: "/images/this-for/headofgrowth.png",
    alt: "Head of Growth identification card",
  },
  {
    title: ["FMCG &", "Consumer", "Brands"],
    roles: "Head of Trade Marketing · National Sales Manager · Field Sales Lead",
    description:
      "Your product succeeds or fails in informal markets your panels can’t see. Eri reports the ground truth cluster by cluster. In stock or out, priced right or not, out-facing the competition or losing the shelf; and whether the trade spend you paid for was ever executed. Leakage, caught with geotagged proof.",
    image: "/images/this-for/sales-lead.png",
    alt: "Sales Lead identification card",
  },
  {
    title: ["Impact &", "Development", "Finance"],
    roles:
      "Monitoring & Evaluation Lead · Program & Portfolio Manager · Impact & Compliance",
    description:
      "You answer to a board and a donor for whether the money reached real people and real places. Eri is independent, third-party verification of what actually happened on the ground; presence, delivery, outcome — evidenced, never self-reported. Monitoring that holds up to an audit.",
    image: "/images/this-for/program-manager.png",
    alt: "Program Manager identification card",
  },
  {
    title: ["Investors", "& Funds in", "Diligence"],
    roles:
      "Investment Principal / Associate · Due Diligence Lead · Portfolio Operations",
    description:
      "Before the wire clears, you need to know the footprint is real, the agents exist, the outlets stock it, the users transact. Eri verifies a target’s on-the-ground claims independently, in the markets that never make it into a data room.",
    image: "/images/this-for/portfolio-manager.png",
    alt: "Portfolio Manager identification card",
  },
  {
    title: ["AI &", "Agent", "Builders"],
    roles: "Head of Data · Applied Research Lead · Product Lead, Agents & Commerce",
    description:
      "Agents can discover and act, but they can’t see whether the world matches the claim. As verified real-world truth becomes the scarce input, Eri supplies human-sourced ground truth from the markets no crawler reaches.",
    image: "/images/this-for/product-lead.png",
    alt: "Product Lead identification card",
  },
] as const;

const lastIndex = audienceSlides.length - 1;

/** How many cards stay visible behind the front one (front + 2 behind = 3 visible total). */
const VISIBLE_DEPTH = 2;
/** Horizontal / vertical / scale step per level of depth. */
const DEPTH_X = 66;
const DEPTH_Y = -34;
const DEPTH_SCALE = 0.05;
/** Distance a card travels upward when it leaves. */
const EXIT_Y = -760;

const cardClassName =
  "absolute right-0 lg:right-[-6px] top-0 aspect-[304/596] w-[304px] max-w-[79.2vw] will-change-transform";

const easeInOut = (value: number) =>
  value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

/**
 * `position` is the continuous "which card is in focus" value (0..lastIndex).
 * offset > 0  → card waits behind the front card (fanned left and stepped UP)
 * offset <= 0 → card is flying up and away
 */
function useCardMotion(position: MotionValue<number>, index: number) {
  const x = useTransform(position, (value) => {
    const offset = index - value;
    return offset > 0 ? -Math.min(offset, VISIBLE_DEPTH + 0.5) * DEPTH_X : 0;
  });

  const y = useTransform(position, (value) => {
    const offset = index - value;

    if (offset > 0) {
      // Cards behind step UP (negative Y)
      return Math.min(offset, VISIBLE_DEPTH + 0.5) * DEPTH_Y;
    }

    return easeInOut(Math.min(-offset, 1)) * EXIT_Y;
  });

  const scale = useTransform(position, (value) => {
    const offset = index - value;
    return offset > 0 ? 1 - Math.min(offset, VISIBLE_DEPTH + 0.5) * DEPTH_SCALE : 1;
  });

  const opacity = useTransform(position, (value) => {
    const offset = index - value;

    if (offset > VISIBLE_DEPTH) {
      return Math.max(0, 1 - (offset - VISIBLE_DEPTH) / 0.4);
    }

    if (offset >= 0) return 1;

    // Stay solid while rising, fade out over the last part of the exit.
    return 1 - Math.max(0, (Math.min(-offset, 1) - 0.55) / 0.45);
  });

  return { x, y, scale, opacity };
}

function AudienceCard({
  index,
  position,
  slide,
  reduceMotion,
}: {
  index: number;
  position: MotionValue<number>;
  slide: (typeof audienceSlides)[number];
  reduceMotion: boolean;
}) {
  const motionStyle = useCardMotion(position, index);

  return (
    <motion.div
      aria-hidden={index !== 0 ? undefined : undefined}
      className={cardClassName}
      style={{
        ...(reduceMotion ? undefined : motionStyle),
        zIndex: audienceSlides.length - index,
      }}
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        sizes="(max-width: 1023px) 79vw, 304px"
        className="object-fill"
        priority={index === 0}
      />
    </motion.div>
  );
}

export function AudienceCardStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Small dwell at both ends so the first/last card can rest in focus.
  const rawPosition = useTransform(
    scrollYProgress,
    [0.04, 0.96],
    [0, lastIndex],
    { clamp: true },
  );
  const position = useSpring(rawPosition, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
    restDelta: 0.0005,
  });

  useMotionValueEvent(position, "change", (value) => {
    const next = Math.min(lastIndex, Math.max(0, Math.round(value)));

    setActiveSlide((current) => (current === next ? current : next));
  });

  const currentSlide = audienceSlides[activeSlide];

  const dots = (
    <>
      {audienceSlides.map((slide, index) => (
        <span
          aria-hidden="true"
          className={`rounded-full transition-[width,background-color] duration-200 ${
            index === activeSlide
              ? "h-2 w-4 bg-eri-mauve"
              : "size-2 bg-eri-coral-light/80"
          }`}
          key={slide.alt}
        />
      ))}
    </>
  );

  return (
    <>
      <div
        ref={trackRef}
        data-audience-card-track=""
        className="relative mt-1 lg:mt-0"
        style={{ height: `${audienceSlides.length * 90 + 60}svh` }}
      >
        <div className="sticky top-0 flex flex-col lg:overflow-visible lg:h-svh">
          <div className="relative mx-auto h-[calc(min(304px,79.2vw)*596/304)] w-full max-w-96 shrink-0 lg:h-149">
            {audienceSlides.map((slide, index) => (
              <AudienceCard
                index={index}
                key={slide.alt}
                position={position}
                reduceMotion={reduceMotion}
                slide={slide}
              />
            ))}

            {/* Vertical pill badge indicator matching design */}
            <div className="absolute -left-19 xl:-left-21 bottom-5 hidden lg:flex flex-col items-center gap-2.5 rounded-full bg-white/20 border border-white/25 px-2 py-3.5 backdrop-blur-sm z-30 shadow-sm">
              <div className="flex flex-col items-center gap-1.5">
                {audienceSlides.map((_, index) => (
                  <span
                    key={index}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "h-3.5 w-1.5 bg-white"
                        : "size-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] font-medium leading-none tracking-tight text-white/95 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap"
                >
                  {currentSlide.title.join(" ")}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="mx-auto mt-6 hidden min-h-34 w-full max-w-[368px] lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeSlide}
                className="text-[14px] leading-[1.55] text-eri-coral-light"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>
          </div>

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
                <p className="mt-2 text-[13px] leading-[1.55] text-eri-coral-light">
                  {currentSlide.roles}
                </p>
              </motion.div>
            </AnimatePresence>

            <div
              aria-label={`Audience ${activeSlide + 1} of ${audienceSlides.length}`}
              className="mt-3 flex h-5 w-25 items-center justify-center gap-1.5 rounded-full bg-white/20 backdrop-blur-xs"
              role="status"
            >
              {dots}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeSlide}
                className="mt-3 min-h-32 text-[13px] leading-[1.55] text-eri-coral-light"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>
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
            className="mt-4 flex h-5 w-[100px] items-center justify-center gap-1.5 rounded-full bg-white/20 backdrop-blur-xs"
            role="status"
          >
            {dots}
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
