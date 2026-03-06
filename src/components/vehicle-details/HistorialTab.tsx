import React, { useRef, useState } from "react";
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
import { ownerRecords, serviceRecords } from "@/data/mockData";
import { Inline, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import type { ZoomRef } from "@/types/lightbox.ts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

export const HistorialTab: React.FC = () => {
  const [oldPhotosOpen, setOldPhotosOpen] = useState(false);
  const oldPhotosZoomRef = useRef<ZoomRef>(null);
  const [currentPhotosOpen, setCurrentPhotosOpen] = useState(false);
  const currentPhotosZoomRef = useRef<ZoomRef>(null);

  return (
    <Tabs defaultValue="fotos" className="w-full">
      <ScrollArea className="w-full">
        <TabsList>
          <TabsTrigger value="fotos">Fotos Anteriores</TabsTrigger>
          <TabsTrigger value="accidentes">Accidentes</TabsTrigger>
          <TabsTrigger value="duenos">Dueños</TabsTrigger>
          <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
          <TabsTrigger value="titulo">Título</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="fotos" className="flex flex-col gap-2 lg:gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-1.5">
              <IconCamera className="text-blue-700 dark:text-blue-400" /> Fotos
              de Subasta (AutoStat)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[1fr] gap-2 md:grid-cols-2 md:gap-3">
            <div className="h-50 w-full min-w-0 overflow-hidden md:h-90">
              <Lightbox
                open={oldPhotosOpen}
                close={() => setOldPhotosOpen(false)}
                slides={[
                  {
                    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ]}
                plugins={[Thumbnails, Zoom, ...(oldPhotosOpen ? [] : [Inline])]}
                on={{
                  click: () => setOldPhotosOpen((prevState) => !prevState),
                }}
                zoom={{ ref: oldPhotosZoomRef }}
                carousel={{
                  imageFit: "cover",
                  preload: 3,
                  imageProps: {
                    style: { borderRadius: "8px" },
                  },
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
                  container: {
                    maxWidth: "100%",
                  },
                  thumbnailsContainer: {
                    padding: 8,
                  },
                  thumbnailsTrack: {
                    gap: 8,
                  },
                }}
              />
            </div>
            <div className="h-70 w-full min-w-0 overflow-hidden md:h-90">
              <Lightbox
                open={currentPhotosOpen}
                close={() => setCurrentPhotosOpen(false)}
                slides={[
                  {
                    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ]}
                plugins={[
                  Thumbnails,
                  Zoom,
                  ...(currentPhotosOpen ? [] : [Inline]),
                ]}
                on={{
                  click: () => setCurrentPhotosOpen((prevState) => !prevState),
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
                  imageProps: {
                    style: { borderRadius: "8px" },
                  },
                  padding: 0,
                }}
                styles={{
                  root: { "--yarl__thumbnails_container_width": "100%" },
                  container: {
                    // width: "100%",
                  },
                  thumbnailsContainer: {
                    padding: 8,
                  },
                  thumbnailsTrack: {
                    gap: 8,
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconGavel className="h-4 w-4 text-[#042CD7]" /> Información de
              Venta en Subasta
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-2">
              <InfoRow label="Subasta" value="Copart — Miami South" />
              <InfoRow label="Fecha de Venta" value="Nov 15, 2025" />
              <InfoRow
                label="Precio de Venta"
                value="$44,200"
                valueColor="#042CD7"
              />
              <InfoRow label="Tipo de Pérdida" value="Front End" />
              <InfoRow label="Daño Primario" value="Minor Dents/Scratches" />
              <InfoRow
                label="Airbags"
                value="No se activaron"
                valueColor="#22C55E"
              />
              <InfoRow
                label="Conduce"
                value="Sí — Run & Drive"
                valueColor="#22C55E"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="accidentes">
        <div className="status-grid mb-3 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          <StatusCard
            icon={<IconAlertTriangle className="text-[#EAB308]" />}
            label="Accidentes"
            value="1 reportado"
            colorClass="bg-yellow-50"
          />
          <StatusCard
            icon={<IconShield className="text-[#22C55E]" />}
            label="Airbags"
            value="No activados"
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={<IconGavel className="text-[#042CD7]" />}
            label="Reparado"
            value="Sí"
            colorClass="bg-blue-50"
          />
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label="Structural"
            value="No reportado"
            colorClass="bg-green-50"
          />
        </div>
        <Card className="rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold text-[#F97316]">
              <IconAlertTriangle className="h-4 w-4" /> Accidente #1 — Ago 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-2">
              <InfoRow
                label="Severidad"
                value="Moderado"
                valueColor="#F97316"
              />
              <InfoRow
                label="Tipo de Impacto"
                value="Frontal — Lado del conductor"
              />
              <InfoRow
                label="Airbags Activados"
                value="No"
                valueColor="#22C55E"
              />
              <InfoRow label="Vehículos Involucrados" value="2" />
              <InfoRow label="Reportado por" value="State Farm Insurance" />
              <InfoRow label="Reparación" value="Completada — Oct 2025" />
              <InfoRow label="Costo Estimado" value="$8,400" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="duenos">
        <Card className="rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconUsers className="h-4 w-4 text-[#042CD7]" /> Historial de
              Propietarios
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-2.5">
              {ownerRecords.map((owner) => (
                <div
                  key={owner.num}
                  className="flex gap-3 rounded-xl bg-[#f8f8fa] p-3"
                >
                  <div
                    className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                    style={{ backgroundColor: owner.color || "#042CD7" }}
                  >
                    {owner.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {owner.duration}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#888]">
                      {owner.detail}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#888]">
                      {owner.miles}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mantenimiento">
        <Card className="rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconGavel className="h-4 w-4 text-[#042CD7]" /> Registros de
              Servicio (Carfax)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-0">
              {serviceRecords.map((record, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-3 ${i !== serviceRecords.length - 1 ? "border-bottom border-[#f3f3f5]" : ""}`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#042CD7]/5">
                    <IconGavel className="h-3.5 w-3.5 text-[#042CD7]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">
                      {record.name}
                    </div>
                    <div className="text-[11px] text-[#888]">
                      {record.detail}
                    </div>
                  </div>
                  <div className="text-[11px] whitespace-nowrap text-[#aaa]">
                    {record.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="titulo">
        <div className="status-grid mb-3 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label="Título"
            value="Clean Title"
            valueColor="#22C55E"
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={<IconGauge className="text-[#22C55E]" />}
            label="Odómetro"
            value="Verificado"
            valueColor="#22C55E"
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label="Lemon Law"
            value="No aplica"
            colorClass="bg-green-50"
          />
          <StatusCard
            icon={<IconCircleCheck className="text-[#22C55E]" />}
            label="Recalls"
            value="0 pendientes"
            colorClass="bg-green-50"
          />
        </div>

        <Card className="mb-3 rounded-2xl border-[#e8e8ea]">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
              <IconFileText className="h-4 w-4 text-[#042CD7]" /> Historial de
              Título
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="timeline relative pl-8 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[2px] before:bg-[#e8e8ea]">
              <TimelineItem
                date="Ene 2024"
                event="Título Emitido — Florida"
                detail="Clean Title · Primer propietario"
                dotColor="bg-[#042CD7]"
              />
              <TimelineItem
                date="Nov 2025"
                event="Transferencia de Título"
                detail="Clean Title · Transferido a dealer"
                dotColor="bg-[#22C55E]"
              />
            </div>
          </CardContent>
        </Card>
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
