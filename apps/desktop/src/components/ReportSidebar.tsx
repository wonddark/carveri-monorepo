import { type ReactNode, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  NavLink,
  useLocation,
  useParams,
  useRouteLoaderData,
} from "react-router";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  IconBrain,
  IconChartHistogram,
  IconClock,
  IconHeartHandshake,
  IconHome,
} from "@tabler/icons-react";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  children: NavItem[];
}

type NavEntry =
  | { type: "item"; id: string; label: string; icon: ReactNode }
  | { type: "group"; group: NavGroup };

const NAV: NavEntry[] = [
  {
    type: "item",
    id: "",
    label: "pages.resume",
    icon: <IconHome className="w-4" />,
  },
  {
    type: "group",
    group: {
      label: "pages.history",
      icon: <IconClock className="w-4" />,
      children: [
        { id: "timeline", label: "pages.timeline" },
        { id: "auction-history", label: "pages.auction_history" },
        { id: "accidents", label: "pages.accidents" },
        { id: "owners", label: "pages.owners" },
        { id: "service", label: "pages.service" },
        { id: "title", label: "pages.title" },
        { id: "past-sales", label: "pages.past_sales" },
      ],
    },
  },
  {
    type: "group",
    group: {
      label: "pages.market",
      icon: <IconChartHistogram className="w-4" />,
      children: [
        { id: "analysis", label: "pages.analysis" },
        { id: "price-dynamics", label: "pages.price_dynamics" },
        { id: "comparables", label: "pages.comparables" },
      ],
    },
  },
  {
    type: "group",
    group: {
      label: "pages.diagnosis_ai",
      icon: <IconBrain className="w-4" />,
      children: [
        { id: "diagnosis", label: "pages.diagnosis" },
        { id: "risks", label: "pages.risks" },
        { id: "inspection", label: "pages.inspection" },
        { id: "valuation", label: "pages.valuation" },
      ],
    },
  },
  {
    type: "group",
    group: {
      label: "pages.negotiation",
      icon: <IconHeartHandshake className="w-4" />,
      children: [
        { id: "strategy", label: "pages.strategy" },
        { id: "arguments", label: "pages.arguments" },
        { id: "costs", label: "pages.costs" },
      ],
    },
  },
];

export default function ReportSidebar() {
  const { t } = useTranslation("common");
  const { id } = useParams<{ id: string }>();
  const report = useRouteLoaderData("report") as TransformedReport | undefined;
  const location = useLocation();
  const currentSection =
    location.pathname.replace(/\/$/, "").split("/").pop() ?? "";

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const entry of NAV) {
      if (entry.type === "group") {
        initial[entry.group.label] = true;
      }
    }
    return initial;
  });

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      for (const entry of NAV) {
        if (entry.type === "group") {
          const hasActive = entry.group.children.some(
            (c) => currentSection === c.id,
          );
          if (hasActive) next[entry.group.label] = true;
        }
      }
      return next;
    });
  }, [currentSection]);

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="border-border/60 bg-card/90 sticky top-0 flex h-[calc(100vh-56px)] w-52 shrink-0 grow-0 flex-col self-start overflow-y-auto border-r backdrop-blur-sm">
      {/* Nav tree */}
      <div className="flex-auto p-2.5">
        <nav className="space-y-1.5">
          {NAV.map((entry) => {
            if (entry.type === "item") {
              return (
                <NavLink
                  key={entry.id}
                  to={`/reports/${id}/${entry.id}`}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium",
                      "text-foreground/65 transition-colors hover:bg-slate-50",
                      isActive &&
                        "pointer-events-none bg-blue-50/80 text-blue-700 shadow-sm ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-900",
                    )
                  }
                >
                  {entry.icon}
                  {t(entry.label)}
                </NavLink>
              );
            }

            const { group } = entry;
            const isOpen = openGroups[group.label] ?? false;
            const isChildActive = group.children.some(
              (c) => currentSection === c.id,
            );

            return (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-[13px] font-medium",
                    "text-foreground/65 transition-colors hover:bg-slate-50",
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
                  <div className="border-border/60 mt-1 ml-3.5 space-y-0.5 border-l pl-3">
                    {group.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={`/reports/${id}/${child.id}`}
                        className={({ isActive }: { isActive: boolean }) =>
                          cn(
                            "gap-2 rounded-lg px-2",
                            "text-muted-foreground flex w-full cursor-pointer items-center py-1.5 pr-3 text-[11px] transition-colors duration-200 ease-in-out",
                            isActive
                              ? "text-primary font-semibold"
                              : "hover:text-foreground/80 font-medium",
                          )
                        }
                      >
                        <div className="size-1 rounded-full bg-current/35" />
                        {t(child.label)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* VIN footer */}
      <div className="border-border/60 border-t px-3 py-2.5 font-mono text-[10px] tracking-wide text-slate-300 dark:text-slate-600">
        {report?.vin}
      </div>
    </aside>
  );
}
