import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  ArrowDownCircle,
  CheckCircle,
  Clock,
  FileCheck,
  Gauge,
  ShieldAlert,
  TrendingDown,
  X,
} from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import ScoreRing from "@carveri/shared/components/ScoreRing.tsx";
import type { DiagnosisData } from "@carveri/shared/lib/transforms.ts";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  TrendingDown,
  FileCheck,
  Gauge,
  ShieldAlert,
  ArrowDownCircle,
  Clock,
  AlertTriangle,
  CheckCircle,
};

const RECOMMENDATION_STYLE: Record<
  DiagnosisData["recommendation"],
  { bg: string; text: string; border: string }
> = {
  COMPRAR: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  NEGOCIAR: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
  "NO COMPRAR": {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
  },
};

const RISK_LEVEL_STYLE: Record<
  DiagnosisData["riskLevel"],
  { bg: string; text: string }
> = {
  Bajo: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400" },
  Medio: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  Alto: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
  Crítico: { bg: "bg-red-200 dark:bg-red-900/50", text: "text-red-800 dark:text-red-300" },
};

interface Props {
  diagnosis: DiagnosisData;
}

export default function DiagnosisSubtab({ diagnosis }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const [modalOpen, setModalOpen] = useState(false);

  const recStyle = RECOMMENDATION_STYLE[diagnosis.recommendation];
  const riskStyle = RISK_LEVEL_STYLE[diagnosis.riskLevel];
  const translatedRec =
    t(`recommendation.${diagnosis.recommendation}`, {
      defaultValue: diagnosis.recommendation,
    }) as string;

  return (
    <div className="flex flex-col gap-4">
      {/* Score card */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            {/* Score ring */}
            <div className="shrink-0">
              <ScoreRing score={diagnosis.score} size={72} />
            </div>

            {/* Recommendation + risk */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm font-bold",
                    recStyle.bg,
                    recStyle.text,
                    recStyle.border,
                  )}
                >
                  {translatedRec}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    riskStyle.bg,
                    riskStyle.text,
                  )}
                >
                  {t(`diagnosis.riskLevels.${diagnosis.riskLevel}`, {
                    defaultValue: diagnosis.riskLevel,
                  })}
                </span>
              </div>

              {/* AI summary truncated */}
              <p className="line-clamp-4 text-sm text-muted-foreground">
                {diagnosis.summary}
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-fit text-xs font-semibold text-primary underline-offset-2 hover:underline"
              >
                {t("diagnosis.seeFullAnalysis")}
              </button>
            </div>
          </div>

          {/* Price row */}
          <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-lg border border-border">
            <div className="flex flex-col items-center gap-0.5 px-3 py-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                {t("diagnosis.prices.dealer")}
              </span>
              <span className="text-sm font-bold">
                ${diagnosis.fairPrice > 0
                  ? (diagnosis.fairPrice + diagnosis.priceDiff).toLocaleString()
                  : "—"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5 px-3 py-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                {t("diagnosis.prices.fairPrice")}
              </span>
              <span className="text-sm font-bold">
                {diagnosis.fairPrice > 0
                  ? formatCurrency(diagnosis.fairPrice)
                  : "—"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5 px-3 py-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                {t("diagnosis.prices.difference")}
              </span>
              <span
                className={cn("text-sm font-bold", {
                  "text-green-600 dark:text-green-400": diagnosis.priceDiff < 0,
                  "text-red-600 dark:text-red-400": diagnosis.priceDiff > 0,
                  "text-muted-foreground": diagnosis.priceDiff === 0,
                })}
              >
                {diagnosis.fairPrice > 0
                  ? `${diagnosis.priceDiff >= 0 ? "+" : ""}${formatCurrency(Math.abs(diagnosis.priceDiff))}`
                  : "—"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key findings */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {t("diagnosis.keyFindings")}
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {diagnosis.findings.map((finding) => {
            const Icon = ICON_MAP[finding.icon] ?? CheckCircle;
            const isPositive = finding.type === "positive";
            return (
              <div
                key={finding.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3",
                  isPositive
                    ? "border-green-200 bg-green-50 dark:border-green-800/40 dark:bg-green-900/10"
                    : "border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/10",
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    isPositive
                      ? "bg-green-100 dark:bg-green-900/40"
                      : "bg-amber-100 dark:bg-amber-900/40",
                  )}
                >
                  <Icon
                    size={15}
                    className={
                      isPositive
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                    }
                  />
                </div>
                <p
                  className={cn("text-xs font-medium", {
                    "text-green-800 dark:text-green-300": isPositive,
                    "text-amber-800 dark:text-amber-300": !isPositive,
                  })}
                >
                  {finding.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Red flags */}
      {diagnosis.redFlags.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">
            {t("diagnosis.redFlags")}
          </h3>
          <div className="flex flex-col gap-1.5">
            {diagnosis.redFlags.map((flag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 dark:border-red-800/40 dark:bg-red-900/10"
              >
                <AlertTriangle size={13} className="shrink-0 text-red-500" />
                <p className="text-xs font-medium text-red-700 dark:text-red-300">
                  {flag}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full analysis modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-2xl bg-background p-6 shadow-xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">{t("main.heading")}</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <ScoreRing score={diagnosis.score} size={56} />
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "w-fit rounded-full border px-3 py-1 text-sm font-bold",
                    recStyle.bg,
                    recStyle.text,
                    recStyle.border,
                  )}
                >
                  {translatedRec}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t(`diagnosis.riskLevels.${diagnosis.riskLevel}`, {
                    defaultValue: diagnosis.riskLevel,
                  })}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {diagnosis.summary}
            </p>

            <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-lg border border-border text-center">
              <div className="px-3 py-2">
                <p className="text-[10px] text-muted-foreground">{t("diagnosis.prices.dealer")}</p>
                <p className="font-bold">
                  {diagnosis.fairPrice > 0
                    ? formatCurrency(diagnosis.fairPrice + diagnosis.priceDiff)
                    : "—"}
                </p>
              </div>
              <div className="px-3 py-2">
                <p className="text-[10px] text-muted-foreground">{t("diagnosis.prices.fairPrice")}</p>
                <p className="font-bold">
                  {diagnosis.fairPrice > 0 ? formatCurrency(diagnosis.fairPrice) : "—"}
                </p>
              </div>
              <div className="px-3 py-2">
                <p className="text-[10px] text-muted-foreground">{t("diagnosis.prices.difference")}</p>
                <p
                  className={cn("font-bold", {
                    "text-green-600": diagnosis.priceDiff < 0,
                    "text-red-600": diagnosis.priceDiff > 0,
                  })}
                >
                  {diagnosis.fairPrice > 0
                    ? `${diagnosis.priceDiff >= 0 ? "+" : ""}${formatCurrency(Math.abs(diagnosis.priceDiff))}`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
