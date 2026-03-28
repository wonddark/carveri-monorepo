import { type RefObject, type SubmitEventHandler, useState } from "react";
import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconCheck, IconClock, IconShield } from "@tabler/icons-react";
import { useNavigate } from "react-router";

type Props = {
  formRef: RefObject<HTMLElement | null>;
};

function VinFormSection(props: Readonly<Props>) {
  const { formRef } = props;
  const [vinValue, setVinValue] = useState("");
  const navigate = useNavigate();
  const handleVinSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/register?vin=${vinValue}`);
  };

  return (
    <section ref={formRef} className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-140 px-5">
        <FadeUp>
          <div className="mb-8 text-center">
            <h2 className="font-[Outfit] text-[1.5rem] font-black tracking-tight text-[#1D1D1F] sm:text-[1.75rem]">
              Obtén tu primer reporte gratis
            </h2>
            <p className="mt-2 text-[15px] text-gray-500">
              Ingresa el VIN y recibe un análisis completo en 24 horas.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Card className="border-gray-200 py-0 shadow-lg shadow-gray-100/60">
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
                    className="h-14 rounded-xl border-gray-200 bg-gray-50 pr-16 font-mono text-base tracking-wider focus-visible:border-[#042CD7] focus-visible:ring-[#042CD7]/20"
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-gray-400">
                    {vinValue.length}/17
                  </span>
                </div>
                <Button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[16px] font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
                >
                  OBTENER MI REPORTE GRATIS
                </Button>
              </form>
              <p className="mt-3 text-center text-xs text-gray-400">
                Ej. 1HGCM82633A004352 — Encuéntralo en el tablero, puerta del
                conductor, o título del vehículo.
              </p>
            </CardContent>
          </Card>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
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
