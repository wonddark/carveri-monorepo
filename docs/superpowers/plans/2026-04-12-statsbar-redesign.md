# StatsBar Redesign — Implementation Plan

**Goal:** Replace vanity metrics with 4 honest capability facts, reposition the band from after ExamplesSlider to after Features.

**Architecture:** Two tasks — i18n keys first, then StatsBar rewrite + home page repositioning.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, `AnimatedCounter` + `FadeUp` from `@carveri/shared/components/animations.tsx`, i18next (`homepage` namespace).

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/StatsBar.tsx` |
| Modify | `apps/desktop/src/pages/home.tsx` |
| Modify | `apps/mobile/src/pages/home.tsx` |

---

### Task 1: Update i18n keys

- [ ] **Step 1: Replace `stats` block in `en.json`**

```json
"stats": {
  "sources": "Data sources cross-referenced",
  "books": "Valuation books compared",
  "dataPoints": "Data points per report",
  "delivery": "Guaranteed delivery"
},
```

- [ ] **Step 2: Replace `stats` block in `es.json`**

```json
"stats": {
  "sources": "Fuentes de datos cruzadas",
  "books": "Libros de valuación comparados",
  "dataPoints": "Puntos de datos por reporte",
  "delivery": "Entrega garantizada"
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(stats): update i18n keys to capability facts"
```

---

### Task 2: Rewrite StatsBar + reposition in home pages

- [ ] **Step 1: Replace `packages/shared/src/components/home-page/StatsBar.tsx`**

```tsx
import { AnimatedCounter, FadeUp } from "@carveri/shared/components/animations.tsx";
import { useTranslation } from "react-i18next";

const STATS = [
  { value: 11,  suffix: "",  labelKey: "stats.sources"    },
  { value: 4,   suffix: "",  labelKey: "stats.books"      },
  { value: 100, suffix: "+", labelKey: "stats.dataPoints" },
  { value: 24,  suffix: "h", labelKey: "stats.delivery"   },
] as const;

function StatsBar() {
  const { t } = useTranslation("homepage");

  return (
    <section className="border-border bg-card border-y py-10">
      <div className="mx-auto max-w-240 px-5">
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4 lg:divide-x lg:divide-border">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.labelKey} delay={i * 0.05}>
              <div>
                <div className="font-[Outfit] text-[2rem] font-black sm:text-[2.25rem]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground mt-1 text-sm">
                  {t(stat.labelKey)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
```

- [ ] **Step 2: Move StatsBar in `apps/desktop/src/pages/home.tsx`**

Find this block:
```tsx
      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <div ref={examplesRef}>
        <ExamplesSlider />
      </div>

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />
```

Replace with:
```tsx
      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <div ref={examplesRef}>
        <ExamplesSlider />
      </div>

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />
```

- [ ] **Step 3: Apply the same reordering in `apps/mobile/src/pages/home.tsx`**

Same find-and-replace as Step 2.

- [ ] **Step 4: Type-check**

```bash
cd /home/oz/Projects/OsleyHC/carveri-portal
pnpm --filter @carveri/shared exec tsc --noEmit
pnpm --filter @carveri/desktop exec tsc --noEmit
pnpm --filter @carveri/mobile exec tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/components/home-page/StatsBar.tsx \
        apps/desktop/src/pages/home.tsx \
        apps/mobile/src/pages/home.tsx
git commit -m "feat(stats): redesign as capability facts band; move after Features"
```
