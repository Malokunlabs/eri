import type { MetadataRoute } from "next";

import {
  getStudioCaseStudies,
  getStudioInsights,
  getStudioVideoDiaries,
} from "@/lib/content-api";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/case-studies", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/insights", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/reports", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/video-diaries", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const [studioInsights, studioVideos, studioCaseStudies] = await Promise.all([
    getStudioInsights("eri"),
    getStudioVideoDiaries("eri"),
    getStudioCaseStudies("eri"),
  ]);

  const insightRoutes = studioInsights.map((insight) => {
    const parsed = new Date(insight.date);
    return {
      url: `${siteConfig.url}/insights/${insight.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? new Date() : parsed,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const videoRoutes = studioVideos.map((video) => {
    const parsed = new Date(video.date);
    return {
      url: `${siteConfig.url}/video-diaries/${video.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? new Date() : parsed,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const caseStudyRoutes = studioCaseStudies.map((study) => {
    const parsed = study.date ? new Date(study.date) : new Date();
    return {
      url: `${siteConfig.url}/case-studies/${study.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? new Date() : parsed,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const standardRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...standardRoutes, ...insightRoutes, ...videoRoutes, ...caseStudyRoutes];
}
