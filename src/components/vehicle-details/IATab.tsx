import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fmt } from "@/lib/gauge";
import {
  IconAlertTriangle,
  IconCamera,
  IconCircleCheck,
  IconShield,
  IconSparkles,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils.ts";

export const IATab: React.FC = () => {
  return (
    <div className="tab-content pt-3 lg:px-0">
      <Tabs defaultValue="veredicto" className="w-full">
        <TabsList className="scrollbar-hide mb-4 h-auto w-full justify-start overflow-x-auto bg-transparent p-0">
          <TabsTrigger value="veredicto">Veredicto</TabsTrigger>
          <TabsTrigger value="inspeccion">Inspección</TabsTrigger>
          <TabsTrigger value="negociacion">Negociación</TabsTrigger>
          <TabsTrigger value="beforeafter">Antes / Después</TabsTrigger>
        </TabsList>

        <TabsContent value="veredicto">
          <div className="verdict-card mb-3 rounded-2xl border border-green-200 bg-linear-to-br from-[#f0fdf4] to-[#ecfdf5] p-5 text-center">
            <div className="verdict-recommendation font-display text-xl font-extrabold text-[#22C55E]">
              ✓ COMPRA RECOMENDADA CON PRECAUCIÓN
            </div>
            <div className="verdict-score font-display text-[40px] leading-none font-extrabold">
              7.4{" "}
              <span className="text-base font-medium text-[#888]">/ 10</span>
            </div>
            <div className="verdict-summary mt-3 text-[13px] leading-relaxed text-[#555]">
              Este BMW X5 2024 presenta una buena relación precio-valor
              considerando el mercado actual. El accidente frontal moderado y la
              reparación completada reducen el valor, pero el precio actual
              refleja ese descuento. Recomendamos inspección física enfocada en
              la zona frontal antes de cerrar la compra.
            </div>
          </div>

          <Card className="rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconSparkles className="h-4 w-4 text-[#042CD7]" /> Desglose por
                Factor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 p-4 pt-2">
              <FactorRow
                name="Precio"
                note="Dentro del rango de mercado"
                score={8.0}
                color="#22C55E"
                icon={<IconSparkles />}
              />
              <FactorRow
                name="Historial"
                note="1 accidente moderado reportado"
                score={6.0}
                color="#EAB308"
                icon={<IconAlertTriangle />}
              />
              <FactorRow
                name="Millaje"
                note="18,420 mi — bajo para un 2024"
                score={9.0}
                color="#22C55E"
                icon={<IconSparkles />}
              />
              <FactorRow
                name="Mercado"
                note="Tendencia a la baja favorece al comprador"
                score={7.5}
                color="#042CD7"
                icon={<IconSparkles />}
              />
              <FactorRow
                name="Dealer"
                note="Dealer franquiciado con buena reputación"
                score={7.0}
                color="#22C55E"
                icon={<IconCircleCheck />}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspeccion">
          <Card className="rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold text-[#F97316]">
                <IconShield className="h-4 w-4" /> Checklist de Inspección
                Personalizado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="mb-3 text-[13px] text-[#888]">
                Basado en el historial de accidente frontal y tipo de vehículo,
                recomendamos verificar:
              </p>
              <div className="space-y-0">
                <ChecklistItem
                  name="Alineación del panel frontal"
                  why="El accidente fue frontal — verificar que los paneles estén alineados y sin gaps irregulares"
                />
                <ChecklistItem
                  name="Funcionamiento de sensores ADAS"
                  why="Los sensores de asistencia al conductor están en el parachoques frontal — zona del impacto"
                />
                <ChecklistItem
                  name="Radiador y sistema de enfriamiento"
                  why="Impacto frontal puede haber afectado el radiador, condensador de A/C, o mangueras"
                />
                <ChecklistItem
                  name="Headlights y DRL"
                  why="Verificar que ambos faros sean originales y funcionen correctamente (LED adaptativo)"
                />
                <ChecklistItem
                  name="Pintura con medidor de espesor"
                  why="Medir espesor de pintura en capó, guardafangos y bumper para detectar repintado"
                />
                <ChecklistItem
                  name="Subframe y puntos de montaje"
                  why="Verificar que no haya daño estructural oculto en el subframe delantero"
                />
                <ChecklistItem
                  name="Test drive extendido (20+ min)"
                  why="Verificar alineación, vibraciones, ruidos, y comportamiento de transmisión a velocidad"
                />
                <ChecklistItem
                  name="Escaneo OBD-II completo"
                  why="Buscar códigos de error almacenados o pendientes relacionados con el impacto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negociacion">
          <div className="offer-card mb-3 rounded-2xl bg-linear-to-br from-[#042CD7] to-[#0635f0] p-5 text-center text-white">
            <div className="offer-label text-xs opacity-80">
              Precio Sugerido de Oferta
            </div>
            <div className="offer-price font-display my-1 text-[32px] leading-tight font-extrabold">
              {fmt(48500)}
            </div>
            <div className="offer-range text-xs opacity-70">
              Rango: $47,000 – $50,000
            </div>
          </div>

          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconSparkles className="h-4 w-4 text-[#042CD7]" /> Argumentos
                de Negociación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-2">
              <Argument
                num={1}
                text={
                  <span>
                    <strong>Historial de accidente:</strong> El Carfax reporta
                    un accidente frontal moderado, lo cual reduce el valor de
                    reventa entre $3,000 y $5,000 según los libros.
                  </span>
                }
              />
              <Argument
                num={2}
                text={
                  <span>
                    <strong>Tendencia de mercado:</strong> Los precios del X5
                    2024 han bajado 7.2% en los últimos 6 meses. Esperar 30 días
                    más podría significar $500-$1,000 menos.
                  </span>
                }
              />
              <Argument
                num={3}
                text={
                  <span>
                    <strong>Días en lote:</strong> Este vehículo lleva 34 días
                    en el lote. El promedio para este modelo es 22 días. El
                    dealer tiene presión de moverlo.
                  </span>
                }
              />
              <Argument
                num={4}
                text={
                  <span>
                    <strong>Comparables más baratos:</strong> Hay 3 vehículos
                    similares dentro de 40 millas por menos dinero, incluyendo
                    uno sin accidentes por $51,900.
                  </span>
                }
              />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-[15px] font-bold">
                Script Sugerido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="rounded-xl bg-[#1a1c22] p-4 text-[13px] leading-relaxed text-[#e0e0e0] italic">
                "Me interesa el X5, pero tengo algunas preocupaciones. El Carfax
                muestra un accidente frontal, y los libros de valuación lo ponen
                entre{" "}
                <span className="font-semibold text-[#22C55E] not-italic">
                  $49,800 y $52,800
                </span>
                . Considerando el historial, creo que un precio justo sería
                alrededor de{" "}
                <span className="font-semibold text-[#22C55E] not-italic">
                  $48,500
                </span>
                . Además, he visto opciones similares en la zona por menos. ¿Hay
                flexibilidad en el precio?"
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beforeafter">
          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconCamera className="h-4 w-4 text-[#042CD7]" /> Comparación
                Visual
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="mb-3 text-[13px] text-[#888]">
                Comparación entre fotos de subasta (daño) y fotos actuales del
                vehículo reparado.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-display mb-1.5 flex items-center justify-center gap-1 text-center text-[11px] font-bold tracking-wider text-[#FF0400]">
                    <IconAlertTriangle className="h-3 w-3" /> ANTES (Subasta)
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"
                    className="h-35 w-full rounded-xl object-cover lg:h-65"
                    alt="Antes"
                  />
                </div>
                <div>
                  <div className="font-display mb-1.5 flex items-center justify-center gap-1 text-center text-[11px] font-bold tracking-wider text-[#22C55E]">
                    <IconCircleCheck className="h-3 w-3" /> DESPUÉS (Actual)
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop"
                    className="h-35 w-full rounded-xl object-cover lg:h-65"
                    alt="Después"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="verdict-card rounded-2xl border border-green-200 bg-linear-to-br from-[#f0fdf4] to-[#ecfdf5] p-5">
            <div className="font-display mb-1 text-center text-base font-extrabold text-[#22C55E]">
              Análisis de Reparación
            </div>
            <div className="text-[13px] leading-relaxed text-[#555]">
              <strong>Veredicto: Reparación aparentemente profesional.</strong>
              <br />
              <br />
              Basado en las fotos disponibles, la reparación del panel frontal
              parece haber sido realizada de manera profesional. Los paneles
              están alineados y la pintura muestra un acabado uniforme. Sin
              embargo, recomendamos verificar con un medidor de espesor de
              pintura para confirmar la calidad del repintado, y realizar un
              escaneo OBD-II para descartar códigos de error residuales.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const FactorRow: React.FC<{
  name: string;
  note: string;
  score: number;
  color: string;
  icon: React.ReactElement<SVGSVGElement, "svg">;
}> = ({ name, note, score, color, icon }) => (
  <div className="border-border flex items-center justify-between border-b py-3 last:border-none lg:grid lg:grid-cols-[1fr_auto_auto] lg:gap-4">
    <div className="flex items-center gap-2">
      <div
        className="flex h-7 w-7 items-center justify-center rounded-md"
        style={{ backgroundColor: color + "1A" }}
      >
        {React.cloneElement(icon, {
          className: cn("h-3.5 w-3.5", `bg-[${color}]`),
        })}
      </div>
      <div>
        <div className="text-[13px] leading-none font-medium">{name}</div>
        <div className="text-muted-foreground mt-1 text-[11px]">{note}</div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="hidden h-1 w-15 overflow-hidden rounded-full bg-[#e8e8ea] lg:block">
        <div
          className="h-full"
          style={{ width: `${score * 10}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="font-display text-[14px] font-bold" style={{ color }}>
        {score.toFixed(1)}
      </span>
    </div>
  </div>
);

const ChecklistItem: React.FC<{ name: string; why: string }> = ({
  name,
  why,
}) => (
  <div className="flex items-start gap-2.5 border-b border-[#f3f3f5] py-3 last:border-none">
    <div className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border-2 border-[#e8e8ea]">
      {/* Simulation of checkbox, would be shadcn checkbox usually */}
    </div>
    <div>
      <div className="text-[13px] font-semibold">{name}</div>
      <div className="mt-0.5 text-[11px] leading-normal text-[#888]">{why}</div>
    </div>
  </div>
);

const Argument: React.FC<{ num: number; text: React.ReactNode }> = ({
  num,
  text,
}) => (
  <div className="flex gap-2.5 rounded-xl bg-[#f8f8fa] p-3">
    <div className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#042CD7] text-[11px] font-bold text-white">
      {num}
    </div>
    <div className="text-[13px] leading-relaxed text-[#444]">{text}</div>
  </div>
);
