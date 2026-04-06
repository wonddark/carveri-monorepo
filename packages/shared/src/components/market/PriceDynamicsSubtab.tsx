import { IconChartLine, IconSearch, IconTrendingDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import type { PriceDynamics } from "@carveri/shared/lib/transforms.ts";

interface Props {
  priceDynamics: PriceDynamics;
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
      <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}

export default function PriceDynamicsSubtab({ priceDynamics }: Readonly<Props>) {
  const { t } = useTranslation("market");
  const {
    daysListed,
    priceDropsCount,
    currentPrice,
    history,
    totalDrop,
    totalDropPct,
    saleCycles,
  } = priceDynamics;

  const startPrice = history[0]?.price ?? currentPrice;
  const endPrice = history[history.length - 1]?.price ?? currentPrice;

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Search VIN */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <IconSearch size={13} />
          {t("priceDynamics.searchLabel")}
        </label>
        <div className="flex gap-2">
          <Input
            placeholder={t("priceDynamics.searchPlaceholder")}
            className="font-mono text-sm"
          />
          <Button variant="outline" size="sm" className="shrink-0">
            {t("priceDynamics.scan")}
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          value={String(daysListed)}
          label={t("priceDynamics.daysListed")}
        />
        <StatCard
          value={String(priceDropsCount)}
          label={t("priceDynamics.priceDrops")}
        />
        <StatCard
          value={`$${currentPrice.toLocaleString()}`}
          label={t("priceDynamics.currentPrice")}
        />
      </div>

      {/* Chart section */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("priceDynamics.chartTitle")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("priceDynamics.chartSubtitle")}
          </p>
        </div>

        {/* Chart placeholder — replace with recharts LineChart once recharts is installed */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-slate-400">
            <IconChartLine size={32} className="opacity-30" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-medium">
                {t("priceDynamics.chartPlaceholder")}
              </span>
              <span className="text-[11px] text-slate-400">
                {`$${startPrice.toLocaleString()} → $${endPrice.toLocaleString()}`}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Summary bar */}
        <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 dark:bg-red-900/20">
          <div className="flex items-center gap-1.5">
            <IconTrendingDown size={14} className="text-red-500" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              {t("priceDynamics.priceDropped")}
            </span>
            <span className="text-xs font-bold text-red-700 dark:text-red-300">
              ${totalDrop.toLocaleString()}
            </span>
          </div>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 dark:bg-red-800/40 dark:text-red-300">
            {totalDropPct}%
          </span>
        </div>
      </div>

      {/* Sale Cycles */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t("priceDynamics.saleCycles", { count: saleCycles.length })}
        </h3>
        <div className="flex flex-col gap-2">
          {saleCycles.map((cycle) => (
            <Card key={cycle.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {cycle.startDate} – {cycle.endDate}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t("priceDynamics.drops", { count: cycle.drops })}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    ${cycle.endPrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-red-500">
                    –${(cycle.startPrice - cycle.endPrice).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
