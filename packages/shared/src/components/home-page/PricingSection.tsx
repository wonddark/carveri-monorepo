import { FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { plans } from "@carveri/shared/data/static.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { Separator } from "@carveri/shared/components/ui/separator.tsx";
import { useState } from "react";

type Props = {
  scrollToVinForm: () => void;
};

function PricingSection(props: Readonly<Props>) {
  const { scrollToVinForm } = props;
  const [selectedPlan, setSelectedPlan] = useState(3);

  const currentPlan = plans.find((p) => p.id === selectedPlan)!;

  return (
    <section className="bg-gray-50 py-16 lg:py-24" id="pricing">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-10 max-w-135 text-center lg:mb-14">
            <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
              Planes
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem]">
              Elige tu plan
            </h2>
            <p className="mt-3 text-[1.05rem] text-gray-500">
              Tu primer reporte es gratis. Después, elige el paquete que
              necesites.
            </p>
          </div>
        </FadeUp>

        {/* Free tier */}
        <FadeUp delay={0.05}>
          <Card className="mx-auto mb-8 max-w-120 overflow-hidden border-0 bg-linear-to-r from-green-500 to-emerald-600 py-0 text-center text-white">
            <CardContent className="p-6">
              <CardTitle className="font-[Outfit] text-xl font-black text-white">
                Primer Reporte — GRATIS
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-green-100">
                Sin tarjeta de crédito. Prueba la calidad antes de comprar.
              </CardDescription>
              <Button
                onClick={scrollToVinForm}
                className="mt-4 rounded-xl bg-white px-7 font-[Outfit] text-sm font-bold text-green-700 hover:bg-green-50 active:scale-[0.97]"
              >
                Obtener reporte gratis
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </FadeUp>

        {/* Paid plans */}
        <div className="mx-auto grid max-w-240 gap-5 sm:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeUp key={plan.id} delay={0.1 + i * 0.08}>
              <Card
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer py-0 transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "scale-[1.02] border-2 border-[#042CD7] shadow-xl shadow-blue-100/60"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-lg"
                }`}
              >
                {plan.badge && (
                  <Badge
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border-0 px-4 py-1.5 font-[Outfit] text-[10px] font-bold tracking-wider ${
                      plan.badge === "MÁS POPULAR"
                        ? "bg-[#042CD7] text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                )}

                <CardContent className="p-6 lg:p-7">
                  <div className="mt-1 mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                        selectedPlan === plan.id
                          ? "border-[#042CD7]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#042CD7]" />
                      )}
                    </div>
                    <span className="font-[Outfit] text-lg font-bold text-[#1D1D1F]">
                      {plan.name}
                    </span>
                  </div>

                  <div className="mb-1">
                    <span className="font-[Outfit] text-4xl font-black text-[#1D1D1F]">
                      ${plan.price}
                    </span>
                    <span className="text-lg font-bold text-gray-400">
                      {plan.cents}
                    </span>
                  </div>
                  <div className="mb-4 text-xs font-semibold text-[#042CD7]">
                    {plan.perReport}
                  </div>
                  <p className="mb-5 text-sm text-gray-500">{plan.desc}</p>

                  <Separator className="mb-4" />

                  <div className="space-y-2.5">
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-gray-600"
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
              className="rounded-xl bg-[#042CD7] px-10 py-6 font-[Outfit] text-[16px] font-bold text-white shadow-xl shadow-blue-200/50 hover:bg-[#0635f0] active:scale-[0.97]"
            >
              Comprar {currentPlan.name} — ${currentPlan.price}
              {currentPlan.cents}
              <IconArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-3 text-sm text-gray-400">
              Pago seguro con Stripe. Reporte en 24 horas.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default PricingSection;
