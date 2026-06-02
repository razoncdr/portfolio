import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** Generates /robots.txt — allows all crawlers and points them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
