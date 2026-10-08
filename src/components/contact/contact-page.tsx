"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    quote:
      "Eri is synonymous with speed and agility! I am always confident about my timelines when I work with the team. Responses are swift and on time. Quality is also top-notch. Looking forward to future studies!",
    name: "Fred Okobi",
    company: "Moniepoint NG",
    avatar: "/images/video-dairies/moniepoint-img.svg",
    logo: "/images/video-dairies/moniepoint-logo.svg",
  },
  {
    quote:
      "Eri's fieldwork gave us a clear picture of what was actually happening on the ground — not what we assumed.",
    name: "Amina Yusuf",
    company: "Flutterwave",
    avatar: "/images/video-dairies/girlonglasses.png",
    logo: "/images/video-dairies/moniepoint-logo.svg",
  },
  {
    quote:
      "The depth of insight we got from Eri's ground-level research completely changed how we approach new markets. Exceptional work.",
    name: "Chidi Eze",
    company: "Paystack",
    avatar: "/images/video-dairies/manonorange.png",
    logo: "/images/video-dairies/moniepoint-logo.svg",
  },
];

type AnimPhase = "stacked" | "fanning" | "transitioning";

export function ContactPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<AnimPhase>("stacked");

  useEffect(() => {
    // Total cycle: 6 000 ms
    // 5 000ms stacked (readable) → 500ms fanning → 500ms swap
    const STACKED = 5000;
    const FANNING = 500;
    const SWAP = 500;
    const TOTAL = STACKED + FANNING + SWAP;

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    const cycle = () => {
      t1 = setTimeout(() => setPhase("fanning"), STACKED);
      t2 = setTimeout(() => setPhase("transitioning"), STACKED + FANNING);
      t3 = setTimeout(
        () => {
          setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
          setPhase("stacked");
        },
        STACKED + FANNING + SWAP - 40,
      );
    };

    cycle();
    const interval = setInterval(cycle, TOTAL);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  const n = TESTIMONIALS.length;
  const backIdx = (activeIdx + 2) % n;
  const midIdx = (activeIdx + 1) % n;
  const frontIdx = activeIdx;

  return (
    <div className="relative min-h-screen bg-eri-dark">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/contact/contact-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative z-40">
        <SiteHeader variant="dark" />
      </div>

      {/* Main */}
      <main
        id="main-content"
        className="relative z-10 pb-20 pt-6 sm:pt-10 lg:pb-28 lg:pt-14"
      >
        <Container size="reach">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            {/* Header text: order-1 on mobile, Col 1 Row 1 on desktop */}
            <div className="order-1 lg:order-0 lg:col-start-1 lg:row-start-1">
              <h1 className="max-w-[480px] font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[40px] lg:text-[44px]">
                Tell us about your next project
              </h1>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.55] text-white/70">
                Tell us what you need to find out. We&apos;ll come back within
                one working day with what it would take to answer it.
              </p>
            </div>

            {/* Form: order-2 on mobile (ON TOP), Col 2 Row 1-span-2 on desktop */}
            <div className="order-2 lg:order-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="rounded-[28px] border border-eri-grey-4 bg-eri-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10">
                <form action="#" className="space-y-4 sm:space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Enter your First Name"
                        className="eri-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Enter your Last Name"
                        className="eri-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="work-email" className="sr-only">
                      Work email
                    </label>
                    <input
                      id="work-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your work email"
                      className="eri-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      What do you need to find out?
                    </label>
                    <input
                      id="message"
                      name="message"
                      type="text"
                      placeholder="What do you need to find out?"
                      className="eri-field"
                    />
                  </div>

                  <button
                    type="submit"
                    className="eri-pill eri-pill--primary flex min-h-12 w-full items-center justify-center text-center text-[15px] font-semibold"
                  >
                    Book a Signal
                  </button>
                </form>
              </div>
            </div>

            {/* Testimonial Cards: order-3 on mobile (BENEATH the form), Col 1 Row 2 on desktop */}
            <div className="order-3 mt-4 sm:mt-6 lg:order-0 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
              <div
                className="relative h-62.5 w-full max-w-120 pt-6 sm:h-60 lg:max-w-105"
                aria-live="polite"
                aria-label="Client testimonials"
              >
                {/* Render back-to-front so front card is painted on top */}
                <TestimonialCard
                  testimonial={TESTIMONIALS[backIdx]}
                  layer="back"
                  phase={phase}
                />
                <TestimonialCard
                  testimonial={TESTIMONIALS[midIdx]}
                  layer="mid"
                  phase={phase}
                />
                <TestimonialCard
                  testimonial={TESTIMONIALS[frontIdx]}
                  layer="front"
                  phase={phase}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

// ── Card animation helper ────────────────────────────────────────────────────

interface CardProps {
  testimonial: (typeof TESTIMONIALS)[number];
  layer: "back" | "mid" | "front";
  phase: AnimPhase;
}

function getCardStyle(
  layer: "back" | "mid" | "front",
  phase: AnimPhase,
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: "26px",
    transition:
      "transform 500ms cubic-bezier(0.34, 1.1, 0.64, 1), opacity 500ms ease",
    willChange: "transform, opacity",
  };

  // ── STACKED: back cards offset upward — peek above the front card ──
  if (phase === "stacked") {
    if (layer === "back") {
      // Furthest back: floats 16px above, narrower (creates depth stripe at top)
      return {
        ...base,
        zIndex: 1,
        transform: "translateY(-16px) scaleX(0.92)",
        opacity: 0.5,
        transformOrigin: "top center",
      };
    }
    if (layer === "mid") {
      // Middle: 8px above, slightly narrower
      return {
        ...base,
        zIndex: 2,
        transform: "translateY(-8px) scaleX(0.96)",
        opacity: 0.72,
        transformOrigin: "top center",
      };
    }
    // Front: flush at top, full width
    return {
      ...base,
      zIndex: 3,
      transform: "translateY(0px) scaleX(1)",
      opacity: 1,
    };
  }

  // ── FANNING: cards fan upward + slight rotation ──
  if (phase === "fanning") {
    if (layer === "back") {
      return {
        ...base,
        zIndex: 1,
        transform:
          "translateY(-24px) translateX(-10px) rotate(-4deg) scaleX(0.92)",
        opacity: 0.62,
        transformOrigin: "top center",
      };
    }
    if (layer === "mid") {
      return {
        ...base,
        zIndex: 2,
        transform:
          "translateY(-12px) translateX(-5px) rotate(-2deg) scaleX(0.96)",
        opacity: 0.82,
        transformOrigin: "top center",
      };
    }
    // Front lifts slightly down to create visual separation
    return {
      ...base,
      zIndex: 3,
      transform: "translateY(4px) scale(1.01)",
      opacity: 1,
    };
  }

  // ── TRANSITIONING: front exits upward, mid → front, back → mid ──
  if (layer === "back") {
    // Promotes to mid
    return {
      ...base,
      zIndex: 2,
      transform: "translateY(-8px) scaleX(0.96)",
      opacity: 0.78,
      transformOrigin: "top center",
    };
  }
  if (layer === "mid") {
    // Promotes to front
    return {
      ...base,
      zIndex: 3,
      transform: "translateY(0px) scaleX(1)",
      opacity: 1,
    };
  }
  // Front card exits: slides up and fades out
  return {
    ...base,
    zIndex: 1,
    transform: "translateY(-36px) translateX(-14px) rotate(-5deg) scale(0.88)",
    opacity: 0,
  };
}

function TestimonialCard({ testimonial, layer, phase }: CardProps) {
  const style = getCardStyle(layer, phase);

  return (
    <figure
      style={style}
      className="rounded-[28px] border border-eri-grey-4 bg-eri-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:p-7"
    >
      <blockquote className="text-[13.5px] leading-[1.65] text-eri-grey-11">
        {testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-[15px] font-semibold leading-tight text-eri-dark">
              {testimonial.name}
            </p>
            <p className="text-[13px] leading-tight text-eri-grey-11">
              {testimonial.company}
            </p>
          </div>
        </div>

        <Image
          src={testimonial.logo}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0"
        />
      </figcaption>
    </figure>
  );
}
