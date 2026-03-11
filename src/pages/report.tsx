import React, { useEffect, useState } from "react";
import {
  IconChartBar,
  IconChevronLeft,
  IconDownload,
  IconFileText,
  IconHistory,
  IconShare,
  IconSparkles,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleHero } from "@/components/vehicle-details/VehicleHero";
import { VehicleInfoCard } from "@/components/vehicle-details/VehicleInfoCard";
import { PriceEvaluation } from "@/components/vehicle-details/PriceEvaluation";
import { HistorialTab } from "@/components/vehicle-details/HistorialTab";
import { MercadoTab } from "@/components/vehicle-details/MercadoTab";
import { IATab } from "@/components/vehicle-details/IATab";
import { DocumentsTab } from "@/components/vehicle-details/DocumentsTab";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import { fetchVehicleReport } from "@/data/api";
import type { VehicleReport } from "@/types/vehicle-report";
import type { Book, Vehicle, VehicleImage } from "@/types/vehicle-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router";

/** Parses a price string like "$2,600.00" into a number */
function parsePriceStr(s: string): number {
  return parseFloat(s.replace(/[$,]/g, "")) || 0;
}

function transformImages(report: VehicleReport): VehicleImage[] {
  return (report.currentImages ?? []).map((url, i) => ({
    url,
    label: `Foto ${i + 1}`,
  }));
}

function transformVehicle(report: VehicleReport): Vehicle {
  const v = report.vehiculo;
  const info = report.historial?.subastasAnteriores?.info;
  const packageParts = [v.engine, v.fuel, v.transmission].filter(
    (p) => p && p !== "-",
  );
  return {
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    package: packageParts.length > 0 ? packageParts.join(" · ") : "—",
    price: parsePriceStr(v.precioVenta),
    mileage: v.odometro !== "-" ? v.odometro.replace(" mi", "") : "—",
    vin: v.vin,
    color: v.color !== "-" ? v.color : "—",
    interior: "—",
    title: v.titleDetails,
    dealer: info?.subasta ?? "—",
    location: "—",
    daysOnLot: 0,
    listingUrl: "#",
  };
}

function transformBooks(report: VehicleReport): Book[] {
  const { manheim, kbb, jdPower, blackBook } = report.mercado;
  return [
    {
      abbr: "MMR",
      name: "Manheim Market Report",
      value: parsePriceStr(manheim.baseMmr),
      color: "#E85D04",
      details: [
        { label: "Base MMR", value: manheim.baseMmr },
        { label: "Ajustado MMR", value: manheim.ajustadoMmr },
        {
          label: "Rango Wholesale",
          value: `${manheim.rangoMin} – ${manheim.rangoMax}`,
        },
        { label: "Retail Estimado", value: manheim.retailEstimado },
        {
          label: "Últ. 30 días",
          value: manheim.historico?.ultimos30Dias ?? "—",
        },
      ],
    },
    {
      abbr: "KBB",
      name: "Kelley Blue Book",
      value: parsePriceStr(kbb.fairPurchasePrice),
      color: "#0369A1",
      details: [
        { label: "Fair Purchase Price", value: kbb.fairPurchasePrice },
        { label: "Trade-In", value: kbb.tradeBook?.total ?? "—" },
        { label: "Private Party", value: kbb.privateParty?.total ?? "—" },
        { label: "Retail", value: kbb.retail?.total ?? "—" },
        { label: "Auction", value: kbb.auction?.total ?? "—" },
      ],
    },
    {
      abbr: "JDP",
      name: "J.D. Power",
      value: parsePriceStr(jdPower.tradeAvg?.total ?? "$0"),
      color: "#1E40AF",
      details: [
        { label: "Trade Clean", value: jdPower.tradeClean?.total ?? "—" },
        { label: "Trade Avg", value: jdPower.tradeAvg?.total ?? "—" },
        { label: "Trade Rough", value: jdPower.tradeRough?.total ?? "—" },
        { label: "Retail", value: jdPower.retail?.total ?? "—" },
        { label: "Auction Avg", value: jdPower.auctionAvg?.total ?? "—" },
      ],
    },
    {
      abbr: "BB",
      name: "Black Book",
      value: parsePriceStr(blackBook.wholesale.avg?.total ?? "$0"),
      color: "#1F2937",
      details: [
        {
          label: "Wholesale X-Clean",
          value: blackBook.wholesale.xClean?.total ?? "—",
        },
        {
          label: "Wholesale Clean",
          value: blackBook.wholesale.clean?.total ?? "—",
        },
        { label: "Retail Avg", value: blackBook.retail.avg?.total ?? "—" },
        { label: "Trade Clean", value: blackBook.trade.clean?.total ?? "—" },
        { label: "Finance Avg", value: blackBook.finance?.avg?.total ?? "—" },
      ],
    },
  ];
}

