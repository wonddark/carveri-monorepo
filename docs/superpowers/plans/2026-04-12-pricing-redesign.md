# PricingSection Redesign — Implementation Plan

**Goal:** Remove interactive plan-selection state, give each card its own CTA navigating to `/register?plan={id}`, move all content to i18n, fix stale subtitle.

**Architecture:** Two tasks — i18n first, then component rewrite.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, `FadeUp`, i18next (`homepage` namespace, `returnObjects: true`), `cn()`, `@tabler/icons-react`, Shadcn `Button` + `Separator`.

---

## File Map

| Action | File |
|---|---|
| Modify | `packages/shared/src/components/home-page/locales/en.json` |
| Modify | `packages/shared/src/components/home-page/locales/es.json` |
| Rewrite | `packages/shared/src/components/home-page/PricingSection.tsx` |

---

### Task 1: Update i18n keys

- [ ] **Step 1: Replace the `pricing` block in `en.json`**

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
},
```

- [ ] **Step 2: Replace the `pricing` block in `es.json`**

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
},
```

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/home-page/locales/en.json \
        packages/shared/src/components/home-page/locales/es.json
git commit -m "feat(pricing): update i18n keys with nested plan content"
```

---

### Task 2: Rewrite PricingSection.tsx

- [ ] **Step 1: Replace the file contents**

```tsx
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Separator } from "@carveri/shared/components/ui/separator.tsx";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

const PLANS = [
  { id: 1, price: 29, badgeKey: null,          key: "plan1" },
  { id: 3, price: 59, badgeKey: "mostPopular", key: "plan3" },
  { id: 7, price: 99, badgeKey: "bestValue",   key: "plan7" },
] as const;

function PricingSection() {
  const { t } = useTranslation("homepage");

  const handleBuy = (planId: number) => {
    window.location.href = `/register?plan=${planId}`;
  };

  return (
    <section className="py-16 lg:py-24" id="pricing">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-10 max-w-135 text-center lg:mb-14">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold uppercase tracking-widest">
              {t("pricing.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight sm:text-[2.25rem]">
              {t("pricing.title")}
            </h2>
            <p className="text-muted-foreground mt-3 text-[1.05rem]">
              {t("pricing.subtitle")}
            </p>
          </div>
        </FadeUp>

        <div className="mx-auto grid max-w-240 gap-5 sm:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isPopular = plan.badgeKey === "mostPopular";
            const features = t(`pricing.${plan.key}.features`, {
              returnObjects: true,
            }) as string[];

            return (
              <FadeUp key={plan.id} delay={0.1 + i * 0.08}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-visible rounded-2xl border bg-card p-6 lg:p-7",
                    isPopular
                      ? "border-primary shadow-primary/20 scale-[1.02] shadow-xl ring-2 ring-primary"
                      : "border-border",
                  )}
                >
                  {/* Badge */}
                  {plan.badgeKey && (
                    <span
                      className={cn(
                        "absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 font-[Outfit] text-xs font-bold tracking-wider text-white",
                        isPopular ? "bg-primary" : "bg-amber-500",
                      )}
                    >
                      {t(`pricing.${plan.badgeKey}`)}
                    </span>
                  )}

                  <div className="flex-1">
                    <p className="font-[Outfit] text-lg font-bold">
                      {t(`pricing.${plan.key}.name`)}
                    </p>
                    <div className="mt-3">
                      <span className="font-[Outfit] text-4xl font-black">
                        ${plan.price}
                      </span>
                    </div>
                    <p className="text-primary mt-1 text-xs font-semibold">
                      {t(`pricing.${plan.key}.perReport`)}
                    </p>
                    <p className="text-muted-foreground mb-5 mt-3 text-sm">
                      {t(`pricing.${plan.key}.desc`)}
                    </p>

                    <Separator className="mb-4" />

                    <div className="space-y-2.5">
                      {features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm">
                          <IconCheck
                            className="h-4 w-4 shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBuy(plan.id)}
                    size="lg"
                    className={cn(
                      "mt-6 w-full font-[Outfit] font-bold active:scale-[0.97]",
                      isPopular
                        ? "bg-primary shadow-primary/30 shadow-lg"
                        : "bg-foreground text-background hover:bg-foreground/90",
                    )}
                  >
                    {t("pricing.cta", { price: plan.price })}
                    <IconArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.35}>
          <p className="text-muted-foreground mt-8 text-center text-sm">
            {t("pricing.securePayment")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default PricingSection;
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
git add packages/shared/src/components/home-page/PricingSection.tsx
git commit -m "feat(pricing): redesign with per-card CTAs and register navigation"
```
