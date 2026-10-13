import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailContent } from "@/components/case-studies/case-study-detail-content";
import {
  getStudioCaseStudies,
  getStudioCaseStudyBySlug,
} from "@/lib/content-api";

type Props = {
  params: Promise<{ slug: string }>;
};

async function resolveCaseStudy(slug: string) {
  return await getStudioCaseStudyBySlug(slug, "eri");
}

export async function generateStaticParams() {
  const caseStudies = await getStudioCaseStudies("eri");
  return caseStudies.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await resolveCaseStudy(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  const description =
    study.description ||
    `Explore how ${study.company} partnered with Eri for ground-level field intelligence.`;

  return {
    title: `${study.company} | Case Studies | Eri`,
    description,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      title: `${study.company} - ${study.title || "Case Study"} | Eri`,
      description,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.company} - ${study.title || "Case Study"} | Eri`,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const study = await resolveCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailContent study={study} />;
}
