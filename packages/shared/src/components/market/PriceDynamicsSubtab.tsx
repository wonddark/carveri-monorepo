import {
  IconClock,
  IconSearch,
  IconTag,
  IconTrendingDown,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { Input } from "@carveri/shared/components/ui/input.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import type { PriceDynamics } from "@carveri/shared/lib/transforms.ts";
import type { ReactNode } from "react";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@carveri/shared/components/ui/chart.tsx";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

interface Props {
  priceDynamics: PriceDynamics;
}

type StatCardProps = {
  value: string;
  label: string;
  icon: ReactNode;
};

function StatCard(props: Readonly<StatCardProps>) {
  const { value, label, icon } = props;
  return (
    <Card>
      <CardContent className="text-muted-foreground flex flex-col items-center gap-2">
        {icon}
        <span className="text-foreground text-xl font-bold">{value}</span>
        <span className="text-xs">{label}</span>
      </CardContent>
    </Card>
  );
}

export default function PriceDynamicsSubtab({
  priceDynamics,
}: Readonly<Props>) {
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

  const chartConfig: ChartConfig = {
    price: { label: t("priceDynamics.currentPrice"), color: "#ef4444" },
    gradientStart: { color: "#f6a0a0" },
    gradientEnd: { color: "#f6bebe" },
  };

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

      <SubTabHeader
        title={t("priceDynamics.chartTitle")}
        subtitle={t("priceDynamics.chartSubtitle")}
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={<IconClock className="size-5" />}
          value={String(daysListed)}
          label={t("priceDynamics.daysListed")}
        />
        <StatCard
          icon={<IconTrendingDown className="size-5" />}
          value={String(priceDropsCount)}
          label={t("priceDynamics.priceDrops")}
        />
        <StatCard
          icon={<IconTag className="size-5" />}
          value={`$${currentPrice.toLocaleString()}`}
          label={t("priceDynamics.currentPrice")}
        />
      </div>

      {/* Chart section */}
      <div className="flex flex-col gap-3">
        <Card>
          <CardContent className="px-2 pt-4 pb-2">
            <ChartContainer
              config={chartConfig}
              className="h-48 w-full lg:h-80"
            >
              <AreaChart data={history} margin={{ left: 8, right: 8, top: 4 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-gradientStart)"
                      stopOpacity={0.85}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-gradientEnd)"
                      stopOpacity={0.15}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-muted-foreground)",
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-muted-foreground)",
                  }}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  domain={["auto", "auto"]}
                  width={36}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        `$${Number(value).toLocaleString()}`
                      }
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  fill="url(#colorPrice)"
                  isAnimationActive="auto"
                />
                <Line
                  type="natural"
                  dataKey="price"
                  stroke="var(--color-price)"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    stroke: "var(--color-price)",
                    strokeWidth: 3,
                    fill: "var(--color-background)",
                  }}
                  activeDot={{
                    r: 6,
                    stroke: "var(--color-price)",
                    strokeWidth: 3,
                    fill: "var(--color-background)",
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Summary bar */}
        <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 dark:bg-red-900/20">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {t("priceDynamics.totalDiscount")}
            </span>
            <span className="font-bold text-red-700 dark:text-red-300">
              ${totalDrop.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {t("priceDynamics.drops", { count: priceDropsCount })}
            </span>
            <span className="rounded-full bg-red-100 px-2 py-0.5 font-bold text-red-600 dark:bg-red-800/40 dark:text-red-300">
              {totalDropPct}%
            </span>
          </div>
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
