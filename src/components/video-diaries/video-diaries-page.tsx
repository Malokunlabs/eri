import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export function VideoDiariesPage() {
  return (
    <div className="bg-eri-grey-2">
      <SiteHeader variant="light" />

      <main id="main-content" className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <Container size="reach">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <h1 className="max-w-[480px] font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] text-eri-dark lg:text-[44px]">
                Tell us about your next project
              </h1>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.55] text-eri-grey-11">
                Share what you&apos;re trying to learn and we&apos;ll show you
                how video diaries can bring ground truth to your team.
              </p>

              <div className="relative mt-10 max-w-[420px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 top-0 h-full rounded-[24px] border border-eri-grey-5 bg-eri-white/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-1.5 top-2 h-full rounded-[24px] border border-eri-grey-5 bg-eri-white/70"
                />

                <figure className="relative rounded-[24px] border border-eri-grey-4 bg-eri-white p-6 shadow-[0_8px_24px_rgba(41,41,41,0.06)]">
                  <blockquote className="text-[14px] leading-[1.6] text-eri-grey-11">
                    &ldquo;Eri&apos;s video diaries gave us a clear picture of
                    what was actually happening in stores — not what we
                    assumed.&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/insights-section/man-on-suit.png"
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-display text-[15px] font-semibold leading-tight text-eri-dark">
                          Fred Okobi
                        </p>
                        <p className="text-[13px] leading-tight text-eri-grey-11">
                          Moniepoint NG
                        </p>
                      </div>
                    </div>

                    <Image
                      src="/icons/brand-icon/moniepoint.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 shrink-0"
                    />
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="rounded-[28px] border border-eri-grey-4 bg-eri-white p-6 shadow-[0_8px_24px_rgba(41,41,41,0.04)] sm:p-8 lg:p-10">
              <form action="#" className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First name
                    </label>
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Enter your First Name"
                      className="eri-field"
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
                      autoComplete="family-name"
                      placeholder="Enter your Last Name"
                      className="eri-field"
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
                    autoComplete="email"
                    placeholder="Enter your work email"
                    className="eri-field"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    What do you need to find out?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What do you need to find out?"
                    className="eri-field eri-field--textarea"
                  />
                </div>

                <button type="submit" className="eri-pill eri-pill--primary">
                  Book a Signal
                </button>
              </form>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
