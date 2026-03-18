import { useTranslation } from "react-i18next";
import type { ComparableVehicle } from "@/data/report";

interface Props {
  vehicle: ComparableVehicle;
}

export default function ComparableCard({ vehicle }: Readonly<Props>) {
  const { t } = useTranslation('market');
  const BADGE_CONFIG = {
    CHEAPER: { label: t('comparables.cheaper'), classes: "bg-emerald-100 text-emerald-700" },
    SIMILAR: { label: t('comparables.similar'), classes: "bg-amber-100 text-amber-700" },
    PRICIER: { label: t('comparables.pricier'), classes: "bg-red-100 text-red-700" },
  };

  const {
    year,
    make,
    model,
    trim,
    price,
    mileage,
    distanceMi,
    dealer,
    image,
    priceTag,
  } = vehicle;
  const badge = BADGE_CONFIG[priceTag];

  return (
    <div className="flex gap-3 border-b border-slate-100 py-3 last:border-0">
      <img
        src={image}
        alt={`${year} ${make} ${model}`}
        className="h-20 w-20 flex-shrink-0 rounded-xl bg-slate-100 object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <p className="text-xs leading-snug font-semibold text-slate-800">
            {year} {make} {model} {trim}
          </p>
          <span
            className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${badge.classes}`}
          >
            {badge.label}
          </span>
        </div>
        <p className="mb-0.5 text-sm font-black text-slate-900">
          ${price.toLocaleString()}
        </p>
        <p className="text-[10px] text-slate-400">
          {mileage.toLocaleString()} mi · {distanceMi} mi · {dealer}
        </p>
      </div>
    </div>
  );
}
