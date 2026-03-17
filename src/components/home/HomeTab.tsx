// src/components/home/HomeTab.tsx
import { LayoutDashboard } from "lucide-react";
import StatsGrid from "./StatsGrid";
import PriceEvalSection from "./PriceEvalSection";
import VehicleDataSection from "./VehicleDataSection";
import AISummarySection from "./AISummarySection";
import QuickNavGrid from "./QuickNavGrid";
import type { TabId, VehicleReport } from "@/data/report";

interface Props {
  report: VehicleReport;
  onNavigate: (tab: TabId) => void;
}

export default function HomeTab({ report, onNavigate }: Readonly<Props>) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-indigo-100 p-1.5">
          <LayoutDashboard size={14} className="text-indigo-600" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Summary
        </span>
      </div>
      <h2 className="-mt-1 text-xl font-black text-slate-900">
        Report Summary
      </h2>
      <p className="-mt-2 text-xs text-slate-400">
        Overview for {report.year} {report.make} {report.model}
      </p>
      <StatsGrid stats={report.stats} />
      <PriceEvalSection price={report.price} priceEval={report.priceEval} />
      <VehicleDataSection
        vin={report.vin}
        engine={report.engine}
        transmission={report.transmission}
        drivetrain={report.drivetrain}
        color={report.color}
        auction={report.auction}
        location={report.location}
        daysOnLot={report.daysOnLot}
        previousOwners={report.previousOwners}
      />
      <AISummarySection aiSummary={report.aiSummary} />
      <QuickNavGrid onNavigate={onNavigate} />
    </>
  );
}
