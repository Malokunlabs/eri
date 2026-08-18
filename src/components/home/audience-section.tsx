import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

const audienceDescription =
  "Eri is for the people who have to prove something is real on the ground—to a board, an investor, a regulator, or their own P&L. We are the witness: verified, evidenced, and un-farmable.";

const activationDescription =
  "You’re measured on active users, but sign-ups can be farmed, and everyone knows it. Eri delivers activation you can defend: real people, onboarded by someone they already trust, every action stamped with place, time and proof. Traction that survives diligence.";

function ProfileStack() {
  return (
    <div className="relative mx-auto aspect-[384/596] w-full max-w-[384px]">
      <Image
        src="/images/this-for/director.svg"
        alt=""
        width={243}
        height={516}
        sizes="(max-width: 1023px) 63vw, 243px"
        className="absolute bottom-0 left-0 h-auto w-[63.3%]"
      />
      <Image
        src="/images/this-for/headofoperation.svg"
        alt=""
        width={199}
        height={465}
        sizes="(max-width: 1023px) 52vw, 199px"
        className="absolute bottom-0 left-[13%] h-auto w-[51.8%]"
      />
      <Image
        src="/images/this-for/headofgrowth.png"
        alt="Head of Growth profile for a fintech organization"
        width={304}
        height={596}
        sizes="(max-width: 1023px) 79vw, 304px"
        className="absolute bottom-0 right-0 h-auto w-[79.2%]"
      />
    </div>
  );
}

export function AudienceSection() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="overflow-hidden bg-eri-mauve text-eri-white"
    >
      <Container
        size="audience"
        className="grid gap-0 pb-12 pt-10 lg:grid-cols-[264px_384px_264px] lg:gap-x-[60px] lg:pb-12 lg:pt-0"
      >
        <div className="lg:pt-[88px]">
          <h2
            id="audience-heading"
            className="font-display text-[30px] font-semibold leading-[1.02] tracking-[-0.02em] lg:text-[44px]"
          >
            <span className="lg:hidden">Who is Eri for?</span>
            <span className="hidden lg:inline">
              Who is
              <br />
              Eri for?
            </span>
          </h2>
          <p className="mt-4 max-w-[264px] text-[12px] leading-[1.55] text-eri-coral-light lg:text-[15px]">
            {audienceDescription}
          </p>
          <Link
            href="#"
            className="eri-pill eri-pill--primary mt-6 min-h-8 px-3 py-2 text-[12px] lg:min-h-[42px] lg:px-4 lg:py-[11px] lg:text-[15px]"
          >
            Book a Signal
          </Link>

          <Image
            src="/images/this-for/2lines.svg"
            alt=""
            width={274}
            height={157}
            className="mt-9 h-auto w-full lg:max-w-[274px]"
          />
        </div>

        <div className="mt-1 lg:mt-0">
          <ProfileStack />
          <p className="mx-auto mt-6 hidden max-w-[368px] text-[14px] leading-[1.55] text-eri-coral-light lg:block">
            {activationDescription}
          </p>
        </div>

        <div className="mt-8 lg:mt-0 lg:pt-[88px]">
          <h3 className="font-display text-[22px] font-semibold leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
            <span className="lg:hidden">Fintechs, Wallets &amp; Neobanks</span>
            <span className="hidden lg:inline">
              Fintechs,
              <br />
              Wallets &amp;
              <br />
              Neobanks
            </span>
          </h3>
          <p className="mt-4 hidden text-[14px] leading-[1.55] text-eri-coral-light lg:block">
            CEO · Head of Growth · Head of Risk &amp; Fraud · Head of
            Distribution · VP Product
          </p>

          <div
            aria-hidden="true"
            className="mt-4 hidden h-5 w-[100px] items-center justify-center gap-1.5 rounded-full bg-eri-bone/60 lg:flex"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                className="size-2 rounded-full bg-eri-coral-light/80"
                key={index}
              />
            ))}
          </div>

          <p className="mt-4 text-[12px] leading-[1.55] text-eri-coral-light lg:hidden">
            {activationDescription}
          </p>

          <Image
            src="/images/this-for/3lines.svg"
            alt=""
            width={274}
            height={102}
            className="mt-9 h-auto w-full lg:mt-10 lg:max-w-[274px]"
          />
        </div>
      </Container>
    </section>
  );
}
