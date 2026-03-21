// apps/desktop/src/components/ReportSidebar.tsx
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ImageCarousel from "@carveri/shared/components/ImageCarousel";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard";
import { cn } from "@/lib/utils";
import type { VehicleReport } from "@carveri/shared/data/report";
import type { SectionId } from "@/pages/ReportPage";

interface NavItem {
  id: SectionId;
  label: string;
}

interface NavGroup {
  label: string;
  icon: string;
  children: NavItem[];
}

type NavEntry =
  | { type: "item"; id: SectionId; label: string }
  | { type: "group"; group: NavGroup };

const NAV: NavEntry[] = [
  { type: "item", id: "resumen", label: "Resumen" },
  {
    type: "group",
    group: {
      label: "Historial",
      icon: "🕒",
      children: [
        { id: "timeline", label: "Timeline" },
        { id: "fotos-subasta", label: "Fotos Subasta" },
        { id: "accidentes", label: "Accidentes" },
        { id: "duenos", label: "Dueños" },
        { id: "servicio", label: "Servicio" },
        { id: "titulo", label: "Título" },
      ],
    },
  },
  { type: "item", id: "mercado", label: "Mercado" },
  {
    type: "group",
    group: {
      label: "Veredicto IA",
      icon: "✨",
      children: [
        { id: "veredicto", label: "Veredicto" },
        { id: "riesgos", label: "Riesgos" },
      ],
    },
  },
  { type: "item", id: "checklist", label: "Checklist" },
  {
    type: "group",
    group: {
      label: "Negociación",
      icon: "💬",
      children: [
        { id: "estrategia", label: "Estrategia" },
        { id: "argumentos", label: "Argumentos" },
        { id: "costos", label: "Costos" },
      ],
    },
  },
];

interface Props {
  report: VehicleReport;
  activeSection: SectionId;
  onNavigate: (s: SectionId) => void;
}

export default function ReportSidebar({
  report,
  activeSection,
  onNavigate,
}: Readonly<Props>) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Historial: true,
    "Veredicto IA": true,
    Negociación: true,
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-100 bg-slate-50">
      {/* Image carousel */}
      <div className="p-3">
        <div className="overflow-hidden rounded-xl">
          <ImageCarousel images={report.images} />
        </div>
      </div>

      {/* Price + mileage */}
      <div className="border-b border-slate-100 px-4 pb-3">
        <p className="text-2xl font-black text-slate-900">
          ${report.price.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500">
          {report.mileage.toLocaleString()} mi
        </p>
      </div>

      {/* Verdict card */}
      <div className="p-3">
        <CarSummaryCard
          year={report.year}
          make={report.make}
          model={report.model}
          trim={report.trim}
          price={report.price}
          mileage={report.mileage}
          location={report.location}
          score={report.score}
          verdict={report.verdict}
          aiSummary={report.aiSummary}
        />
      </div>

      {/* Nav tree */}
      <nav className="flex-1 pb-4">
        {NAV.map((entry) => {
          if (entry.type === "item") {
            const active = activeSection === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onNavigate(entry.id)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "border-l-2 border-blue-600 bg-blue-50 text-blue-700"
                    : "border-l-2 border-transparent text-slate-700 hover:bg-slate-100",
                )}
              >
                {entry.label}
              </button>
            );
          }

          const { group } = entry;
          const isOpen = openGroups[group.label] ?? false;
          const isChildActive = group.children.some(
            (c) => c.id === activeSection,
          );

          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-700",
                  "border-l-2 border-transparent transition-colors hover:bg-slate-100",
                  isChildActive &&
                    !isOpen &&
                    "border-blue-600 bg-blue-50 text-blue-700",
                )}
              >
                <span>
                  {group.icon} {group.label}
                </span>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {isOpen && (
                <div>
                  {group.children.map((child) => {
                    const active = activeSection === child.id;
                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onNavigate(child.id)}
                        className={cn(
                          "flex w-full items-center py-1.5 pl-9 pr-4 text-xs transition-colors",
                          active
                            ? "border-l-2 border-blue-600 bg-blue-50 font-semibold text-blue-700"
                            : "border-l-2 border-transparent font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                        )}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* VIN footer */}
      <div className="border-t border-slate-100 px-4 py-3">
        <p className="font-mono text-[10px] text-slate-400">{report.vin}</p>
      </div>
    </aside>
  );
}
