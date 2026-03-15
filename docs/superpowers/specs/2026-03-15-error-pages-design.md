# Error Pages Design — 404 & 500

**Date:** 2026-03-15
**Status:** Approved

---

## Overview

Add dedicated 404 (VIN not found) and 500 (server error) error pages to the CarVeri Portal. When the report loader fails, React Router renders a `ReportError` component instead of the report page. Both pages use the existing dark theme and "Branded & Calm" visual style.

---

## Architecture

### Router (`src/data/router.tsx`)

- Add a `loader` function to the `reports/:vin` route. The loader calls `fetchVehicleReport(params.vin)` and returns the data.
- Add `errorElement: <ReportError />` to the `reports/:vin` route only. React Router replaces the route's `element` with `errorElement` on error, bypassing `RootLayout` — `ReportError` must therefore render its own self-contained layout (header bar + centered content). No root-level `errorElement` is added; unexpected errors outside this route are not in scope.

### API (`src/data/api.ts`)

Replace the generic `Error` throw with typed `Response` throws so `isRouteErrorResponse()` works:

```ts
if (response.status === 404) {
  throw new Response("Not Found", { status: 404 });
}
throw new Response("Server Error", { status: 500 });
```

Network-level failures (e.g. `TypeError: Failed to fetch`) are not caught here — they propagate to `ReportError` as non-route errors and are intentionally treated as 500 by the fallback branch.

### Loader (`src/data/router.tsx` or inlined)

```ts
loader: async ({ params }) => {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  return fetchVehicleReport(params.vin);
}
```

### `ReportError` component (`src/pages/report-error.tsx`)

- Self-contained layout: renders its own header bar (back button + CarVeri badge) without `RootLayout`.
- Uses `useRouteError()` and `isRouteErrorResponse()` to read the error.
- Renders the 404 variant when `isRouteErrorResponse(error) && error.status === 404`, the 500 variant for everything else (including network `TypeError`s).
- `ReportError` is only ever rendered at `/reports/:vin`, so `useLocation().pathname` will never be `/`. The CTA is always "← Volver" (`window.history.back()`). The conditional "Reintentar" for `"/"` does not apply to this error boundary.

### Report page (`src/pages/report.tsx`)

- Remove the `useEffect` data fetch, `loading` state, and `report` state.
- Remove the `LoadingSkeleton` component and its `Skeleton` import from `@/components/ui/skeleton`.
- Use `useLoaderData() as VehicleReport` to access the loaded data. With `createBrowserRouter` (non-file-based routing), `useLoaderData()` returns `unknown`; a type cast is the correct approach here.
- **Loading UX trade-off:** navigation now blocks until the API responds (React Router waits for the loader before rendering the report page). There is no in-flight skeleton. This is an accepted regression from the previous instant-render-with-skeleton pattern; the simplification in component logic is worth it.

---

## Visual Design

**Style:** Branded & Calm — no large error code as headline; CarVeri badge at top, error code as a small subdued label at the bottom.

**Layout (both variants — self-contained, no RootLayout):**
1. Header bar: back-chevron button + CarVeri badge (matches report page header visually)
2. Centered content area:
   - Circular icon with tinted background (🔍 red tint for 404, ⚠️ yellow tint for 500)
   - Bold title
   - Subtitle description
   - Thin horizontal divider
   - Small uppercase "Código · 404" or "Código · 500" label
   - Primary CTA button: always "← Volver" (`window.history.back()`)

**404 copy:**
- Title: "Reporte no encontrado"
- Subtitle: "No existe un reporte para este VIN. Verifica el número e intenta de nuevo."

**500 copy:**
- Title: "Error del servidor"
- Subtitle: "Algo salió mal al cargar el reporte. Por favor intenta de nuevo más tarde."

---

## Files Changed

| File | Change |
|---|---|
| `src/data/router.tsx` | Add loader + `errorElement: <ReportError />` to reports route |
| `src/data/api.ts` | Throw `Response` with status 404 or 500 instead of generic `Error` |
| `src/pages/report.tsx` | Replace useEffect fetch with `useLoaderData() as VehicleReport`; remove `loading`/`report` state; remove `LoadingSkeleton` component and `Skeleton` import |
| `src/pages/report-error.tsx` | **New file** — `ReportError` component with self-contained layout |

---

## Out of Scope

- Custom error pages for routes other than `reports/:vin`
- Retry logic or automatic refetch on error
- Root-level error boundary
