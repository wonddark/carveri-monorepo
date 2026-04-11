import { DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookValues from "./BookValues";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";

interface Props {
  price: number;
  priceEval: TransformedReport["priceEval"];
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
    <Card>
      <CardContent>
        <div className="mb-3 flex items-center gap-2">
          <DollarSign size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">{t("priceEval.title")}</h3>
        </div>

        <div className="mb-1 text-center">
          <div className="text-3xl font-medium">${price.toLocaleString()}</div>
          <div className="text-primary mt-0.5 text-xs font-medium">
            {LABEL_TEXT[label]} — {isAbove ? "▲" : "▼"}
            {Math.abs(marketAvgDeltaPct)}%{" "}
            {isAbove ? t("priceEval.above") : t("priceEval.below")}{" "}
            {t("priceEval.average")}
          </div>
        </div>

        <ReportGauge
          price={price}
          label={label}
          retail={min}
          percentile={percentile}
          wholesale={max}
          averageDeltaPct={marketAvgDeltaPct}
        />
        <BookValues bookValues={bookValues} />
      </CardContent>
    </Card>
  );
}
