/**
 * Blog post registry — the single source of truth for which posts exist and in
 * what order (newest first). Adding a post = drop a .mdx file in
 * src/content/posts/ and add its slug here. Each .mdx exports a `meta` object
 * (title, description, date) that the index, per-post metadata, and sitemap
 * all read.
 */

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-06-05" */
  date: string;
};

export type Post = PostMeta & { slug: string };

export const postSlugs = [
  "live-leetcode-stats",
  "dark-mode-without-rewrites",
  "protecting-production-from-everyone",
  "first-deploy-to-vercel",
  "building-the-portfolio-mvp",
] as const;

export type PostSlug = (typeof postSlugs)[number];

export async function getPost(slug: PostSlug): Promise<Post> {
  const mod = (await import(`@/content/posts/${slug}.mdx`)) as unknown as {
    meta: PostMeta;
  };
  return { slug, ...mod.meta };
}

export async function getAllPosts(): Promise<Post[]> {
  return Promise.all(postSlugs.map((slug) => getPost(slug)));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
