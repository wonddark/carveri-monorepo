# Route-Based Report Tabs Design

**Date:** 2026-04-03
**Status:** Approved

## Problem

The report page currently manages the active section via `useState`. This means:
- Tab switches have no URL representation (no deep links, no back/forward)
- All section data is passed through props and re-rendered on every switch

## Solution

Convert the flat `ReportPage` + `activeSection` state model to a nested route tree where the parent route loads and caches the report once, and each tab is a child route.

## Route Structure

```
/reports/:vin                      parent layout route — loader runs once
  index                            redirects to ./resumen
  /reports/:vin/resumen
  /reports/:vin/timeline
  /reports/:vin/fotos-subasta
  /reports/:vin/accidentes
  /reports/:vin/duenos
  /reports/:vin/servicio
  /reports/:vin/titulo
  /reports/:vin/mercado
  /reports/:vin/verdict_ai
  /reports/:vin/checklist
  /reports/:vin/estrategia
  /reports/:vin/argumentos
  /reports/:vin/costos
```

## Caching Strategy

React Router caches the parent route loader's return value for as long as the user remains within the `/reports/:vin/*` subtree. Navigating between child routes never re-runs the parent loader.

`shouldRevalidate: () => false` is added to the parent route to prevent any revalidation (e.g. on focus, on form submit). The report data is treated as immutable for the lifetime of the page visit.

## Component Changes

### `packages/shared/src/data/loaders.ts`
No change to the loader logic. `shouldRevalidate` is set at the route definition level in each app's router, not in the loader itself.

### `apps/desktop/src/data/router.tsx`
- Parent route gets `id: "report"` and `shouldRevalidate: () => false`
- Index child route redirects to `resumen`
- One child route per section, each pointing to a thin wrapper component

### `apps/desktop/src/pages/ReportPage.tsx` (becomes a layout)
- Removes `activeSection` state and `onNavigate` handler
- Renders `<Outlet />` in place of `<ReportMainContent>`
- Still calls `useLoaderData<TransformedReport>()` and passes `report` to `<ReportSidebar>`

### `apps/desktop/src/components/ReportSidebar.tsx`
- Nav buttons replaced with `<NavLink to={`/reports/${vin}/${sectionId}`}>` (absolute paths via `useParams`)
- Active state driven by NavLink's built-in `isActive` — removes `activeSection` and `onNavigate` props
- Group open/close state (`openGroups`) can remain, but auto-expands when a child route is active

### `apps/desktop/src/components/ReportMainContent.tsx` — **deleted**
Replaced by individual child-route components.

### `apps/desktop/src/pages/report-sections/` — **new directory**
Thin route components, one per section. Each calls `useRouteLoaderData("report")` to get the cached `TransformedReport` and renders the corresponding shared component. No props drilling.

Example:
```tsx
// ResumenSection.tsx
export default function ResumenSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ResumenView report={report} />;
}
```

The `verdict_ai` section renders two components side-by-side (same as current `ReportMainContent`), so its wrapper handles that layout.

### `SectionId` type (`ReportPage.tsx`)
Removed — no longer needed. Section identity is the URL segment string.

## Mobile App (`apps/mobile`)

Mobile has a different UX from desktop: 5 top-level tabs (home, history, market, verdict, negotiate) shown in a bottom nav bar, with a horizontal slide animation whose direction depends on the relative order of the tabs.

**Route structure:**
```
/reports/:vin                parent layout route — loader, id, shouldRevalidate
  index → redirect to ./home
  /reports/:vin/home
  /reports/:vin/history
  /reports/:vin/market
  /reports/:vin/verdict
  /reports/:vin/negotiate
```

**Animation direction:** The current implementation tracks `prevTab` in state to compute slide direction. With routes, this moves to a `useRef` that records the previous `pathname` before each navigation. The `TAB_ORDER` array stays — direction is derived by comparing the index of the current and previous path segments.

**`BottomNavBar`:** `onTabChange` callback replaced with `<NavLink>` per tab, or the component calls `useNavigate` internally. `activeTab` prop replaced by reading `useLocation` to determine which tab is active.

**Child route components:** Same pattern as desktop — each calls `useRouteLoaderData("report")` and renders the corresponding tab component (`HomeTab`, `HistoryTab`, etc.).

## Data Access Pattern

Child route components do **not** receive props. They call:

```ts
const report = useRouteLoaderData("report") as TransformedReport;
```

This is safe because the child routes only exist under the parent route that provides `"report"` data — they are never rendered in any other context.

## What Is Not Changed

- `packages/shared/src/data/api.ts` — untouched
- `packages/shared/src/data/loaders.ts` — untouched
- `packages/shared/src/lib/transforms.ts` — untouched
- All shared section components (`TimelineSubtab`, `MarketTab`, etc.) — untouched
- `ResumenView` — untouched

## Benefits

- Deep links work: `/reports/VIN/mercado` opens directly to the market tab
- Browser back/forward navigates between tabs correctly
- Zero extra network requests when switching tabs
- No external state management library needed
- `SectionId` type and `activeSection`/`onNavigate` prop-drilling eliminated
