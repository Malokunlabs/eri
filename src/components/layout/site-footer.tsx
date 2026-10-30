"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

const companyLinks = ["Home", "About", "Services", "FAQs"] as const;
const exploreLinks = ["Case Studies", "Windows", "Reports"] as const;
const socialLinks = [
  { label: "X", icon: "/icons/social-media-icons/twitter.svg", size: 32 },
  {
    label: "LinkedIn",
    icon: "/icons/social-media-icons/linkedin.svg",
    size: 32,
  },
  {
    label: "Instagram",
    icon: "/icons/social-media-icons/instagram.svg",
    size: 40,
  },
  {
    label: "WhatsApp",
    icon: "/icons/social-media-icons/Whatsapp.svg",
    size: 40,
  },
] as const;

const linkHrefMap: Record<string, string> = {
  Home: "/",
  About: "/about",
  Services: "/services",
  "Case Studies": "/case-studies",
  Windows: "/insights",
  "Video Diaries": "/video-diaries",
  Reports: "/reports",
  Contact: "/contact",
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly string[];
}) {
  return (
    <div>
      <h3 className="font-display text-[16px] font-semibold leading-tight sm:text-[18px]">
        {title}
      </h3>
      <ul className="mt-3 space-y-3 text-[13px] leading-tight sm:text-[15px]">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={linkHrefMap[link] || "#"}
              className="rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("submitting");
    setFeedbackMsg("");

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "59cb37c1-c48f-4a5f-86f8-40bf7ed949ef";

    try {
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("email", trimmedEmail);
      payload.append(
        "subject",
        `New Signal / Newsletter Subscription from ${trimmedEmail} [Eri]`,
      );
      payload.append("from_name", "Eri Website");
      payload.append(
        "message",
        `Please subscribe ${trimmedEmail} to Eri Signals, field observations, and Ask Eri updates.`,
      );

      // Submit client-side to Web3Forms (same as Contact page) and sync with Ask Eri in parallel
      const [res] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        }),
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: trimmedEmail }),
        }).catch(() => null),
      ]);

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Unable to subscribe right now. Please try again.",
        );
      }

      setStatus("success");
      setFeedbackMsg(
        "✓ You're subscribed! You'll be notified when new Signals and field observations are published.",
      );
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedbackMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <footer className="relative mt-auto overflow-hidden bg-eri-coral text-eri-white">
      <Container size="footer">
        <section
          aria-labelledby="newsletter-title"
          className="flex flex-col items-center pt-16 text-center lg:pt-24"
        >
          <h2
            id="newsletter-title"
            className="max-w-[650px] font-display text-[clamp(20px,6.15vw,24px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:text-[44px]"
          >
            Get Ground-level
            <br />
            Intelligence, in your inbox
          </h2>
          <p className="mt-3 text-[13px] leading-[1.55] text-eri-coral-light sm:mt-4 sm:text-[15px]">
            We send Signals, field observations and consumer trends from across
            Nigeria.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex h-12 w-full max-w-[536px] items-center rounded-full bg-eri-white p-1.5 text-eri-dark sm:mt-10 sm:h-14 sm:p-2"
          >
            <Image
              src="/icons/icons/search-icon.svg"
              alt=""
              width={20}
              height={20}
              className="ml-2 size-4 shrink-0 sm:size-5"
            />
            <label htmlFor="footer-email" className="sr-only">
              Work email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                  setFeedbackMsg("");
                }
              }}
              autoComplete="email"
              placeholder="Enter your work email"
              className="min-w-0 flex-1 bg-transparent px-2 text-[12px] outline-none placeholder:text-eri-grey-10 sm:px-3 sm:text-[14px]"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="eri-pill eri-pill--signup shrink-0 disabled:cursor-not-allowed disabled:opacity-60 max-sm:min-h-8 max-sm:px-3 max-sm:py-1.5 max-sm:text-[12px]"
            >
              {status === "submitting" ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {feedbackMsg && (
            <p
              role={status === "error" ? "alert" : "status"}
              className={`mt-3 text-[13px] sm:text-[14px] ${
                status === "error" ? "text-white font-medium" : "text-eri-coral-light"
              }`}
            >
              {feedbackMsg}
            </p>
          )}
        </section>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-32 sm:grid-cols-3 sm:gap-y-12 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1fr_auto] lg:gap-12">
          <div className="sm:col-span-3 lg:col-span-1">
            <Image
              src="/logo/header/reworked-white.svg"
              alt="Eri, a Malokun Labs company"
              width={184}
              height={32}
              className="h-auto w-[130px] sm:w-[180px]"
            />
            <p className="mt-4 max-w-[225px] text-[13px] leading-[1.5] text-eri-coral-light sm:mt-5 sm:text-[15px]">
              We gather field intelligence on the ground across Nigeria.
            </p>
            <a
              href="/contact"
              className="eri-pill eri-pill--footer mt-5 max-sm:min-h-8 max-sm:px-3 max-sm:py-1.5 max-sm:text-[12px] sm:mt-6"
            >
              Contact Us
            </a>
          </div>

          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Explore" links={exploreLinks} />

          <div>
            <h3 className="font-display text-[16px] font-semibold leading-tight sm:text-[18px]">
              Contact
            </h3>
            <div className="mt-3 space-y-3 text-[13px] leading-tight sm:text-[15px]">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="transition-opacity hover:opacity-70"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.contact.emailHref}
                  className="transition-opacity hover:opacity-70"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3 sm:col-span-3 sm:justify-start lg:col-span-1 lg:justify-end">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={
                  social.label === "WhatsApp"
                    ? siteConfig.contact.whatsappHref
                    : "#"
                }
                {...(social.label === "WhatsApp"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={social.size}
                  height={social.size}
                  className="h-auto w-7 shrink-0 sm:w-auto"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mt-16 h-[calc((100vw-24px)*1.05)] sm:h-[680px] lg:h-[900px]">
          <Image
            src="/logo/footer/eri-logo.svg"
            alt=""
            width={1072}
            height={571}
            className="absolute left-0 top-0 h-auto w-full"
          />

          <div className="absolute inset-x-0 bottom-5 z-30 hidden items-center justify-between border-b border-eri-bone pb-4 font-display text-[10px] sm:bottom-12 sm:z-10 sm:text-[14px] lg:bottom-auto lg:top-[650px] lg:flex">
            <div className="flex items-center gap-4 sm:gap-8">
              <span>© {new Date().getFullYear()} ERI</span>
              <Link href="#" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
            <Link
              href="#main-content"
              className="transition-opacity hover:opacity-70"
            >
              Back to Top ↑
            </Link>
          </div>

          <Image
            src="/logo/footer/folder-footer.svg"
            alt="A folder highlighting Eri's network of over 12,000 active field agents"
            width={770}
            height={500}
            className="pointer-events-none absolute left-[54%] top-[calc((100vw-24px)*0.38)] z-20 h-auto w-[85%] -translate-x-1/2 sm:left-1/2 sm:top-[250px] sm:w-[600px] lg:left-[58%] lg:top-[400px] lg:w-[770px]"
          />
        </div>
      </Container>
    </footer>
  );
}
