import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

type Study = {
  company: string;
  folder: string;
};

const studies: Study[] = [
  {
    company: "Moniepoint",
    folder: "/images/small-folders/orange-file1.svg",
  },
  {
    company: "Quidax",
    folder: "/images/small-folders/purple-folder1.png",
  },
  {
    company: "Martell",
    folder: "/images/small-folders/purple-folder2.svg",
  },
  {
    company: "Chicken Republic",
    folder: "/images/small-folders/orange-folder2.svg",
  },
];

function StudyFolder({ study }: { study: Study }) {
  return (
    <article className="relative aspect-[244/232] w-full">
      <Image
        src={study.folder}
        alt=""
        fill
        sizes="(max-width: 1023px) 45vw, 244px"
        className="object-contain"
      />

      <div className="absolute inset-x-[8.5%] top-[43%] text-eri-white">
        <h3 className="font-display text-[clamp(12px,3.4vw,20px)] font-semibold leading-tight tracking-[-0.01em]">
          {study.company}
        </h3>
        <p className="mt-[3%] max-w-[195px] text-[clamp(7px,1.85vw,11px)] leading-[1.45]">
          A selection of projects that show how organizations have taken care
          of all.
        </p>
        <Link
          href="#"
          className="mt-[7%] inline-flex min-h-5 items-center justify-center rounded-full border border-eri-white px-[7%] py-[3%] font-display text-[clamp(7px,1.85vw,11px)] leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-white"
        >
          Read The Study
        </Link>
      </div>
    </article>
  );
}

export function WorkDoneSection() {
  return (
    <section
      aria-labelledby="work-done-heading"
      className="bg-eri-white py-12 text-eri-dark lg:pb-16 lg:pt-[108px]"
    >
      <Container
        size="work"
        className="grid gap-5 lg:grid-cols-[470px_512px] lg:gap-[60px]"
      >
        <div className="lg:pt-7">
          <h2
            id="work-done-heading"
            className="max-w-[470px] font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] lg:text-[42px]"
          >
            Work we&apos;ve done, and what came back.
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link href="/case-studies" className="eri-pill eri-pill--primary">
              View Case Studies
            </Link>
            <Link href="/video-diaries" className="eri-pill bg-eri-white px-4 py-[11px] text-eri-dark">
              View Video Diaries
            </Link>
          </div>

          <Image
            src="/images/workdone/workdone-image.png"
            alt="A market researcher examining goods at a local market"
            width={552}
            height={331}
            sizes="(max-width: 1023px) calc(100vw - 24px), 470px"
            className="mt-8 h-auto w-full lg:mt-12 lg:w-[470px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3 lg:gap-x-6 lg:gap-y-9">
          {studies.map((study) => (
            <StudyFolder key={study.company} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
