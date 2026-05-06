import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CarFront,
  CircleX,
  Eye,
  FileText,
  FileWarning,
  Flame,
  ScrollText,
  Shield,
  Tag,
  TriangleAlert,
  UserCheck,
  Wrench,
} from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { useEffect } from "react";
import type {
  OdometerHistory,
  Timeline,
} from "@carveri/shared/types/vehicle-report.ts";
import {
  CartesianGrid,
  Line,
  LineChart,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@carveri/shared/components/ui/chart.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

type TimelineEvent = TransformedReport["historyTab"]["timeline"][number];
type Severity = "critical" | "alert" | "info";

function inferEventType(
  title: string,
  _redFlag: boolean,
): {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  titleColor: string;
} {
  const t = title.toLowerCase();
  if (
    t.includes("accident") ||
    t.includes("total loss") ||
    t.includes("collision") ||
    t.includes("damage") ||
    t.includes("pérdida total") ||
    t.includes("accidente")
  ) {
    return {
      icon: Flame,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/30",
      titleColor: "text-red-700 dark:text-red-400",
    };
  }
  if (t.includes("salvage") || t.includes("rebuilt") || t.includes("lemon")) {
    return {
      icon: FileWarning,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      titleColor: "text-orange-700 dark:text-orange-400",
    };
  }
  if (
    t.includes("service") ||
    t.includes("maintenance") ||
    t.includes("repair")
  ) {
    return {
      icon: Wrench,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      titleColor: "text-emerald-700 dark:text-emerald-400",
    };
  }
  if (t.includes("dealer") || t.includes("inventario")) {
    return {
      icon: Shield,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      titleColor: "text-amber-700 dark:text-amber-400",
    };
  }
  if (
    t.includes("sale") ||
    t.includes("sold") ||
    t.includes("purchase") ||
    t.includes("venta")
  ) {
    return {
      icon: Tag,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      titleColor: "text-blue-700 dark:text-blue-400",
    };
  }
  if (
    t.includes("owner") ||
    t.includes("propietario") ||
    t.includes("title issued") ||
    t.includes("título emitido")
  ) {
    return {
      icon: UserCheck,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-100 dark:bg-violet-900/30",
      titleColor: "text-violet-700 dark:text-violet-400",
    };
  }
  if (t.includes("odometer") || t.includes("mileage") || t.includes("odómetro")) {
    return {
      icon: CarFront,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      titleColor: "text-gray-800 dark:text-slate-200",
    };
  }
  if (t.includes("correction") || t.includes("corrección")) {
    return {
      icon: ScrollText,
      color: "text-gray-500 dark:text-slate-400",
      bg: "bg-gray-100 dark:bg-slate-800/40",
      titleColor: "text-gray-700 dark:text-slate-300",
    };
  }
  if (
    t.includes("insurance") ||
    t.includes("title") ||
    t.includes("registration") ||
    t.includes("window sticker") ||
    t.includes("original")
  ) {
    return {
      icon: FileText,
      color: "text-slate-500 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800/40",
      titleColor: "text-gray-800 dark:text-slate-200",
    };
  }
  return {
    icon: FileText,
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800/40",
    titleColor: "text-gray-800 dark:text-slate-200",
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

function parsePills(description: string): string[] {
  if (!description) return [];
  return description
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
}

const HIGHLIGHT_KEYWORDS = ["salvage", "rebuilt", "total loss", "fraud"];

type PillChipProps = { text: string };

function PillChip(props: Readonly<PillChipProps>) {
  const { text } = props;
  const lower = text.toLowerCase();
  const isHighlighted = HIGHLIGHT_KEYWORDS.some((kw) => lower.includes(kw));
  if (isHighlighted) {
    return (
      <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-red-600 dark:text-red-400 font-medium">
        <TriangleAlert className="w-2.5 h-2.5 mr-1 shrink-0" />
        {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300">
      {text}
    </span>
  );
}

type MileageTooltipProps = Partial<TooltipContentProps<number, string>>;

function MileageTooltip(props: Readonly<MileageTooltipProps>) {
  const { active, payload } = props;
  if (!active || !payload?.length) return null;
  const { date, mileage } = payload[0].payload as {
    date: string;
    mileage: number;
  };

  return (
    <div className="border-border/50 bg-background grid min-w-36 gap-1 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
      <span className="font-mono font-medium tabular-nums">{mileage} mi</span>
      <span className="text-muted-foreground font-medium">{date}</span>
    </div>
  );
}

interface Props {
  timeline: Timeline;
  odometerHistory: OdometerHistory;
}

export default function TimelineSubtab(props: Readonly<Props>) {
  const { timeline, odometerHistory } = props;
  const { t } = useTranslation("history");

  const counts = timeline.reduce(
    (acc, event) => {
      const sev = inferSeverity(event);
      acc[sev] = (acc[sev] ?? 0) + 1;
      return acc;
    },
    {} as Record<Severity, number>,
  );

  const chartConfig: ChartConfig = {
    mileage: { label: t("timeline.currentMileage"), color: "#ef4444" },
    gradientStart: { color: "#f6a0a0" },
    gradientEnd: { color: "#f6bebe" },
  };

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

      {/* Odometer history */}
      <Card className="mb-3 lg:mb-6">
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-56 w-full px-2 lg:h-90 lg:px-12"
          >
            <LineChart data={odometerHistory}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-muted-foreground)",
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-muted-foreground)",
                }}
                tickFormatter={(v: number) => `${v} mi`}
                domain={["auto", "auto"]}
                width={72}
              />
              <ChartTooltip content={<MileageTooltip />} />
              <Line
                dataKey="mileage"
                type="monotone"
                stroke="var(--color-mileage)"
                strokeWidth={4}
                dot={{
                  r: 4,
                  stroke: "var(--color-mileage)",
                  fill: "var(--color-mileage)",
                }}
                activeDot={{
                  r: 6,
                  stroke: "var(--color-mileage)",
                  strokeWidth: 3,
                  fill: "var(--color-background)",
                }}
                isAnimationActive="auto"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Timeline list */}
      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />

        {timeline.map((event, i) => {
          const {
            icon: Icon,
            color,
            bg,
            titleColor,
          } = inferEventType(event.title, event.redFlag);
          const severity = inferSeverity(event);
          const pills = parsePills(event.description ?? "");

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative flex gap-4 group"
            >
              {/* Icon column */}
              <div className="flex flex-col items-center z-10">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    "ring-2 ring-gray-200 dark:ring-slate-700 ring-offset-2 ring-offset-white dark:ring-offset-slate-900",
                    "shadow-sm transition-transform group-hover:scale-110",
                    bg,
                  )}
                >
                  <Icon size={16} className={color} />
                </div>
              </div>

              {/* Event card */}
              <div className="flex-1 mb-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-sm transition-shadow group-hover:shadow-md">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-medium text-gray-400 dark:text-slate-500">
                    {event.date ?? "—"}
                    {event.odometer != null && (
                      <span className="ml-2">
                        · {event.odometer.toLocaleString()} mi
                      </span>
                    )}
                  </span>
                  {severity === "critical" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 px-2 py-0.5 rounded-full">
                      <CircleX className="w-3 h-3 text-red-500" />
                      {t("timeline.severity.critical")}
                    </span>
                  )}
                  {severity === "alert" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 px-2 py-0.5 rounded-full">
                      <TriangleAlert className="w-3 h-3 text-amber-500" />
                      {t("timeline.severity.alert")}
                    </span>
                  )}
                  {severity === "info" && event.redFlag && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3 text-blue-500" />
                      {t("timeline.severity.info")}
                    </span>
                  )}
                </div>

                <p className={cn("text-sm font-bold leading-snug", titleColor)}>
                  {event.title}
                </p>

                {pills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
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