const Report: React.FC = () => {
  const { vin } = useParams();
  const [activeTab, setActiveTab] = useState("historial");
  const [report, setReport] = useState<VehicleReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vin) {
      fetchVehicleReport(vin)
        .then(setReport)
        .catch(() => toast.error("No se pudo cargar el reporte del vehículo."))
        .finally(() => setLoading(false));
    }
  }, [vin]);

  const handleBack = () => {
    window.history.back();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles.");
    }
  };

  const handleDownload = () => {
    toast.warning("Esta funcionalidad no está definida/implementada");
  };

  const images = report ? transformImages(report) : [];
  const vehicle = report ? transformVehicle(report) : null;
  const books = report ? transformBooks(report) : [];

  return (
    <div id="app" className="flex h-full flex-col">
      {/* --- TOP BAR --- */}
      <header className="bg-background sticky top-0 z-50 flex h-12 items-center justify-between border-b px-4 lg:h-14 lg:border-none">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <IconChevronLeft />
            </Button>
            <span className="carcheck-badge font-display rounded-full bg-[#042CD7]/5 px-2.5 py-1 text-[13px] font-bold text-[#042CD7]">
              CarCheck
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full"
            >
              <IconShare />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload}>
              <IconDownload />
            </Button>
          </div>
        </div>
      </header>

      {/* --- MAIN SCROLL --- */}
      <main className="flex-1">
        <div className="flex flex-col gap-8 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pb-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="lag:gap-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_37%]">
                <VehicleHero images={images} />
                <div className="flex flex-col gap-4">
                  {vehicle && <VehicleInfoCard vehicle={vehicle} />}
                  {vehicle && (
                    <PriceEvaluation price={vehicle.price} books={books} />
                  )}
                </div>
              </div>

              <div>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  {/* DESKTOP TABS LIST */}
                  <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList>
                      <TabsTrigger value="historial">
                        <IconHistory /> Historial
                      </TabsTrigger>
                      <TabsTrigger value="mercado">
                        <IconChartBar /> Mercado
                      </TabsTrigger>
                      <TabsTrigger value="ia">
                        <IconSparkles /> Valoración IA
                      </TabsTrigger>
                      <TabsTrigger value="docs">
                        <IconFileText /> Documentos
                      </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>

                  {/* TAB CONTENT */}
                  <TabsContent value="historial">
                    {report && (
                      <HistorialTab
                        historial={report.historial}
                        currentImages={report.currentImages}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="mercado">
                    <MercadoTab vehiclePrice={vehicle?.price ?? 0} />
                  </TabsContent>
                  <TabsContent value="ia">
                    <IATab />
                  </TabsContent>
                  <TabsContent value="docs">
                    <DocumentsTab />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </main>

      {/* --- BOTTOM NAV (Mobile only) --- */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-black/5 bg-white pt-1.5 pb-[env(safe-area-inset-bottom,8px)] lg:hidden">
        <MobileNavBtn
          active={activeTab === "historial"}
          onClick={() => setActiveTab("historial")}
          label="Historial"
          icon={<IconHistory />}
        />
        <MobileNavBtn
          active={activeTab === "mercado"}
          onClick={() => setActiveTab("mercado")}
          label="Mercado"
          icon={<IconChartBar />}
        />
        <MobileNavBtn
          active={activeTab === "ia"}
          onClick={() => setActiveTab("ia")}
          label="Valoración IA"
          icon={<IconSparkles />}
        />
        <MobileNavBtn
          active={activeTab === "docs"}
          onClick={() => setActiveTab("docs")}
          label="Documentos"
          icon={<IconFileText />}
        />
      </nav>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_37%]">
    <Skeleton className="h-72 w-full rounded-2xl lg:h-[480px]" />
    <div className="flex flex-col gap-4">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  </div>
);

const MobileNavBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactElement<SVGSVGElement, "svg">;
}> = ({ active, onClick, label, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors ${active ? "text-[#042CD7]" : "text-[#bbb]"}`}
  >
    {active && (
      <div className="absolute top-0.5 h-1 w-1 rounded-full bg-[#042CD7]" />
    )}
    {React.cloneElement(icon, {
      className: "h-[18px] w-[18px]",
    })}
    <span className="font-display text-[10px] font-semibold">{label}</span>
  </button>
);

export default Report;
