import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils";
import ScoreRing from "@carveri/shared/components/ScoreRing.tsx";

interface Props {
  score: number;
  verdict: "BUY" | "CONSIDER" | "AVOID";
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
        "bg-emerald-50 dark:bg-emerald-800/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-600/80",
    },
    CONSIDER: {
      label: t("recommendation.consider"),
      icon: AlertCircle,
      classes:
        "bg-amber-50 dark:bg-amber-800/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-600/80",
    },
    AVOID: {
      label: t("recommendation.avoid"),
      icon: XCircle,
      classes:
        "bg-red-50 dark:bg-red-800/80 text-red-700 dark:text-red-300 border-red-200 dark:border-red-600/80",
    },
  };
  const config = VERDICT_CONFIG[verdict];
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-3 py-1">
        <ScoreRing score={score} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[10px] font-medium text-slate-400">
            {t("badge.label")}
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold",
              config.classes,
            )}
          >
            <Icon size={11} />
            {config.label}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-1 text-xs leading-snug">
        {aiSummary}
      </p>
    </div>
  );
}
