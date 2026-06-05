# Learning Log

Notes on what I built and learned, newest first. These will eventually seed the
blog section of this site.

---

## 2026-06-06 — MDX blog (file-based routing, dynamic routes, generateMetadata)

**What I did**

- Added a blog: posts are `.mdx` files in `src/content/posts/`, listed in a
  small typed registry (`posts.ts`). Adding a post = one file + one slug line.
- Seeded it by converting this learning log's first five entries into the
  first five published posts.
- `/blog` index + `/blog/[slug]` dynamic route, every post prerendered at
  build time; per-post SEO; posts auto-join the sitemap.

**What I learned**

- **Dynamic routes**: `[slug]` folders catch URL segments;
  `generateStaticParams` tells Next every valid value at build time so all
  posts prerender as static HTML; `dynamicParams = false` turns unknown slugs
  into 404s instead of server work.
- **`generateMetadata`** gives each post its own title/description/OG tags
  from the post's own `meta` export — and the `title.template` wired up in
  Phase 1 finally earns its keep ("Post Title · Name").
- **MDX = markdown + React**: `@next/mdx` compiles `.mdx` files into server
  components. The mandatory `mdx-components.tsx` maps every markdown element
  (h2, p, code, ...) to token-styled components — so posts automatically match
  the design system *and* dark mode with no typography plugin.
- **Root-relative anchors matter on multi-page sites**: nav links like
  `#about` silently break once a second route exists (they resolve to
  `/blog#about`); they must be `/#about`. Same class of bug for the skip link.
- Module-scoped content (a typed registry + dynamic `import()` of MDX) beats
  filesystem reads: the bundler validates every import at build time, so a
  typo'd slug is a build error, not a runtime 404.

## 2026-06-06 — Live LeetCode stats (ISR, route handlers, env secrets)

**What I did**

- Pivoted away from "live Codeforces max rating" after realizing it was
  *invisible dynamism*: max rating is historical, so the live value rendered
  identically to the hardcoded one. Lesson — make things dynamic only when the
  data actually moves. The abandoned branch cost nothing; that's what branches
  are for.
- Added live LeetCode solved counts (total + Easy/Medium/Hard) to Achievements,
  fetched server-side from LeetCode's public GraphQL endpoint, with a pulsing
  "live" dot so the freshness is visible.
- Added a secret-protected route handler (`/api/refresh-stats?secret=...`) so I
  can force an instant refresh after a grind session — my first API route and
  my first environment-variable secret.

**What I learned**

- **ISR is lazy, not a cron**: `revalidate = 3600` doesn't poll hourly. Visitors
  always get the cached page instantly; only when a visitor arrives *after* the
  hour does Next serve the stale page one last time and re-fetch in the
  background (stale-while-revalidate). Zero traffic = zero API calls; heavy
  traffic = still ≤1 call/hour.
- **Next's fetch-level data cache only covers GET.** GraphQL needs POST, so
  `{ next: { revalidate } }` on the fetch wouldn't work — the right tool is the
  route-segment config `export const revalidate = 3600` (a literal number) in
  page.tsx, which governs when the whole static page regenerates.
- **On-demand revalidation**: `revalidatePath("/")` in a route handler purges
  the cache immediately. Protect such endpoints with a secret from an env var,
  and make them **fail closed** (unset secret = refuse all requests).
- Why I rejected a visitor-facing refresh button: browsers can't call LeetCode
  directly (CORS), so it would need a proxy API + client state + rate limiting
  — a real abuse surface for a number no visitor needs in realtime. Realtime UX
  is for per-minute data (scores, prices), not slow-moving counts.
- Secrets never go in git: `.env.local` (gitignored) locally, Vercel
  environment variables in production.

## 2026-06-05 — Dark mode toggle (first client component)

**What I did**

- Added a dark theme + toggle. The entire dark palette is one `.dark { ... }`
  CSS block overriding the same semantic variables — zero component restyling,
  because every component reads tokens (`bg-background`, `text-accent`, ...).
- Built my first **client component** (`ThemeToggle`), added a pre-paint
  inline script in `layout.tsx`, and shipped it via the full workflow:
  `feat/dark-mode` → PR → preview → `dev` → PR → `main`.

**What I learned**

