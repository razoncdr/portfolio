<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git workflow & AI guardrails (MANDATORY)

This is a production system — `main` auto-deploys to the live site via Vercel.
Any AI agent working in this repo MUST follow these rules:

1. **Never push without the user's explicit request + approval in the current
   conversation.** No "helpful" autonomous pushes. (Enforced by
   `.claude/hooks/git-guard.ps1` — every push triggers an approval prompt.)
2. **Never force-push, rewrite published history, delete remote branches, or
   delete the repository.** Hard-blocked by the same hook and by GitHub rulesets.
3. **Never commit directly to `main`.** `main` is production and only changes
   via pull requests.
4. **Branch model:**
   - `main` — production. PR-only. Every merge here deploys to the live site.
   - `dev`  — integration branch. Day-to-day work lands here first.
   - `feat/<name>` — feature branches, cut from `dev`, PR back into `dev`.
   - `fix/<name>`  — bug fixes, same flow.
   - Releasing = PR `dev` → `main` once `dev` is verified (preview deploy is green).
5. **Never commit secrets** (.env files, API keys, tokens). Secrets live in
   Vercel environment variables only.
6. The user's work email domain (`@orbitax.com`) must never appear in this
   repo — commits are authored as `Rejwanul Haque Rajon <rejwanul7296@gmail.com>`.
