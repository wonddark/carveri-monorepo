import { useTranslation } from "react-i18next";
import type { ComparableVehicle } from "@carveri/shared/data/report";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";

interface Props {
  vehicle: ComparableVehicle;
}

export default function ComparableCard({ vehicle }: Readonly<Props>) {
  const { t } = useTranslation("market");
  const BADGE_CONFIG = {
    CHEAPER: {
      label: t("comparables.cheaper"),
      classes: "bg-emerald-100 text-emerald-700",
    },
    SIMILAR: {
      label: t("comparables.similar"),
      classes: "bg-amber-100 text-amber-700",
    },
    PRICIER: {
      label: t("comparables.pricier"),
      classes: "bg-red-100 text-red-700",
    },
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
    <div className="flex flex-wrap gap-2 py-3">
      <p className="w-full font-semibold">
        {generateReportTitle({ year, make, model, trim })}
      </p>
      <img
        src={image}
        alt={generateReportTitle({ year, make, model, trim })}
        className="size-16 shrink-0 rounded-lg object-cover"
      />
      <div className="flex min-w-0 flex-auto flex-col items-start gap-1">
        <span className="text-sm font-medium">${price.toLocaleString()}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.classes}`}
        >
          {badge.label}
        </span>
        <p className="text-muted-foreground text-xs">
          {mileage.toLocaleString()} mi · {distanceMi} mi · {dealer}
        </p>
      </div>
    </div>
  );
}
