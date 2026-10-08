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

      <div className="absolute inset-x-[6.5%] top-[33%] text-eri-white sm:inset-x-[8.5%] sm:top-[37%]">
        <h3 className="font-display text-[12px] font-semibold leading-tight tracking-[-0.01em] xs:text-[13.5px] sm:text-[18px] lg:text-[20px]">
          {study.company}
        </h3>
        <p className="mt-1 text-[8px] leading-tight text-white/90 xs:text-[9px] sm:mt-2 sm:max-w-48.75 sm:text-[11px] sm:leading-[1.4]">
          A selection of projects that show how organizations have taken care of
          all.
        </p>
        <Link
          href="/case-studies"
          className="mt-1.5 inline-flex h-4.5 items-center justify-center rounded-full border border-eri-white px-2 py-0.5 font-display text-[8px] font-medium leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-white xs:h-5 xs:px-2.5 xs:text-[9px] sm:mt-3 sm:h-auto sm:min-h-5 sm:px-3.5 sm:py-1 sm:text-[11px]"
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
      className="bg-eri-white py-12 text-eri-dark lg:pb-16 lg:pt-18"
    >
      <Container
        size="work"
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_512px] lg:items-end lg:justify-between lg:gap-15"
      >
        <div className="w-full min-w-0 self-end text-left">
          <div>
            <h2
              id="work-done-heading"
              className="w-full font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[40px] lg:text-[42px]"
            >
              Work we&apos;ve done, and
              <br className="hidden sm:inline" /> what came back.
            </h2>

            <div className="mt-6 flex flex-nowrap items-center gap-2">
              <Link
                href="/case-studies"
                className="eri-pill eri-pill--primary min-h-8 whitespace-nowrap px-3 py-2 text-[12px] sm:min-h-[42px] sm:px-4 sm:py-[11px] sm:text-[15px]"
              >
                View Case Studies
              </Link>
              <Link
                href="/video-diaries"
                className="eri-pill min-h-8 whitespace-nowrap bg-eri-white px-3 py-2 text-[12px] text-eri-dark sm:min-h-[42px] sm:px-4 sm:py-[11px] sm:text-[15px]"
              >
                View Video Diaries
              </Link>
            </div>
          </div>

          <Link
            href="/video-diaries"
            aria-label="Watch video diaries"
            className="group relative mt-8 block aspect-[487/267] w-full overflow-hidden rounded-[18px]"
          >
            <Image
              src="/images/workdone/workdone-image.png"
              alt="A market researcher examining goods at a local market"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/60 sm:size-12">
                <svg
                  className="size-5 translate-x-0.5 fill-white drop-shadow-xs"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-x-6 sm:gap-y-9">
          {studies.map((study) => (
            <StudyFolder key={study.company} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
