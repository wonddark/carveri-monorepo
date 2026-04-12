import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Building2,
  Car,
  FileText,
  Gauge,
  User,
  Wrench,
} from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { useEffect } from "react";

type TimelineEvent = TransformedReport["historyTab"]["timeline"][number];
type Severity = "critical" | "alert" | "info";

// Infer event category from title keywords (API has type: null)
function inferEventType(
  title: string,
  _redFlag: boolean,
): {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
} {
  const t = title.toLowerCase();
  if (
    t.includes("accident") ||
    t.includes("total loss") ||
    t.includes("collision") ||
    t.includes("damage")
  ) {
    return {
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    };
  }
  if (
    t.includes("salvage") ||
    t.includes("rebuilt") ||
    t.includes("lemon") ||
    t.includes("title") ||
    t.includes("registration") ||
    t.includes("insurance")
  ) {
    return {
      icon: FileText,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    };
  }
  if (
    t.includes("service") ||
    t.includes("maintenance") ||
    t.includes("repair")
  ) {
    return {
      icon: Wrench,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    };
  }
  if (
    t.includes("sale") ||
    t.includes("sold") ||
    t.includes("owner") ||
    t.includes("purchase") ||
    t.includes("dealer")
  ) {
    return {
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    };
  }
  if (t.includes("odometer") || t.includes("mileage")) {
    return {
      icon: Gauge,
      color: "text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800/40",
    };
  }
  if (t.includes("window sticker") || t.includes("original")) {
    return {
      icon: Car,
      color: "text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800/40",
    };
  }
  if (t.includes("new owner") || t.includes("previous owner")) {
    return {
      icon: User,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    };
  }
  return {
    icon: FileText,
    color: "text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800/40",
  };
}

function inferSeverity(event: TimelineEvent): Severity {
  const t = event.title.toLowerCase();
  const d = (event.description ?? "").toLowerCase();
  if (
    event.redFlag &&
    (t.includes("total loss") ||
      t.includes("salvage") ||
      t.includes("rebuilt") ||
      d.includes("salvage") ||
      d.includes("rebuilt"))
  ) {
    return "critical";
  }
  if (event.redFlag || t.includes("accident") || t.includes("damage")) {
    return "alert";
  }
  return "info";
}

const SEVERITY_BADGE: Record<
  Severity,
  { label: string; classes: string; dotColor: string }
> = {
  critical: {
    label: "critical",
    classes: "bg-slate-100 dark:bg-slate-800 text-red-500",
    dotColor: "bg-red-500",
  },
  alert: {
    label: "alert",
    classes: "bg-slate-100 dark:bg-slate-800 text-amber-500",
    dotColor: "bg-amber-500",
  },
  info: {
    label: "info",
    classes: "bg-slate-100 dark:bg-slate-800 text-slate-400",
    dotColor: "bg-slate-400",
  },
};

// Split description into individual pills
function parsePills(description: string): string[] {
  if (!description) return [];
  return description
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
}

const HIGHLIGHT_KEYWORDS = ["salvage", "rebuilt", "total loss", "fraud"];

function PillChip({ text }: Readonly<{ text: string }>) {
  const lower = text.toLowerCase();
  const isHighlighted = HIGHLIGHT_KEYWORDS.some((kw) => lower.includes(kw));
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 text-[10px] leading-tight font-medium",
        isHighlighted
          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      )}
    >
      {text}
    </span>
  );
}

interface Props {
  timeline: TransformedReport["historyTab"]["timeline"];
}

export default function TimelineSubtab({ timeline }: Readonly<Props>) {
  const { t } = useTranslation("history");

  // Count severities for summary bar
  const counts = timeline.reduce(
    (acc, event) => {
      const sev = inferSeverity(event);
      acc[sev] = (acc[sev] ?? 0) + 1;
      return acc;
    },
    {} as Record<Severity, number>,
  );

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SubTabHeader
        title={t("timeline.heading")}
        subtitle={t("timeline.subtitle")}
      />

      {/* Summary bar */}
      <div className="mb-4 flex flex-wrap gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/40">
        {counts.critical > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <span className="size-2 rounded-full bg-red-500" />
            {t("timeline.summaryBar.critical", { count: counts.critical })}
          </div>
        )}
        {counts.alert > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <span className="size-2 rounded-full bg-amber-500" />
            {t("timeline.summaryBar.alert", { count: counts.alert })}
          </div>
        )}
        {counts.info > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
            <span className="size-2 rounded-full bg-green-500" />
            {t("timeline.summaryBar.service", { count: counts.info })}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          {t("timeline.summaryBar.total", { count: timeline.length })}
        </div>
      </div>

      {/* Timeline list */}
      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute top-5 bottom-5 left-5 w-px bg-slate-200 dark:bg-slate-700" />

        {timeline.map((event, i) => {
          const {
            icon: Icon,
            color,
            bg,
          } = inferEventType(event.title, event.redFlag);
          const severity = inferSeverity(event);
          const badge = SEVERITY_BADGE[severity];
          const pills = parsePills(event.description ?? "");

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative flex gap-4 pb-4"
            >
              {/* Circle icon */}
              <div
                className={cn(
                  "ring-background relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-2",
                  bg,
                )}
              >
                <Icon size={16} className={color} />
              </div>

              {/* Event card */}
              <div className="border-border bg-card flex-1 rounded-xl border p-3 shadow-sm">
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-muted-foreground text-[11px] font-medium">
                      {event.date ?? "—"}
                      {event.odometer != null && (
                        <span className="ml-2">
                          · {event.odometer.toLocaleString()} mi
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug font-semibold">
                      {event.title}
                    </p>
                  </div>
                  {severity !== "info" && (
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        badge.classes,
                      )}
                    >
                      <span
                        className={cn("size-1.5 rounded-full", badge.dotColor)}
                      />
                      {t(`timeline.severity.${severity}`)}
                    </span>
                  )}
                </div>

                {pills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {pills.map((pill) => (
                      <PillChip
                        key={pill.toLowerCase().replaceAll(" ", "")}
                        text={pill}
                      />
                    ))}
                  </div>
                )}

                {event.source && (
                  <p className="text-muted-foreground mt-2 text-[10px]">
                    {event.source}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
