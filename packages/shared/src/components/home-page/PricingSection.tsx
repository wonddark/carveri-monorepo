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

  const handleBuy = (_planId: number) => {
    window.location.href = "/login";
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
