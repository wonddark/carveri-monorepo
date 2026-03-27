// apps/desktop/src/components/ReportSidebar.tsx
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ImageCarousel from "@carveri/shared/components/ImageCarousel";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard";
import { cn } from "@/lib/utils";
import type { VehicleReport } from "@carveri/shared/data/report";
import type { SectionId } from "@/pages/ReportPage";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

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
  { type: "item", id: "resumen", label: "resume" },
  {
    type: "group",
    group: {
      label: "history",
      icon: "🕒",
      children: [
        { id: "timeline", label: "timeline" },
        { id: "fotos-subasta", label: "auction_photos" },
        { id: "accidentes", label: "accidents" },
        { id: "duenos", label: "owners" },
        { id: "servicio", label: "service" },
        { id: "titulo", label: "title" },
      ],
    },
  },
  { type: "item", id: "mercado", label: "market" },
  { type: "item", label: "verdict_ai", id: "verdict_ai" },
  { type: "item", id: "checklist", label: "checklist" },
  {
    type: "group",
    group: {
      label: "negotiation",
      icon: "💬",
      children: [
        { id: "estrategia", label: "strategy" },
        { id: "argumentos", label: "arguments" },
        { id: "costos", label: "costs" },
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
  const { t } = useTranslation("common");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    history: true,
    verdict_ai: true,
    negotiation: true,
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="border-border bg-card/30 flex w-full max-w-80 min-w-60 flex-col gap-4 overflow-y-auto border-r">
      {/* Image carousel */}
      <div className="p-3">
        <div className="aspect-16/10 overflow-hidden rounded-xl">
          <ImageCarousel images={report.images} />
        </div>
      </div>

      {/* Price + mileage */}
      <div className="border-border border-b px-4 pb-3">
        <p className="text-2xl font-semibold">
          ${report.price.toLocaleString()}
        </p>
        <p className="text-muted-foreground text-xs">
          {report.mileage.toLocaleString()} mi
        </p>
      </div>

      {/* Verdict card */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

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
                  "flex w-full cursor-pointer items-center gap-2 border-l-2 border-transparent px-4 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary/15 text-primary border-l-2"
                    : "hover:bg-primary/5",
                )}
              >
                {t(entry.label)}
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
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold",
                  "hover:bg-primary/5 border-l-2 border-transparent transition-colors",
                  isChildActive &&
                    !isOpen &&
                    "border-primary bg-primary/15 text-primary",
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
                          "flex w-full cursor-pointer items-center border-l-2 border-transparent py-1.5 pr-4 pl-9 text-xs transition-colors",
                          active
                            ? "text-primary border-primary bg-primary/15 font-semibold"
                            : "hover:bg-primary/5 hover:text-foreground/85 font-medium",
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
      <div className="border-border border-t px-4 py-3">
        <p className="text-muted-foreground font-mono text-xs">{report.vin}</p>
      </div>
    </aside>
  );
}
