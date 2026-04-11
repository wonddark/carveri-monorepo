import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

const DELTA_COLOR: Record<TransformedReport["priceEval"]["label"], string> = {
  BARGAIN: "text-indigo-500",
  LOW: "text-indigo-500",
  FAIR: "text-indigo-500",
  HIGH: "text-amber-500",
  OVERPRICED: "text-red-500",
};

interface Props {
  price: number;
  priceEval: TransformedReport["priceEval"];
}

export default function MarketPriceHeader({
  price,
  priceEval,
}: Readonly<Props>) {
  const { t } = useTranslation(["market", "home"]);
  const { label, marketAvgDeltaPct } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  const LABEL_TEXT: Record<TransformedReport["priceEval"]["label"], string> = {
    BARGAIN: t("home:priceEval.greatDeal"),
    LOW: t("home:priceEval.belowMarket"),
    FAIR: t("home:priceEval.fairPrice"),
    HIGH: t("home:priceEval.aboveMarket"),
    OVERPRICED: t("home:priceEval.overpriced"),
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <div className="mb-1 text-4xl font-semibold">
          {formatCurrency(price)}
        </div>
        <div className={`text-xs font-medium ${DELTA_COLOR[label]}`}>
          {isAbove ? "▲" : "▼"}
          {Math.abs(marketAvgDeltaPct).toFixed(1)}%{" "}
          {isAbove ? t("home:priceEval.above") : t("home:priceEval.below")}{" "}
          {t("home:priceEval.average")} · {LABEL_TEXT[label]}
        </div>
      </CardContent>
    </Card>
  );
}
