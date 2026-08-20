import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "4500", label: "Agents trained" },
  { value: "5800", label: "Surveys ran" },
  { value: "219", label: "Interviews" },
  { value: "219", label: "Interviews" },
  { value: "4500", label: "Agents trained" },
  { value: "5800", label: "Surveys ran" },
] as const;

export function AboutPageContent() {
  return (
    <div className="bg-eri-white">
      {/* Section 1: Hero Section */}
      <section className="relative w-full overflow-hidden bg-eri-coral text-eri-white">
        {/* Navbar */}
        <SiteHeader variant="dark" />

        {/* Hero Content */}
        <div className="pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-32 lg:pt-16">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div>
                <h1 className="font-display text-[44px] font-semibold leading-[1.04] tracking-[-0.025em] text-white sm:text-[56px] lg:text-[64px]">
                  About Us
                </h1>
                <p className="mt-5 max-w-[420px] text-[15px] leading-[1.55] text-white/95 sm:text-[16px]">
                  Eri exists because the most important things about a market in
                  Nigeria are not written down anywhere, and someone has to go
                  and see them.
                </p>
              </div>

              <div className="flex justify-start lg:justify-end">
                <Image
                  src="/images/about/3lines.png"
                  alt=""
                  width={274}
                  height={157}
                  className="h-auto w-[240px] sm:w-[274px]"
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
        className="relative py-16 sm:py-24 lg:py-32"
      >
        {/* Folder image — absolute to section, bleeds right edge + bottom into founders */}
        <div className="absolute inset-y-0 right-0 w-[56%]">
          {/* Container taller than the section so orange body flows into next section */}
          <div className="relative h-[170%]">
            <Image
              src="/images/about/folder.png"
              alt=""
              fill
              sizes="56vw"
              className="pointer-events-none object-contain object-right-top"
            />
            {/* Text overlay on the beige paper — top portion of the folder image */}
            <div className="absolute inset-x-[6%] top-[2%] flex h-[36%] items-center px-6 sm:px-8 lg:px-10">
              <p className="font-sans text-[14px] font-normal leading-relaxed text-eri-dark sm:text-[16px] lg:text-[18px]">
                Brands ask us to prove things they can&apos;t prove from a
                spreadsheet. Whether the users are real, whether the product
                is on the shelf, whether the trade spend was actually spent,
                whether the money reached the people it was meant for. Our
                people go out, look, and bring back evidence with a place and
                a time attached to it.
              </p>
            </div>
          </div>
        </div>

        <Container size="insights">
          {/* Only left column is in normal flow; right side is occupied by the absolute folder */}
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col justify-center lg:pr-16">
              <h2
                id="what-we-do-heading"
                className="font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.025em] text-eri-dark sm:text-[48px] lg:text-[54px]"
              >
                What we do
              </h2>
              <p className="mt-4 max-w-[390px] text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                We go to the places our clients can&apos;t be, and we report
                back what we saw. Nothing is gathered by phone, or bought from a
                panel.
              </p>

              {/* Stats Grid */}
              <div className="mt-12 grid grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="font-sans text-[28px] font-bold leading-tight text-eri-dark sm:text-[34px] lg:text-[38px]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-tight text-eri-grey-11 sm:text-[13px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column is empty — visually occupied by the absolute folder above */}
            <div aria-hidden="true" />
          </div>
        </Container>
      </section>

      {/* Section 3: Meet The Founders */}
      <section aria-label="Meet The Founders">
        {/* Founder 1: Lola Talabi-Oni (Orange Background) */}
        <div className="bg-eri-coral py-16 text-white sm:py-20 lg:py-28">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[450/420] w-full max-w-[460px] overflow-hidden ">
                <Image
                  src="/images/about/manonleft.png"
                  alt="Lola Talabi-Oni"
                  fill
                  sizes="(max-width: 1023px) 100vw, 460px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-[14px] font-medium tracking-wide text-white/90">
                  Meet The Founder
                </p>
                <h3 className="mt-2 font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
                  Lola Talabi-Oni
                </h3>
                <div className="mt-5 space-y-4 max-w-[460px] text-[14px] leading-[1.65] text-white/90 sm:text-[15px]">
                  <p>
                    A selection of projects that show how organizations have
                    used ERI to answer important business and brand growth
                    questions.
                  </p>
                  <p>
                    A selection of projects that show how organizations have
                    used ERI to answer important business and brand growth
                    questions. A selection of projects that show how
                    organizations have used ERI to answer important business and
                    brand growth questions.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Founder 2: Logor Oluwamuyiwa (Purple Background) */}
        <div className="bg-[#9F45B6] py-16 text-white sm:py-20 lg:py-28">
          <Container size="insights">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <p className="text-[14px] font-medium tracking-wide text-white/90">
                  Meet The Founder
                </p>
                <h3 className="mt-2 font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
                  Logor Oluwamuyiwa
                </h3>
                <div className="mt-5 space-y-4 max-w-[460px] text-[14px] leading-[1.65] text-white/90 sm:text-[15px]">
                  <p>
                    A selection of projects that show how organizations have
                    used ERI to answer important business and brand growth
                    questions.
                  </p>
                  <p>
                    A selection of projects that show how organizations have
                    used ERI to answer important business and brand growth
                    questions. A selection of projects that show how
                    organizations have used ERI to answer important business and
                    brand growth questions.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-start lg:justify-end">
                <div className="relative aspect-[450/420] w-full max-w-[460px] overflow-hidden ">
                  <Image
                    src="/images/about/manonright.png"
                    alt="Logor Oluwamuyiwa"
                    fill
                    sizes="(max-width: 1023px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
