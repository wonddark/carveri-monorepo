import { BarChart2, ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarketPriceHeader from "./MarketPriceHeader";
import ComparablesList from "./ComparablesList";
import GaugePlaceholder from "@carveri/shared/components/home/GaugePlaceholder";
import BookValues from "@carveri/shared/components/home/BookValues";
import type { VehicleReport } from "@carveri/shared/data/report";

interface Props {
  report: VehicleReport;
}

export default function MarketTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("market");
  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="-mb-1 flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>{t("tabs.market")}</span>
      </div>

      {/* Heading */}
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-indigo-100 p-1.5">
          <BarChart2 size={14} className="text-indigo-600" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {t("tabs.market")}
        </span>
      </div>
      <h2 className="-mt-1 text-xl font-black text-slate-900">
        {t("header.marketAnalysis")}
      </h2>
      <p className="-mt-2 text-xs text-slate-400">
        {t("header.pricingEvaluation", { city: report.location })}
      </p>

      {/* Price + gauge + book values */}
      <MarketPriceHeader price={report.price} priceEval={report.priceEval} />
      <GaugePlaceholder />

      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          {t("tabs.bookValuations")}
        </h3>
        <BookValues bookValues={report.priceEval.bookValues} />
      </div>

      {/* Comparables */}
      <ComparablesList
        comparables={report.market.comparables}
        location={report.location}
      />
    </div>
  );
}
