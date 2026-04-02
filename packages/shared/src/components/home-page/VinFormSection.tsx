import { type RefObject, type SubmitEventHandler, useState } from "react";
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconCheck, IconClock, IconShield } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

type Props = {
  formRef: RefObject<HTMLElement | null>;
};

function VinFormSection(props: Readonly<Props>) {
  const { t } = useTranslation("homepage");
  const { formRef } = props;
  const [vinValue, setVinValue] = useState("");
  const navigate = useNavigate();
  const handleVinSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/register?vin=${vinValue}`);
  };

  return (
    <section ref={formRef} className="py-12 lg:py-16">
      <div className="mx-auto max-w-140 px-5">
        <FadeUp>
          <div className="mb-8 text-center">
            <h2 className="font-[Outfit] text-[1.5rem] font-black tracking-tight sm:text-[1.75rem]">
              Obtén tu primer reporte gratis
            </h2>
            <p className="text-muted-foreground mt-2 text-[15px]">
              Ingresa el VIN y recibe un análisis completo en 24 horas.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Card className="py-0">
            <CardContent className="p-6">
              <form onSubmit={handleVinSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Ingresa el VIN del vehículo"
                    value={vinValue}
                    onChange={(e) =>
                      setVinValue(e.target.value.toUpperCase().slice(0, 17))
                    }
                    maxLength={17}
                    className="h-14 rounded-xl pr-16 font-mono text-base tracking-wider"
                  />
                  <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium">
                    {vinValue.length}/17
                  </span>
                </div>
                <Button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[16px] font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
                >
                  {t("get_the_report")}
                </Button>
              </form>
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Ej. 1HGCM82633A004352 — Encuéntralo en el tablero, puerta del
                conductor, o título del vehículo.
              </p>
            </CardContent>
          </Card>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-green-500" /> Sin tarjeta de
              crédito
            </span>
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4 text-blue-500" /> Entrega en 24h
            </span>
            <span className="flex items-center gap-1.5">
              <IconShield className="h-4 w-4 text-amber-500" /> Carfax incluido
            </span>
            <span className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-green-500" /> 100% confidencial
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default VinFormSection;
