# PricingSection Redesign — Design Spec

## Goal

Redesign the pricing section: remove the interactive plan-selection state machine, give each card its own CTA that navigates to `/register?plan={id}`, move all plan content from hardcoded Spanish in `static.tsx` to i18n, and fix the stale "first report is free" subtitle.

---

## Layout

Default `bg-background` — clean white, contrasts with `bg-card` HowItWorks above.

**Desktop:** `sm:grid-cols-3`, max-w-240, centered.  
**Mobile:** stacked.

Popular plan card (`plan3`) is visually elevated: `scale-[1.02]`, `ring-2 ring-primary`, `shadow-xl shadow-primary/20`.

---

## Card anatomy

```
        ┌── [MOST POPULAR badge — absolute, -top-3.5] ──┐
        │  3 Reports                                      │
        │  $59                                            │
        │  ~$20 / report          ← text-primary, xs     │
        │  Most buyers look at…   ← muted, sm            │
        │  ────────────────────────────────               │
        │  ✓ Everything in 1 Report                       │
        │  ✓ Save $28 vs. buying separately               │
        │  ✓ Ideal for comparing options                  │
        │                                                 │
        │  [Get started — $59  →]  ← full-width button   │
        └─────────────────────────────────────────────────┘
```

**Popular card button:** `bg-primary shadow-primary/30 shadow-lg`  
**Other card buttons:** `bg-foreground text-background hover:bg-foreground/90`

---

## CTA behavior

```ts
const handleBuy = (planId: number) => {
  window.location.href = `/register?plan=${planId}`;
};
```

No `useState` — no plan selection state needed.

---

## Component constant

```ts
const PLANS = [
  { id: 1, price: 29, badgeKey: null,          key: "plan1" },
  { id: 3, price: 59, badgeKey: "mostPopular", key: "plan3" },
  { id: 7, price: 99, badgeKey: "bestValue",   key: "plan7" },
] as const;
```

No import from `static.tsx`.

---

## i18n Changes

Replace the existing `pricing` block in both locale files.

### `en.json`
```json
"pricing": {
  "eyebrow": "Plans",
  "title": "Choose your plan",
  "subtitle": "Every plan includes the full CarVeri report.",
  "mostPopular": "Most popular",
  "bestValue": "Best value",
  "cta": "Get started — ${{price}}",
  "securePayment": "Secure payment · Stripe · Report in 24h",
  "plan1": {
    "name": "1 Report",
    "desc": "For the car you've almost decided on.",
    "perReport": "$29 / report",
    "features": ["Full Carfax report", "4 valuation books", "Auction history", "AI verdict", "Market comparables"]
  },
  "plan3": {
    "name": "3 Reports",
    "desc": "Most buyers look at 3 cars before deciding.",
    "perReport": "~$20 / report",
    "features": ["Everything in 1 Report", "Save $28 vs. buying separately", "Ideal for comparing options"]
  },
  "plan7": {
    "name": "7 Reports",
    "desc": "For serious shoppers comparing multiple options.",
    "perReport": "~$14 / report",
    "features": ["Everything in 1 Report", "Best cost per report", "Share with family or friends"]
  }
}
```

### `es.json`
```json
"pricing": {
  "eyebrow": "Planes",
  "title": "Elige tu plan",
  "subtitle": "Cada plan incluye el reporte CarVeri completo.",
  "mostPopular": "Más popular",
  "bestValue": "Mejor valor",
  "cta": "Comenzar — ${{price}}",
  "securePayment": "Pago seguro · Stripe · Reporte en 24h",
  "plan1": {
    "name": "1 Reporte",
    "desc": "Para el carro que ya tienes casi decidido.",
    "perReport": "$29 / reporte",
    "features": ["Carfax completo", "4 libros de valuación", "Historial de subasta", "Veredicto IA", "Comparables del mercado"]
  },
  "plan3": {
    "name": "3 Reportes",
    "desc": "La mayoría mira 3 carros antes de decidir.",
    "perReport": "~$20 / reporte",
    "features": ["Todo lo del plan básico", "Ahorra $28 vs comprar por separado", "Ideal para comparar opciones"]
  },
  "plan7": {
    "name": "7 Reportes",
    "desc": "Para quien está comparando varias opciones.",
    "perReport": "~$14 / reporte",
    "features": ["Todo lo del plan básico", "Mejor costo por reporte", "Comparte con familia o amigos"]
  }
}
```

---

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/PricingSection.tsx` |

`static.tsx` `plans` export becomes unused — left in place, not deleted.

---

## Tech Stack

React 19, Tailwind CSS v4, `FadeUp` from animations, i18next (`homepage` namespace, `returnObjects: true` for features arrays), `cn()`, `@tabler/icons-react`, Shadcn `Button` + `Separator`. No new dependencies.
