import { DollarSign } from "lucide-react";
import GaugePlaceholder from "./GaugePlaceholder";
import BookValues from "./BookValues";
import type { VehicleReport } from "@/data/report";

const LABEL_TEXT: Record<string, string> = {
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

export default function PriceEvalSection({
  price,
  priceEval,
}: Readonly<Props>) {
  const { label, marketAvgDeltaPct, bookValues } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <DollarSign size={16} className="text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900">Price Evaluation</h3>
      </div>

      <div className="mb-1 text-center">
        <div className="text-3xl font-black text-slate-900">
          ${price.toLocaleString()}
        </div>
        <div className="mt-0.5 text-xs font-semibold text-indigo-500">
          {LABEL_TEXT[label]} — {isAbove ? "▲" : "▼"}
          {Math.abs(marketAvgDeltaPct)}% {isAbove ? "above" : "below"} average
        </div>
      </div>

      <GaugePlaceholder />
      <BookValues bookValues={bookValues} />
    </div>
  );
}
