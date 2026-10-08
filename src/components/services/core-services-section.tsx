"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";

type Service = {
  id: number;
  title: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  barColor: string;
};

const services: Service[] = [
  {
    id: 0,
    title: "Field Research &\nData Collection",
    image: "/images/services-page/field-research-services.png",
    imageAlt: "Field Research & Data Collection",
    accentColor: "#E0694D",
    barColor: "#EEA592",
  },
  {
    id: 1,
    title: "Multimedia\nStorytelling",
    image: "/images/services-page/multimedia-service.png",
    imageAlt: "Multimedia Storytelling",
    accentColor: "#A57BB0",
    barColor: "#D1BFDD",
  },
  {
    id: 2,
    title: "Last-Mile\nData Collection",
    image: "/images/services-page/lastmile-services.png",
    imageAlt: "Last-Mile Data Collection",
    accentColor: "#7DAF7D",
    barColor: "#A6CCA2",
  },
  {
    id: 3,
    title: "Mystery\nShopping",
    image: "/images/services-page/mystery-shopping.services.png",
    imageAlt: "Mystery Shopping",
    accentColor: "#8B9DC3",
    barColor: "#BAC8DF",
  },
];

const INTERVAL_MS = 3000;

function NotchedBars({ color }: { color: string }) {
  const tabs = 7;
  const w = 260;
  const h = 8;
  const step = w / tabs;

  const makePath = (yTop: number) => {
    const d: string[] = [
      `M 0 ${yTop}`,
      `L ${w} ${yTop}`,
      `L ${w - 4} ${yTop + h}`,
    ];
    for (let i = tabs - 1; i > 0; i--) {
      const x = i * step;
      d.push(`L ${(x + 3.5).toFixed(1)} ${yTop + h}`);
      d.push(`L ${x.toFixed(1)} ${yTop + 2.5}`);
      d.push(`L ${(x - 3.5).toFixed(1)} ${yTop + h}`);
    }
    d.push(`L 4 ${yTop + h}`);
    d.push("Z");
    return d.join(" ");
  };

  return (
    <svg
      viewBox="0 0 260 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-60 sm:max-w-65"
      aria-hidden="true"
    >
      <path
        d={makePath(0)}
        fill={color}
        className="transition-colors duration-500"
      />
      <path
        d={makePath(12)}
        fill={color}
        className="transition-colors duration-500"
      />
      <path
        d={makePath(24)}
        fill={color}
        className="transition-colors duration-500"
      />
    </svg>
  );
}

