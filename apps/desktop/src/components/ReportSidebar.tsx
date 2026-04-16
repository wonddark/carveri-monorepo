import { Fragment, type ReactNode, useEffect, useState } from "react";
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
    id: "overview",
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
    <aside className="sticky top-0 hidden h-[calc(100vh-64px)] w-55 shrink-0 overflow-y-auto border-r border-gray-200 bg-white md:block">
      <div className="p-3">
        <nav className="space-y-1">
          {NAV.map((entry) => {
            if (entry.type === "item") {
              return (
                <NavLink
                  key={entry.id}
                  to={`/reports/${id}/${entry.id}`}
                  className="flex w-full items-center justify-between rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    {entry.icon}
                    {t(entry.label)}
                  </span>
                </NavLink>
              );
            }

            const { group } = entry;
            const isOpen = openGroups[group.label] ?? false;

            return (
              <Fragment key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2.5">
                    {group.icon}
                    {t(group.label)}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="mt-0.5 ml-4 space-y-0.5 border-l border-gray-200 pl-3">
                    {group.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={`/reports/${id}/${child.id}`}
                        className={({ isActive }: { isActive: boolean }) =>
                          cn(
                            "flex w-full items-center gap-2 rounded-md px-2",
                            "py-1.5 text-[13px] text-gray-500 transition-colors hover:text-gray-700",
                            { "font-semibold text-blue-700": isActive },
                          )
                        }
                      >
                        {({ isActive }: { isActive: boolean }) => (
                          <Fragment>
                            <div
                              className={cn(
                                "h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300",
                                {
                                  "bg-blue-600": isActive,
                                },
                              )}
                            />
                            <span>{t(child.label)}</span>
                          </Fragment>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>

      {/* VIN footer */}
      <div className="border-t border-gray-100 px-3 py-3 font-mono text-[10px] text-gray-300">
        {report?.vin}{" "}
        <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">
          CV
        </span>
      </div>
    </aside>
  );
}
