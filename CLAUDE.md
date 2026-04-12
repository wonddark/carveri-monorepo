# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run individual apps
pnpm dev:desktop        # apps/desktop dev server
pnpm dev:mobile         # apps/mobile dev server

# Build
pnpm build:desktop
pnpm build:mobile       # TypeScript check + Vite build

# Lint (runs across all packages)
pnpm lint

# Per-app (from within apps/desktop or apps/mobile)
pnpm dev | build | lint | preview
```

There are no tests in this project.

## Monorepo Structure

```
apps/
  desktop/    — @carveri/desktop  (sidebar/nested-route layout, full report detail)
  mobile/     — @carveri/mobile   (tab-based layout, swipeable tabs)
packages/
  shared/     — @carveri/shared   (all feature components, data layer, types, i18n)
```

Both apps are React 19 SPAs with Vite. The `packages/shared` package holds almost all logic and components; apps are thin shells with routing and layout only.

## Path Aliases

Both apps' `vite.config.ts` define:
- `@/` → `apps/<app>/src/`
- `@carveri/shared` → `packages/shared/src/`

Import shared code as `@carveri/shared/components/...`, `@carveri/shared/data/...`, etc.

## Data Flow

```
API (VITE_API_URL)
  └─ packages/shared/src/data/api.ts          — fetch wrappers + auth refresh
  └─ packages/shared/src/lib/transforms.ts    — raw API → shared UI types
  └─ packages/shared/src/data/loaders.ts      — React Router loaders (reportLoader)
  └─ packages/shared/src/data/actions.ts      — React Router actions (login/register)
```

`reportLoader` in `loaders.ts` fetches the raw `VehicleReportResponse` from `GET /Vehicle/:vin/expediente`, runs it through `transformToSharedReport`, and returns the normalized `SharedReport` to both apps via `useRouteData("report")`.

Auth is JWT stored in `localStorage` under `cv_token`. `packages/shared/src/lib/auth.ts` is the single source of truth. `fetchWithAuth` auto-retries once on 401 via `POST /auth/refresh`.

## Type System

Three type layers exist — know the difference:

| File | Purpose |
|---|---|
| `packages/shared/src/types/vehicle-report.ts` | Raw API response shape (`VehicleReportResponse`) |
| `packages/shared/src/lib/transforms.ts` | Intermediate/normalized types (`SharedReport`, `SalesCycle`, etc.) |
| `packages/shared/src/data/report.ts` | UI-facing interfaces used by shared components |
| `packages/shared/src/data/apiContract.ts` | **Negotiation doc only — not used in production code.** Future ideal API shape being agreed with backend. |

`packages/shared/src/types/vehicle-list.ts` — type for the home page vehicle list (`GET /Vehicle/all`).

## Routing

**Desktop** (`apps/desktop/src/data/router.tsx`): nested child routes under `/reports/:vin`, each section is its own URL segment (e.g. `overview`, `timeline`, `diagnosis`, `strategy`, etc.). The report layout shell is `ReportPage` and sections render via `<Outlet />`.

**Mobile** (`apps/mobile/src/data/router.tsx`): 5 top-level tab routes under `/reports/:vin` — `home`, `history`, `market`, `diagnosis`, `negotiate`. Tab sections render via `<Outlet />`.

Both apps share the same `reportLoader`, `loginAction`, `registerAction` from `@carveri/shared/data/`.

## Shared Package Structure

```
packages/shared/src/
  components/
    ui/               — Shadcn/UI base components (Button, Card, Tabs, etc.)
    history/          — Timeline, Owners, Service, Accidents, AuctionPhotos, PastSales subtabs
    home/             — Score ring, AI summary, book values, stats grid
    home-page/        — Public landing page sections
    market/           — Market analysis, comparables
    negotiate/        — Strategy card, arguments, costs
    verdict/          — Diagnosis, risks, checklist, valuation subtabs
    vehicle-details/  — VehicleHero, VehicleInfoCard, MercadoTab, IATab, DocumentsTab
  data/               — API, loaders, actions, mockData, report types, static content
  lib/                — auth, formatters, gauge, i18n, transforms, utils (cn)
  types/              — vehicle-report, vehicle-list, vehicle-detail, lightbox
  locales/            — i18n translation files
```

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js`. Theme configured in each app's `src/index.css` as CSS custom properties using `oklch()`.
- Shadcn/UI tokens via `@import "shadcn/tailwind.css"` in the shared package's `index.css`.
- Dark mode uses `.dark` class selector.
- Always use `cn()` from `@carveri/shared/lib/utils` (or `@/lib/utils` for app-local) to merge Tailwind classes.
- `babel-plugin-react-compiler` is active in both apps — don't add manual `useMemo`/`useCallback`.

## Adding Shadcn Components

Components live in `packages/shared/src/components/ui/`. Run the CLI from the shared package directory:
```bash
cd packages/shared && pnpm dlx shadcn@latest add <component>
```
