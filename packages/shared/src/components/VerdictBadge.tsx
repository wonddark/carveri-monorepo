import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils";
import ScoreRing from "@carveri/shared/components/ScoreRing.tsx";

interface Props {
  score: number;
  verdict: string | null;
  aiSummary: string;
}

export default function VerdictBadge(props: Readonly<Props>) {
  const { score, verdict, aiSummary } = props;
  const { t } = useTranslation("verdict");
  const VERDICT_CONFIG = {
    BUY: {
      label: t("recommendation.buy"),
      icon: CheckCircle,
      classes:
        "bg-emerald-50/90 text-emerald-700 border-emerald-200/80 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/60",
    },
    CONSIDER: {
      label: t("recommendation.consider"),
      icon: AlertCircle,
      classes:
        "bg-amber-50/90 text-amber-700 border-amber-200/80 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/60",
    },
    AVOID: {
      label: t("recommendation.avoid"),
      icon: XCircle,
      classes:
        "bg-red-50/90 text-red-700 border-red-200/80 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/60",
    },
  };
  const config = VERDICT_CONFIG[(verdict?.toUpperCase() || "BUY") as "BUY"];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="rounded-[1.25rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/70 p-3 shadow-[0_14px_32px_-24px_rgba(37,99,235,0.4)]">
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-full bg-white/90 p-1 shadow-sm ring-1 ring-slate-200/70">
          <ScoreRing score={score} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
            {t("badge.label")}
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm",
              config.classes,
            )}
          >
            <Icon size={11} />
            {config.label}
          </div>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-[12px] leading-5">
            {aiSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
