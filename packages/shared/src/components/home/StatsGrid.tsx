import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { IconCircleCheck } from "@tabler/icons-react";
import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";

interface Props {
  stats: VehicleReport["stats"];
}

export default function StatsGrid({ stats }: Readonly<Props>) {
  const { t } = useTranslation("home");
  const items = [
    {
      icon: <IconCircleCheck className="size-4.5" />,
      label: t("stats.title"),
      value:
        stats?.titleStatus === "Clean" ? t("stats.clean") : stats?.titleStatus,
      good: stats?.titleStatus === "Clean",
    },
    {
      icon: <IconCircleCheck className="size-4.5" />,
      label: t("stats.accidents"),
      value:
        stats?.accidents === 0
          ? `0 ${t("stats.reported")}`
          : `${stats.accidents} ${t("stats.reported")}`,
      good: stats.accidents === 0,
    },
    {
      icon: <IconCircleCheck className="size-4.5" />,
      label: t("stats.odometer"),
      value: stats?.odometerVerified
        ? t("stats.verified")
        : t("stats.inconsistent"),
      good: stats?.odometerVerified,
    },
    {
      icon: <IconCircleCheck className="size-4.5" />,
      label: t("stats.price"),
      value: `${stats?.priceDeltaPct > 0 ? "+" : ""}${stats?.priceDeltaPct}%`,
      good: stats?.priceDeltaPct <= 0,
    },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-3.5">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.24)]">
            <CardContent className="flex items-center gap-3.5 px-4 py-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[11px] font-semibold tracking-[0.08em] text-slate-500 uppercase">
                  {item.label}
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {item.value}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
