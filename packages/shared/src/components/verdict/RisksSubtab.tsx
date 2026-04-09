import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { DiagnosisRiskDimension } from "@carveri/shared/lib/transforms.ts";

type RiskLevel = DiagnosisRiskDimension["level"];

const LEVEL_STYLE: Record<
  RiskLevel,
  { label: string; bar: string; text: string; cardBg: string }
> = {
  none: {
    label: "none",
    bar: "bg-green-500",
    text: "text-green-700 dark:text-green-400",
    cardBg: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30",
  },
  low: {
    label: "low",
    bar: "bg-blue-400",
    text: "text-blue-700 dark:text-blue-400",
    cardBg: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30",
  },
  medium: {
    label: "medium",
    bar: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    cardBg: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30",
  },
  high: {
    label: "high",
    bar: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    cardBg: "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30",
  },
};

const OVERALL_RISK_BAR_WIDTH: Record<RiskLevel, string> = {
  none: "w-1/4",
  low: "w-2/4",
  medium: "w-3/4",
  high: "w-full",
};

function computeOverallLevel(risks: DiagnosisRiskDimension[]): RiskLevel {
  if (risks.some((r) => r.level === "high")) return "high";
  if (risks.some((r) => r.level === "medium")) return "medium";
  if (risks.some((r) => r.level === "low")) return "low";
  return "none";
}

interface Props {
  risks: DiagnosisRiskDimension[];
}

export default function RisksSubtab({ risks }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const overall = computeOverallLevel(risks);
  const overallStyle = LEVEL_STYLE[overall];

  return (
    <>
      <SubTabHeader title={t("risks.heading")} subtitle="" />

      {/* Overall risk summary bar */}
      <div className="mb-4 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            {t("risks.summary")}
          </span>
          <span className={cn("font-bold", overallStyle.text)}>
            {t(`risks.levels.${overall}`, { defaultValue: overall })}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: undefined }}
            className={cn(
              "h-full rounded-full",
              overallStyle.bar,
              OVERALL_RISK_BAR_WIDTH[overall],
            )}
          />
        </div>
      </div>

      {/* Risk dimensions */}
      <div className="flex flex-col gap-2.5">
        {risks.map((risk, i) => {
          const style = LEVEL_STYLE[risk.level];
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div
                className={cn(
                  "rounded-xl border p-3.5",
                  style.cardBg,
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{risk.label}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      style.text,
                      risk.level === "none"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : risk.level === "low"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : risk.level === "medium"
                            ? "bg-amber-100 dark:bg-amber-900/30"
                            : "bg-red-100 dark:bg-red-900/30",
                    )}
                  >
                    {t(`risks.levels.${risk.level}`, {
                      defaultValue: risk.level,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {risk.explanation}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground/70">
                  {risk.source}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
