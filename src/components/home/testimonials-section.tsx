"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Container } from "@/components/ui/container";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials-data";

const VIEW_MS = 5000;
const ROLL_MS = 700;
const EASE = "cubic-bezier(0.55, 0, 0.35, 1)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Resting position of a card in the deck: 0 = front, 1 = middle, 2 = back.
function restingStyle(pos: number): React.CSSProperties {
  if (pos === 0) {
    return { transform: "translateY(0) scale(1)", opacity: 1, zIndex: 30 };
  }
  if (pos === 1) {
    return {
      transform: "translateY(-16px) scale(0.96)",
      opacity: 0.9,
      zIndex: 20,
    };
  }
  if (pos === 2) {
    return {
      transform: "translateY(-32px) scale(0.92)",
      opacity: 0.7,
      zIndex: 10,
    };
  }
  return {
    transform: "translateY(-44px) scale(0.88)",
    opacity: 0,
    zIndex: 0,
  };
}

// The front card rolls down and away while the next one comes into view.
const ROLLED_STYLE: React.CSSProperties = {
  transform: "translateY(115%) rotateX(-14deg) scale(1.02)",
  opacity: 0,
  zIndex: 40,
};

function layerClasses(pos: number) {
  if (pos === 0) {
    return "bg-[#f1efec] border-eri-grey-4/80 shadow-[0_18px_44px_rgba(0,0,0,0.10)]";
  }
  if (pos === 1) return "bg-[#eae5dc] border-[#dad4c9]";
  return "bg-[#ded9d0] border-[#ccc6bb]";
}

function TestimonialCard({
  testimonial,
  pos,
  rolling,
  snap,
}: {
  testimonial: Testimonial;
  pos: number;
  rolling: boolean;
  snap: boolean;
}) {
  // While rolling, every card advances one position and the front card exits.
  const effectivePos = rolling ? pos - 1 : pos;
  const style: React.CSSProperties =
    rolling && pos === 0
      ? ROLLED_STYLE
      : restingStyle(Math.max(effectivePos, 0));

  return (
    <figure
      aria-hidden={pos !== 0}
      style={{
        ...style,
        gridArea: "1 / 1",
        transformOrigin: "center top",
        transition: snap
          ? "none"
          : `transform ${ROLL_MS}ms ${EASE}, opacity ${ROLL_MS}ms ease`,
        willChange: "transform, opacity",
      }}
      className={`flex flex-col justify-between gap-8 rounded-[28px] border p-6 sm:rounded-[32px] sm:p-10 lg:p-12 ${layerClasses(
        rolling && pos === 0 ? 0 : Math.max(effectivePos, 0),
      )}`}
    >
      <blockquote className="text-[15px] leading-[1.6] text-eri-grey-11 sm:text-[18px] lg:text-[21px] lg:leading-[1.55]">
        {testimonial.quote}
      </blockquote>

      <figcaption className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          {testimonial.avatar && (
            <Image
              src={testimonial.avatar}
              alt=""
              width={72}
              height={72}
              className="size-14 shrink-0 rounded-full object-cover sm:size-[72px]"
            />
          )}
          <div className="min-w-0">
            <p className="font-display text-[18px] font-semibold leading-tight text-eri-dark sm:text-[22px]">
              {testimonial.name}
            </p>
            <p className="mt-1 text-[14px] leading-tight text-eri-grey-11 sm:text-[16px]">
              {testimonial.company}
            </p>
          </div>
        </div>

        <Image
          src={testimonial.logo}
          alt=""
          width={120}
          height={64}
          className="h-12 w-auto max-w-[110px] shrink-0 object-contain sm:h-16 sm:max-w-[150px]"
        />
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const count = TESTIMONIALS.length;
  const [active, setActive] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [snapIndex, setSnapIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  // Every 5 seconds, roll the front card down and bring the next one into view.
  useEffect(() => {
    if (count < 2 || paused || rolling) return;
    const timer = setTimeout(() => {
      if (reducedMotion) {
        setActive((current) => (current + 1) % count);
      } else {
        setRolling(true);
      }
    }, VIEW_MS);
    return () => clearTimeout(timer);
  }, [active, count, paused, rolling, reducedMotion]);

  // Once the roll finishes, promote the next card and send the rolled one to
  // the back of the deck without animating it through the stack.
  useEffect(() => {
    if (!rolling) return;
    const timer = setTimeout(() => {
      setSnapIndex(active);
      setActive((current) => (current + 1) % count);
      setRolling(false);
    }, ROLL_MS);
    return () => clearTimeout(timer);
  }, [rolling, active, count]);

  useEffect(() => {
    if (snapIndex === null) return;
    const timer = setTimeout(() => setSnapIndex(null), 60);
    return () => clearTimeout(timer);
  }, [snapIndex]);

  function goTo(index: number) {
    if (rolling || index === active) return;
    setSnapIndex(null);
    setActive(index);
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-eri-white py-16 text-eri-dark sm:py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container size="insights">
        <h2
          id="testimonials-heading"
          className="mx-auto max-w-[640px] text-center font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]"
        >
          Reviews from Executives we have shown our workings...
        </h2>

        <div
          className="mx-auto mt-12 max-w-[920px] pt-10 sm:mt-14 lg:mt-16"
          style={{ perspective: "1400px" }}
          aria-live="off"
        >
          <div className="grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                pos={(index - active + count) % count}
                rolling={rolling}
                snap={snapIndex === index}
              />
            ))}
          </div>
        </div>

        {count > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Choose a review"
          >
            {TESTIMONIALS.map((testimonial, index) => {
              const isActive = index === active;
              return (
                <button
                  key={testimonial.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show review from ${testimonial.name}`}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-dark ${
                    isActive
                      ? "w-6 bg-eri-coral-dark"
                      : "w-2 bg-eri-grey-5 hover:bg-eri-grey-7"
                  }`}
                />
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
