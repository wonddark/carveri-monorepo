import type { VehicleReport } from "@/data/report";

const DELTA_COLOR: Record<VehicleReport["priceEval"]["label"], string> = {
  BARGAIN: "text-indigo-500",
  LOW: "text-indigo-500",
  FAIR: "text-indigo-500",
  HIGH: "text-amber-500",
  OVERPRICED: "text-red-500",
};

const LABEL_TEXT: Record<VehicleReport["priceEval"]["label"], string> = {
  BARGAIN: "Great deal",
  LOW: "Below market",
  FAIR: "Fair price",
  HIGH: "Above market",
  OVERPRICED: "Overpriced",
};

interface Props {
  price: number;
  priceEval: VehicleReport["priceEval"];
}

export default function MarketPriceHeader({
  price,
  priceEval,
}: Readonly<Props>) {
  const { label, marketAvgDeltaPct } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
      <div className="mb-1 text-4xl font-black text-slate-900">
        ${price.toLocaleString()}
      </div>
      <div className={`text-xs font-semibold ${DELTA_COLOR[label]}`}>
        {isAbove ? "▲" : "▼"}
        {Math.abs(marketAvgDeltaPct).toFixed(1)}% {isAbove ? "above" : "below"}{" "}
        average · {LABEL_TEXT[label]}
      </div>
    </div>
  );
}
