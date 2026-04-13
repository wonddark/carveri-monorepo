import { useTranslation } from "react-i18next";
import ComparablesList from "@carveri/shared/components/market/ComparablesList";
import BookValues from "@carveri/shared/components/home/BookValues";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { marketSubtabs } from "@carveri/shared/data/subtabs.tsx";
import { Activity, useEffect, useRef, useState } from "react";
import TabPills from "@/components/TabPills.tsx";
import PriceDynamicsSubtab from "@carveri/shared/components/market/PriceDynamicsSubtab.tsx";
import MarketPriceHeader from "@carveri/shared/components/market/MarketPriceHeader.tsx";

interface Props {
  report: TransformedReport;
}

export default function MarketTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("market");
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function selectPill(idx: number) {
    setActiveIdx(idx);
    const track = trackRef.current;
    if (!track) return;
    const pill = track.children[idx] as HTMLElement;
    const trackCenter = track.clientWidth / 2;
    const pillCenter = pill.offsetLeft + pill.clientWidth / 2;
    track.scrollTo({ left: pillCenter - trackCenter, behavior: "smooth" });
  }

  const booksMeanValue =
    report.priceEval.bookValues.reduce((acc, curr) => acc + curr.value, 0) / 4;
  const minimum = booksMeanValue - (booksMeanValue * 15) / 100;
  const maximum = booksMeanValue + (booksMeanValue * 15) / 100;

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

      <div className="pt-16">
        <TabPills
          activeIdx={activeIdx}
          selectPill={selectPill}
          trackRef={trackRef}
          tabs={marketSubtabs(t)}
        />

        {/* Analysis */}
        <Activity mode={activeIdx === 0 ? "visible" : "hidden"}>
          <div className="flex flex-col gap-3 px-4">
            {/* Heading */}
            <div>
              <SubTabHeader
                title={t("header.marketAnalysis")}
                subtitle={t("header.pricingEvaluation", {
                  city: report.location,
                })}
              />
            </div>

            {/* Price + gauge + book values */}
            <MarketPriceHeader
              price={report.price}
              avgBookValue={20000}
              deltaAvgValue={200}
              deltaAvgPercent={2}
            />

            <ReportGauge
              price={report.price}
              label={report.priceEval.label}
              averageDeltaPct={report.priceEval.marketAvgDeltaPct}
              minimum={minimum}
              maximum={maximum}
            />

            <Card>
              <CardContent>
                <h3 className="mb-3 text-sm font-bold">
                  {t("tabs.bookValuations")}
                </h3>
                <BookValues bookValues={report.priceEval.bookValues} />
              </CardContent>
            </Card>
          </div>
        </Activity>

        {/* Price dynamics */}
        <Activity mode={activeIdx === 1 ? "visible" : "hidden"}>
          <div className="flex flex-col gap-3 px-4">
            <PriceDynamicsSubtab priceDynamics={report.priceDynamics} />
          </div>
        </Activity>

        {/* Comparables */}
        <Activity mode={activeIdx === 2 ? "visible" : "hidden"}>
          <div className="flex flex-col gap-3 px-4">
            <ComparablesList
              comparables={report.comparables}
              subjectPrice={report.price}
              location={report.location ?? ""}
            />
          </div>
        </Activity>
      </div>
    </div>
  );
}
