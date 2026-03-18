import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { VehicleReport } from "@/data/report";

interface Props {
  price: number;
  costs: VehicleReport["negotiate"]["costs"];
}

export default function CostsSubtab({ price, costs }: Readonly<Props>) {
  const { t } = useTranslation('negotiate');
  const salesTax = Math.round((price * costs.taxRatePct) / 100);
  const total = price + salesTax + costs.tagAndTitle + costs.dealerFee;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>Negotiate</span>
        <ChevronRight size={10} />
        <span>Costs</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">
        {t('costs.heading')}
      </h2>
      <p className="-mt-2 text-xs text-slate-400">
        {t('costs.breakdown', { state: costs.state })}
      </p>

      {/* Purchase breakdown card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <div className="flex items-center justify-between border-b border-slate-100 py-2">
          <span className="text-sm text-slate-600">{t('costs.vehiclePrice')}</span>
          <span className="text-sm font-semibold text-slate-900">
            ${price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 py-2">
          <span className="text-sm text-slate-600">
            {t('costs.salesTax')} ({costs.taxRatePct}%)
          </span>
          <span className="text-sm font-semibold text-slate-900">
            ${salesTax.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 py-2">
          <span className="text-sm text-slate-600">{t('costs.tagTitle')}</span>
          <span className="text-sm font-semibold text-slate-900">
            ${costs.tagAndTitle.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 py-2">
          <span className="text-sm text-slate-600">{t('costs.dealerFee')}</span>
          <span className="text-sm font-semibold text-slate-900">
            ${costs.dealerFee.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-slate-200 pt-3">
          <span className="text-sm font-bold text-slate-900">
            {t('costs.totalEstimated')}
          </span>
          <span className="text-sm font-black text-indigo-600">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Monthly estimates card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          {t('costs.monthlyHeading')}
        </h3>
        {costs.monthlyEstimates.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-1.5"
          >
            <span className="text-sm text-slate-600">{item.label}</span>
            <span className="text-sm font-semibold text-slate-900">
              ${item.low} – ${item.high}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
