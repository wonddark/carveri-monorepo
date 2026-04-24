import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import type { DashboardData } from "@carveri/shared/types/dashboard.ts";

// ─── Plan usage ring ──────────────────────────────────────────────────────────

function PlanRing({
  used,
  total,
  size = 152,
}: {
  used: number;
  total: number;
  size?: number;
}) {
  const STROKE = 12;
  const r = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = total > 0 ? used / total : 0;
  const targetOffset = circumference * (1 - pct);

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setOffset(targetOffset));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [targetOffset]);

  const cy = size / 2;
  const cx = size / 2;

  return (
    <svg
      width={size}
      height={size}
      aria-label={`${used} of ${total} reports used`}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeWidth={STROKE}
        className="stroke-slate-100 dark:stroke-slate-800"
      />
      {/* Usage arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="stroke-primary"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Total in center */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground"
        style={{ fontSize: "38px", fontWeight: 900 }}
      >
        {total}
      </text>
      {/* "Total" label */}
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-muted-foreground"
        style={{ fontSize: "11px", fontWeight: 500 }}
      >
        total
      </text>
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PlanSection() {
  const data = useRouteLoaderData("dashboard") as DashboardData;
  const { plan } = data;
  const { t } = useTranslation("common");
  const remaining = plan.totalReports - plan.usedReports;

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">{t("dashboard.plan.title")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("dashboard.plan.subtitle")}
        </p>
      </div>

      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            {plan.name} {t("dashboard.plan.planName")}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-5">
          <PlanRing used={plan.usedReports} total={plan.totalReports} />

          <div className="grid w-full grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-primary text-2xl font-bold">
                {plan.usedReports}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {t("dashboard.plan.used")}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-950/30">
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {remaining}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {t("dashboard.plan.remaining")}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild size="sm">
            <Link to="/checkout">{t("dashboard.plan.buyMore")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
