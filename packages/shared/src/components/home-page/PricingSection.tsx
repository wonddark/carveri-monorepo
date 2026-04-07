import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { plans } from "@carveri/shared/data/static.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { Separator } from "@carveri/shared/components/ui/separator.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";

function PricingSection() {
  const { t } = useTranslation("homepage");
  const [selectedPlan, setSelectedPlan] = useState(3);

  const currentPlan = plans.find((p) => p.id === selectedPlan)!;

  return (
    <section className="bg-card py-16 lg:py-24" id="pricing">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-10 max-w-135 text-center lg:mb-14">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest uppercase">
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

        {/* Paid plans */}
        <div className="mx-auto grid max-w-240 gap-5 sm:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeUp key={plan.id} delay={0.1 + i * 0.08}>
              <Card
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative h-full cursor-pointer overflow-visible py-0 transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "ring-primary shadow-primary/60 scale-[1.02] shadow-xl ring-2"
                    : "hover:ring-2"
                }`}
              >
                {plan.badge && (
                  <Badge
                    className={cn(
                      "absolute -top-3.5 left-1/2 -translate-x-1/2 border-0 px-4 py-1.5 font-[Outfit] font-bold tracking-wider",
                      {
                        "bg-primary": plan.badge === "MÁS POPULAR",
                        "bg-amber-500": plan.badge !== "MÁS POPULAR",
                      },
                    )}
                  >
                    {plan.badge}
                  </Badge>
                )}

                <CardContent className="p-6 lg:p-7">
                  <div className="mt-1 mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                        selectedPlan === plan.id
                          ? "border-primary"
                          : "border-input"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <div className="bg-primary h-2.5 w-2.5 rounded-full" />
                      )}
                    </div>
                    <span className="font-[Outfit] text-lg font-bold">
                      {plan.name}
                    </span>
                  </div>

                  <div className="mb-1">
                    <span className="font-[Outfit] text-4xl font-black">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground text-lg font-bold">
                      {plan.cents}
                    </span>
                  </div>
                  <div className="text-primary mb-4 text-xs font-semibold">
                    {plan.perReport}
                  </div>
                  <p className="text-muted-foreground mb-5 text-sm">
                    {plan.desc}
                  </p>

                  <Separator className="mb-4" />

                  <div className="space-y-2.5">
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <IconCheck className="h-4 w-4 shrink-0 text-green-500" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.35}>
          <div className="mt-10 text-center">
            <Button
              onClick={() =>
                alert(
                  `TODO: Stripe Checkout — ${currentPlan.name} ($${currentPlan.price}${currentPlan.cents})`,
                )
              }
              size="lg"
              className="bg-primary shadow-primary/50 font-[Outfit] shadow-xl active:scale-[0.97]"
            >
              {t("pricing.buyPlan", {
                name: currentPlan.name,
                price: currentPlan.price,
                cents: currentPlan.cents,
              })}
              <IconArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-muted-foreground mt-3 text-sm">
              {t("pricing.securePayment")}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default PricingSection;
