# Features Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Features section with a bento grid layout. AI Verdict gets hero treatment (dark card with verdict pills). The 5 supporting features sit in a 2×2 + 1 right grid. All feature text moves from hardcoded Spanish in `static.tsx` to i18n keys.

**Architecture:** Two sequential tasks — i18n first (Features.tsx depends on new keys), then the component rewrite.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, framer-motion (`FadeUp`/`FadeIn`), i18next (`homepage` namespace), `cn()` from `@carveri/shared/lib/utils`, `@tabler/icons-react`. No new dependencies.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/Features.tsx` |

---

### Task 1: Update i18n keys

**Files:**
- Modify: `packages/shared/src/components/home-page/locales/en.json`
- Modify: `packages/shared/src/components/home-page/locales/es.json`

- [ ] **Step 1: Replace the `features` block in `en.json`**

Open `packages/shared/src/components/home-page/locales/en.json`. Replace the entire `"features"` block with:

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
},
```

- [ ] **Step 2: Replace the `features` block in `es.json`**

Open `packages/shared/src/components/home-page/locales/es.json`. Replace the entire `"features"` block with:

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
},
```

- [ ] **Step 3: Commit**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(features): add nested i18n keys for features bento redesign"
```

---

### Task 2: Rewrite Features.tsx

**Files:**
- Rewrite: `packages/shared/src/components/home-page/Features.tsx`

- [ ] **Step 1: Replace the file contents**

Write `packages/shared/src/components/home-page/Features.tsx` with:

```tsx
import { FadeIn, FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  IconChartBar,
  IconClock,
  IconSearch,
  IconShieldFilled,
  IconSparkles,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const SUPPORTING_FEATURES = [
  { key: "carfax",   icon: <IconShieldFilled className="h-5 w-5" />, color: "bg-blue-500"    },
  { key: "books",    icon: <IconChartBar className="h-5 w-5" />,     color: "bg-emerald-500" },
  { key: "auction",  icon: <IconSearch className="h-5 w-5" />,       color: "bg-amber-500"   },
  { key: "market",   icon: <IconTrendingUp className="h-5 w-5" />,   color: "bg-rose-500"    },
  { key: "delivery", icon: <IconClock className="h-5 w-5" />,        color: "bg-cyan-500"    },
] as const;

const VERDICT_PILLS = [
  { key: "buy",       prefix: "✓",  classes: "border-green-500/20 bg-green-500/15 text-green-400"  },
  { key: "negotiate", prefix: "⚡", classes: "border-amber-500/20 bg-amber-500/15 text-amber-400"  },
  { key: "avoid",     prefix: "✗",  classes: "border-rose-500/20 bg-rose-500/15 text-rose-400"     },
] as const;

function Features() {
  const { t } = useTranslation("homepage");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        {/* Section header */}
        <FadeUp>
          <div className="mx-auto mb-12 max-w-160 text-center lg:mb-16">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
              {t("features.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]">
              {t("features.title")}{" "}
              <span className="text-primary">{t("features.titleHighlight")}</span>
            </h2>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <FadeIn>
          <div className="grid gap-5 lg:grid-cols-5">

            {/* AI Verdict — hero card */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#0A1628] p-7 lg:col-span-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/15 px-3 py-1 font-[Outfit] text-xs font-bold tracking-wider text-blue-400">
                  <IconSparkles className="h-3.5 w-3.5" />
                  {t("features.verdict.badge")}
                </span>
                <h3 className="mt-5 font-[Outfit] text-[1.75rem] font-black text-white">
                  {t("features.verdict.title")}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-300">
                  {t("features.verdict.description")}
                </p>
              </div>

              <div>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {VERDICT_PILLS.map((pill) => (
                    <span
                      key={pill.key}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 font-[Outfit] text-sm font-semibold",
                        pill.classes,
                      )}
                    >
                      {pill.prefix} {t(`features.verdict.${pill.key}`)}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-xs text-gray-500">
                  {t("features.verdict.powered")}
                </p>
              </div>
            </div>

            {/* Supporting features — 2×2 grid + delivery full-width */}
            <div className="grid grid-cols-2 gap-5 lg:col-span-3">
              {SUPPORTING_FEATURES.map((f) => (
                <div
                  key={f.key}
                  className={cn(
                    "rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    f.key === "delivery" && "col-span-2",
                  )}
                >
                  <div
                    className={cn(
                      "mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white",
                      f.color,
                    )}
                  >
                    {f.icon}
                  </div>
                  <p className="font-[Outfit] text-[15px] font-bold">
                    {t(`features.${f.key}.title`)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {t(`features.${f.key}.description`)}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Features;
```

- [ ] **Step 2: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/shared exec tsc --noEmit
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/Features.tsx
git commit -m "feat(features): redesign with bento grid and AI verdict hero card"
```
