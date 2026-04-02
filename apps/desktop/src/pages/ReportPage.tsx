import { useState } from "react";
import { useLoaderData } from "react-router";
import ReportHeader from "@/components/ReportHeader";
import ReportSidebar from "@/components/ReportSidebar";
import ReportMainContent from "@/components/ReportMainContent";
import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";

export type SectionId =
  | "resumen"
  | "timeline"
  | "fotos-subasta"
  | "accidentes"
  | "duenos"
  | "servicio"
  | "titulo"
  | "mercado"
  | "verdict_ai"
  | "checklist"
  | "estrategia"
  | "argumentos"
  | "costos";

export default function ReportPage() {
  const report = useLoaderData<VehicleReport>();
  const [activeSection, setActiveSection] = useState<SectionId>("resumen");

  const onNavigate = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden">
      <ReportHeader />
      <div className="fixed inset-0 mx-auto flex max-w-7xl flex-1 overflow-auto pt-15">
        <ReportSidebar
          report={report}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <ReportMainContent activeSection={activeSection} report={report} />
        </main>
      </div>
    </div>
  );
}
