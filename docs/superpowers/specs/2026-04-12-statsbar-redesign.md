# StatsBar Redesign — Design Spec

## Goal

Replace the three vanity metrics (reports sold, sources, delivery time) with four honest capability facts that are true on day zero. Reposition the band from between ExamplesSlider and Features to between Features and AIAnalysis, where it reinforces the features section rather than making social proof claims.

---

## Content

| Value | Suffix | Label (en) | Label (es) |
|---|---|---|---|
| 11 | — | Data sources cross-referenced | Fuentes de datos cruzadas |
| 4 | — | Valuation books compared | Libros de valuación comparados |
| 100 | + | Data points per report | Puntos de datos por reporte |
| 24 | h | Guaranteed delivery | Entrega garantizada |

---

## Layout

Horizontal band, `border-y border-border bg-card py-10`.

**Desktop (`lg`):** 4-column grid, stats centered, `divide-x divide-border` for vertical separators.  
**Mobile:** 2×2 grid, no dividers.

```
┌────────────┬────────────┬────────────┬────────────┐
│    11      │     4      │   100+     │    24h     │
│  Data src  │  Val. bks  │ Data pts   │ Delivery   │
└────────────┴────────────┴────────────┴────────────┘
```

Each stat cell:
- Value: `AnimatedCounter` — large, `font-[Outfit] font-black text-[2rem] sm:text-[2.25rem]`
- Label: `text-muted-foreground text-sm mt-1`

`AnimatedCounter` and `FadeUp` imported from `@carveri/shared/components/animations.tsx`. Each cell staggered with `delay={i * 0.05}`.

---

## Repositioning

In both `apps/desktop/src/pages/home.tsx` and `apps/mobile/src/pages/home.tsx`:

**Before:**
```tsx
<ExamplesSlider />
<StatsBar />        ← currently here
<Features />
<AIAnalysis />
```

**After:**
```tsx
<ExamplesSlider />
<Features />
<StatsBar />        ← moved here
<AIAnalysis />
```

---

## i18n Changes

**`en.json` — replace the `stats` block:**
```json
"stats": {
  "sources": "Data sources cross-referenced",
  "books": "Valuation books compared",
  "dataPoints": "Data points per report",
  "delivery": "Guaranteed delivery"
}
```

**`es.json` — replace the `stats` block:**
```json
"stats": {
  "sources": "Fuentes de datos cruzadas",
  "books": "Libros de valuación comparados",
  "dataPoints": "Puntos de datos por reporte",
  "delivery": "Entrega garantizada"
}
```

---

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/StatsBar.tsx` |
| Modify | `apps/desktop/src/pages/home.tsx` |
| Modify | `apps/mobile/src/pages/home.tsx` |

---

## Tech Stack

React 19, Tailwind CSS v4, `AnimatedCounter` + `FadeUp` from `@carveri/shared/components/animations.tsx`, i18next (`homepage` namespace). No new dependencies.
