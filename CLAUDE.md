# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Vite)
pnpm build        # TypeScript check + production build
pnpm lint         # ESLint
pnpm preview      # Preview production build locally
```

There are no tests in this project.

## Architecture

**CarCheck Portal** is a React 19 SPA for car inspection reports and market analysis. It uses React Router 7 for client-side routing with a single `RootLayout` wrapping all routes.

### Routing (`src/data/router.tsx`)

All routes are children of `RootLayout` (`src/layout/root.tsx`). The main feature route is `/reports` → `Report` page. Test/playground routes (`/test-router`, `/test-form`, `/test-lightbox`) are only visible in the nav during dev mode via React 19's `<Activity mode={import.meta.env.DEV ? "visible" : "hidden"}>`.

### Key Page: Report (`src/pages/report.tsx`)

The primary feature page. Layout: responsive two-column grid (vehicle hero image gallery + info/price card), followed by a tabbed section (Historial, Mercado, Valoración IA, Documentos). On mobile, the tab switching is driven by a fixed bottom nav bar instead of the desktop tab list. All data is currently sourced from `src/data/mockData.ts`.

### Component Organization

- `src/components/ui/` — Shadcn/UI base components (Button, Card, Badge, Tabs, etc.) configured via `components.json` with `radix-nova` style and Tabler icons
- `src/components/vehicle-details/` — Feature-specific components for the vehicle report page
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/gauge.ts` — Gauge chart utilities for `ReportGauge.tsx`
- `src/types/vehicle-detail.ts` — All TypeScript interfaces for vehicle data (`Vehicle`, `Book`, `Comparable`, `ServiceRecord`, `OwnerRecord`, `VehicleImage`)

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no `tailwind.config.js` — configured entirely in `src/index.css`)
- Theme tokens defined as CSS custom properties in `src/index.css` using `oklch()` color space
- Shadcn/UI tokens imported via `@import "shadcn/tailwind.css"`
- Font: Geist Variable via `@fontsource-variable/geist`
- Dark mode uses `.dark` class selector (not `prefers-color-scheme`)
- `cn()` from `@/lib/utils` is the standard way to merge Tailwind classes

### Path Aliases

`@/` maps to `src/` — use this for all internal imports.

### React Compiler

The project uses `babel-plugin-react-compiler` — avoid manual `useMemo`/`useCallback` optimizations as the compiler handles these automatically.

### Adding Shadcn Components

Use the shadcn CLI: `pnpm dlx shadcn@latest add <component>`. Components are added to `src/components/ui/`.
