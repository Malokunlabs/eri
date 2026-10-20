import Image from "next/image";

import { AudienceCardStack } from "@/components/home/audience-card-stack";
import { Container } from "@/components/ui/container";

const audienceDescription =
  "Eri is for the people who have to prove something is real on the ground—to a board, an investor, a regulator, or their own P&L. We are the witness: verified, evidenced, and un-farmable.";

export function AudienceSection() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="overflow-x-clip bg-eri-mauve text-eri-white"
    >
      <Container
        size="audience"
        className="grid gap-0 pb-1 pt-10 lg:grid-cols-[264px_384px_264px] lg:gap-x-10 xl:gap-x-12 lg:pb-0 lg:pt-0"
      >
        <div className="lg:sticky lg:top-0 lg:h-svh lg:pt-22">
          <h2
            id="audience-heading"
            className="font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:text-[44px]"
          >
            <span className="lg:hidden">Who is Eri for?</span>
            <span className="hidden lg:inline">
              Who is
              <br />
              Eri for?
            </span>
          </h2>
          <p className="mt-4 max-w-96 text-[13px] leading-[1.55] text-eri-coral-light sm:text-[14px] lg:text-[15px]">
            {audienceDescription}
          </p>
          <a
            href="/contact"
            className="eri-pill eri-pill--primary mt-6 min-h-8 px-3 py-2 text-[12px] lg:min-h-[42px] lg:px-4 lg:py-[11px] lg:text-[15px]"
          >
            Contact Us
          </a>

          <Image
            src="/images/this-for/3lines.svg"
            alt=""
            width={274}
            height={102}
            className="mt-9 h-auto w-full lg:hidden"
          />
          <Image
            src="/images/this-for/2lines.svg"
            alt=""
            width={274}
            height={157}
            className="mt-9 hidden h-auto w-full lg:block lg:max-w-[274px]"
          />
        </div>

        <AudienceCardStack />
      </Container>
    </section>
  );
}
