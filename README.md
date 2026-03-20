# CarVeri Portal

CarVeri Portal is a modern web application for car inspection reports and market analysis. Built as a pnpm monorepo with two React 19 SPAs (mobile and desktop) sharing a common component library.

## Tech Stack

- **React 19** with React Compiler (via `babel-plugin-react-compiler`)
- **Vite 7** — build tool and dev server
- **TypeScript 5.9** — strict type safety across all packages
- **React Router 7** — client-side routing
- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin, configured in CSS (no `tailwind.config.js`)
- **Shadcn/UI & Base UI** — accessible component primitives
- **React Hook Form & Yup** — form management and validation
- **Framer Motion** — animations
- **i18next / react-i18next** — EN/ES internationalization
- **Sonner** — toast notifications
- **Yet Another React Lightbox** — image gallery
- **Tabler Icons & Lucide React** — icon sets
- **next-themes** — dark/light mode

## Monorepo Structure

```text
carveri-portal/
├── apps/
│   ├── mobile/          # Mobile-optimized SPA (@carveri/mobile)
│   └── desktop/         # Desktop SPA (@carveri/desktop)
├── packages/
│   └── shared/          # Shared component library (@carveri/shared)
├── package.json         # Monorepo root (pnpm workspaces)
└── pnpm-workspace.yaml  # Workspace config: apps/* + packages/*
```

## Scripts

Run from the monorepo root:

```bash
pnpm dev:mobile       # Start mobile dev server
pnpm dev:desktop      # Start desktop dev server
pnpm build:mobile     # Build mobile app for production
pnpm build:desktop    # Build desktop app for production
pnpm preview:mobile   # Preview mobile production build
pnpm preview:desktop  # Preview desktop production build
pnpm lint             # Lint all packages
```

Per-app scripts (from within `apps/mobile/` or `apps/desktop/`):

```bash
pnpm dev      # Vite dev server
pnpm build    # TypeScript check + Vite build
pnpm lint     # ESLint
pnpm preview  # Preview production build
```

## Apps

### Mobile (`apps/mobile/`)

Mobile-optimized SPA. Key pages:

- `/` — Home (vehicle summary, stats, quick nav)
- `/login`, `/register` — Auth
- `/reports` — Full vehicle inspection report

Layout uses a `RootLayout` (`src/layout/root.tsx`) wrapping all routes defined in `src/data/router.tsx`. The report page includes a fixed bottom nav bar for tab switching on mobile.

### Desktop (`apps/desktop/`)

Desktop-optimized SPA. Shares the same `@carveri/shared` library. Routes defined in `src/data/router.tsx`, with `RootLayout` at `src/layout/root.tsx`.

## Shared Package (`packages/shared/`)

Common library consumed by both apps. Contains all major feature components, types, utilities, and locales.

```text
packages/shared/src/
├── components/
│   ├── ui/                  # Shadcn/UI base components (Button, Card, Badge, Tabs, etc.)
│   ├── vehicle-details/     # Vehicle report page: VehicleHero, VehicleInfoCard, tabs
│   ├── home/                # Home page sections (stats, AI summary, price eval, etc.)
│   ├── history/             # History tab subtabs (accidents, owners, service, timeline, etc.)
│   ├── market/              # Market analysis tab (comparables, pricing)
│   ├── negotiate/           # Negotiation tab (arguments, costs, strategy)
│   ├── verdict/             # Verdict tab (checklist, risks, verdict)
│   ├── CarSummaryCard.tsx
│   ├── ImageCarousel.tsx
│   ├── LanguageToggle.tsx
│   ├── ReportGauge.tsx
│   ├── ScoreRing.tsx
│   └── VerdictBadge.tsx
├── data/
│   ├── api.ts               # API integration
│   ├── mockData.ts          # Mock vehicle data
│   └── report.ts            # Report data helpers
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── gauge.ts             # Gauge chart utilities
│   └── i18n.ts              # i18next setup
├── types/
│   ├── vehicle-detail.ts    # Vehicle, Book, Comparable, ServiceRecord, etc.
│   ├── vehicle-report.ts    # Report-level types
│   ├── lightbox.ts
│   └── css.d.ts
└── locales/
    ├── en.json              # English strings
    └── es.json              # Spanish strings
```

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` — configured entirely in each app's `index.css`
- Theme tokens defined as CSS custom properties using `oklch()` color space
- Shadcn/UI tokens imported via `@import "shadcn/tailwind.css"`
- Font: Geist Variable via `@fontsource-variable/geist`
- Dark mode uses `.dark` class selector
- Use `cn()` from `@/lib/utils` to merge Tailwind classes

## Path Aliases

`@/` maps to `src/` in each app. Use this for all internal imports.

## React Compiler

Both apps use `babel-plugin-react-compiler`. Avoid manual `useMemo`/`useCallback` — the compiler handles these automatically.

## Adding Shadcn Components

```bash
pnpm dlx shadcn@latest add <component>
```

Components are added to `packages/shared/src/components/ui/`.

## License

Private — internal use only.
