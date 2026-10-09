import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { WorkDoneVideo } from "@/components/home/work-done-video";
import { getCaseStudyLogo, type CaseStudy } from "@/lib/case-studies-data";
import type { VideoDiary } from "@/lib/video-diaries-data";

const defaultVideo: VideoDiary = {
  id: "c3ac1ff5-3235-48d6-b994-cc445babb972",
  title: "The Danfo",
  slug: "the-danfo",
  category: "Interviews",
  brand: "Danfo Experience",
  date: "Oct 2026",
  image: "https://img.youtube.com/vi/hNY1f4MbLqQ/hqdefault.jpg",
  youtubeUrl: "https://www.youtube.com/watch?v=hNY1f4MbLqQ",
  videoEmbedUrl: "https://www.youtube.com/embed/hNY1f4MbLqQ",
  videoThumbnail: "https://img.youtube.com/vi/hNY1f4MbLqQ/hqdefault.jpg",
};

const FOLDER_VARIANTS = [
  "/images/small-folders/orange-folder.svg",
  "/images/small-folders/purple-file (1).svg",
  "/images/small-folders/orange-folder.svg",
  "/images/small-folders/purple-file (1).svg",
];

const fallbackStudies: CaseStudy[] = [
  {
    id: "2cf1b080-3708-4507-bdbe-252c2a4254db",
    company: "Tittle",
    title: "Tittle",
    slug: "tittle",
    category: "General",
    folder: "/images/small-folders/orange-folder.svg",
    description: "Storytelling",
    logo: "https://isccylmuhhibcvyqmntw.supabase.co/storage/v1/object/public/assets/23c7198b-f474-44fb-afc8-b5de1a8445fc.jpg",
  },
  {
    id: "912b0211-3750-4208-89a5-c49aa1e53275",
    company: "Faraday Inc",
    title: "Faraday Inc",
    slug: "faraday-inc",
    category: "General",
    folder: "/images/small-folders/purple-file (1).svg",
    description:
      "In an era defined by rapid technological acceleration, the retail landscape is undergoing a fundamental transformation.",
    logo: "https://isccylmuhhibcvyqmntw.supabase.co/storage/v1/object/public/assets/0cd89a7c-2d13-46e6-b558-e6f59d88b634.jpg",
  },
  {
    id: "2905fd1c-b5a2-4e52-a287-d65964ac9ae8",
    company: "map",
    title: "map",
    slug: "map",
    category: "General",
    folder: "/images/small-folders/orange-folder.svg",
    description: "check this out",
    logo: "https://isccylmuhhibcvyqmntw.supabase.co/storage/v1/object/public/assets/9f6dbff6-0cd0-43e4-a598-64e5b9c3abcd.jpeg",
  },
  {
    id: "be1f7310-090e-4228-aaa4-2acdd39e3be3",
    company: "name",
    title: "name",
    slug: "name",
    category: "General",
    folder: "/images/small-folders/purple-file (1).svg",
    description: "Amara realized she was the only",
    logo: "https://isccylmuhhibcvyqmntw.supabase.co/storage/v1/object/public/assets/5e50faf4-d86f-4fd3-99b9-1a1747be55a4.jpg",
  },
];

function StudyFolder({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/case-studies/${study.slug || study.id}`;
  const logoSrc = getCaseStudyLogo(study);
  const folderSrc =
    study.folder || FOLDER_VARIANTS[index % FOLDER_VARIANTS.length];

  return (
    <article className="group/folder relative aspect-[244/232] w-full cursor-pointer transition-transform duration-300 ease-out hover:z-10 hover:scale-105">
      <Link
        href={href}
        className="absolute inset-0 z-10 block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-eri-dark"
        aria-label={`View case study: ${study.company}`}
      >
        <span className="sr-only">View case study {study.company}</span>
      </Link>

      <Image
        src={folderSrc}
        alt=""
        fill
        sizes="(max-width: 1023px) 45vw, 244px"
        className="object-contain"
      />

      {/* Brand logo placed inside the folder paper slot */}
      <div className="pointer-events-none absolute left-[12.3%] top-[19.4%] flex size-[9.8%] items-center justify-center overflow-hidden rounded-full border border-[#E3E1DD] bg-white shadow-xs">
        {logoSrc ? (
          <div className="relative size-full overflow-hidden rounded-full">
            <Image
              src={logoSrc}
              alt=""
              fill
              sizes="24px"
              className="size-full rounded-full object-cover object-center"
            />
          </div>
        ) : (
          <span className="font-display text-[9px] font-bold text-eri-dark">
            {study.company.charAt(0)}
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-[6.5%] top-[33%] text-eri-white sm:inset-x-[8.5%] sm:top-[37%]">
        <h3 className="font-display text-[12px] font-semibold leading-tight tracking-[-0.01em] xs:text-[13.5px] sm:text-[18px] lg:text-[20px]">
          {study.company}
        </h3>
        <p className="mt-1 line-clamp-2 text-[8px] leading-tight text-white/90 xs:text-[9px] sm:mt-2 sm:max-w-48.75 sm:text-[11px] sm:leading-[1.4]">
          {study.description ||
            "A selection of projects that show how organizations have taken care of all."}
        </p>
        <span className="mt-1.5 inline-flex h-4.5 items-center justify-center rounded-full border border-eri-white px-2 py-0.5 font-display text-[8px] font-medium leading-none transition-colors group-hover/folder:bg-white/15 xs:h-5 xs:px-2.5 xs:text-[9px] sm:mt-3 sm:h-auto sm:min-h-5 sm:px-3.5 sm:py-1 sm:text-[11px]">
          Read The Study
        </span>
      </div>
    </article>
  );
}

export function WorkDoneSection({
  caseStudies,
  video,
}: {
  caseStudies?: CaseStudy[];
  video?: VideoDiary;
} = {}) {
  const displayStudies =
    caseStudies && caseStudies.length > 0
      ? caseStudies.slice(0, 4)
      : fallbackStudies;

  const displayVideo = video || defaultVideo;

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

          <WorkDoneVideo video={displayVideo} />
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-x-6 sm:gap-y-9">
          {displayStudies.map((study, idx) => (
            <StudyFolder
              key={study.id || study.slug || study.company || idx}
              study={study}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
