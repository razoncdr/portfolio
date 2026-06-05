import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/content/posts";

/*
 * The layout's title.template turns this into "Blog · Rejwanul Haque Rajon" —
 * the template was wired in Phase 1 precisely for pages like this one.
 */
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on what I'm building and learning — Next.js, deployment, git workflows, and backend engineering.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Notes on what I&apos;m building and learning. Started as a private
        learning log; published here in case it helps someone else.
      </p>

      <ul className="mt-10 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6"
            >
              <p className="font-mono text-xs text-subtle">
                {formatPostDate(post.date)}
              </p>
              <h2 className="mt-1.5 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
