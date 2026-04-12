# Examples Slider + VinForm Removal — Design

## Goal

Remove `VinFormSection` from the landing page (no free tier), update three downstream CTAs that previously scrolled to the VIN form to scroll to the pricing section instead, and redesign `ExamplesSlider` with enriched cards that better communicate report value.

## Scope

Two logical pieces, done together because they share the same home page files:

1. **VinFormSection removal** — delete from both home pages, rename props in three components
2. **ExamplesSlider redesign** — new card layout: photo with title badge overlay + data hint line

---

## Part 1 — VinFormSection Removal

### Both home pages (`apps/desktop/src/pages/home.tsx`, `apps/mobile/src/pages/home.tsx`)

Remove:
- `import VinFormSection ...`
- `vinFormRef = useRef<HTMLElement>(null)`
- `scrollToVinForm` function
- `<VinFormSection formRef={vinFormRef} />` JSX block

Change:
- `<ReportSample scrollToVinForm={scrollToVinForm} />` → `<ReportSample scrollToPricing={scrollToPricing} />`
- `<FinalCta scrollToVinForm={scrollToVinForm} />` → `<FinalCta scrollToPricing={scrollToPricing} />`
- `<StickyMobileBar scrollToVinForm={scrollToVinForm} />` → `<StickyMobileBar scrollToPricing={scrollToPricing} />`

Both home pages already have `pricingRef` and `scrollToPricing` from the hero section task.

### `ReportSample.tsx`

Rename prop interface:
```ts
// Before
type Props = { scrollToVinForm: () => void };
// After
type Props = { scrollToPricing: () => void };
```

Change button:
```tsx
// Before
<Button onClick={scrollToVinForm}>...</Button>
// After
<Button onClick={scrollToPricing}>...</Button>
```

Update i18n key `reportSample.getFirstReport` value → `"View plans"` (en) / `"Ver planes"` (es).

### `FinalCta.tsx`

Same prop rename: `scrollToVinForm` → `scrollToPricing`.

Update i18n key `finalCta.getReport` value → `"View plans"` (en) / `"Ver planes"` (es).

### `StickyMobileBar.tsx`

Same prop rename: `scrollToVinForm` → `scrollToPricing`.

Change the button label from `t("get_first_report")` to `t("hero.cta_secondary")` (reuses the existing "View plans" / "Ver planes" translation — no new key needed).

---

## Part 2 — ExamplesSlider Redesign

### Layout

Horizontal scroll carousel, unchanged structural approach. Cards widen slightly to `w-72` (from `w-65`) to give the photo more breathing room.

### Section header

```
[eyebrow]   REAL REPORTS
[h2]        Browse real CarVeri reports
[subtitle]  Every card links to a real, full report — open and readable.
                                                    [‹] [›]  ← desktop only
```

Arrow buttons stay hidden on mobile (`hidden sm:flex`).

### Card anatomy

```
┌──────────────────────────────────────┐
│  <img imageThumbnail>                │  h-44, object-cover
│  [dark gradient overlay, bottom 40%] │
│  ✓ Clean Title        Tampa, FL      │  overlaid bottom of photo
└──────────────────────────────────────┘
  2024 Mitsubishi Outlander SE           font-bold, truncated
  $25,000            33,500 mi           price large + mileage small
  Carfax · 4 valuation books · AI verdict   text-xs text-muted-foreground
  ──────────────────────────────────────
  View full report →                     brand color link
```

### Title badge

Derived from `VehicleListItem.titleDetails` (string | null). Rendered as a pill overlaid on the photo, bottom-left.

```ts
// badge color logic
const isClean = (titleDetails ?? "").toUpperCase().includes("CLEAN");
const badgeColor = isClean ? "green" : "amber";
const badgeLabel = isClean ? "✓ Clean Title" : `⚠ ${titleDetails}`;
// Only render badge if titleDetails is non-null and non-empty
```

Green badge: `bg-green-600/90 text-white`
Amber badge: `bg-amber-600/90 text-white`

### Price formatting

`retailPrice` is a raw number from the API. Format using `Intl.NumberFormat`:

```ts
const formattedPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(car.retailPrice);
```

### Data hint line

Static translated string, same on every card:

```
"Carfax · 4 valuation books · AI verdict"   (en)
"Carfax · 4 libros de valuación · Veredicto IA"  (es)
```

New i18n key: `examples.dataHint`

### Auction location

`car.auction` (string | null) shown at bottom-right of photo, small faded text. Render only if non-null.

### Hover state

`hover:-translate-y-1 hover:shadow-xl transition-all duration-200` — card lifts slightly on hover.

---

## i18n Changes

**`en.json` — update existing keys:**
```json
"examples": {
  "eyebrow": "Real reports",
  "title": "Browse real CarVeri reports",
  "subtitle": "Every card links to a real, full report — open and readable.",
  "dataHint": "Carfax · 4 valuation books · AI verdict",
  "viewReport": "View full report"
}
```
```json
"reportSample": {
  ...
  "getFirstReport": "View plans"
}
```
```json
"finalCta": {
  ...
  "getReport": "View plans"
}
```

**`es.json` — equivalent updates:**
```json
"examples": {
  "eyebrow": "Reportes reales",
  "title": "Explora reportes CarVeri reales",
  "subtitle": "Cada tarjeta enlaza a un reporte real y completo — abierto para leer.",
  "dataHint": "Carfax · 4 libros de valuación · Veredicto IA",
  "viewReport": "Ver reporte completo"
}
```
```json
"reportSample": {
  ...
  "getFirstReport": "Ver planes"
}
```
```json
"finalCta": {
  ...
  "getReport": "Ver planes"
}
```

---

## Files

| Action | File |
|---|---|
| Modify | `apps/desktop/src/pages/home.tsx` |
| Modify | `apps/mobile/src/pages/home.tsx` |
| Modify | `packages/shared/src/components/home-page/ReportSample.tsx` |
| Modify | `packages/shared/src/components/home-page/FinalCta.tsx` |
| Modify | `packages/shared/src/components/home-page/StickyMobileBar.tsx` |
| Rewrite | `packages/shared/src/components/home-page/ExamplesSlider.tsx` |
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |

---

## Tech Stack

React 19, Tailwind CSS v4, framer-motion (`FadeUp`, `FadeIn`), i18next (`homepage` namespace), `cn()` utility. No new dependencies.
