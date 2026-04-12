# Hero Section — Landing Page Design

## Goal

Replace the existing `HeroSection.tsx` with a redesigned hero that works independently on desktop and mobile. The hero is dark navy, the rest of the page transitions to a light background. The primary CTA scrolls to the examples section; the secondary CTA scrolls to pricing. A real report mockup (using existing static data) anchors the hero visually.

## Layout

### Desktop — Split 50/50

Left column (copy):
- Badge: animated pulse dot + "VEHICLE INTELLIGENCE" label, green-tinted pill
- H1: "Buying a used car? / **Know before you pay.**" — "Know before you pay." in `#4ade80`
- Subtitle: one sentence describing what the report contains and 24h delivery
- CTA row: primary button ("See real reports →") + secondary button ("View plans")
- Trust row: three micro-signals below CTAs — "✓ 24h delivery", "✓ Carfax included", "✓ 4 valuation books"

Right column (report mockup):
- Card on dark `#1e293b` background with `#1e3a5f` border and deep shadow
- Header row: vehicle name + location + mileage + asking price / verdict badge (BUY · 8.2/10)
- Tags row: `✓ Clean Title`, `✓ No Accidents`, `✓ Verified Odometer`, `⚠ Auction Origin`
- Stats row: Asking price / Market avg / Delta % — three equal boxes
- Valuation books row: MMR / KBB / Black Book / J.D. Power — four equal boxes with green values
- AI analysis box: blue-tinted border, AI label + summary text

Desktop uses two `FadeUp` animations: copy fades up first, mockup fades up with a slight delay.

Two ambient glow blobs (absolute positioned, `blur-3xl`, pointer-events none): one green top-left, one blue bottom-right. Same pattern as current hero.

### Mobile — Stacked

Single column, top to bottom:
1. Badge (same as desktop)
2. H1 (larger relative size — `text-4xl`)
3. Subtitle (shorter copy than desktop)
4. Primary CTA button (full width)
5. Secondary CTA button (full width, outline)
6. Thin gradient divider
7. Report card (compact variant — verdict + score, tags, three stats only; no book values, no AI box)

The report card on mobile is a simplified version — just enough to prove the product, not overwhelm.

## Background & Transition

- Hero section: `bg-[#0A1628]` (same as current)
- Below the hero: page background transitions to light (`bg-background` / white in light mode)
- No explicit transition element needed — the next section's background change creates the break

## Data Source

The report mockup is a **static visual** — values are hardcoded constants inside `HeroSection.tsx`, matching real data from `carCheckExamples[0]`. No dynamic rendering from the data structure. Values:
- Title: `2024 Mitsubishi Outlander SE`
- Location: `Tampa, FL` · Mileage: `33,500 mi` · Asking: `$25,000`
- Verdict: `BUY` · Score: `8.2 / 10`
- Tags (hardcoded): `✓ Clean Title`, `✓ No Accidents`, `✓ Verified Odometer`, `⚠ Auction Origin`
- Stats: asking `$25,000` / market avg `$25,706` / delta `↓ 2.8%`
- Book values: MMR `$21,600`, KBB `$22,310`, BB `$20,925`, JDP `$20,075`
- AI summary (hardcoded, ~160 chars): `"Price is 2.8% below market fair value. Clean Carfax history. Recommend a mechanical inspection before closing."`

## CTAs

Both CTAs receive their scroll handlers as props, consistent with how `HeroSection` already receives `scrollToVinForm` — the desktop home page passes them in. The prop interface changes:

```ts
interface Props {
  scrollToExamples: () => void;
  scrollToPricing: () => void;
}
```

## i18n

All copy goes through the existing `"homepage"` namespace. New keys added under `hero`:

```json
"hero": {
  "badge": "Vehicle Intelligence",
  "title": "Buying a used car?",
  "titleHighlight": "Know before you pay.",
  "description": "AI-powered report with Carfax, 4 valuation books, auction history and market comparables — delivered in 24 hours.",
  "descriptionMobile": "Carfax · 4 valuation books · Auction history · AI verdict. Delivered in 24h.",
  "cta_primary": "See real reports",
  "cta_secondary": "View plans",
  "trust_delivery": "24h delivery",
  "trust_carfax": "Carfax included",
  "trust_books": "4 valuation books",
  "report_verdict_label": "Verdict",
  "report_asking": "Asking",
  "report_market": "Market avg",
  "report_delta": "Below avg",
  "report_ai_label": "AI Analysis"
}
```

Spanish translations added to `es.json` with equivalent keys.

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/HeroSection.tsx` |
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Modify | `apps/desktop/src/pages/home.tsx` (add `examplesRef` + `pricingRef`, pass scroll handlers to HeroSection) |
| Modify | `apps/mobile/src/pages/home.tsx` (same — add `examplesRef` + `pricingRef`, pass scroll handlers to HeroSection) |

## Responsive Strategy

Single component, responsive via Tailwind:
- Mobile layout: always rendered, default
- Desktop layout: `lg:` breakpoint unlocks the split grid, shows trust row, shows full report card

`lg:grid lg:grid-cols-2` on the hero inner container switches between stacked (mobile) and split (desktop).

The report mockup's book values row and AI box are hidden on mobile (`hidden lg:block`) — the compact card is always visible, extended content appears only at `lg:`.

## Tech Stack

React 19, Tailwind CSS v4, framer-motion (`FadeUp` from `animations.tsx`), i18next, Shadcn `Badge`, Tabler icons (`IconPlayerPlay` removed, no video in new design), `cn()` utility.
