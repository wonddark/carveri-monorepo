import { DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookValues from "./BookValues";
import type { VehicleReport } from "@/data/report";
import ReportGauge from "@/components/ReportGauge.tsx";

interface Props {
  price: number;
  priceEval: VehicleReport["priceEval"];
}

export default function PriceEvalSection({
  price,
  priceEval,
}: Readonly<Props>) {
  const { t } = useTranslation("home");

  const LABEL_TEXT: Record<string, string> = {
    BARGAIN: t("priceEval.greatDeal"),
    LOW: t("priceEval.belowMarket"),
    FAIR: t("priceEval.fairPrice"),
    HIGH: t("priceEval.aboveMarket"),
    OVERPRICED: t("priceEval.overpriced"),
  };

  const { label, marketAvgDeltaPct, bookValues } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  const min = 12000;
  const max = 33000;
  const percentile = ((price - min) / (max - min)) * 100;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <DollarSign size={16} className="text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900">{t("priceEval.title")}</h3>
      </div>

      <div className="mb-1 text-center">
        <div className="text-3xl font-black text-slate-900">
          ${price.toLocaleString()}
        </div>
        <div className="mt-0.5 text-xs font-semibold text-indigo-500">
          {LABEL_TEXT[label]} — {isAbove ? "▲" : "▼"}
          {Math.abs(marketAvgDeltaPct)}% {isAbove ? t("priceEval.above") : t("priceEval.below")} {t("priceEval.average")}
        </div>
      </div>

      <ReportGauge
        price={price}
        label={label}
        retail={min}
        percentile={percentile}
        wholesale={max}
      />
      <BookValues bookValues={bookValues} />
    </div>
  );
}
