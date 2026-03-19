# Monorepo Migration Design

**Date:** 2026-03-19
**Status:** Approved

## Overview

Transform the existing `carveri-portal` single-app Vite + React 19 repo into a pnpm workspaces monorepo with two apps (`mobile`, `desktop`) that share a common package (`@carveri/shared`). The two apps are identical in tech stack and data but differ in layout: `mobile` targets small displays, `desktop` targets medium+ displays.

## Goals

- Preserve the full git history (in-place migration).
- Share all domain logic, feature components, data, types, and utilities between both apps.
- Allow each app to own its own Tailwind/CSS theme independently.
- Keep tooling minimal — pnpm workspaces only, no Turborepo or Nx.
- Both apps must be independently runnable with `pnpm --filter <name> dev`.

## Non-Goals

- Publishing `@carveri/shared` to npm.
- Building the shared package as a library (no Vite lib build, no `.d.ts` emit).
- Implementing the desktop app's actual UI (out of scope for this migration).

## Folder Structure

```
carveri-portal/                      ← monorepo root
├── package.json                     ← workspace root (scripts only, no deps)
├── pnpm-workspace.yaml              ← packages: ['apps/*', 'packages/*']
│
├── packages/
│   └── shared/                      ← @carveri/shared
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/              ← shadcn base components
│       │   │   ├── home/            ← HomeTab + sub-components (locales colocated)
│       │   │   ├── history/         ← HistoryTab + subtabs (locales colocated)
│       │   │   ├── market/          ← MarketTab + sub-components (locales colocated)
│       │   │   ├── negotiate/       ← NegotiateTab + subtabs (locales colocated)
│       │   │   ├── verdict/         ← VerdictTab + subtabs (locales colocated)
│       │   │   ├── vehicle-details/ ← Report sub-components (locales colocated)
│       │   │   ├── ScoreRing.tsx
│       │   │   ├── VerdictBadge.tsx
│       │   │   ├── ReportGauge.tsx
│       │   │   ├── ImageCarousel.tsx
│       │   │   ├── LanguageToggle.tsx
│       │   │   └── CarSummaryCard.tsx
│       │   ├── data/                ← api.ts, mockData.ts, report.ts
│       │   ├── lib/                 ← utils.ts, gauge.ts, i18n.ts
│       │   ├── types/               ← all TypeScript interfaces
│       │   └── locales/             ← top-level en.json, es.json
│       ├── components.json          ← shadcn config pointing into shared src
│       ├── package.json
│       └── tsconfig.json
│
└── apps/
    ├── mobile/                      ← @carveri/mobile (small displays)
    │   ├── src/
    │   │   ├── index.css            ← mobile-specific Tailwind theme
    │   │   ├── main.tsx
    │   │   ├── layout/root.tsx      ← mobile layout wrapper
    │   │   ├── data/router.tsx      ← mobile routes
    │   │   ├── pages/               ← all page components (app-specific)
    │   │   └── components/
    │   │       ├── AppHeader.tsx
    │   │       └── BottomNavBar.tsx
    │   ├── index.html
    │   ├── vite.config.ts
    │   ├── components.json          ← delegates to shared for ui/utils aliases
    │   ├── eslint.config.js
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── tsconfig.app.json
    │   └── tsconfig.node.json
    │
    └── desktop/                     ← @carveri/desktop (medium+ displays)
        ├── src/
        │   ├── index.css            ← desktop-specific Tailwind theme
        │   ├── main.tsx
        │   ├── layout/root.tsx      ← desktop layout wrapper (sidebar/top-nav)
        │   ├── data/router.tsx
        │   ├── pages/
        │   └── components/
        ├── index.html
        ├── vite.config.ts
        ├── components.json
        ├── eslint.config.js
        ├── package.json
        ├── tsconfig.json
        ├── tsconfig.app.json
        └── tsconfig.node.json
```

## Shared vs App-Specific Split

### Moves to `packages/shared/src/`

