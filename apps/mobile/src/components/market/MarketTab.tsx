import { useTranslation } from "react-i18next";
import MarketPriceHeader from "@carveri/shared/components/market/MarketPriceHeader";
import ComparablesList from "@carveri/shared/components/market/ComparablesList";
import BookValues from "@carveri/shared/components/home/BookValues";
import type { VehicleReport } from "@carveri/shared/data/report";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { getPercentile } from "@carveri/shared/lib/utils.ts";

interface Props {
  report: VehicleReport;
}

export default function MarketTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("market");

  const min = 12000;
  const max = 33000;
  const percentile = getPercentile({ min, max, value: report.price });

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <AppHeader
        showAppName={true}
        title={generateReportTitle({
          year: report.year,
          make: report.make,
          model: report.model,
        })}
        isTransparent={false}
      />

      <div className="flex flex-col gap-3 px-4 pt-16">
        {/* Heading */}
        <div>
          <SubTabHeader
            title={t("header.marketAnalysis")}
            subtitle={t("header.pricingEvaluation", { city: report.location })}
          />
        </div>

        {/* Price + gauge + book values */}
        <MarketPriceHeader price={report.price} priceEval={report.priceEval} />

        {/* TODO: Revaluate this content */}
        <Card>
          <CardContent className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-0.5">
              <small className="text-muted-foreground text-xs">
                Asking price
              </small>
              <strong className="text-xl font-semibold">$21500</strong>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <small className="text-muted-foreground text-xs">
                Average book value
              </small>
              <strong className="text-xl font-semibold">$21228</strong>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <small className="text-muted-foreground text-xs">
                Over average
              </small>
              <strong className="text-xl font-semibold text-orange-600 dark:text-orange-300">
                +$276
              </strong>
              <small className="text-xs text-orange-600 dark:text-orange-300">
                +1.3%
              </small>
            </div>
          </CardContent>
        </Card>
        {/* TODO: Revaluate this content */}

        <ReportGauge
          price={report.price}
          label={report.priceEval.label}
          wholesale={min}
          retail={max}
          percentile={percentile}
        />

        <Card>
          <CardContent>
            <h3 className="mb-3 text-sm font-bold">
              {t("tabs.bookValuations")}
            </h3>
            <BookValues bookValues={report.priceEval.bookValues} />
          </CardContent>
        </Card>

        {/* Comparables */}
        <ComparablesList
          comparables={report.market.comparables}
          location={report.location}
        />
      </div>
    </div>
  );
}
