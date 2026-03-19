import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

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
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    CONSIDER: {
      label: t("recommendation.consider"),
      icon: AlertCircle,
      classes: "bg-amber-50 text-amber-700 border-amber-200",
    },
    AVOID: {
      label: t("recommendation.avoid"),
      icon: XCircle,
      classes: "bg-red-50 text-red-700 border-red-200",
    },
  };
  const config = VERDICT_CONFIG[verdict];
  const Icon = config.icon;

  return (
    <div className="mt-2 flex flex-col gap-3 rounded-xl">
      <div className="flex gap-3">
        <div className="min-w-13 rounded-xl bg-indigo-600 px-3 py-2 text-center text-white">
          <div className="text-xl leading-none font-black">{score}</div>
          <div className="mt-0.5 text-[9px] opacity-70">/10</div>
        </div>
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
      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500">
        {aiSummary}
      </p>
    </div>
  );
}
