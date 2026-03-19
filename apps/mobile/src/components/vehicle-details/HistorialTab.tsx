import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconAlertTriangle,
  IconCamera,
  IconCircleCheck,
  IconFileText,
  IconGauge,
  IconGavel,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Historial } from "@/types/vehicle-report";
import { Inline, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import type { ZoomRef } from "@/types/lightbox.ts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

interface Props {
  historial: Historial;
  currentImages: string[];
}

export const HistorialTab: React.FC<Props> = ({ historial, currentImages }) => {
  const { t } = useTranslation("vehicle-details");
  const [oldPhotosOpen, setOldPhotosOpen] = useState(false);
  const oldPhotosZoomRef = useRef<ZoomRef>(null);
  const [currentPhotosOpen, setCurrentPhotosOpen] = useState(false);
  const currentPhotosZoomRef = useRef<ZoomRef>(null);

  const {
    subastasAnteriores,
    accidentes,
    propietarios,
    mantenimiento,
    tituloOdometro,
  } = historial;

  const oldSlides = subastasAnteriores.imagenes.map((src) => ({ src }));
  const currentSlides = currentImages.map((src) => ({ src }));

  return (
    <Tabs defaultValue="fotos" className="w-full">
      <ScrollArea className="w-full">
        <TabsList>
          <TabsTrigger
            value="fotos"
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest",
              });
            }}
          >
            Fotos Anteriores
          </TabsTrigger>
          <TabsTrigger
            value="accidentes"
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest",
              });
            }}
          >
            Accidentes
          </TabsTrigger>
          <TabsTrigger
            value="duenos"
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest",
              });
            }}
          >
            Dueños
          </TabsTrigger>
          <TabsTrigger
            value="mantenimiento"
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest",
              });
            }}
          >
            Mantenimiento
          </TabsTrigger>
          <TabsTrigger
            value="titulo"
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest",
              });
            }}
          >
            Título
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* --- FOTOS --- */}
      <TabsContent value="fotos" className="flex flex-col gap-2 lg:gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-1.5">
              <IconCamera className="text-blue-700 dark:text-blue-400" /> {t('historial.auctionPhotos')}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[1fr] gap-2 md:grid-cols-2 md:gap-3">
            <div className="h-60 w-full min-w-0 overflow-hidden md:h-90">
              <Lightbox
                open={oldPhotosOpen}
                close={() => setOldPhotosOpen(false)}
                slides={oldSlides}
                plugins={[Thumbnails, Zoom, ...(oldPhotosOpen ? [] : [Inline])]}
                on={{
                  click: () => setOldPhotosOpen((prev) => !prev),
                }}
                zoom={{ ref: oldPhotosZoomRef }}
                carousel={{
                  imageFit: "cover",
                  preload: 3,
                  imageProps: { style: { borderRadius: "8px" } },
                  padding: 0,
                }}
                thumbnails={{
                  height: 48,
                  width: 48 * (4 / 3),
                  imageFit: "cover",
                  padding: 0,
                  borderStyle: "none",
                }}
                styles={{
                  container: { maxWidth: "100%" },
                  thumbnailsContainer: { padding: 8 },
                  thumbnailsTrack: { gap: 8 },
                }}
              />
            </div>
            <div className="h-60 w-full min-w-0 overflow-hidden md:h-90">
              <Lightbox
                open={currentPhotosOpen}
                close={() => setCurrentPhotosOpen(false)}
                slides={currentSlides}
                plugins={[
                  Thumbnails,
                  Zoom,
                  ...(currentPhotosOpen ? [] : [Inline]),
                ]}
                on={{
                  click: () => setCurrentPhotosOpen((prev) => !prev),
                }}
                zoom={{ ref: currentPhotosZoomRef }}
                thumbnails={{
                  height: 48,
                  width: 48 * (4 / 3),
                  imageFit: "cover",
                  padding: 0,
                  borderStyle: "none",
                }}
                carousel={{
                  imageFit: "cover",
                  preload: 3,
                  imageProps: { style: { borderRadius: "8px" } },
                  padding: 0,
                }}
                styles={{
                  root: { "--yarl__thumbnails_container_width": "100%" },
                  thumbnailsContainer: { padding: 8 },
                  thumbnailsTrack: { gap: 8 },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconGavel className="h-4 w-4 text-[#042CD7]" /> {t('historial.saleInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-2">
              <InfoRow
                label={t('historial.auction')}
                value={subastasAnteriores.info.subasta}
              />
              <InfoRow
                label={t('historial.seller')}
                value={subastasAnteriores.info.vendedor}
              />
              <InfoRow
                label={t('historial.saleDate')}
                value={subastasAnteriores.info.fechaVenta}
              />
              <InfoRow
                label={t('historial.finalBid')}
                value={subastasAnteriores.info.finalBid}
                valueColor="#042CD7"
              />
              <InfoRow
                label={t('historial.odometer')}
                value={subastasAnteriores.info.odometro}
              />
              <InfoRow
                label={t('historial.condition')}
                value={subastasAnteriores.info.condicion}
              />
              <InfoRow label={t('historial.risk')} value={subastasAnteriores.info.riesgo} />
              <InfoRow label={t('historial.titleHistory')} value={subastasAnteriores.info.titulo} />
              <InfoRow
                label={t('historial.priceRange')}
                value={subastasAnteriores.info.precioRango}
              />
              <InfoRow
                label={t('historial.retailValue')}
                value={subastasAnteriores.info.valorRetail}
              />
              <InfoRow
                label={t('historial.repairValue')}
                value={subastasAnteriores.info.valorReparacion}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* --- ACCIDENTES --- */}
      <TabsContent value="accidentes">
        <div className="status-grid mb-3 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          <StatusCard
            icon={
              accidentes.resumen.totalAccidentes > 0 ? (
                <IconAlertTriangle className="text-[#EAB308]" />
              ) : (
                <IconCircleCheck className="text-[#22C55E]" />
              )
            }
            label={t('historial.accidents')}
            value={`${accidentes.resumen.totalAccidentes} ${t('historial.reported')}`}
            colorClass={
              accidentes.resumen.totalAccidentes > 0
                ? "bg-yellow-50"
                : "bg-green-50"
            }
          />
          <StatusCard
            icon={<IconShield className="text-[#22C55E]" />}
            label={t('historial.airbags')}
            value={
              accidentes.resumen.airbagsActivados === "-"
                ? t('historial.notReported')
                : accidentes.resumen.airbagsActivados
            }
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={<IconGavel className="text-[#042CD7]" />}
            label={t('historial.repaired')}
            value={
              accidentes.resumen.reparado === "-"
                ? t('historial.notReported')
                : accidentes.resumen.reparado
            }
            colorClass="bg-blue-50"
          />
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label={t('historial.structural')}
            value={
              accidentes.resumen.danioEstructural === "-"
                ? t('historial.notReported')
                : accidentes.resumen.danioEstructural
            }
            colorClass="bg-green-50"
          />
        </div>

        <div className="flex flex-col gap-3">
          {accidentes.eventos.map((evento) => (
            <Card key={evento.numero} className="rounded-2xl border-[#e8e8ea]">
              <CardHeader className="p-4 pb-2">
                <CardTitle
                  className={`flex items-center gap-1.5 text-[15px] font-bold ${evento.redFlag ? "text-[#DC2626]" : "text-[#F97316]"}`}
                >
                  <IconAlertTriangle className="h-4 w-4" />
                  {t('historial.event')} #{evento.numero} — {evento.fecha}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-2">
                  <InfoRow label={t('historial.type')} value={evento.titulo} />
                  {evento.severidad !== "-" && (
                    <InfoRow label={t('historial.severity')} value={evento.severidad} />
                  )}
                  {evento.impactAreas.length > 0 && (
                    <InfoRow
                      label={t('historial.impactArea')}
                      value={evento.impactAreas.join(", ")}
                    />
                  )}
                  {evento.detalles.map((detalle, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg bg-[#fff8f0] p-2 text-[12px] text-[#666]"
                    >
                      <IconAlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F97316]" />
                      {detalle}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* --- DUEÑOS --- */}
      <TabsContent value="duenos">
        <Card className="rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconUsers className="h-4 w-4 text-[#042CD7]" /> {t('historial.ownerHistory')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {propietarios.length === 0 && (
              <p className="text-[13px] text-[#aaa]">
                {t('historial.noOwnerHistory')}
              </p>
            )}
            <div className="space-y-2.5">
              {propietarios.map((owner, i) => {
                const colors = ["#042CD7", "#F97316", "#22C55E", "#8B5CF6"];
                const color = colors[i % colors.length];
                return (
                  <div
                    key={owner.numero}
                    className="flex gap-3 rounded-xl bg-[#f8f8fa] p-3"
                  >
                    <div
                      className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {owner.numero}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">
                        {owner.etiqueta}
                      </div>
                      <div className="mt-0.5 text-[12px] text-[#888]">
                        {t('historial.purchased')}: {owner.anioPurchased} · {owner.duracion}
                        {owner.tipo !== "-" && ` · ${owner.tipo}`}
                      </div>
                      <div className="mt-0.5 text-[12px] text-[#888]">
                        {owner.estados !== "-" && `${owner.estados} · `}
                        {t('historial.lastOdometer')}: {owner.ultimoOdometro}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* --- MANTENIMIENTO --- */}
      <TabsContent value="mantenimiento">
        <Card className="rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconGavel className="h-4 w-4 text-[#042CD7]" /> {t('historial.serviceRecords')} ({mantenimiento.registros.length} {t('historial.entries')})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-0">
              {mantenimiento.registros.map((record, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-3 ${i !== mantenimiento.registros.length - 1 ? "border-b border-[#f3f3f5]" : ""}`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#042CD7]/5">
                    <IconGavel className="h-3.5 w-3.5 text-[#042CD7]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold">
                      {record.tipo}
                    </div>
                    <div className="truncate text-[11px] text-[#888]">
                      {record.fuente}
                    </div>
                    {record.odometro !== "-" && (
                      <div className="text-[11px] text-[#aaa]">
                        {record.odometro}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-[11px] whitespace-nowrap text-[#aaa]">
                    {record.fecha}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* --- TÍTULO --- */}
      <TabsContent value="titulo">
        <div className="status-grid mb-3 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          <StatusCard
            icon={
              tituloOdometro.titulo.toLowerCase().includes("total loss") ||
              tituloOdometro.titulo.toLowerCase().includes("salvage") ? (
                <IconAlertTriangle className="text-[#DC2626]" />
              ) : (
                <IconCircleCheck className="text-[#22C55E]" />
              )
            }
            label={t('historial.titleHistory')}
            value={tituloOdometro.titulo}
            valueColor={
              tituloOdometro.titulo.toLowerCase().includes("total loss") ||
              tituloOdometro.titulo.toLowerCase().includes("salvage")
                ? "#DC2626"
                : "#22C55E"
            }
            colorClass={
              tituloOdometro.titulo.toLowerCase().includes("total loss") ||
              tituloOdometro.titulo.toLowerCase().includes("salvage")
                ? "bg-red-50"
                : "bg-green-50"
            }
          />
          <StatusCard
            icon={
              tituloOdometro.odometroEstado.toLowerCase().includes("no") ? (
                <IconAlertTriangle className="text-[#EAB308]" />
              ) : (
                <IconGauge className="text-[#22C55E]" />
              )
            }
            label={t('historial.odometer')}
            value={tituloOdometro.odometroEstado}
            valueColor={
              tituloOdometro.odometroEstado.toLowerCase().includes("no")
                ? "#EAB308"
                : "#22C55E"
            }
            colorClass={
              tituloOdometro.odometroEstado.toLowerCase().includes("no")
                ? "bg-yellow-50"
                : "bg-green-50"
            }
          />
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label={t('historial.lemonLaw')}
            value={tituloOdometro.lemonLaw}
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={
              tituloOdometro.recalls.pendientes > 0 ? (
                <IconAlertTriangle className="text-[#DC2626]" />
              ) : (
                <IconCircleCheck className="text-[#22C55E]" />
              )
            }
            label={t('historial.recalls')}
            value={`${tituloOdometro.recalls.pendientes} ${t('historial.pending')}`}
            valueColor={
              tituloOdometro.recalls.pendientes > 0 ? "#DC2626" : undefined
            }
            colorClass={
              tituloOdometro.recalls.pendientes > 0
                ? "bg-red-50"
                : "bg-green-50"
            }
          />
        </div>

        {tituloOdometro.historialTitulo.length > 0 && (
          <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
                <IconFileText className="h-4 w-4 text-[#042CD7]" /> {t('historial.titleHistory')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="timeline relative pl-8 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[2px] before:bg-[#e8e8ea]">
                {tituloOdometro.historialTitulo.map((item, i) => (
                  <TimelineItem
                    key={i}
                    date={item.fecha}
                    event={item.tipo}
                    detail={item.fuente}
                    dotColor="bg-[#042CD7]"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {tituloOdometro.recalls.estado && (
          <div className="rounded-xl bg-[#f8f8fa] p-3 text-[11px] leading-relaxed text-[#aaa]">
            {tituloOdometro.recalls.estado}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

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

const StatusCard: React.FC<{
  icon: React.ReactElement<SVGSVGElement, "svg">;
  label: string;
  value: string;
  colorClass?: string;
  valueColor?: string;
}> = ({ icon, label, value, colorClass, valueColor }) => (
  <div className="rounded-xl border border-[#e8e8ea] bg-white p-3 text-center">
    <div
      className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full ${colorClass || "bg-gray-50"}`}
    >
      {React.cloneElement(icon, { className: "h-4 w-4" })}
    </div>
    <div className="text-[10px] tracking-wider text-[#888] uppercase">
      {label}
    </div>
    <div
      className="font-display mt-0.5 text-[13px] font-bold"
      style={{ color: valueColor }}
    >
      {value}
    </div>
  </div>
);

const TimelineItem: React.FC<{
  date: string;
  event: string;
  detail: string;
  dotColor: string;
}> = ({ date, event, detail, dotColor }) => (
  <div className="relative pb-5 last:pb-0">
    <div
      className={`absolute top-1 -left-8 flex h-5 w-5 items-center justify-center rounded-full ${dotColor}`}
    >
      <IconCircleCheck className="h-2.5 w-2.5 text-white" />
    </div>
    <div className="flex justify-between">
      <div className="text-sm font-semibold">{event}</div>
      <div className="text-[11px] text-[#aaa]">{date}</div>
    </div>
    <div className="text-[12px] text-[#888]">{detail}</div>
  </div>
);
