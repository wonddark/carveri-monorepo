import {
  IconArrowDown,
  IconClock,
  IconTag,
  IconTrendingDown,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { PriceDynamics } from "@carveri/shared/lib/transforms.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import type { ReactNode } from "react";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@carveri/shared/components/ui/chart.tsx";
import {
  Area,
  AreaChart,
  CartesianGrid,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  priceDynamics: PriceDynamics;
}

function PriceTooltip({
  active,
  payload,
  initialPrice,
}: Readonly<TooltipContentProps<number, string> & { initialPrice: number }>) {
  const { t } = useTranslation("market");
  if (!active || !payload?.length) return null;
  const { date, price } = payload[0].payload as { date: string; price: number };
  const isInitial = price === initialPrice;
  const drop = initialPrice - price;
  const dropPct = Math.round((drop / initialPrice) * 100);

  return (
    <div className="border-border/50 bg-background grid min-w-36 gap-1 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
      <span className="font-mono font-medium tabular-nums">
        {formatCurrency(price)}
      </span>
      <span className="text-muted-foreground font-medium">{date}</span>
      <span
        className={
          isInitial
            ? "text-muted-foreground"
            : "inline-flex items-center gap-0.5 font-mono font-medium text-green-500 tabular-nums"
        }
      >
        {isInitial ? (
          t("priceDynamics.initialPrice")
        ) : (
          <>
            <IconArrowDown className="size-3" />
            {`${formatCurrency(drop)} (${dropPct}%)`}
          </>
        )}
      </span>
    </div>
  );
}

type StatCardProps = {
  value: string;
  label: string;
  icon: ReactNode;
};

function StatCard(props: Readonly<StatCardProps>) {
  const { value, label, icon } = props;
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-2">
      {icon}
      <span className="text-foreground text-xl font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
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
  } = priceDynamics;

  const chartConfig: ChartConfig = {
    price: { label: t("priceDynamics.currentPrice"), color: "#ef4444" },
    gradientStart: { color: "#f6a0a0" },
    gradientEnd: { color: "#f6bebe" },
  };

  return (
    <div className="flex flex-col gap-5 pt-4">
      <Card>
        <CardContent>
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
              value={formatCurrency(currentPrice)}
              label={t("priceDynamics.currentPrice")}
            />
          </div>

          {/* Chart section */}
          <div className="my-5 flex flex-col gap-3 lg:my-10">
            <ChartContainer
              config={chartConfig}
              className="h-56 px-2 lg:h-90 lg:px-12"
            >
              <AreaChart data={history}>
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
                    // @ts-ignore
                    <PriceTooltip initialPrice={history[0]?.price ?? 0} />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  fill="url(#colorPrice)"
                  isAnimationActive="auto"
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

            {/* Summary bar */}
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 dark:bg-red-900/20">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {t("priceDynamics.totalDiscount")}
                </span>
                <span className="font-bold text-red-700 dark:text-red-300">
                  {formatCurrency(totalDrop)}
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
        </CardContent>
      </Card>
    </div>
  );
}
