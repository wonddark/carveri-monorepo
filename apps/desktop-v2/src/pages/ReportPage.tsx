import { useState } from "react";
import { useLoaderData } from "react-router";
import type { AppReport, SectionId } from "@/types/app-report";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

export default function ReportPage() {
  const report = useLoaderData() as AppReport;
  const [activeSection, setActiveSection] = useState<SectionId>("resumen");

  return (
    <div className="h-screen overflow-hidden">
      <Header report={report} />
      <div className="fixed inset-0 flex pt-12">
        <Sidebar
          report={report}
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto bg-white p-8">
          <MainContent report={report} activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}
