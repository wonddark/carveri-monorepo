import { DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookValues from "./BookValues";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

interface Props {
  price: number;
  priceEval: TransformedReport["priceEval"];
  gauge: TransformedReport["evaluation"]["gauge"];
}

export default function PriceEvalSection(props: Readonly<Props>) {
  const { t } = useTranslation("home");
  const { price, priceEval, gauge } = props;

  const LABEL_TEXT: Record<string, string> = {
    BARGAIN: t("priceEval.greatDeal"),
    LOW: t("priceEval.belowMarket"),
    FAIR: t("priceEval.fairPrice"),
    HIGH: t("priceEval.aboveMarket"),
    OVERPRICED: t("priceEval.overpriced"),
  };

  const { label, marketAvgDeltaPct, bookValues } = priceEval;
  const isAbove = marketAvgDeltaPct > 0;

  return (
    <Card>
      <CardContent>
        <div className="mb-3 flex items-center gap-2">
          <DollarSign size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">{t("priceEval.title")}</h3>
        </div>

        <div className="mb-1 text-center">
          <div className="text-3xl font-medium">{formatCurrency(price)}</div>
          <div className="text-primary mt-0.5 text-xs font-medium">
            {LABEL_TEXT[label]} — {isAbove ? "▲" : "▼"}
            {Math.abs(marketAvgDeltaPct)}%{" "}
            {isAbove ? t("priceEval.above") : t("priceEval.below")}{" "}
            {t("priceEval.average")}
          </div>
        </div>

        <ReportGauge price={price} gauge={gauge} />
        <BookValues bookValues={bookValues} />
      </CardContent>
    </Card>
  );
}
