// apps/desktop/src/components/ReportSidebar.tsx
import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ImageCarousel from "@carveri/shared/components/ImageCarousel";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/pages/ReportPage";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import {
  IconChartHistogram,
  IconClock,
  IconHeartHandshake,
  IconHome,
  IconSparkles,
} from "@tabler/icons-react";

interface NavItem {
  id: SectionId;
  label: string;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  children: NavItem[];
}

type NavEntry =
  | { type: "item"; id: SectionId; label: string; icon: ReactNode }
  | { type: "group"; group: NavGroup };

const NAV: NavEntry[] = [
  {
    type: "item",
    id: "resumen",
    label: "pages.resume",
    icon: <IconHome className="w-5" />,
  },
  {
    type: "group",
    group: {
      label: "pages.history",
      icon: <IconClock className="w-5" />,
      children: [
        { id: "timeline", label: "pages.timeline" },
        { id: "fotos-subasta", label: "pages.auction_photos" },
        { id: "accidentes", label: "pages.accidents" },
        { id: "duenos", label: "pages.owners" },
        { id: "servicio", label: "pages.service" },
        { id: "titulo", label: "pages.title" },
      ],
    },
  },
  {
    type: "item",
    id: "mercado",
    label: "pages.market",
    icon: <IconChartHistogram className="w-5" />,
  },
  { type: "item", label: "pages.verdict_ai", id: "verdict_ai", icon:<IconSparkles className="w-5"/> },
  // { type: "item", id: "checklist", label: "pages.checklist" },
  {
    type: "group",
    group: {
      label: "pages.negotiation",
      icon: <IconHeartHandshake className="w-5" />,
      children: [
        { id: "estrategia", label: "pages.strategy" },
        { id: "argumentos", label: "pages.arguments" },
        { id: "costos", label: "pages.costs" },
      ],
    },
  },
];

interface Props {
  report: TransformedReport;
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
    "pages.history": true,
    "pages.negotiation": true,
  });

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="border-border bg-card/30 sticky top-15 flex w-75 min-w-60 flex-col gap-4 overflow-y-auto border-r">
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
                  "flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium",
                  "text-foreground/70 hover:bg-card rounded-lg transition-colors",
                  {"bg-primary/5 text-primary pointer-events-none": active}
                )}
              >
                {entry.icon}
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
                  "flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium",
                  "text-foreground/70 hover:bg-card rounded-lg transition-colors",
                  isChildActive && !isOpen && "text-primary",
                )}
              >
                <div className="flex items-center gap-2">
                  {group.icon} {t(group.label)}
                </div>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {isOpen && (
                <div className="border-border mt-0.5 ml-4 space-y-0.5 border-l pl-3">
                  {group.children.map((child) => {
                    const active = activeSection === child.id;
                    return (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onNavigate(child.id)}
                        className={cn(
                          "gap-2 rounded-md px-2",
                          "text-muted-foreground flex w-full cursor-pointer items-center py-1.5 pr-4 text-xs transition-colors duration-200 ease-in-out",
                          active
                            ? "text-primary font-semibold"
                            : "hover:text-foreground/80 font-medium",
                        )}
                      >
                        <div className="size-1.5 rounded-full bg-current/40"></div>
                        {t(child.label)}
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
