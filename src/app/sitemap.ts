import type { MetadataRoute } from "next";

import { getStudioInsights } from "@/lib/content-api";
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

  const studioInsights = await getStudioInsights("eri");

  const insightRoutes = studioInsights.map((insight) => {
    const parsed = new Date(insight.date);
    return {
      url: `${siteConfig.url}/insights/${insight.slug}`,
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

  return [...standardRoutes, ...insightRoutes];
}