export function CoreServicesSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number, dir: "next" | "prev" = "next") => {
      if (animating || next === active) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setDirection(dir);
      setPrev(active);
      setAnimating(true);
      setActive(next);

      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 500);
    },
    [active, animating],
  );

  const goNext = useCallback(() => {
    goTo((active + 1) % services.length, "next");
  }, [active, goTo]);

  const goPrev = useCallback(() => {
    goTo((active - 1 + services.length) % services.length, "prev");
  }, [active, goTo]);

  // Auto-advance every 3s unless paused by user interaction
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [goNext, isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    // Resume auto play after brief delay
    setTimeout(() => setIsPaused(false), 2000);
  };

  const current = services[active];

  // Helper for desktop vertical slide transform
  const getDesktopStyle = (index: number) => {
    const isCur = index === active;
    const isOld = index === prev;

    if (!isCur && !isOld) {
      return {
        transform:
          direction === "next"
            ? "translate3d(0, 100%, 0)"
            : "translate3d(0, -100%, 0)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    if (isCur) {
      return {
        transform: "translate3d(0, 0%, 0)",
        opacity: 1,
        zIndex: 2,
        transition: animating
          ? "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)"
          : "none",
        pointerEvents: "auto" as const,
      };
    }

    // isOld (exiting)
    return {
      transform:
        direction === "next"
          ? "translate3d(0, -100%, 0)"
          : "translate3d(0, 100%, 0)",
      opacity: 1,
      zIndex: 1,
      transition: "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
      pointerEvents: "none" as const,
    };
  };

  // Helper for mobile horizontal slide transform
  const getMobileStyle = (index: number) => {
    const isCur = index === active;
    const isOld = index === prev;

    if (!isCur && !isOld) {
      return {
        transform:
          direction === "next"
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    if (isCur) {
      return {
        transform: "translate3d(0%, 0, 0)",
        opacity: 1,
        zIndex: 2,
        transition: animating
          ? "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)"
          : "none",
        pointerEvents: "auto" as const,
      };
    }

    // isOld (exiting)
    return {
      transform:
        direction === "next"
          ? "translate3d(-100%, 0, 0)"
          : "translate3d(100%, 0, 0)",
      opacity: 1,
      zIndex: 1,
      transition: "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
      pointerEvents: "none" as const,
    };
  };

  return (
    <section
      aria-labelledby="core-services-heading"
      className="bg-eri-grey-2 py-4 text-eri-dark sm:py-4 lg:py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container size="insights">
        {/* Section header */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2
            id="core-services-heading"
            className="font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[36px] lg:text-[42px]"
          >
            Our Core Services
          </h2>
          <p className="mx-auto mt-2.5 max-w-sm text-[13px] leading-[1.55] text-eri-grey-11 sm:max-w-md sm:text-[14px] lg:text-[15px]">
            Comprehensive solutions that combine data-driven methodologies with
            cultural intelligence to deliver impactful results
          </p>
        </div>

        {/* ── Desktop layout ─────────────────────────────────────────── */}
        <div className="hidden lg:flex lg:items-start lg:gap-2.5">
          {/* Left panel: capsule slider icon + Title + 3 Notched bars */}
          <div className="w-70 shrink-0 pt-1">
            <div className="flex items-start gap-3.5">
              {/* Vertical pill capsule indicator */}
              <div
                className="mt-1 flex w-3 flex-col items-center gap-1.5 rounded-full bg-black/5 px-1 py-1.5 shadow-inner"
                role="tablist"
                aria-label="Service slide selector"
              >
                {services.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to ${s.title.replace("\n", " ")}`}
                      onClick={() => goTo(i, i > active ? "next" : "prev")}
                      className={`rounded-full transition-all duration-300 focus-visible:outline-none ${
                        isActive
                          ? "h-3.5 w-1.5"
                          : "h-1.5 w-1.5 bg-black/25 hover:bg-black/40"
                      }`}
                      style={{
                        backgroundColor: isActive ? s.accentColor : undefined,
                      }}
                    />
                  );
                })}
              </div>

              {/* Title with smooth crossfade */}
              <div className="min-h-23">
                <h3
                  className={`font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-eri-dark whitespace-pre-line transition-all duration-300 xl:text-[36px] ${
                    animating
                      ? "translate-y-1 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  {current.title}
                </h3>
              </div>
            </div>

            {/* 3 Notched bars */}
            <div className="mt-7">
              <NotchedBars color={current.barColor} />
            </div>
          </div>

          {/* Right panel: image card taking full width of container up to page boundary */}
          <div className="min-w-0 flex-1">
            <div className="relative aspect-706/358 w-full overflow-hidden rounded-[20px] isolate">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 overflow-hidden rounded-[20px] will-change-transform"
                  style={getDesktopStyle(i)}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="rounded-[20px] object-cover"
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile layout ───────────────────────────────────────────── */}
        <div className="lg:hidden">
          {/* Header text with vertical capsule slider icon */}
          <div className="flex items-start gap-3">
            <div
              className="mt-1.5 flex w-3 flex-col items-center gap-1.5 rounded-full bg-black/5 px-1 py-1.5 shadow-inner"
              role="tablist"
              aria-label="Service slide selector"
            >
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to ${s.title.replace("\n", " ")}`}
                    onClick={() => goTo(i, i > active ? "next" : "prev")}
                    className={`rounded-full transition-all duration-300 focus-visible:outline-none ${
                      isActive ? "h-3.5 w-1.5" : "h-1.5 w-1.5 bg-black/25"
                    }`}
                    style={{
                      backgroundColor: isActive ? s.accentColor : undefined,
                    }}
                  />
                );
              })}
            </div>

            <div className="min-h-17.5">
              <h3
                className={`font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-eri-dark whitespace-pre-line transition-all duration-300 sm:text-[30px] ${
                  animating
                    ? "translate-y-1 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {current.title}
              </h3>
            </div>
          </div>

          {/* 3 Notched bars */}
          <div className="mt-5">
            <NotchedBars color={current.barColor} />
          </div>

          {/* Image card with horizontal side-by-side slide animation & touch swipe */}
          <div
            className="relative mt-6 aspect-706/358 w-full overflow-hidden rounded-[20px] isolate"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 overflow-hidden rounded-[20px] will-change-transform"
                style={getMobileStyle(i)}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="rounded-[20px] object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
