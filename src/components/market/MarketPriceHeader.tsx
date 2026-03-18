import { useTranslation } from "react-i18next";
import type { VehicleReport } from "@/data/report";

const DELTA_COLOR: Record<VehicleReport["priceEval"]["label"], string> = {
  BARGAIN: "text-indigo-500",
  LOW: "text-indigo-500",
  FAIR: "text-indigo-500",
  HIGH: "text-amber-500",
  OVERPRICED: "text-red-500",
};

interface Props {
  price: number;
  priceEval: VehicleReport["priceEval"];
}

export default function MarketPriceHeader({
  price,
  priceEval,
}: Readonly<Props>) {
  const { t } = useTranslation(['market', 'home']);
  const { label, marketAvgDeltaPct } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  const LABEL_TEXT: Record<VehicleReport["priceEval"]["label"], string> = {
    BARGAIN: t('home:priceEval.greatDeal'),
    LOW: t('home:priceEval.belowMarket'),
    FAIR: t('home:priceEval.fairPrice'),
    HIGH: t('home:priceEval.aboveMarket'),
    OVERPRICED: t('home:priceEval.overpriced'),
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
      <div className="mb-1 text-4xl font-black text-slate-900">
        ${price.toLocaleString()}
      </div>
      <div className={`text-xs font-semibold ${DELTA_COLOR[label]}`}>
        {isAbove ? "▲" : "▼"}
        {Math.abs(marketAvgDeltaPct).toFixed(1)}% {isAbove ? t('home:priceEval.above') : t('home:priceEval.below')}{" "}
        {t('home:priceEval.average')} · {LABEL_TEXT[label]}
      </div>
    </div>
  );
}
