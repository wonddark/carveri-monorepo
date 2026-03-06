import React, { useState } from "react";
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
import { booksData, vehicleData, vehicleImages } from "@/data/mockData";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

const VehicleDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState("historial");

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
          <div className="lag:gap-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_37%]">
            <VehicleHero images={vehicleImages} />
            <div className="flex flex-col gap-4">
              <VehicleInfoCard vehicle={vehicleData} />
              <PriceEvaluation price={vehicleData.price} books={booksData} />
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
                <HistorialTab />
              </TabsContent>
              <TabsContent value="mercado">
                <MercadoTab />
              </TabsContent>
              <TabsContent value="ia">
                <IATab />
              </TabsContent>
              <TabsContent value="docs">
                <DocumentsTab />
              </TabsContent>
            </Tabs>
          </div>
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

export default VehicleDetail;
