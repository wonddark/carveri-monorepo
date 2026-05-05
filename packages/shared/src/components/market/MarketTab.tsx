import { BarChart2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarketPriceHeader from "./MarketPriceHeader";
import ComparablesList from "./ComparablesList";
import PriceDynamicsSubtab from "./PriceDynamicsSubtab";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@carveri/shared/components/ui/tabs.tsx";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { marketSubtabs } from "@carveri/shared/data/subtabs.tsx";

interface Props {
  report: TransformedReport;
}

export default function MarketTab({ report }: Readonly<Props>) {
  const { pathname } = useLocation();
  const { t } = useTranslation("market");
  const [currentTab, setCurrentTab] = useState<string>("analysis");

  const isAnalysis = pathname.includes("/analysis");
  const isPriceDynamics = pathname.includes("/price-dynamics");
  const isComparables = pathname.includes("/comparables");
  const getCurrentTab = () => {
    if (isAnalysis) return "analysis";
    if (isPriceDynamics) return "price-dynamics";
    if (isComparables) return "comparables";
    return "analysis";
  };

  useEffect(() => {
    setCurrentTab(getCurrentTab());
  }, [pathname]);

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

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="w-full">
          {marketSubtabs(t).map((item) => (
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
              carveriPrice={report.evaluation.fairPrice}
            />

            <Card>
              <CardContent className="grid grid-cols-2 items-center gap-5">
                <ReportGauge
                  price={report.price}
                  gauge={report.evaluation.gauge}
                />
                <div>
                  <h3 className="mb-3 text-sm font-bold text-slate-900">
                    {t("tabs.bookValuations")}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Price dynamics */}
        <TabsContent value="price-dynamics">
          <PriceDynamicsSubtab priceDynamics={report.priceDynamics} />
        </TabsContent>

        {/* Comparables */}
        <TabsContent value="comparables">
          <ComparablesList
            comparables={report.comparables}
            subjectPrice={report.price}
            location={report.location ?? ""}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
