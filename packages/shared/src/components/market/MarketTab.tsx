import { BarChart2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarketPriceHeader from "./MarketPriceHeader";
import ComparablesList from "./ComparablesList";
import BookValues from "@carveri/shared/components/home/BookValues";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { getPercentile } from "@carveri/shared/lib/utils.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@carveri/shared/components/ui/tabs.tsx";
import {
  IconCar,
  IconChartHistogram,
  IconTrendingDown,
} from "@tabler/icons-react";

interface Props {
  report: TransformedReport;
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

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="w-full">
          {[
            {
              id: "analysis",
              label: t("tabs.analysis"),
              icon: <IconChartHistogram />,
            },
            {
              id: "price-dynamics",
              label: t("tabs.price_dynamics"),
              icon: <IconTrendingDown />,
            },
            {
              id: "comparables",
              label: t("tabs.comparables"),
              icon: <IconCar />,
            },
          ].map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="py-3!">
              {item.icon}
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Analysis */}
        <TabsContent value="analysis">
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
        </TabsContent>

        {/* Price dynamics */}
        <TabsContent value="price-dynamics"></TabsContent>

        {/* Comparables */}
        <TabsContent value="comparables">
          <ComparablesList
            comparables={report.market.comparables}
            location={report.location}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
