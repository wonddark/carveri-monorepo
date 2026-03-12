import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBuildingStore,
  IconChartBar,
  IconCircleCheck,
  IconStar,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { comparablesData } from "@/data/mockData";
import { fmt } from "@/lib/gauge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

interface Props {
  vehiclePrice: number;
}

export const MercadoTab: React.FC<Props> = ({ vehiclePrice }) => {
  return (
    <div className="tab-content pt-3 lg:px-0">
      <Tabs defaultValue="comparables" className="w-full">
        <ScrollArea className="w-full">
          <TabsList>
            <TabsTrigger
              value="comparables"
              onClick={({ currentTarget }) => {
                currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "nearest",
                  block: "nearest",
                });
              }}
            >
              Comparables
            </TabsTrigger>
            <TabsTrigger
              value="tendencia"
              onClick={({ currentTarget }) => {
                currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "nearest",
                  block: "nearest",
                });
              }}
            >
              Tendencia de Precio
            </TabsTrigger>
            <TabsTrigger
              value="dealer"
              onClick={({ currentTarget }) => {
                currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "nearest",
                  block: "nearest",
                });
              }}
            >
              Datos del Dealer
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="comparables">
          <Card className="rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconArrowRight className="h-4 w-4 text-[#042CD7]" /> 5
                Vehículos Comparables (MarketCheck)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-3">
                {comparablesData.map((comp, i) => {
                  const diff = vehiclePrice - comp.price;
                  return (
                    <div
                      key={i}
                      className="comp-card flex gap-3 rounded-xl border border-[#e8e8ea] p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-15 w-20 shrink-0 items-center justify-center rounded-lg bg-[#f0f0f2]">
                        <CarIcon className="h-6 w-6 text-[#ccc]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-semibold">
                          {comp.name}
                        </div>
                        <div className="truncate text-[11px] text-[#888]">
                          {comp.dealer}
                        </div>
                        <div className="text-[11px] text-[#888]">
                          {comp.miles} mi · {comp.dist}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-display text-[14px] font-bold">
                          {fmt(comp.price)}
                        </div>
                        <div
                          className={`text-[11px] font-semibold ${diff > 0 ? "text-[#22C55E]" : "text-[#FF0400]"}`}
                        >
                          {diff > 0 ? "▼ " : "▲ "}
                          {fmt(Math.abs(diff))}
                          {diff > 0 ? " menos" : " más"}
                        </div>
                        <div className="text-[10px] text-[#aaa]">
                          {comp.days}d en lote
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 rounded-xl bg-[#f8f8fa] p-3 text-[11px] leading-relaxed text-[#aaa]">
            * Datos de MarketCheck API. Los precios y disponibilidad pueden
            cambiar sin previo aviso. Última actualización: Feb 24, 2026.
          </div>
        </TabsContent>

        <TabsContent value="tendencia">
          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconChartBar className="h-4 w-4 text-[#042CD7]" /> Tendencia de
                Precio — Últimos 6 Meses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="mb-2 text-[13px] text-[#888]">
                Precio promedio de venta para 2024 BMW X5 xDrive40i en Florida
              </p>
              <div className="flex h-50 w-full items-center justify-center bg-gray-50 text-sm text-[#aaa] italic">
                [Gráfico de Chart.js aquí]
              </div>
              <p className="mt-2 text-[11px] text-[#aaa] italic">
                Basado en 835 ventas registradas en los últimos 6 meses
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-[15px] font-bold">
                Resumen de Tendencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-2">
              <InfoRow
                label="Dirección"
                value="↘ A la baja (-2.8%)"
                valueColor="#22C55E"
              />
              <InfoRow label="Precio Hace 6 Meses" value="$55,200" />
              <InfoRow label="Precio Actual Promedio" value="$51,200" />
              <InfoRow
                label="Cambio"
                value="-$4,000 (-7.2%)"
                valueColor="#22C55E"
              />
              <InfoRow label="Proyección 30 días" value="$50,500 – $51,800" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dealer">
          <Card className="mb-3 rounded-2xl border-[#e8e8ea] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#042CD7]/10">
                <IconBuildingStore className="h-5.5 w-5.5 text-[#042CD7]" />
              </div>
              <div>
                <div className="font-display text-base font-bold">
                  AutoNation BMW Miami
                </div>
                <div className="text-[12px] text-[#888]">
                  Miami, FL · Dealer Franquiciado
                </div>
                <div className="flex items-center gap-1 text-[14px] text-[#EAB308]">
                  <IconStar className="h-3.5 w-3.5 fill-current" />
                  <IconStar className="h-3.5 w-3.5 fill-current" />
                  <IconStar className="h-3.5 w-3.5 fill-current" />
                  <IconStar className="h-3.5 w-3.5 fill-current" />
                  <IconStar className="h-3.5 w-3.5" />
                  <span className="ml-1 text-[12px] text-[#888]">
                    4.2 / 5 (847 reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[13px] leading-relaxed text-[#555]">
              Dealer grande y establecido con buen inventario de BMW. Los
              clientes reportan experiencias mixtas: excelente servicio de
              ventas pero tiempos de espera largos en el departamento de
              servicio. Precios generalmente competitivos para la zona de Miami.
            </div>
          </Card>

          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold text-[#22C55E]">
                <IconCircleCheck className="h-4 w-4" /> Puntos Positivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-2">
              <FlagItem
                type="green"
                text="Dealer franquiciado BMW — acceso a piezas originales y técnicos certificados"
              />
              <FlagItem
                type="green"
                text="847 reviews en Google — volumen alto indica negocio establecido"
              />
              <FlagItem
                type="green"
                text="Múltiples menciones de transparencia en precios y condiciones"
              />
            </CardContent>
          </Card>

          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold text-[#DC2626]">
                <IconAlertTriangle className="h-4 w-4" /> Señales de Alerta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-2">
              <FlagItem
                type="red"
                text="Varias quejas sobre fees adicionales no mencionados inicialmente (doc fee, dealer prep)"
              />
              <FlagItem
                type="red"
                text="Tiempos de respuesta lentos reportados por múltiples clientes"
              />
            </CardContent>
          </Card>
          <div className="rounded-xl bg-[#f8f8fa] p-3 text-[11px] text-[#aaa]">
            * Análisis basado en reviews públicos de Google. La Subasta Cubana
            no verifica la autenticidad de los reviews individuales.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const InfoRow: React.FC<{
  label: string;
  value: string;
  valueColor?: string;
}> = ({ label, value, valueColor }) => (
  <div className="flex justify-between border-b border-[#f3f3f5] py-2.5 text-[13px] last:border-none">
    <span className="text-[#888]">{label}</span>
    <span className="font-semibold" style={{ color: valueColor }}>
      {value}
    </span>
  </div>
);

const FlagItem: React.FC<{ type: "green" | "red"; text: string }> = ({
  type,
  text,
}) => (
  <div
    className={`flex items-start gap-2 rounded-xl p-2.5 ${type === "green" ? "border border-green-100 bg-green-50" : "border border-red-100 bg-red-50"}`}
  >
    {type === "green" ? (
      <IconCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
    ) : (
      <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]" />
    )}
    <div className="text-[13px] leading-snug text-[#666]">{text}</div>
  </div>
);
