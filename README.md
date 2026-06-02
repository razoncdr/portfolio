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

## Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). Vercel
auto-detects Next.js and runs `next build`. After that:

- push to `main` → **production** deploy
- push to any branch / open a PR → **preview** deploy with its own URL

## Roadmap

Planned phases (structured so each slots in cleanly):

- [ ] Contact form (route handler + Resend/Formspree)
- [ ] MDX blog / writing section
- [ ] Dark / light mode toggle
- [ ] Live Codeforces stats via the CF public API
