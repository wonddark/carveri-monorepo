import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  price: number;
  carveriPrice: number;
}

export default function MarketPriceHeader(props: Readonly<Props>) {
  const { t } = useTranslation(["market", "home"]);
  const { price, carveriPrice } = props;
  const deltaValue = price - carveriPrice;
  const deltaPct = (deltaValue / carveriPrice) * 100;

  function getSymbol() {
    return deltaValue > 0 ? "+" : "-";
  }

  function getAverageStyles() {
    if (deltaPct > 0) {
      return "text-orange-600 dark:text-orange-300";
    }
    return "text-green-600 dark:text-green-300";
  }

  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-0.5">
          <small className="text-muted-foreground text-xs">
            {t("market.askingPrice")}
          </small>
          <strong className="text-xl font-semibold">
            {formatCurrency(price)}
          </strong>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <small className="text-muted-foreground text-xs">
            {t("market.carveriPrice")}
          </small>
          <strong className="text-xl font-semibold">
            {formatCurrency(carveriPrice)}
          </strong>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <small className="text-muted-foreground text-xs">
            {t("market.overAvg")}
          </small>
          <strong className={cn("text-xl font-semibold", getAverageStyles())}>
            {`${getSymbol()}${formatCurrency(deltaValue)}`}
          </strong>
          <small className={cn("text-xs", getAverageStyles())}>
            {`${getSymbol()}${deltaPct.toFixed(2)}%`}
          </small>
        </div>
      </CardContent>
    </Card>
  );
}
