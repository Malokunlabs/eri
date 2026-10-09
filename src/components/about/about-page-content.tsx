"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "20k+", label: "Survey responses\ncollected" },
  { value: "500+", label: "Agents trained\nand deployed" },
  { value: "16", label: "States worked in,\nacross all 6 zones" },
  { value: "150+", label: "Retail outlets\naudited" },
  { value: "300+", label: "Field interviews\nconducted" },
  { value: "5", label: "Years actively\nin the field" },
] as const;

const teamMembers = [
  {
    name: "Paula Unegbu",
    role: "Head of Operations",
    image: "/images/about/paula.svg",
  },
  {
    name: "Dorcas Animasaun",
    role: "Social Media Manager",
    image: "/images/about/dorcas.svg",
  },
  {
    name: "Michael Ogundipe",
    role: "Project Manager",
    image: "/images/about/michael.svg",
  },
  {
    name: "Chidinma Okwuoha",
    role: "Full Stack Developer",
    image: "/images/about/chidinma.svg",
  },
  {
    name: "Heritage Osunniyi",
    role: "Market Research & Insights Associate",
    image: "/images/about/heritage.svg",
  },
  {
    name: "James Ojunibare",
    role: "Design Associate",
    image: "/images/about/james.svg",
  },
  {
    name: "Kate Chukwu",
    role: "Project Management & Product Ops Associate",
    image: "/images/about/kate.svg",
  },
  {
    name: "Mercy Adebiyi",
    role: "Social Media Manager",
    image: "/images/about/mercy.svg",
  },
  {
    name: "Promise Owojori",
    role: "Finance and Operations Associate",
    image: "/images/about/promise.svg",
  },
  {
    name: "Tobiloba Oluwagbemi",
    role: "Design Associate",
    image: "/images/about/tobi.svg",
  },
] as const;

function TeamArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-6 ${direction === "left" ? "rotate-180" : ""}`}
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
  );
}

export function AboutPageContent() {
  const railRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const moveRail = useCallback((direction: -1 | 1, wrap = false) => {
    const rail = railRef.current;

    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-team-card]");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 20;
    const distance = (card?.offsetWidth ?? rail.clientWidth * 0.85) + gap;
    const maxScroll = rail.scrollWidth - rail.clientWidth;

    if (wrap && direction === 1 && rail.scrollLeft >= maxScroll - 4) {
      rail.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    rail.scrollBy({ left: distance * direction, behavior: "smooth" });
  }, []);

  // Auto-advance every 2 seconds; pauses while the user interacts.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (!isPaused.current) moveRail(1, true);
    }, 2000);

    return () => window.clearInterval(id);
  }, [moveRail]);

  return (
    <div className="bg-eri-white overflow-x-hidden">
      {/* Section 1: Hero Section */}
      <section className="relative w-full overflow-hidden bg-eri-coral text-eri-white">
        {/* Navbar */}
        <SiteHeader variant="dark" />

        {/* Hero Content */}
        <div className="pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-32 lg:pt-16">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div>
                <h1 className="font-display text-[44px] font-semibold leading-[1.04] tracking-tight text-white sm:text-[56px] lg:text-[64px]">
                  About Us
                </h1>
                <p className="mt-5 max-w-105 text-[15px] leading-[1.55] text-white/95 sm:text-[16px]">
                  Eri exists because the most important things about a market in
                  Nigeria are not written down anywhere, and someone has to go
                  and see them.
                </p>
                <div className="mt-7 sm:mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-eri-dark bg-eri-coral-dark px-7 py-2.5 font-display text-[15px] font-medium text-white shadow-sm transition-all hover:bg-eri-coral-dark/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Book a Signal
                  </Link>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end">
                <Image
                  src="/images/about/3lines.png"
                  alt=""
                  width={274}
                  height={157}
                  className="h-auto w-60 sm:w-68.5"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Zebra Crossing Graphic */}
        <div className="w-full">
          <Image
            src="/images/about/zebra-crossing.png"
            alt=""
            width={1440}
            height={200}
            className="h-auto w-full object-cover object-bottom"
          />
        </div>
      </section>

      {/* Section 2: What We Do */}
      <section
        aria-labelledby="what-we-do-heading"
        className="relative overflow-x-clip pt-16 pb-0 -mb-0.5 sm:pt-24 sm:-mb-1 lg:pt-36 lg:mb-0"
      >
        <Container size="insights">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
            {/* Left Column: Heading, intro, and stats grid */}
            <div className="flex min-w-0 flex-col justify-center lg:pb-20 lg:pr-4">
              <h2
                id="what-we-do-heading"
                className="font-display text-[38px] font-semibold leading-[1.06] tracking-tight text-eri-dark sm:text-[48px] lg:text-[54px]"
              >
                What we do
              </h2>
              <p className="mt-4 max-w-85 text-[14px] leading-[1.55] text-eri-grey-11 sm:max-w-115 sm:text-[15px]">
                We go to the places our clients can&apos;t be, and we report
                back what we saw. Nothing is gathered by phone, or bought from a
                panel.
              </p>

              {/* Stats Grid */}
              <div className="mt-9 grid grid-cols-3 gap-x-2 gap-y-8.5 xs:gap-x-3.5 sm:mt-12 sm:gap-x-8 sm:gap-y-10">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="font-display text-[25px] font-bold leading-tight text-eri-dark xs:text-[27px] sm:text-[34px] lg:text-[38px]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 whitespace-pre-line text-[11px] leading-[1.3] text-eri-grey-11 xs:text-[11.5px] sm:text-[13px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Mobile uses folder.png, desktop uses rightside-desktop.svg */}

            {/* Mobile only: folder.png with text overlay */}
            <div className="relative flex min-w-0 justify-end self-end translate-y-0.5 sm:translate-y-1 lg:hidden">
              <div className="relative aspect-783/640 w-[110vw] shrink-0 -mr-[calc(0.75rem+18.2vw)] sm:mr-0 sm:w-125">
                <Image
                  src="/images/about/folder.png"
                  alt=""
                  fill
                  sizes="(max-width: 639px) 110vw, 500px"
                  className="pointer-events-none object-contain object-bottom"
                  priority
                />
                {/* Text overlay — mathematically locked to the beige paper inside folder.png */}
                <div
                  className="absolute flex flex-col justify-start overflow-hidden"
                  style={{
                    left: "7.5%",
                    width: "73%",
                    top: "2.5%",
                    height: "48%",
                    padding: "clamp(8px, 2.2vw, 20px)",
                  }}
                >
                  <p
                    className="max-w-73.75 font-sans font-normal leading-[1.46] text-eri-dark sm:max-w-none"
                    style={{ fontSize: "clamp(11px, 1.1vw, 15px)" }}
                  >
                    Brands ask us to prove things they can&apos;t prove from a
                    spreadsheet. Whether the users are real, whether the product
                    is on the shelf, whether the trade spend was actually spent,
                    whether the money reached the people it was meant for. Our
                    people go out, look, and bring back evidence with a place
                    and a time attached to it.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop only: rightside-desktop.svg bleeding to the right edge */}
            <div className="relative hidden self-end lg:block">
              {/* Negative right margin bleeds SVG to the viewport right edge */}
              <div
                className="relative"
                style={{
                  marginRight:
                    "calc(-1 * max(0px, (100vw - 1096px) / 2 + 32px))",
                }}
              >
                <Image
                  src="/images/about/rightside-desktop.svg"
                  alt="What we do — Brands ask us to prove things they can't prove from a spreadsheet"
                  width={652}
                  height={457}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Meet The Founders */}
      <section aria-label="Meet The Founders">
        {/* Founder 1: Logo Oluwamuyiwa (Orange Background) */}
        <div className="bg-eri-coral py-16 text-white sm:py-20 lg:py-28">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
                <div className="relative aspect-464/513 w-full max-w-115">
                  <Image
                    src="/images/about/manonleft.png"
                    alt="Logo Oluwamuyiwa"
                    fill
                    sizes="(max-width: 1023px) 100vw, 460px"
                    className="pointer-events-none object-contain"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="text-[14px] font-medium tracking-wide text-white/90">
                  Meet The Founder
                </p>
                <h3 className="mt-2 font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
                  Logo Oluwamuyiwa
                </h3>
                <div className="mt-4 max-w-115 space-y-4 text-[15px] leading-[1.55] text-white/90 sm:mt-5 sm:text-[16px] sm:leading-[1.65]">
                  <p>
                    Logo &ldquo;Logor&rdquo; Oluwamuyiwa is the Founder of ERI,
                    an evidence infrastructure company building systems to make
                    informal economies more legible.
                  </p>
                  <p>
                    For more than a decade, his work has spanned field research,
                    technology, culture and human behaviour, studying how
                    people, merchants and markets operate beyond what
                    conventional datasets can see.
                  </p>
                  <p>
                    He founded Malokun Labs, a research and intelligence
                    company working across financial services, consumer goods,
                    public-sector and development contexts in Nigeria. That
                    experience led to ERI: infrastructure for capturing,
                    structuring and preserving permissioned evidence from real
                    economic activity.
                  </p>
                  <p>
                    Alongside his technology and research work, Logor is an
                    internationally exhibited visual artist whose documentation
                    of Lagos has been presented at the Museum of Modern Art
                    (MoMA), New York, and Somerset House, London.
                  </p>
                  <p>
                    Across both practices, his focus is to observe carefully,
                    preserve what others overlook, and turn lived reality into
                    something useful.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Founder 2: Logor Oluwamuyiwa (Purple Background)
        <div className="bg-[#9F45B6] py-16 text-white sm:py-20 lg:py-28">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="order-1">
                <p className="text-[14px] font-medium tracking-wide text-white/90">
                  Meet The Founder
                </p>
                <h3 className="mt-2 font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
                  Logor Oluwamuyiwa
                </h3>
                <p className="mt-4 max-w-115 text-[15px] leading-[1.55] text-white/90 sm:mt-5 sm:text-[16px] sm:leading-[1.65]">
                  57% of consumers had switched brands. 47% said they choose on
                  consistency, not price or advertising. From 244 retail
                  intercepts across Lagos, Abuja and Port Harcourt.
                </p>
              </div>

              <div className="order-2 flex justify-center lg:justify-end">
                <div className="relative aspect-464/513 w-full max-w-115">
                  <Image
                    src="/images/about/manonright.png"
                    alt="Logor Oluwamuyiwa"
                    fill
                    sizes="(max-width: 1023px) 100vw, 460px"
                    className="pointer-events-none object-contain"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        */}
      </section>

      {/* Section 4: Meet The Team */}
      <section
        aria-labelledby="meet-the-team-heading"
        className="overflow-hidden bg-eri-white py-16 text-eri-dark sm:py-20 lg:py-28"
      >
        <Container
          size="insights"
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2
            id="meet-the-team-heading"
            className="font-display text-[38px] font-semibold leading-[1.06] tracking-tight text-eri-dark sm:text-[48px] lg:text-[54px]"
          >
            Meet The Team
          </h2>
          <div className="flex items-center gap-5 sm:gap-6">
            <p className="max-w-65 text-[14px] leading-[1.4] text-eri-grey-11 sm:text-right">
              The people who plan the
              <br className="hidden sm:inline" /> work and answer for it.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                aria-label="Show previous team members"
                className="flex h-10 w-[54px] items-center justify-center rounded-full border border-eri-dark transition-colors hover:bg-eri-dark hover:text-eri-white"
                onClick={() => moveRail(-1)}
              >
                <TeamArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Show next team members"
                className="flex h-10 w-[54px] items-center justify-center rounded-full border border-eri-dark transition-colors hover:bg-eri-dark hover:text-eri-white"
                onClick={() => moveRail(1)}
              >
                <TeamArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </Container>

        <div
          className="relative left-1/2 mt-8 w-screen -translate-x-1/2 sm:mt-12 lg:mt-14"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          onFocus={() => (isPaused.current = true)}
          onBlur={() => (isPaused.current = false)}
          onTouchStart={() => (isPaused.current = true)}
          onTouchEnd={() => (isPaused.current = false)}
        >
          <div
            ref={railRef}
            className="flex snap-x snap-proximity scroll-pl-3 gap-5 overflow-x-auto scroll-smooth pl-3 pr-3 [scrollbar-width:none] sm:scroll-pl-[max(32px,calc((100vw-1096px)/2+32px))] sm:pl-[max(32px,calc((100vw-1096px)/2+32px))] sm:pr-[max(32px,calc((100vw-1096px)/2+32px))] lg:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {teamMembers.map((member) => (
              <article
                key={member.name}
                data-team-card
                className="w-[calc(100vw-48px)] max-w-[342px] shrink-0 snap-start sm:w-[320px] lg:w-[342px]"
              >
                <div className="relative aspect-[342/456] w-full overflow-hidden rounded-[24px]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    draggable={false}
                    sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 320px, 342px"
                    className="pointer-events-none object-contain"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
