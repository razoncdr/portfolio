import type { Metadata } from "next";
import Link from "next/link";
import {
  postSlugs,
  getPost,
  formatPostDate,
  type PostSlug,
} from "@/content/posts";

type Props = { params: Promise<{ slug: PostSlug }> };

/**
 * Every post is prerendered at build time from the registry; any slug not in
 * the registry 404s (dynamicParams = false). The MDX content is loaded via a
 * dynamic import — the official @next/mdx pattern for content-directory blogs.
 */
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

/** Per-post SEO — the layout's title.template appends "· Rejwanul Haque Rajon". */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, { default: PostContent }] = await Promise.all([
    getPost(slug),
    import(`@/content/posts/${slug}.mdx`),
  ]);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-mono text-sm text-accent underline-offset-2 hover:underline"
      >
        ← All posts
      </Link>

      <header className="mt-6 mb-10">
        <p className="font-mono text-xs text-subtle">
          {formatPostDate(post.date)}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h1>
      </header>

      <PostContent />
    </article>
  );
}
