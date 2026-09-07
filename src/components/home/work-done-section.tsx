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
    <article className="group/folder relative aspect-[244/232] w-full cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:z-10">
      <Image
        src={study.folder}
        alt=""
        fill
        sizes="(max-width: 1023px) 45vw, 244px"
        className="object-contain"
      />

      <div className="absolute inset-x-[8.5%] top-[38%] text-eri-white">
        <h3 className="font-display text-[16px] font-semibold leading-tight tracking-[-0.01em] sm:text-[18px] lg:text-[20px]">
          {study.company}
        </h3>
        <p className="mt-2 max-w-[195px] text-[10px] leading-[1.4] sm:text-[11px]">
          A selection of projects that show how organizations have taken care of
          all.
        </p>
        <Link
          href="/case-studies"
          className="mt-3 inline-flex min-h-5 items-center justify-center rounded-full border border-eri-white px-3.5 py-1 font-display text-[10px] leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-white sm:text-[11px]"
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
        className="grid gap-8 lg:grid-cols-[470px_512px] lg:items-end lg:justify-between lg:gap-15"
      >
        <div className="w-full max-w-117.5 text-left">
          <div>
            <h2
              id="work-done-heading"
              className="w-full font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] lg:text-[42px]"
            >
              Work we&apos;ve done, and
              <br className="hidden sm:inline" /> what came back.
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Link href="/case-studies" className="eri-pill eri-pill--primary">
                View Case Studies
              </Link>
              <Link
                href="/video-diaries"
                className="eri-pill bg-eri-white px-4 py-[11px] text-eri-dark"
              >
                View Video Diaries
              </Link>
            </div>
          </div>

          <div className="relative mt-8 aspect-487/267 w-full overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <Image
              src="/images/workdone/workdone-image.png"
              alt="A market researcher examining goods at a local market"
              fill
              sizes="(max-width: 1023px) 100vw, 470px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-9">
          {studies.map((study) => (
            <StudyFolder key={study.company} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