| Path | Rationale |
|---|---|
| `src/components/ui/` | Shadcn base components used by both apps |
| `src/components/home/` | Feature tab, same data in both layouts; colocated locales stay with the component |
| `src/components/history/` | Feature tab, same data in both layouts; colocated locales stay with the component |
| `src/components/market/` | Feature tab, same data in both layouts; colocated locales stay with the component |
| `src/components/negotiate/` | Feature tab, same data in both layouts; colocated locales stay with the component |
| `src/components/verdict/` | Feature tab, same data in both layouts; colocated locales stay with the component |
| `src/components/vehicle-details/` | Report sub-components, layout-agnostic; colocated locales stay with the component |
| `src/components/ScoreRing.tsx` | Generic UI widget |
| `src/components/VerdictBadge.tsx` | Generic UI widget |
| `src/components/ReportGauge.tsx` | Generic UI widget |
| `src/components/ImageCarousel.tsx` | Generic UI widget |
| `src/components/LanguageToggle.tsx` | Generic UI widget |
| `src/components/CarSummaryCard.tsx` | Generic UI widget |
| `src/data/api.ts` | API layer shared by both apps |
| `src/data/mockData.ts` | Shared mock data |
| `src/data/report.ts` | Shared data utilities |
| `src/lib/utils.ts` | `cn()` helper |
| `src/lib/gauge.ts` | Gauge chart utilities |
| `src/lib/i18n.ts` | i18next configuration (imports updated to `@carveri/shared/` prefix) |
| `src/types/vehicle-detail.ts`, `vehicle-report.ts`, `lightbox.ts` | All TypeScript interfaces used by shared components |
| `src/types/css.d.ts` | Augments `React.CSSProperties` to allow CSS custom properties (`--var`); required by shared components (e.g. `ScoreRing`) that use inline CSS variable styles |
| `src/locales/` | Top-level translation files (en.json, es.json) |

**Locale file strategy:** Component-colocated locale files (e.g. `components/home/locales/en.json`) stay colocated inside their respective component directories within `packages/shared/src/`. They are not consolidated into `packages/shared/src/locales/`. The `i18n.ts` static imports are updated as part of the `@/` → `@carveri/shared/` alias rewrite.

### Stays App-Specific

| Path | Rationale |
|---|---|
| `src/pages/home.tsx` | Composes shared components into the mobile-specific home page layout |
| `src/pages/report.tsx` | Mobile report page with mobile layout |
| `src/pages/ReportPage.tsx` | Alternate report page variant |
| `src/pages/login.tsx` | Auth page, layout may differ per app |
| `src/pages/register.tsx` | Auth page, layout may differ per app |
| `src/pages/root-error.tsx` | Error boundary UI, app-specific shell |
| `src/pages/report-error.tsx` | Error boundary UI, app-specific shell |
| `src/main.tsx` | Entry point per app |
| `src/layout/root.tsx` | Core layout difference between apps |
| `src/data/router.tsx` | Routes may diverge per app |
| `src/index.css` | Per-app Tailwind theme |
| `src/components/AppHeader.tsx` | Layout-specific, differs per app |
| `src/components/BottomNavBar.tsx` | Mobile-only navigation pattern |
| `index.html`, `vite.config.ts`, `tsconfig*.json`, `package.json`, `eslint.config.js` | Per-app build and tooling config |

## Import Aliasing

### Problem

All current source files use `@/` as an alias for `src/`. After splitting, `@/lib/utils` is ambiguous between an app's own `src/` and the shared package's `src/`.

### Solution

Inside `packages/shared/src/`, replace all `@/` imports with `@carveri/shared/`. Both internal shared-to-shared imports and external app-to-shared imports use the same prefix. Vite resolves `@carveri/shared/` to `packages/shared/src/` in all consuming apps.

Each app's `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@carveri/shared": path.resolve(__dirname, "../../packages/shared/src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Each app's `tsconfig.app.json` — `paths` only, no foreign `include`:

```json
{
  "compilerOptions": {
    "paths": {
      "@carveri/shared/*": ["../../packages/shared/src/*"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

Each app preserves the existing three-tsconfig pattern: `tsconfig.json` (references), `tsconfig.app.json` (src), `tsconfig.node.json` (vite.config.ts).

### Import Examples

```ts
// App file importing from shared
import ScoreRing from "@carveri/shared/components/ScoreRing";
import { fetchVehicleReport } from "@carveri/shared/data/api";

// Shared file importing another shared file (internal)
import { cn } from "@carveri/shared/lib/utils";

// App file importing from its own src
import RootLayout from "@/layout/root";
```

## Package Configurations

### `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Root `package.json`

```json
{
  "name": "carveri-portal",
  "private": true,
  "scripts": {
    "dev:mobile": "pnpm --filter @carveri/mobile dev",
    "dev:desktop": "pnpm --filter @carveri/desktop dev",
    "build:mobile": "pnpm --filter @carveri/mobile build",
    "build:desktop": "pnpm --filter @carveri/desktop build",
    "lint": "pnpm -r lint"
  }
}
```

