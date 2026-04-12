# AIAnalysis → Report Preview — Implementation Plan

**Goal:** Replace the redundant AI explanation section with a "Report Preview" that shows the actual report output — 4 callout items describing what the buyer reads, alongside the existing product screenshot.

**Architecture:** Two tasks — i18n keys first, then component rewrite. No home page changes needed (filename unchanged).

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, framer-motion (`FadeUp`), i18next (`homepage` namespace), `cn()` from `@carveri/shared/lib/utils`, `@tabler/icons-react`. No new dependencies.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/AIAnalysis.tsx` |

---

### Task 1: Update i18n keys

- [ ] **Step 1: Replace the `ai` block with `reportPreview` in `en.json`**

Find and replace the entire `"ai"` block with:

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
},
```

- [ ] **Step 2: Replace the `ai` block with `reportPreview` in `es.json`**

Find and replace the entire `"ai"` block with:

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
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(report-preview): replace ai i18n block with reportPreview keys"
```

---

### Task 2: Rewrite AIAnalysis.tsx

- [ ] **Step 1: Replace the file contents**

Write `packages/shared/src/components/home-page/AIAnalysis.tsx` with:

```tsx
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  IconAlertTriangle,
  IconChartBar,
  IconMessageCircle,
  IconSparkles,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const REPORT_AI_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-ai-analysis-v3-8apLrAQmFkomYzhsFG56Ex.webp";

const CALLOUTS = [
  { key: "verdict",     Icon: IconSparkles,     color: "bg-purple-500/15 text-purple-400"   },
  { key: "price",       Icon: IconChartBar,     color: "bg-emerald-500/15 text-emerald-400" },
  { key: "risk",        Icon: IconAlertTriangle, color: "bg-amber-500/15 text-amber-400"    },
  { key: "negotiation", Icon: IconMessageCircle, color: "bg-blue-500/15 text-blue-400"      },
] as const;

function AIAnalysis() {
  const { t } = useTranslation("homepage");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <img
              src={REPORT_AI_IMAGE}
              alt={t("reportPreview.imgAlt")}
              className="w-full rounded-2xl shadow-2xl shadow-gray-200/80"
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
                {t("reportPreview.eyebrow")}
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.25rem]">
                {t("reportPreview.title")}{" "}
                <span className="text-primary">
                  {t("reportPreview.titleHighlight")}
                </span>
              </h2>

              <div className="mt-8 space-y-5">
                {CALLOUTS.map((c) => {
                  const CalloutIcon = c.Icon;
                  return (
                    <div key={c.key} className="flex items-start gap-4">
                      <div
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          c.color,
                        )}
                      >
                        <CalloutIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-[Outfit] text-[15px] font-bold">
                          {t(`reportPreview.${c.key}.title`)}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                          {t(`reportPreview.${c.key}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default AIAnalysis;
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
git add packages/shared/src/components/home-page/AIAnalysis.tsx
git commit -m "feat(report-preview): repurpose AIAnalysis as report output preview"
```
