"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { TESTIMONIALS } from "@/lib/testimonials-data";

const HAS_CAROUSEL = TESTIMONIALS.length > 1;

type AnimPhase = "stacked" | "fanning" | "transitioning";

export function ContactPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<AnimPhase>("stacked");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "59cb37c1-c48f-4a5f-86f8-40bf7ed949ef";

    try {
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append(
        "name",
        `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      );
      payload.append("email", formData.email.trim());
      payload.append("message", formData.message.trim());
      payload.append(
        "subject",
        `New Project Inquiry from ${formData.firstName.trim()} [Eri]`,
      );
      payload.append("from_name", "Eri Website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        if (res.status === 403) {
          throw new Error(
            data.message ||
              "Domain not whitelisted in Web3Forms. Please add 'localhost' (or your production domain) under Form Settings in Web3Forms.",
          );
        }
        throw new Error(
          data.message || "Failed to submit form. Please try again.",
        );
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please reach out to info@useeri.com directly.",
      );
    }
  };

  useEffect(() => {
    if (!HAS_CAROUSEL) return;
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
    <div className="relative min-h-screen overflow-x-hidden bg-eri-dark">
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
        <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative z-40">
        <SiteHeader variant="dark" />
      </div>

      {/* Main */}
      <main
        id="main-content"
        className="relative z-10 pt-6 pb-8 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14"
      >
        <Container size="reach">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-12 xl:gap-16">
            {/* Left side: Header (top) + Cards (bottom) */}
            <div className="contents lg:col-start-1 lg:flex lg:h-full lg:flex-col lg:justify-between">
              {/* Header text: order-1 on mobile */}
              <div className="order-1">
                <h1 className="max-w-[480px] font-display text-[38px] font-semibold leading-[1.04] tracking-tight text-white sm:text-[46px] lg:text-[50px]">
                  Tell us about
                  <br />
                  your next project
                </h1>
                <p className="mt-3.5 max-w-[420px] text-[14px] leading-[1.5] text-white/85 sm:text-[14.5px]">
                  Tell us what you need to find out. We&apos;ll come back within
                  one working day with what it would take to answer it.
                </p>
              </div>

              {/* Testimonial Cards: order-3 on mobile (beneath form) */}
              <div className="order-3 mt-8 sm:mt-10 lg:mt-9 lg:w-full lg:max-w-[430px]">
                <div
                  className="relative h-[242px] w-full max-w-[430px]"
                  aria-live="polite"
                  aria-label="Client testimonials"
                >
                  {HAS_CAROUSEL && (
                    <>
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
                    </>
                  )}
                  <TestimonialCard
                    testimonial={TESTIMONIALS[frontIdx]}
                    layer="front"
                    phase={phase}
                  />
                </div>
              </div>
            </div>

            {/* Form: order-2 on mobile (between header and cards), Col 2 on desktop */}
            <div className="order-2 lg:col-start-2 lg:h-full">
              <div className="flex h-full flex-col justify-between rounded-[28px] border border-eri-grey-4/80 bg-eri-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:p-7 lg:p-8 xl:p-9">
                <form
                  onSubmit={handleSubmit}
                  className="flex h-full flex-col justify-between gap-3.5 sm:gap-4"
                >
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        placeholder="Enter your First Name"
                        className="eri-field h-12 rounded-[14px] border border-eri-grey-5 bg-white px-4 text-[14px] text-eri-dark placeholder:text-eri-grey-10 focus:border-eri-grey-8 focus:outline-none"
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
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        placeholder="Enter your Last Name"
                        className="eri-field h-12 rounded-[14px] border border-eri-grey-5 bg-white px-4 text-[14px] text-eri-dark placeholder:text-eri-grey-10 focus:border-eri-grey-8 focus:outline-none"
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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="Enter your work email"
                      className="eri-field h-12 rounded-[14px] border border-eri-grey-5 bg-white px-4 text-[14px] text-eri-dark placeholder:text-eri-grey-10 focus:border-eri-grey-8 focus:outline-none"
                    />
                  </div>

                  <div className="min-h-[125px] flex-1 sm:min-h-[135px]">
                    <label htmlFor="message" className="sr-only">
                      What do you need to find out?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What do you need to find out?"
                      className="eri-field eri-field--textarea h-full min-h-[125px] w-full resize-none rounded-[14px] border border-eri-grey-5 bg-white p-4 text-[14px] text-eri-dark placeholder:text-eri-grey-10 focus:border-eri-grey-8 focus:outline-none"
                    />
                  </div>

                  {status === "success" && (
                    <div
                      role="status"
                      className="rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-800"
                    >
                      ✓ Thank you! We&apos;ve received your inquiry and will be
                      in touch within one working day.
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-[14px] border border-rose-200 bg-rose-50 px-4 py-2.5 text-[13px] text-rose-800"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="eri-pill eri-pill--primary min-h-[46px] w-full rounded-full bg-eri-coral-dark px-7 py-3 text-[14.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#b04018] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
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
    height: "224px",
    transition:
      "transform 500ms cubic-bezier(0.34, 1.1, 0.64, 1), opacity 500ms ease, top 500ms cubic-bezier(0.34, 1.1, 0.64, 1)",
    willChange: "transform, opacity, top",
    transformOrigin: "top center",
  };

  // ── STACKED: Stepped tabs visible at top, uniform bottom covered by front card ──
  if (phase === "stacked") {
    if (layer === "back") {
      return {
        ...base,
        zIndex: 1,
        top: "0px",
        transform: "scaleX(0.92)",
        opacity: 0.65,
      };
    }
    if (layer === "mid") {
      return {
        ...base,
        zIndex: 2,
        top: "9px",
        transform: "scaleX(0.96)",
        opacity: 0.85,
      };
    }
    return {
      ...base,
      zIndex: 3,
      top: "18px",
      transform: "scaleX(1)",
      opacity: 1,
    };
  }

  // ── FANNING: Gentle rotation & lift ──
  if (phase === "fanning") {
    if (layer === "back") {
      return {
        ...base,
        zIndex: 1,
        top: "-6px",
        transform: "translateX(-8px) rotate(-3deg) scaleX(0.92)",
        opacity: 0.7,
      };
    }
    if (layer === "mid") {
      return {
        ...base,
        zIndex: 2,
        top: "6px",
        transform: "translateX(-4px) rotate(-1.5deg) scaleX(0.96)",
        opacity: 0.88,
      };
    }
    return {
      ...base,
      zIndex: 3,
      top: "20px",
      transform: "scaleX(1)",
      opacity: 1,
    };
  }

  // ── TRANSITIONING: Front exits up, mid → front, back → mid ──
  if (layer === "back") {
    return {
      ...base,
      zIndex: 2,
      top: "9px",
      transform: "scaleX(0.96)",
      opacity: 0.85,
    };
  }
  if (layer === "mid") {
    return {
      ...base,
      zIndex: 3,
      top: "18px",
      transform: "scaleX(1)",
      opacity: 1,
    };
  }
  // Front exits upward
  return {
    ...base,
    zIndex: 1,
    top: "-26px",
    transform: "translateX(-12px) rotate(-4deg) scale(0.92)",
    opacity: 0,
  };
}

function TestimonialCard({ testimonial, layer, phase }: CardProps) {
  const style = getCardStyle(layer, phase);

  const layerBg =
    layer === "back"
      ? "bg-[#ded9d0] border-[#ccc6bb]"
      : layer === "mid"
        ? "bg-[#eae5dc] border-[#dad4c9]"
        : "bg-eri-white border-eri-grey-4/80 shadow-[0_12px_32px_rgba(0,0,0,0.16)]";

  return (
    <figure
      style={style}
      className={`flex flex-col justify-between rounded-[22px] border p-5 select-none sm:rounded-[24px] sm:p-5.5 ${layerBg}`}
    >
      <blockquote className="line-clamp-7 text-[12px] leading-[1.45] text-eri-grey-11 sm:text-[12.5px]">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-3 flex items-center justify-between gap-3 pt-0.5">
        <div className="flex min-w-0 items-center gap-3">
          {testimonial.avatar && (
            <Image
              src={testimonial.avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-[14.5px] font-semibold leading-tight text-eri-dark">
              {testimonial.name}
            </p>
            <p className="mt-0.5 truncate text-[12px] leading-tight text-eri-grey-11">
              {testimonial.company}
            </p>
          </div>
        </div>

        <Image
          src={testimonial.logo}
          alt=""
          width={80}
          height={32}
          className="h-8 w-auto max-w-[90px] shrink-0 object-contain"
        />
      </figcaption>
    </figure>
  );
}
