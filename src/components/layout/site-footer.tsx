import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

const companyLinks = ["Home", "About", "Services", "FAQs"] as const;
const exploreLinks = ["Case Studies", "Insights", "Reports"] as const;
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
  "Case Studies": "/case-studies",
  Insights: "/insights",
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
      <h3 className="font-display text-[18px] font-semibold leading-tight">
        {title}
      </h3>
      <ul className="mt-3 space-y-3 text-[15px] leading-tight">
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
  return (
    <footer className="relative mt-auto overflow-hidden bg-eri-coral text-eri-white">
      <Container size="footer">
        <section
          aria-labelledby="newsletter-title"
          className="flex flex-col items-center pt-16 text-center lg:pt-24"
        >
          <h2
            id="newsletter-title"
            className="max-w-[650px] font-display text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[42px]"
          >
            Get Ground-level
            <br />
            Intelligence, in your inbox
          </h2>
          <p className="mt-4 text-[15px] leading-[1.5] text-eri-coral-light">
            We send Signals, field observations and consumer trends from across
            Nigeria.
          </p>

          <form
            action="#"
            className="mt-10 flex h-14 w-full max-w-[536px] items-center rounded-full bg-eri-white p-2 text-eri-dark"
          >
            <Image
              src="/icons/icons/search-icon.svg"
              alt=""
              width={20}
              height={20}
              className="ml-2 size-5 shrink-0"
            />
            <label htmlFor="footer-email" className="sr-only">
              Work email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your work email"
              className="min-w-0 flex-1 bg-transparent px-3 text-[14px] outline-none placeholder:text-eri-grey-10"
            />
            <button type="submit" className="eri-pill eri-pill--signup shrink-0">
              Sign Up
            </button>
          </form>
        </section>

        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 sm:mt-32 sm:grid-cols-3 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1fr_auto] lg:gap-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Image
              src="/logo/header/logo.svg"
              alt="Eri"
              width={135}
              height={48}
            />
            <p className="mt-5 max-w-[225px] text-[15px] leading-[1.5] text-eri-coral-light">
              We gather field intelligence on the ground across Nigeria.
            </p>
            <Link href="#" className="eri-pill eri-pill--footer mt-6">
              Book a Signal
            </Link>
          </div>

          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Explore" links={exploreLinks} />

          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-[18px] font-semibold leading-tight">
              Contact
            </h3>
            <div className="mt-3 space-y-3 text-[15px] leading-tight">
              <p>(234) 801 234 3678</p>
              <p>(234) 801 987 6543</p>
              <p>hello@eri.africa</p>
            </div>
          </div>

          <div className="col-span-2 flex items-start gap-3 sm:col-span-3 lg:col-span-1 lg:justify-end">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-white"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={social.size}
                  height={social.size}
                  className="shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mt-16 h-[500px] sm:h-[680px] lg:h-[900px]">
          <Image
            src="/logo/footer/eri-logo.svg"
            alt=""
            width={1072}
            height={571}
            className="absolute left-0 top-0 h-auto w-full"
          />

          <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-between border-b border-eri-bone pb-4 font-display text-[12px] sm:bottom-12 sm:text-[14px] lg:bottom-auto lg:top-[650px]">
            <div className="flex items-center gap-8">
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
            className="absolute left-1/2 top-[150px] z-20 h-auto w-[min(88vw,430px)] -translate-x-1/2 sm:top-[250px] sm:w-[600px] lg:left-[58%] lg:top-[400px] lg:w-[770px]"
          />
        </div>
      </Container>
    </footer>
  );
}
