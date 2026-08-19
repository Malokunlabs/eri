import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

const contactOptions = [
  {
    title: "Call Our Phone Lines",
    description: ["Fastest way to reach someone.", "Weekdays, 9 to 6."],
    action: "Call Us",
    image: "/images/reach-us/Landline.svg",
    imageWidth: 340,
    imageHeight: 302,
    background: "bg-[#ffd0bf]",
  },
  {
    title: "Message on WhatsApp",
    description: ["Send a voice note if it's easier.", "We reply the same day."],
    action: "Text Us",
    image: "/images/reach-us/phone.svg",
    imageWidth: 328,
    imageHeight: 270,
    background: "bg-[#f5c7f5]",
  },
  {
    title: "Call Our Phone Lines",
    description: ["Fastest way to reach someone.", "Weekdays, 9 to 6."],
    action: "Email Us",
    image: "/images/reach-us/Monitor.svg",
    imageWidth: 340,
    imageHeight: 313,
    background: "bg-[#ffd0bf]",
  },
] as const;

export function ReachUsSection() {
  return (
    <section
      aria-labelledby="reach-us-heading"
      className="bg-eri-white py-14 text-eri-dark lg:pb-24 lg:pt-16"
    >
      <Container size="reach">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="reach-us-heading"
            className="max-w-[570px] font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] lg:text-[44px]"
          >
            Tell us the question. We&apos;ll go and find out for you.
          </h2>
          <Link
            href="#"
            className="eri-pill eri-pill--primary min-h-[40px] shrink-0 px-4 py-2.5 text-[14px]"
          >
            Book a Signal
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-[22px]">
          {contactOptions.map((option) => (
            <article
              className={`relative min-h-[342px] overflow-hidden rounded-[30px] ${option.background}`}
              key={option.action}
            >
              <div className="relative z-10 px-8 pt-8">
                <h3 className="font-display text-[22px] font-semibold leading-tight">
                  {option.title}
                </h3>
                <p className="mt-1 text-[14px] leading-[1.55] text-eri-grey-11">
                  {option.description.map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </p>
                <Link
                  href="#"
                  className="eri-pill mt-5 min-h-[38px] bg-transparent px-4 py-2 text-[14px] hover:bg-eri-dark hover:text-eri-white"
                >
                  {option.action}
                </Link>
              </div>

              <Image
                src={option.image}
                alt=""
                width={option.imageWidth}
                height={option.imageHeight}
                sizes="(max-width: 1023px) calc(100vw - 24px), 340px"
                className="pointer-events-none absolute bottom-0 left-0 h-auto w-full"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
