# AIAnalysis → Report Preview — Design Spec

## Goal

Replace the redundant AI explanation (already covered by the Features bento) with a "Report Preview" section that shows the *output format* of the report — what the buyer actually reads when it lands in their inbox. Shifts from "here's what we gather" to "here's what you get back."

---

## Content

**Section header (right column on desktop):**
```
[eyebrow]  INSIDE YOUR REPORT
[h2]       Delivered in 24 hours. [titleHighlight] Ready to act on.
```

**4 callout items:**

| Key | Icon | Color | Title | Description |
|---|---|---|---|---|
| `verdict` | IconSparkles | purple | Verdict + reasons | Buy, Negotiate, or Avoid — with 3–5 specific reasons for this exact car. |
| `price` | IconChartBar | emerald | Price intelligence | Asking price vs. MMR, KBB, Black Book and J.D. Power — at a glance. |
| `risk` | IconAlertTriangle | amber | Risk timeline | Every accident, title flag, and auction appearance in chronological order. |
| `negotiation` | IconMessageCircle | blue | Negotiation ammo | Specific talking points: "This car sold at auction for $X, dealer is asking $Y." |

**Image:** existing `carcheck-ai-analysis-v3` CloudFront URL (placeholder until better screenshots are available).

No CTA button — `ReportSample` below already carries the "View plans" CTA.

---

## Layout

Light background (default `bg-background`) — contrasts with the dark `#0A1628` sections above.

**Desktop (`lg:grid-cols-2`):**
```
[Screenshot — left]  |  [Eyebrow + h2 + 4 callouts — right]
```

**Mobile:** screenshot first, callouts below.

```
┌─────────────────────────────────────────────────┐
│  [report screenshot — full width, rounded]       │
├─────────────────────────────────────────────────┤
│  INSIDE YOUR REPORT                              │
│  Delivered in 24 hours. Ready to act on.         │
│                                                  │
│  [●] Verdict + reasons                           │
│      Buy, Negotiate, or Avoid — with ...         │
│  [●] Price intelligence                          │
│      Asking price vs. MMR, KBB ...               │
│  [●] Risk timeline                               │
│      Every accident, title flag ...              │
│  [●] Negotiation ammo                            │
│      Specific talking points ...                 │
└─────────────────────────────────────────────────┘
```

Callout item anatomy:
```
[icon — h-9 w-9 rounded-xl, tinted bg]  Title (font-bold)
                                         Short description (text-sm muted)
```

Animations: `FadeUp` on screenshot, `FadeUp delay={0.1}` on right column.

---

## i18n Changes

Replace the `ai` block with `reportPreview` in both locale files.

### `en.json`
```json
"reportPreview": {
  "eyebrow": "Inside your report",
  "title": "Delivered in 24 hours.",
  "titleHighlight": "Ready to act on.",
  "imgAlt": "CarVeri report — AI analysis section",
  "verdict": {
    "title": "Verdict + reasons",
    "description": "Buy, Negotiate, or Avoid — with 3–5 specific reasons for this exact car."
  },
  "price": {
    "title": "Price intelligence",
    "description": "Asking price vs. MMR, KBB, Black Book and J.D. Power — at a glance."
  },
  "risk": {
    "title": "Risk timeline",
    "description": "Every accident, title flag, and auction appearance in chronological order."
  },
  "negotiation": {
    "title": "Negotiation ammo",
    "description": "Specific talking points: \"This car sold at auction for $X, dealer is asking $Y.\""
  }
}
```

### `es.json`
```json
"reportPreview": {
  "eyebrow": "Dentro de tu reporte",
  "title": "Entregado en 24 horas.",
  "titleHighlight": "Listo para actuar.",
  "imgAlt": "Reporte CarVeri — sección de análisis IA",
  "verdict": {
    "title": "Veredicto + razones",
    "description": "Comprar, Negociar o Evitar — con 3–5 razones específicas para este carro exacto."
  },
  "price": {
    "title": "Inteligencia de precio",
    "description": "Precio pedido vs. MMR, KBB, Black Book y J.D. Power — de un vistazo."
  },
  "risk": {
    "title": "Línea de tiempo de riesgos",
    "description": "Cada accidente, marca en el título e historial de subasta en orden cronológico."
  },
  "negotiation": {
    "title": "Munición de negociación",
    "description": "Argumentos específicos: \"Este carro se vendió en subasta por $X, el dealer pide $Y.\""
  }
}
```

---

## Component Architecture

`AIAnalysis.tsx` — filename unchanged (avoids import changes in both home pages). Component function remains `AIAnalysis`.

Module-level constant:
```ts
const CALLOUTS = [
  { key: "verdict",     Icon: IconSparkles,      color: "bg-purple-500/15 text-purple-400"  },
  { key: "price",       Icon: IconChartBar,       color: "bg-emerald-500/15 text-emerald-400" },
  { key: "risk",        Icon: IconAlertTriangle,  color: "bg-amber-500/15 text-amber-400"   },
  { key: "negotiation", Icon: IconMessageCircle,  color: "bg-blue-500/15 text-blue-400"     },
] as const;
```

Icons stored as component references (not JSX) — same pattern as Features.tsx.

---

## Files

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/AIAnalysis.tsx` |

---

## Tech Stack

React 19, Tailwind CSS v4, framer-motion (`FadeUp`), i18next (`homepage` namespace), `cn()` from `@carveri/shared/lib/utils`, `@tabler/icons-react`. No new dependencies.
