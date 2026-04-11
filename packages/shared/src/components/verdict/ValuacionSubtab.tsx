import { useTranslation } from "react-i18next";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedEvaluation } from "@carveri/shared/lib/transforms.ts";

const SOURCE_COLORS: Record<string, string> = {
  kbb: "bg-blue-500",
  marketcheck: "bg-violet-500",
  carfax: "bg-emerald-500",
  mmr: "bg-amber-500",
  blackbook: "bg-slate-500",
  jdpower: "bg-rose-500",
};

const SOURCE_LABELS: Record<string, string> = {
  kbb: "KBB",
  marketcheck: "MarketCheck",
  carfax: "Carfax",
  mmr: "MMR",
  blackbook: "Black Book",
  jdpower: "J.D. Power",
};

const ZONE_ORDER = [
  "GranOportunidad",
  "BuenPrecio",
  "PrecioJusto",
  "PrecioAlto",
  "Sobrepago",
] as const;

const ZONE_COLORS = [
  "bg-green-500",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-orange-500",
  "bg-red-600",
];

interface Props {
  evaluation: TransformedEvaluation;
}

export default function ValuacionSubtab({ evaluation }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const {
    fairPrice,
    dealerPrice,
    auctionPrice,
    dealerMargin,
    diffVsFair,
    gauge,
    sourceContributions,
    adjustments,
  } = evaluation;

  const hasFairPrice = fairPrice > 0;

  // Calculate gauge marker position as % across the 5 zones
  const markerPct = (() => {
    if (!hasFairPrice) return 50;
    const zoneIdx = ZONE_ORDER.indexOf(
      gauge.currentZone as (typeof ZONE_ORDER)[number],
    );
    if (zoneIdx === -1) return 50;
    // center of zone
    return ((zoneIdx + 0.5) / ZONE_ORDER.length) * 100;
  })();

  const availableSources = sourceContributions.filter((s) => s.wasAvailable);
  const totalContribution = availableSources.reduce(
    (acc, s) => acc + s.contribution,
    0,
  );

  return (
    <>
      <SubTabHeader title={t("valuation.heading")} subtitle="" />

      {/* Fair price hero */}
      <Card className="mb-4">
        <CardContent className="py-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            {t("valuation.fairPrice")}
          </p>
          <p className="mt-1 text-3xl font-bold">
            {hasFairPrice ? formatCurrency(Math.round(fairPrice)) : "—"}
          </p>
          {hasFairPrice && (
            <p
              className={cn("mt-1 text-sm font-semibold", {
                "text-green-600 dark:text-green-400": diffVsFair < 0,
                "text-red-600 dark:text-red-400": diffVsFair > 0,
              })}
            >
              {diffVsFair >= 0 ? "+" : ""}{formatCurrency(Math.abs(Math.round(diffVsFair)))}{" "}
              {t(`valuation.zones.${gauge.currentZone}`, {
                defaultValue: gauge.currentZone,
              })}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Horizontal gauge */}
      {hasFairPrice && (
        <div className="mb-4 rounded-xl border border-border bg-card p-4">
          <div className="relative">
            {/* Zone segments */}
            <div className="flex h-4 overflow-hidden rounded-full">
              {ZONE_COLORS.map((color, i) => (
                <div key={i} className={cn("flex-1", color)} />
              ))}
            </div>

            {/* Zone labels */}
            <div className="mt-1.5 flex justify-between text-[9px] text-muted-foreground">
              {ZONE_ORDER.map((zone) => (
                <span key={zone} className="text-center" style={{ width: "20%" }}>
                  {t(`valuation.zones.${zone}`, { defaultValue: zone })}
                </span>
              ))}
            </div>

            {/* Marker */}
            <div
              className="absolute -top-1 -translate-x-1/2"
              style={{ left: `${markerPct}%` }}
            >
              <div className="h-6 w-0.5 bg-foreground rounded" />
              <div className="-ml-1.5 size-3 rounded-full border-2 border-foreground bg-background" />
            </div>
          </div>
        </div>
      )}

      {/* 4-column stats row */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: t("valuation.dealerPrice"), value: dealerPrice > 0 ? formatCurrency(dealerPrice) : "—" },
          { label: t("valuation.auctionPrice"), value: auctionPrice > 0 ? formatCurrency(auctionPrice) : "—" },
          {
            label: t("valuation.dealerMargin"),
            value: dealerMargin !== 0 ? formatCurrency(Math.abs(dealerMargin)) : "—",
          },
          {
            label: t("valuation.diffVsFair"),
            value: hasFairPrice
              ? `${diffVsFair >= 0 ? "+" : ""}${formatCurrency(Math.abs(Math.round(diffVsFair)))}`
              : "—",
            color:
              hasFairPrice
                ? diffVsFair < 0
                  ? "text-green-600 dark:text-green-400"
                  : diffVsFair > 0
                    ? "text-red-600 dark:text-red-400"
                    : ""
                : "",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col items-center gap-1 py-3 text-center">
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
              <span className={cn("text-base font-bold", item.color)}>
                {item.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Source contributions bar */}
      {availableSources.length > 0 && (
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="mb-3 text-sm font-semibold">
              {t("valuation.sourceContributions")}
            </h3>

            {/* Stacked bar */}
            <div className="mb-3 flex h-3 overflow-hidden rounded-full">
              {availableSources.map((src) => {
                const pct =
                  totalContribution > 0
                    ? (src.contribution / totalContribution) * 100
                    : 0;
                const color =
                  SOURCE_COLORS[src.sourceKey] ?? "bg-slate-400";
                return (
                  <div
                    key={src.sourceKey}
                    className={color}
                    style={{ width: `${pct}%` }}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {availableSources.map((src) => {
                const pct =
                  totalContribution > 0
                    ? Math.round((src.contribution / totalContribution) * 100)
                    : 0;
                const color =
                  SOURCE_COLORS[src.sourceKey] ?? "bg-slate-400";
                return (
                  <div key={src.sourceKey} className="flex items-center gap-1.5">
                    <span className={cn("size-2.5 rounded-full", color)} />
                    <span className="text-xs text-muted-foreground">
                      {SOURCE_LABELS[src.sourceKey] ?? src.sourceKey}
                    </span>
                    <span className="text-xs font-semibold">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price adjustments */}
      {adjustments.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <h3 className="mb-3 text-sm font-semibold">
              {t("valuation.priceAdjustments")}
            </h3>
            <div className="flex flex-col divide-y divide-border">
              {adjustments.map((adj) => {
                const isPositive = adj.appliedAmount > 0;
                return (
                  <div
                    key={adj.factorKey}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isPositive ? (
                        <TrendingUp size={13} className="shrink-0 text-green-500" />
                      ) : (
                        <TrendingDown size={13} className="shrink-0 text-red-500" />
                      )}
                      <div>
                        <p className="text-xs font-medium">{adj.label}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {adj.source}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn("text-sm font-bold", {
                        "text-green-600 dark:text-green-400": isPositive,
                        "text-red-600 dark:text-red-400": !isPositive,
                      })}
                    >
                      {isPositive ? "+" : ""}{formatCurrency(Math.abs(Math.round(adj.appliedAmount)))}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
