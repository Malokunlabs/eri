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
    folder: "/images/small-folders/orange-folder.svg",
  },
  {
    company: "Quidax",
    folder: "/images/small-folders/purple-file.svg",
  },
  {
    company: "Martell",
    folder: "/images/small-folders/purple-file.svg",
  },
  {
    company: "Chicken Republic",
    folder: "/images/small-folders/orange-folder.svg",
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

      <div className="absolute inset-x-[9%] bottom-[6%] top-[40%] flex flex-col items-start justify-center text-eri-white max-[360px]:top-[34%]">
        <h3 className="whitespace-nowrap font-display text-[clamp(12px,3.8vw,18px)] font-semibold leading-tight tracking-[-0.01em] max-[360px]:text-[11px] sm:text-[18px] lg:text-[20px]">
          {study.company}
        </h3>
        <p className="mt-1 text-[clamp(8px,2.1vw,10px)] leading-[1.4] text-white/90 sm:mt-2 sm:max-w-48.75 sm:text-[11px]">
          A selection of projects that show how organizations have taken care of
          all.
        </p>
        <Link
          href="/case-studies"
          className="mt-2 inline-flex shrink-0 items-center justify-center rounded-full border border-eri-white px-2.5 py-1 font-display text-[clamp(9px,2.3vw,11px)] font-medium leading-none transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eri-white max-[360px]:mt-1 max-[360px]:py-0.5 sm:mt-3 sm:px-3.5 sm:text-[11px]"
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
        className="grid gap-8 max-sm:px-5 lg:grid-cols-[minmax(0,1fr)_512px] lg:items-end lg:justify-between lg:gap-15"
      >
        <div className="w-full min-w-0 self-end text-left">
          <div>
            <h2
              id="work-done-heading"
              className="w-full font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:text-[44px]"
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

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-9">
          {studies.map((study) => (
            <StudyFolder key={study.company} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
