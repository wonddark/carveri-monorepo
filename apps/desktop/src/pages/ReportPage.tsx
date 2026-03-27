import { useState } from "react";
import { useLoaderData } from "react-router";
import type { VehicleReport } from "@carveri/shared/data/report";
import ReportHeader from "@/components/ReportHeader";
import ReportSidebar from "@/components/ReportSidebar";
import ReportMainContent from "@/components/ReportMainContent";

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

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ReportHeader />
      <div className="flex flex-1 overflow-hidden pt-15">
        <ReportSidebar
          report={report}
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <ReportMainContent activeSection={activeSection} report={report} />
        </main>
      </div>
    </div>
  );
}
