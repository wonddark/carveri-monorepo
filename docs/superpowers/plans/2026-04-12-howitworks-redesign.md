# HowItWorks Redesign — Implementation Plan

**Goal:** Replace generic 3-col card grid with an open stepper. Large step numbers as visual anchors, connector line on desktop, copy moved from hardcoded Spanish in `static.tsx` to i18n.

**Architecture:** Two tasks — i18n first, then component rewrite.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, framer-motion (`FadeUp`), i18next (`homepage` namespace), `cn()`, `@tabler/icons-react`. No new dependencies.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/HowItWorks.tsx` |

---

### Task 1: Update i18n keys

- [ ] **Step 1: Replace the `howItWorks` block in `en.json`**

```json
"howItWorks": {
  "eyebrow": "How it works",
  "title": "Three steps.",
  "titleHighlight": "That simple.",
  "step1": {
    "num": "01",
    "title": "Send the VIN",
    "description": "Just the VIN, the asking price, and your ZIP code."
  },
  "step2": {
    "num": "02",
    "title": "We analyze everything",
    "description": "Carfax, 4 valuation books, auction history, market comparables and more."
  },
  "step3": {
    "num": "03",
    "title": "Receive your CarVeri",
    "description": "A visual report with a clear verdict and the data to back it up."
  }
},
```

- [ ] **Step 2: Replace the `howItWorks` block in `es.json`**

```json
"howItWorks": {
  "eyebrow": "Cómo funciona",
  "title": "Tres pasos.",
  "titleHighlight": "Así de simple.",
  "step1": {
    "num": "01",
    "title": "Envía el VIN",
    "description": "Solo el VIN, el precio que piden y tu ZIP code."
  },
  "step2": {
    "num": "02",
    "title": "Analizamos todo",
    "description": "Carfax, 4 libros de valuación, historial de subasta, comparables y más."
  },
  "step3": {
    "num": "03",
    "title": "Recibe tu CarVeri",
    "description": "Reporte visual con veredicto claro y los datos que lo respaldan."
  }
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(how-it-works): update i18n keys to nested step structure"
```

---

### Task 2: Rewrite HowItWorks.tsx

- [ ] **Step 1: Replace the file contents**

```tsx
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { IconBolt, IconFileText, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const STEPS = [
  { key: "step1", Icon: IconFileText },
  { key: "step2", Icon: IconSearch   },
  { key: "step3", Icon: IconBolt     },
] as const;

function HowItWorks() {
  const { t } = useTranslation("homepage");

  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        {/* Header */}
        <FadeUp>
          <div className="mx-auto mb-16 max-w-125 text-center">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
              {t("howItWorks.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight sm:text-[2.25rem]">
              {t("howItWorks.title")}{" "}
              <span className="text-primary">{t("howItWorks.titleHighlight")}</span>
            </h2>
          </div>
        </FadeUp>

        {/* Steps */}
        <div className="relative mx-auto max-w-240">
          {/* Connector line — desktop only */}
          <div className="absolute top-[2.25rem] right-[calc(16.666%+1rem)] left-[calc(16.666%+1rem)] hidden h-px bg-border lg:block" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <FadeUp key={step.key} delay={i * 0.1}>
                  <div className="relative text-center lg:text-left">
                    {/* Step number */}
                    <span className="text-primary font-[Outfit] text-5xl font-black leading-none">
                      {t(`howItWorks.${step.key}.num`)}
                    </span>

                    {/* Icon */}
                    <div className="bg-primary/10 text-primary mt-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                      <StepIcon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    {/* Copy */}
                    <p className="mt-5 font-[Outfit] text-xl font-bold">
                      {t(`howItWorks.${step.key}.title`)}
                    </p>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                      {t(`howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
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
git add packages/shared/src/components/home-page/HowItWorks.tsx
git commit -m "feat(how-it-works): redesign as open stepper with large step numbers"
```
