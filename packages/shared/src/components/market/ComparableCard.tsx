import { useTranslation } from "react-i18next";
import { ExternalLink, ShieldCheck, ShieldHalf } from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import type { TransformedComparable } from "@carveri/shared/lib/transforms.ts";

interface Props {
  vehicle: TransformedComparable;
  subjectPrice: number;
}

export default function ComparableCard({
  vehicle,
  subjectPrice: _,
}: Readonly<Props>) {
  const { t } = useTranslation("market");

  const PRICE_TAG_CONFIG = {
    CHEAPER: {
      label: t("comparables.cheaper"),
      classes:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    SIMILAR: {
      label: t("comparables.similar"),
      classes:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    },
    PRICIER: {
      label: t("comparables.pricier"),
      classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const badge = PRICE_TAG_CONFIG[vehicle.priceTag];
  const isVerified = vehicle.trustTier === "verificado";
  const diffSign = vehicle.priceDiff >= 0 ? "+" : "";
  const diffColor =
    vehicle.priceTag === "CHEAPER"
      ? "text-green-600 dark:text-green-400"
      : vehicle.priceTag === "PRICIER"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground";

  return (
    <a
      href={vehicle.vdpUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border bg-card hover:border-primary/30 hover:bg-primary/5 flex gap-3 rounded-xl border p-3 shadow-sm transition-colors"
    >
      {/* Photo */}
      <div className="shrink-0">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="size-18 rounded-lg object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Crect width='72' height='72' fill='%23e2e8f0'/%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-1">
          <p className="truncate text-sm leading-snug font-semibold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          <ExternalLink
            size={12}
            className="text-muted-foreground/50 mt-0.5 shrink-0"
          />
        </div>

        {vehicle.trim && (
          <p className="text-muted-foreground text-[10px]">{vehicle.trim}</p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold">
            {formatCurrency(vehicle.price)}
          </span>
          {vehicle.priceDiff !== 0 && (
            <span
              className={cn("text-xs font-semibold tabular-nums", diffColor)}
            >
              {diffSign}
              {formatCurrency(Math.abs(vehicle.priceDiff))}
            </span>
          )}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] leading-tight font-semibold",
              badge.classes,
            )}
          >
            {badge.label}
          </span>

          {/* Trust badge */}
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] leading-tight font-semibold",
              isVerified
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            )}
          >
            {isVerified ? <ShieldCheck size={10} /> : <ShieldHalf size={10} />}
            {t(isVerified ? "comparables.verified" : "comparables.secondary", {
              defaultValue: isVerified ? "Verificado" : "Secundario",
            })}
          </span>
        </div>

        {/* Mileage + distance + dealer */}
        <p className="text-muted-foreground truncate text-[10px]">
          {vehicle.mileage?.toLocaleString()} mi ·{" "}
          {vehicle.distanceMi?.toFixed(1)} mi · {vehicle.dealerName}
        </p>
      </div>
    </a>
  );
}
