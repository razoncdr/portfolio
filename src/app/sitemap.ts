import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Single-page sitemap for now. When new routes are added (e.g. a blog index in a
 * later phase), append them here — Next generates /sitemap.xml automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
