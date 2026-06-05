# Rejwanul Haque Rajon — Portfolio

Personal portfolio site. Single-page, responsive, statically rendered.

**Stack:** [Next.js 16](https://nextjs.org) (App Router) · TypeScript · [Tailwind CSS v4](https://tailwindcss.com) · deployed on [Vercel](https://vercel.com).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build + type-check + lint), `npm start` (serve the build), `npm run lint`.

## Editing content

All copy and data live in **`src/content/profile.ts`** — the single source of truth.
Update your rating, add a project, tweak a bullet there; you shouldn't need to touch
any component.

## Project structure

```
src/
  content/profile.ts     # all site data (typed) — edit this
  lib/site.ts            # canonical site URL (env-aware)
  components/
    ui/                  # Section, Card, Badge, StatChip, icons — design primitives
    layout/              # Header, Footer
    sections/            # Hero, About, Skills, Experience, Projects,
                         #   Achievements, Education, Contact
  app/
    layout.tsx           # fonts + SEO metadata + Header/Footer + skip link
    page.tsx             # composes the sections in order
    globals.css          # semantic color tokens (Tailwind v4 @theme)
    opengraph-image.tsx  # generated social-share card
    sitemap.ts / robots.ts
```

Colors are routed through semantic CSS variables in `globals.css`, so theming changes
happen in one place.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g. `https://your-domain.com`). Used by `metadataBase`, the sitemap, robots, and OG image to emit absolute URLs. Set it in **Vercel → Settings → Environment Variables** (Production + Preview). Falls back to Vercel's own URL, then `localhost`. |
| `REVALIDATE_SECRET` | Protects `/api/refresh-stats` (owner-only on-demand cache refresh). Endpoint refuses everything if unset. |
| `RESEND_API_KEY` | Resend API key for the contact form. Form returns a friendly error (with the direct-email fallback) if unset. |
| `CONTACT_EMAIL` | Where contact-form messages are delivered. Server-only — never exposed to the browser. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Optional: enables per-IP rate limiting (5/hour) on the contact form. Limiter fails open without them. |

## Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). Vercel
auto-detects Next.js and runs `next build`. After that:

- push to `main` → **production** deploy
- push to any branch / open a PR → **preview** deploy with its own URL

## Roadmap

Planned phases (structured so each slots in cleanly):

- [x] Dark / light mode toggle
- [x] Live LeetCode stats (public GraphQL API + ISR; replaced the original live-Codeforces idea)
- [x] MDX blog / writing section (`/blog`, posts in `src/content/posts/`)
- [x] Contact form (Server Action + Resend, honeypot + per-IP rate limiting)
