import type { MDXComponents } from "mdx/types";

/**
 * REQUIRED by @next/mdx (App Router refuses MDX without this file).
 *
 * Doubles as the blog's typography layer: every markdown element is mapped to
 * a token-styled equivalent, so posts automatically match the site's design
 * system — including dark mode — with no typography plugin dependency.
 */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-base leading-relaxed text-muted">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium text-accent underline-offset-2 hover:underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-5 list-disc space-y-2 text-base leading-relaxed text-muted marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-5 list-decimal space-y-2 text-base leading-relaxed text-muted marker:text-accent">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-accent pl-4 text-muted italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
