# Features Section — Design Spec

## Goal

Redesign the `Features` section with a bento grid layout that gives **AI Verdict** hero treatment (it's the differentiator) and presents the 5 supporting data-source features as smaller cards that visually "feed into" the verdict. Move all feature content from hardcoded Spanish in `static.tsx` to i18n keys.

---

## Layout

### Section header (centered)

```
[eyebrow]  WHAT'S IN EVERY REPORT
[h2]       6 layers of intelligence, [titleHighlight] one clear answer.
```

No description paragraph — the cards are self-explanatory.

### Bento grid (desktop: `lg:grid-cols-5`)

```
┌─────────────────────────┬────────────┬────────────┐
│                         │  Carfax    │  4 Books   │
│   AI Verdict            ├────────────┼────────────┤
│   (dark hero card)      │  Auction   │  Market    │
│   lg:col-span-2         ├────────────┴────────────┤
│                         │  24h Delivery (span 2)  │
└─────────────────────────┴─────────────────────────┘
          lg:col-span-2              lg:col-span-3
```

- Outer container: `lg:grid lg:grid-cols-5 gap-5`
- AI Verdict card: `lg:col-span-2`
- Right cluster: `lg:col-span-3 grid grid-cols-2 gap-5`
  - Carfax, 4 Books, Auction, Market: one per grid cell
  - Delivery: `col-span-2` (spans full right width)

**Mobile:** all 6 stack vertically. AI Verdict first (full width), then `grid grid-cols-2` for the other 5 — Delivery as `col-span-2` last.

---

## AI Verdict Card (hero)

Background: `bg-[#0A1628]` (matches hero and AIAnalysis sections for brand consistency).

```
┌──────────────────────────────────────────────────┐
│  [✦ AI VERDICT badge — blue pill]                │
│                                                   │
│  AI Verdict                      ← h3, white     │
│                                                   │
│  Our AI cross-references all data sources and     │
│  delivers one of three verdicts — with concrete   │
│  reasons behind every call.      ← gray-300 text  │
│                                                   │
│  ┌──────────┐ ┌──────────────┐ ┌──────────┐     │
│  │ ✓  Buy   │ │ ⚡ Negotiate │ │ ✗  Avoid │     │
│  └──────────┘ └──────────────┘ └──────────┘     │
│    green         amber              rose           │
│                                                   │
│  Powered by 11 data sources      ← tiny, gray-500 │
└──────────────────────────────────────────────────┘
```

Verdict pill styles:
- Buy: `bg-green-500/15 text-green-400 border border-green-500/20`
- Negotiate: `bg-amber-500/15 text-amber-400 border border-amber-500/20`
- Avoid: `bg-rose-500/15 text-rose-400 border border-rose-500/20`

Each pill: `rounded-full px-3.5 py-1.5 text-sm font-semibold font-[Outfit]`

---

## Supporting Feature Cards (5 cards)

Standard `bg-card` surface, `rounded-2xl border border-border`.

```
┌──────────────────────────────────┐
│  [icon — colored square 40×40]   │
│                                   │
│  Card Title         ← font-bold  │
│  One-line description ← muted    │
└──────────────────────────────────┘
```

Hover: `hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`

Icon colors (keep existing scheme from static.tsx):
- Carfax: `bg-blue-500`
- 4 Books: `bg-emerald-500`
- Auction: `bg-amber-500`
- Market: `bg-rose-500`
- Delivery: `bg-cyan-500`

---

## i18n Changes

**Both `en.json` and `es.json` — replace the `features` block:**

### `en.json`
```json
"features": {
  "eyebrow": "What's in every report",
  "title": "6 layers of intelligence,",
  "titleHighlight": "one clear answer.",
  "verdict": {
    "badge": "AI Verdict",
    "title": "AI Verdict",
    "description": "Our AI cross-references all data sources and delivers one of three verdicts — with concrete reasons behind every call.",
    "buy": "Buy",
    "negotiate": "Negotiate",
    "avoid": "Avoid",
    "powered": "Powered by 11 data sources"
  },
  "carfax": {
    "title": "Full Carfax",
    "description": "Accidents, title, odometer, owners, and documented maintenance history."
  },
  "books": {
    "title": "4 Valuation Books",
    "description": "MMR, KBB, Black Book and J.D. Power — know if the price is fair."
  },
  "auction": {
    "title": "Auction History",
    "description": "Photos and data from Copart, IAAI, Manheim or ADESA — only if the car went through auction."
  },
  "market": {
    "title": "Market Comparables",
    "description": "Similar cars for sale near you to compare price and condition."
  },
  "delivery": {
    "title": "24h Delivery",
    "description": "Report ready in 24 hours. In complex cases, 48h max."
  }
}
```

### `es.json`
```json
"features": {
  "eyebrow": "Qué incluye cada reporte",
  "title": "6 capas de inteligencia,",
  "titleHighlight": "una respuesta clara.",
  "verdict": {
    "badge": "Veredicto IA",
    "title": "Veredicto IA",
    "description": "Nuestra IA cruza todas las fuentes de datos y entrega uno de tres veredictos — con razones concretas detrás de cada decisión.",
    "buy": "Comprar",
    "negotiate": "Negociar",
    "avoid": "Evitar",
    "powered": "Potenciado por 11 fuentes de datos"
  },
  "carfax": {
    "title": "Carfax completo",
    "description": "Accidentes, título, odómetro, dueños anteriores e historial de mantenimiento documentado."
  },
  "books": {
    "title": "4 Libros de Valuación",
    "description": "MMR, KBB, Black Book y J.D. Power — sabrás si el precio es justo."
  },
  "auction": {
    "title": "Historial de Subasta",
    "description": "Fotos y datos de Copart, IAAI, Manheim o ADESA — solo si el carro pasó por subasta."
  },
  "market": {
    "title": "Comparables del Mercado",
    "description": "Carros similares en venta cerca de ti para comparar precio y condición."
  },
  "delivery": {
    "title": "Entrega en 24 Horas",
    "description": "Reporte listo en 24 horas. En casos complejos, 48h máximo."
  }
}
```

---

## Component Architecture

`Features.tsx` no longer imports from `static.tsx`. Feature metadata (icon, color, i18n key) lives as a local constant inside the component:

```ts
const SUPPORTING_FEATURES = [
  { key: "carfax",   icon: <IconShieldFilled />, color: "bg-blue-500"    },
  { key: "books",    icon: <IconChartBar />,     color: "bg-emerald-500" },
  { key: "auction",  icon: <IconSearch />,       color: "bg-amber-500"   },
  { key: "market",   icon: <IconTrendingUp />,   color: "bg-rose-500"    },
  { key: "delivery", icon: <IconClock />,        color: "bg-cyan-500"    },
] as const;
```

---

## Animation

- Section header: `FadeUp`
- Bento grid: `FadeIn` (whole grid fades in together — individual card stagger would look cluttered in a bento)

---

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/Features.tsx` |

`packages/shared/src/data/static.tsx` — the `features` export becomes unused but is **not removed** (out of scope; removing it risks breaking other things if referenced elsewhere in the future).

---

## Tech Stack

React 19, Tailwind CSS v4, framer-motion (`FadeUp`, `FadeIn`), i18next (`homepage` namespace), `cn()` utility, `@tabler/icons-react`. No new dependencies.