### `packages/shared/package.json`

```json
{
  "name": "@carveri/shared",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
```

No `main`, no `exports`, no build script — source files are resolved directly via Vite alias.

### App `package.json` (both apps)

```json
{
  "name": "@carveri/mobile",
  "private": true,
  "dependencies": {
    "@carveri/shared": "workspace:*"
  }
}
```

## TypeScript Configuration

### `packages/shared/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@carveri/shared/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

`baseUrl: "."` is required so that TypeScript resolves `paths` entries when running `tsc --noEmit` on the shared package in isolation.

### App `tsconfig.app.json`

Type-checks app source only. Shared source is type-checked by its own `tsconfig.json`; apps consume it via `paths` resolution only — do not add `packages/shared/src` to `include`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@carveri/shared/*": ["../../packages/shared/src/*"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## Shadcn / `components.json` Configuration

Shadcn components live in `packages/shared/src/components/ui/`. New components must be added from the shared package directory so they land in the right location with correct internal imports.

### `packages/shared/components.json`

```json
{
  "style": "...",
  "tailwind": {
    "css": "src/index.css"
  },
  "aliases": {
    "components": "@carveri/shared/components",
    "utils": "@carveri/shared/lib/utils",
    "ui": "@carveri/shared/components/ui",
    "lib": "@carveri/shared/lib",
    "hooks": "@carveri/shared/hooks"
  }
}
```

Note: `packages/shared/` needs a minimal `src/index.css` (importing `tailwindcss`) for shadcn's CSS path requirement. This file is not used at runtime — each app's own `index.css` is the real theme.

### Adding new shadcn components

Run from the shared package directory, not from an app:

```bash
cd packages/shared && pnpm dlx shadcn@latest add <component>
```

App-level `components.json` files can retain their own `tailwind.css` path pointing to the app's `index.css` but should not redefine `ui`/`utils` aliases (those belong in shared).

## Migration Steps

1. **Set up workspace root** — add `pnpm-workspace.yaml`; strip dependencies and update scripts in root `package.json`.

2. **Create `packages/shared/`** — add `package.json`, `tsconfig.json` (with `baseUrl`), and `components.json`. Also create a minimal `packages/shared/src/index.css` containing only `@import "tailwindcss";` — this satisfies shadcn's CSS path requirement in `components.json` and is not imported by apps at runtime.

3. **Move current app to `apps/mobile/`** — relocate `src/`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `components.json`, `eslint.config.js` into `apps/mobile/`; add `apps/mobile/package.json`.

4. **Split shared vs mobile-specific** — move shared component folders, `data/`, `lib/`, `types/`, and `locales/` from `apps/mobile/src/` to `packages/shared/src/`; leave `main.tsx`, `layout/`, `data/router.tsx`, `pages/`, `index.css`, `AppHeader.tsx`, `BottomNavBar.tsx` in `apps/mobile/src/`.

5. **Rewrite `@/` → `@carveri/shared/`** — in every file inside `packages/shared/src/`, replace all `@/` alias occurrences with `@carveri/shared/`. This includes all static locale imports in `i18n.ts`.

6. **Update `apps/mobile/` config** — update `vite.config.ts` with both aliases and the `babel-plugin-react-compiler` plugin; update `tsconfig.app.json` with `paths` for both aliases; keep `include: ["src"]` only.

7. **Scaffold `apps/desktop/`** — copy `apps/mobile/` build config structure; create a minimal desktop layout shell without `BottomNavBar`; add `apps/desktop/package.json`.

8. **Wire up workspace deps** — add `"@carveri/shared": "workspace:*"` to both apps' `package.json`; run `pnpm install` from the monorepo root.

9. **Verify** — run the verification checklist below.

## Verification Checklist

- [ ] `pnpm dev:mobile` starts with no errors
- [ ] `pnpm dev:desktop` starts with no errors
- [ ] `pnpm --filter @carveri/shared tsc --noEmit` passes
- [ ] `pnpm --filter @carveri/mobile build` passes (tsc + vite)
- [ ] `pnpm --filter @carveri/desktop build` passes (tsc + vite)
- [ ] `pnpm lint` passes across all packages
- [ ] HMR works in both apps when editing a shared component
- [ ] HMR works in both apps when editing an app-specific file
