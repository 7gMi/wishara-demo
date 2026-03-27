import type { MetadataRoute } from "next";
import { creators } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wishara-demo.vercel.app";

  const creatorUrls = creators.map((creator) => ({
    url: `${baseUrl}/creator/${creator.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/gifts`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/creators`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    ...creatorUrls,
  ];
}
