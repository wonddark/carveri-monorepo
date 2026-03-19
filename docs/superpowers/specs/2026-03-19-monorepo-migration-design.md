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
│       │   │   ├── home/
│       │   │   ├── history/
│       │   │   ├── market/
│       │   │   ├── negotiate/
│       │   │   ├── verdict/
│       │   │   ├── vehicle-details/
│       │   │   ├── ScoreRing.tsx
│       │   │   ├── VerdictBadge.tsx
│       │   │   ├── ReportGauge.tsx
│       │   │   ├── ImageCarousel.tsx
│       │   │   ├── LanguageToggle.tsx
│       │   │   └── CarSummaryCard.tsx
│       │   ├── data/                ← api.ts, mockData.ts, report.ts
│       │   ├── lib/                 ← utils.ts, gauge.ts, i18n.ts
│       │   ├── types/               ← all TypeScript interfaces
│       │   └── locales/             ← en.json, es.json + feature locales
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
    │   │   ├── pages/
    │   │   └── components/
    │   │       ├── AppHeader.tsx
    │   │       └── BottomNavBar.tsx
    │   ├── index.html
    │   ├── vite.config.ts
    │   ├── components.json
    │   ├── eslint.config.js
    │   ├── package.json
    │   └── tsconfig.json
    │
    └── desktop/                     ← @carveri/desktop (medium+ displays)
        ├── src/
        │   ├── index.css            ← desktop-specific Tailwind theme
        │   ├── main.tsx
        │   ├── layout/root.tsx      ← desktop layout wrapper (sidebar/top-nav)
        │   ├── data/router.tsx
        │   └── pages/
        ├── index.html
        ├── vite.config.ts
        ├── components.json
        ├── eslint.config.js
        ├── package.json
        └── tsconfig.json
```

## Shared vs App-Specific Split

### Moves to `packages/shared/src/`

| Path | Rationale |
|---|---|
| `src/components/ui/` | Shadcn base components used by both apps |
| `src/components/home/` | Feature tab, same data in both layouts |
| `src/components/history/` | Feature tab, same data in both layouts |
| `src/components/market/` | Feature tab, same data in both layouts |
| `src/components/negotiate/` | Feature tab, same data in both layouts |
| `src/components/verdict/` | Feature tab, same data in both layouts |
| `src/components/vehicle-details/` | Report sub-components, layout-agnostic |
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
| `src/lib/i18n.ts` | i18next configuration |
| `src/types/` | All TypeScript interfaces |
| `src/locales/` | Translation files |

### Stays App-Specific

| Path | Rationale |
|---|---|
| `src/main.tsx` | Entry point per app |
| `src/layout/root.tsx` | Core layout difference between apps |
| `src/data/router.tsx` | Routes may diverge per app |
| `src/index.css` | Per-app Tailwind theme |
| `src/components/AppHeader.tsx` | Layout-specific, differs per app |
| `src/components/BottomNavBar.tsx` | Mobile-only navigation pattern |
| `index.html`, `vite.config.ts`, `tsconfig.json`, `package.json`, `components.json`, `eslint.config.js` | Per-app build and tooling config |

## Import Aliasing

### Problem

All current source files use `@/` as an alias for `src/`. After splitting, `@/lib/utils` is ambiguous between an app's own `src/` and the shared package's `src/`.

### Solution

Inside `packages/shared/src/`, replace all `@/` imports with `@carveri/shared/`. Both internal shared-to-shared imports and external app-to-shared imports use the same prefix.

Each app's `vite.config.ts`:

```ts
resolve: {
  alias: {
    "@carveri/shared": path.resolve(__dirname, "../../packages/shared/src"),
    "@": path.resolve(__dirname, "./src"),
  },
}
```

Each app's `tsconfig.json` `compilerOptions.paths`:

```json
{
  "@carveri/shared/*": ["../../packages/shared/src/*"],
  "@/*": ["./src/*"]
}
```

### Import Examples

```ts
// App file importing from shared
import ScoreRing from "@carveri/shared/components/ScoreRing";
import { fetchVehicleReport } from "@carveri/shared/data/api";

// Shared file importing another shared file
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
    "@carveri/shared": "workspace:*",
    ...
  }
}
```

## Migration Steps

1. **Set up workspace root** — add `pnpm-workspace.yaml`; strip dependencies and update scripts in root `package.json`.

2. **Create `packages/shared/`** — add `package.json` and `tsconfig.json` with no build config.

3. **Move current app to `apps/mobile/`** — relocate `src/`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `components.json`, `eslint.config.js` into `apps/mobile/`; add `apps/mobile/package.json`.

4. **Split shared vs mobile-specific** — move shared folders/files from `apps/mobile/src/` to `packages/shared/src/`; leave `main.tsx`, `layout/`, `data/router.tsx`, `index.css`, `AppHeader.tsx`, `BottomNavBar.tsx` in `apps/mobile/src/`.

5. **Rewrite `@/` → `@carveri/shared/`** — in every file inside `packages/shared/src/`, replace the `@/` alias prefix with `@carveri/shared/`. Update `apps/mobile/` vite config and tsconfig to add both aliases.

6. **Scaffold `apps/desktop/`** — copy `apps/mobile/` structure, strip mobile-specific components, create a minimal desktop layout shell; add `apps/desktop/package.json`.

7. **Wire up workspace deps** — add `"@carveri/shared": "workspace:*"` to both apps' `package.json`; run `pnpm install` from the monorepo root.

8. **Verify** — `pnpm dev:mobile` and `pnpm dev:desktop` both start cleanly; TypeScript checks pass in all three packages (`tsc -b` in each).

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
    "paths": {
      "@carveri/shared/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### App `tsconfig.app.json` additions

```json
{
  "compilerOptions": {
    "paths": {
      "@carveri/shared/*": ["../../packages/shared/src/*"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "../../packages/shared/src"]
}
```

## Verification Checklist

- [ ] `pnpm dev:mobile` starts with no errors
- [ ] `pnpm dev:desktop` starts with no errors
- [ ] `pnpm --filter @carveri/shared tsc --noEmit` passes
- [ ] `pnpm lint` passes across all packages
- [ ] HMR works in both apps when editing a shared component
- [ ] HMR works in both apps when editing an app-specific file
