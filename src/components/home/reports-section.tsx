import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export function ReportsSection() {
  return (
    <section
      aria-labelledby="reports-heading"
      className="overflow-x-clip bg-eri-mauve text-eri-white"
    >
      <Container
        size="reports"
        className="grid items-start gap-10 py-14 lg:grid-cols-[352px_minmax(0,1fr)] lg:gap-16 lg:pb-6 lg:pt-20"
      >
        <div>
          <p className="font-display text-[16px] font-semibold leading-tight lg:text-[18px]">
            Reports by Eri
          </p>
          <h2
            id="reports-heading"
            className="mt-3 max-w-[352px] font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] lg:text-[40px] lg:tracking-[-0.035em]"
          >
            <span className="lg:hidden">
              The Nigerian Urban Consumer 2026 Snapshot Q1
            </span>
            <span className="hidden lg:inline">
              The Nigerian
              <br />
              Urban Consumer
              <br />
              2026 Snapshot Q1
            </span>
          </h2>
          <p className="mt-3 max-w-[352px] text-[13px] leading-[1.55] text-eri-coral-light">
            57% of consumers had switched brands. 47% said they choose on
            consistency, not price or advertising. From 244 retail intercepts
            across Lagos, Abuja and Port Harcourt.
          </p>
          <Link
            href="#"
            className="eri-pill eri-pill--primary mt-8 min-h-[40px] px-4 py-2.5 text-[14px]"
          >
            Download Report
          </Link>
        </div>

        <Image
          src="/images/reports/reports-image.png"
          alt="A motion-blurred street scene featuring a yellow and green vehicle"
          width={714}
          height={434}
          sizes="(max-width: 1023px) calc(100vw - 24px), 680px"
          className="h-auto w-full lg:-ml-12 lg:w-[calc(100%+128px)] lg:max-w-none"
        />
      </Container>
    </section>
  );
}
