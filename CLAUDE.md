# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Web app (run from root)
pnpm dev           # Start Next.js dev server at localhost:3000
pnpm build         # Production build
pnpm lint          # ESLint
pnpm type-check    # tsc --noEmit

# Chrome extension (apps/chrome-extension)
pnpm --filter @dailydevtools/chrome-extension dev    # Watch build
pnpm --filter @dailydevtools/chrome-extension build  # Production build

# VS Code extension (apps/vscode-extension)
pnpm --filter dailydevtools-vscode compile   # Build
pnpm --filter dailydevtools-vscode watch     # Watch

# core-utils package
pnpm --filter @dailydevtools/core-utils typecheck
```

Pre-commit hook runs `lint-staged`, which auto-fixes ESLint and runs `type-check` on staged `*.{js,jsx,ts,tsx}` files.

## Architecture

This is a **pnpm monorepo** with three distinct apps and one shared package:

- **`/` (root)** — Next.js 16 web app (the primary product at dailydev.tools)
- **`apps/chrome-extension`** — Vite + React 18 Chrome extension
- **`apps/vscode-extension`** — VS Code extension (TypeScript, no framework)
- **`packages/core-utils`** — Shared pure-TS utility functions (`@dailydevtools/core-utils`), consumed by both the web app and chrome extension via `workspace:*`

The `pnpm-workspace.yaml` covers `apps/*` and `packages/*`, but **the web app lives at the repo root** (not under `apps/`), so root-level `package.json` / `next.config.ts` / `tailwind.config.ts` all belong to the Next.js app.

### Next.js App Structure

```
app/
  [locale]/          # All user-facing routes are locale-prefixed
    tools/
      [tool-name]/
        page.tsx     # Server component: metadata + renders Client
        Client.tsx   # "use client" component with all tool logic
    blog/
    about/
    privacy/
    terms/
    [...rest]/       # Catch-all → notFound()
  components/        # Shared React components
    ui/              # Liquid-design primitive components
  lib/               # Utilities (seo.ts, utils.ts, curl*, api*, json*)
  data/
    tools.ts         # Source of truth for all tool IDs, names, categories
  api/               # API routes (curl-convert, curl-parse, og image)
i18n/
  routing.ts         # Locale list (29 locales) + next-intl routing config
messages/            # JSON translation files per locale (e.g. en.json)
middleware.ts        # next-intl middleware + www redirect
```

### Adding a New Tool

1. Add an entry to `app/data/tools.ts` — defines `id`, `name`, `description`, `icon` (Lucide name), and `category`.
2. Create `app/[locale]/tools/[tool-id]/page.tsx` — server component that exports `generateMetadata` (use `constructToolMetadata` from `app/lib/seo.ts` for standard SEO) and renders the Client component.
3. Create `app/[locale]/tools/[tool-id]/Client.tsx` — `"use client"` component with all interactive logic.
4. Add translations to `messages/en.json` (and ideally other locale files) under the tool's namespace.

All tools are **client-side only** — no server-side processing of user data (privacy-first principle).

### Internationalization

Routes are locale-prefixed via `next-intl`. The locale list lives in `i18n/routing.ts`. Server components use `getTranslations()`, client components use `useTranslations()`. Metadata is generated per-locale using `constructToolMetadata()` in `app/lib/seo.ts`, which also builds dynamic OG images via `/api/og`.

### UI Component System

`app/components/ui/` contains the custom "Liquid" design system: `LiquidButton`, `LiquidCard`, `LiquidInput`, `LiquidSelect`, `LiquidSlider`, `LiquidTabs`, `LiquidCheckbox`, `LiquidProgressBar`. Use these for new tool UIs instead of raw HTML. `cn()` from `app/lib/utils.ts` combines `clsx` + `tailwind-merge`.

### Shared Package (`@dailydevtools/core-utils`)

`packages/core-utils/src/` exports utility functions for JSON, Base64, URL, JWT, UUID, hash, case conversion, etc. These are directly imported as TypeScript source (no build step) — the `main` field points to `./src/index.ts`. The web app transpiles it via `transpilePackages` in `next.config.ts`.

### Commit Message Style

Use present-tense imperative: `Add feature` not `Added feature`. Conventional commit prefixes (`feat:`, `fix:`, `chore:`) are used in practice (see git log).
