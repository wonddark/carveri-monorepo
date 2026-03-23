import { BarChart2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarketPriceHeader from "./MarketPriceHeader";
import ComparablesList from "./ComparablesList";
import BookValues from "@carveri/shared/components/home/BookValues";
import type { VehicleReport } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { getPercentile } from "@carveri/shared/lib/utils.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

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
      {/* Heading */}
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-indigo-100 p-1.5 dark:bg-indigo-100/20">
          <BarChart2 size={14} className="text-indigo-600" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {t("tabs.market")}
        </span>
      </div>
      <SubTabHeader
        title={t("header.marketAnalysis")}
        subtitle={t("header.pricingEvaluation", { city: report.location })}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(600px,1fr))] gap-5">
        <div className="flex flex-col gap-5">
          {/* Price + gauge + book values */}
          <MarketPriceHeader
            price={report.price}
            priceEval={report.priceEval}
          />

          <Card>
            <CardContent className="grid grid-cols-2 items-center gap-5">
              <ReportGauge
                retail={max}
                percentile={percentile}
                wholesale={max}
                label={report.priceEval.label}
                price={report.price}
              />
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">
                  {t("tabs.bookValuations")}
                </h3>
                <BookValues bookValues={report.priceEval.bookValues} />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Comparables */}
        <ComparablesList
          comparables={report.market.comparables}
          location={report.location}
        />
      </div>
    </div>
  );
}
