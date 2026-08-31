import Image from "next/image";

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

export function AboutPageContent() {
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
        className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-0"
      >
        <Container size="insights">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            {/* Left Column: Heading, intro, and stats grid */}
            <div className="flex flex-col justify-center lg:pb-24 lg:pr-4">
              <h2
                id="what-we-do-heading"
                className="font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.025em] text-eri-dark sm:text-[48px] lg:text-[54px]"
              >
                What we do
              </h2>
              <p className="mt-4 max-w-100 text-[14px] leading-[1.55] text-eri-grey-11 sm:text-[15px]">
                We go to the places our clients can&apos;t be, and we report
                back what we saw. Nothing is gathered by phone, or bought from a
                panel.
              </p>

              {/* Stats Grid */}
              <div className="mt-12 grid grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="font-display text-[28px] font-bold leading-tight text-eri-dark sm:text-[34px] lg:text-[38px]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 whitespace-pre-line text-[12px] leading-snug text-eri-grey-11 sm:text-[13px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Folder with document text overlay */}
            <div className="relative flex justify-end lg:-mr-12 xl:-mr-20 lg:translate-y-8 xl:translate-y-12">
              <div className="relative aspect-783/640 w-full max-w-140 lg:max-w-165">
                <Image
                  src="/images/about/folder.png"
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 660px"
                  className="pointer-events-none object-contain object-bottom"
                  priority
                />

                {/* Text overlay — mathematically locked to the beige paper inside folder.png
                    Paper is from 5.75% to 83.52% horizontally, and visible before the flap from 0% to 50% vertically */}
                <div
                  className="absolute flex flex-col justify-center overflow-hidden"
                  style={{
                    left: "8%",
                    width: "72%",
                    top: "4%",
                    height: "44%",
                    padding: "clamp(10px, 1.8vw, 24px)",
                  }}
                >
                  <p
                    className="font-sans font-normal leading-[1.55] text-eri-dark"
                    style={{ fontSize: "clamp(12px, 1.15vw, 16px)" }}
                  >
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
