import React, { type ReactNode, useState } from "react";
import {
  IconChartBar,
  IconFileText,
  IconHistory,
  IconSparkles,
} from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleHero } from "@/components/vehicle-details/VehicleHero";
import { VehicleInfoCard } from "@/components/vehicle-details/VehicleInfoCard";
import { PriceEvaluation } from "@/components/vehicle-details/PriceEvaluation";
import { HistorialTab } from "@/components/vehicle-details/HistorialTab";
import { MercadoTab } from "@/components/vehicle-details/MercadoTab";
import { IATab } from "@/components/vehicle-details/IATab";
import { DocumentsTab } from "@/components/vehicle-details/DocumentsTab";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import type { VehicleReport } from "@/types/vehicle-report";
import type { Book, Vehicle, VehicleImage } from "@/types/vehicle-detail";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

/** Parses a price string like "$2,600.00" into a number */
function parsePriceStr(s: string): number {
  return Number.parseFloat(s.replaceAll(/[$,]/g, "")) || 0;
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
    mileage: v.odometro === "-" ? "—" : v.odometro.replace(" mi", ""),
    vin: v.vin,
    color: v.color === "-" ? "—" : v.color,
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
  const report = useLoaderData<VehicleReport>();
  const [activeTab, setActiveTab] = useState("historial");
  const { t } = useTranslation("common");

  const images = transformImages(report);
  const vehicle = transformVehicle(report);
  const books = transformBooks(report);

  const scrollToTarget = () => {
    const target = document.getElementById("tabs-container");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div id="app" className="flex h-full flex-col">
      {/* --- MAIN SCROLL --- */}
      <main className="mb-10 flex-1 lg:mb-0">
        <div className="flex flex-col gap-8 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pb-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_37%] lg:gap-8">
            <VehicleHero images={images} />
            <div className="flex flex-col gap-4">
              <VehicleInfoCard vehicle={vehicle} />
              <PriceEvaluation price={vehicle.price} books={books} />
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            id="tabs-container"
          >
            {/* DESKTOP TABS LIST */}
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList>
                <TabsTrigger
                  value="historial"
                  onClick={({ currentTarget }) => {
                    currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                      block: "nearest",
                    });
                  }}
                >
                  <IconHistory /> {t('tabs.historial')}
                </TabsTrigger>
                <TabsTrigger
                  value="mercado"
                  onClick={({ currentTarget }) => {
                    currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                      block: "nearest",
                    });
                  }}
                >
                  <IconChartBar /> {t('tabs.mercado')}
                </TabsTrigger>
                <TabsTrigger
                  value="ia"
                  onClick={({ currentTarget }) => {
                    currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                      block: "nearest",
                    });
                  }}
                >
                  <IconSparkles /> {t('tabs.ia')}
                </TabsTrigger>
                <TabsTrigger
                  value="docs"
                  onClick={({ currentTarget }) => {
                    currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                      block: "nearest",
                    });
                  }}
                >
                  <IconFileText /> {t('tabs.documentos')}
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* TAB CONTENT */}
            <TabsContent value="historial">
              <HistorialTab
                historial={report.historial}
                currentImages={report.currentImages}
              />
            </TabsContent>
            <TabsContent value="mercado">
              <MercadoTab vehiclePrice={vehicle.price} />
            </TabsContent>
            <TabsContent value="ia">
              <IATab />
            </TabsContent>
            <TabsContent value="docs">
              <DocumentsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* --- BOTTOM NAV (Mobile only) --- */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-black/5 bg-white pt-1.5 pb-[env(safe-area-inset-bottom,8px)] lg:hidden">
        <MobileNavBtn
          active={activeTab === "historial"}
          onClick={() => {
            setActiveTab("historial");
            scrollToTarget();
          }}
          label={t('tabs.historial')}
          renderIcon={(className) => <IconHistory className={className} />}
        />
        <MobileNavBtn
          active={activeTab === "mercado"}
          onClick={() => {
            setActiveTab("mercado");
            scrollToTarget();
          }}
          label={t('tabs.mercado')}
          renderIcon={(className) => <IconChartBar className={className} />}
        />
        <MobileNavBtn
          active={activeTab === "ia"}
          onClick={() => {
            setActiveTab("ia");
            scrollToTarget();
          }}
          label={t('tabs.ia')}
          renderIcon={(className) => <IconSparkles className={className} />}
        />
        <MobileNavBtn
          active={activeTab === "docs"}
          onClick={() => {
            setActiveTab("docs");
            scrollToTarget();
          }}
          label={t('tabs.documentos')}
          renderIcon={(className) => <IconFileText className={className} />}
        />
      </nav>
    </div>
  );
};

const MobileNavBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  renderIcon: (className: string) => ReactNode;
}> = ({ active, onClick, label, renderIcon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors ${active ? "text-[#042CD7]" : "text-[#bbb]"}`}
  >
    {active && (
      <div className="absolute top-0.5 h-1 w-1 rounded-full bg-[#042CD7]" />
    )}
    {renderIcon("h-[18px] w-[18px]")}
    <span className="font-display text-[10px] font-semibold">{label}</span>
  </button>
);

export default Report;