- Server vs client components: everything stays server-rendered except the one
  button that needs `onClick` — the `"use client"` boundary should be as small
  as possible.
- The anti-FOUC pattern: a tiny blocking `<script>` runs *before paint*, reads
  localStorage / `prefers-color-scheme`, and sets the `dark` class on `<html>`
  — otherwise dark-mode visitors get a white flash on every load. React then
  needs `suppressHydrationWarning` on `<html>` because the server HTML
  (classless) legitimately differs from the client DOM.
- Hydration-mismatch avoidance: instead of state that differs between server
  and client, render BOTH sun/moon icons and let CSS (`dark:hidden` /
  `dark:block`) pick — server and client markup stay identical, so there is
  nothing to mismatch.
- Tailwind v4 dark mode defaults to the OS setting; a class-based toggle needs
  `@custom-variant dark (&:where(.dark, .dark *))`.
- `color-scheme: dark` makes native scrollbars/form controls match the theme.

## 2026-06-05 — Branch protection, rulesets & a safe workflow

**What I did**

- Created GitHub rulesets: `protect-main` (PR-only, force-pushes and deletions
  blocked, Vercel build check required) and `protect-dev` (force-pushes and
  deletions blocked, direct pushes allowed).
- Set up the branch model: `main` (production) ← `dev` (integration) ← `feat/*`.
- Added AI guardrails to the repo: a Claude Code hook that hard-blocks
  destructive git operations and forces approval for every push, plus a written
  contract in `AGENTS.md`.
- Merged my first pull request (`dev` → `main`) and watched it auto-deploy.

**What I learned**

- GitHub rulesets are **server-side and actor-blind** — they protect against
  *anyone* (me, a teammate, an AI, a leaked token), because GitHub itself
  refuses the operation. Client-side guardrails are just a convenience layer on
  top.
- Git-the-protocol literally cannot delete a repository — only the web UI or an
  API token with a special scope can. The real risks are force-pushes (history
  rewrites) and accidental pushes to production.
- "Require deployments to succeed (Production)" on `main` is a trap: production
  deploys only happen *after* merging to main, so the rule deadlocks every PR.
  The right gate is a **required status check** (Vercel) instead.
- A required status check only becomes selectable in GitHub's UI after it has
  run at least once on a PR.

## 2026-06-05 — First deploy to Vercel

**What I did**

- Pushed the repo to GitHub (`razoncdr/portfolio`) and imported it into Vercel.
- Got the live URL: https://portfolio-tan-mu-67.vercel.app
- Re-authored the initial commit to scrub a work email from git history before
  publishing.

**What I learned**

- The deploy cycle: `edit → commit → push → Vercel builds in the cloud → live`.
  Push to `main` = production deploy; any other branch / PR = preview deploy
  with its own URL.
- Vercel auto-detects Next.js and needs zero config for a standard project. No
  env vars were needed either — `VERCEL_PROJECT_PRODUCTION_URL` is injected
  automatically, which our `lib/site.ts` uses to build absolute URLs for
  OG/sitemap/robots.
- Commit author email is permanent, public metadata once pushed — set
  `git config user.email` *before* the first push (or amend before publishing).
- Deploys are immutable snapshots, which is why Vercel's "Instant Rollback" is
  instant.

## 2026-06-03 — Phase 1: building the portfolio MVP

**What I did**

- Scaffolded Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 with
  `create-next-app`; built a single-page portfolio (hero, about, skills,
  experience, projects, achievements, education, contact).
- Centralized all content in one typed file (`src/content/profile.ts`) and all
  colors in semantic CSS variables (`globals.css`).
- Added SEO: metadata, a generated OG image (`next/og`), sitemap, robots,
  canonical URL.

**What I learned**

- Tailwind v4 is CSS-first: no `tailwind.config.js`; the theme is defined with
  `@theme` in CSS, and custom utilities like `bg-background` come from
  `--color-*` variables.
- Separating *data* (profile.ts) from *presentation* (components) means content
  edits never touch JSX — and routing colors through CSS variables means dark
  mode later is a token override, not a rewrite.
- `next/font` self-hosts Google Fonts (no requests to Google at runtime), and
  `app/opengraph-image.tsx` generates the social-share card at build time — no
  static image asset to maintain.
- A production build (`next build`) is the strongest local check: it
  type-checks, lints, and prerenders every route.
