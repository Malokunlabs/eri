import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightDetailContent } from "@/components/insights/insight-detail-content";
import { getStudioInsightBySlug, getStudioInsights } from "@/lib/content-api";

type Props = {
  params: Promise<{ slug: string }>;
};

async function resolveInsight(slug: string) {
  return await getStudioInsightBySlug(slug, "eri");
}

export async function generateStaticParams() {
  const studioInsights = await getStudioInsights("eri");
  return studioInsights.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await resolveInsight(slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  const description =
    insight.intro[0] ||
    "Field observations, consumer signals, and strategic perspective from Eri field teams across Nigeria.";

  return {
    title: insight.title,
    description,
    alternates: {
      canonical: `/insights/${insight.slug}`,
    },
    openGraph: {
      title: `${insight.title} | Eri`,
      description,
      url: `/insights/${insight.slug}`,
      type: "article",
      publishedTime: (() => {
        const d = new Date(insight.date);
        return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
      })(),
      authors: [insight.author],
      images: [
        {
          url: insight.image,
          alt: insight.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description,
      images: [insight.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const insight = await resolveInsight(slug);

  if (!insight) {
    notFound();
  }

  return <InsightDetailContent insight={insight} />;
}
