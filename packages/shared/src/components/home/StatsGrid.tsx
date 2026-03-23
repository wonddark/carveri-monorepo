import { motion } from "framer-motion";
import { AlertTriangle, Gauge, ShieldCheck, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@carveri/shared/lib/utils";
import type { VehicleReport } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  stats: VehicleReport["stats"];
}

export default function StatsGrid({ stats }: Readonly<Props>) {
  const { t } = useTranslation("home");
  const items = [
    {
      icon: <ShieldCheck size={18} className="text-emerald-500" />,
      label: t("stats.title"),
      value:
        stats.titleStatus === "Clean" ? t("stats.clean") : stats.titleStatus,
      good: stats.titleStatus === "Clean",
    },
    {
      icon: <AlertTriangle size={18} className="text-slate-400" />,
      label: t("stats.accidents"),
      value:
        stats.accidents === 0
          ? `0 ${t("stats.reported")}`
          : `${stats.accidents} ${t("stats.reported")}`,
      good: stats.accidents === 0,
    },
    {
      icon: <Gauge size={18} className="text-slate-400" />,
      label: t("stats.odometer"),
      value: stats.odometerVerified
        ? t("stats.verified")
        : t("stats.inconsistent"),
      good: stats.odometerVerified,
    },
    {
      icon: <Tag size={18} className="text-slate-400" />,
      label: t("stats.price"),
      value: `${stats.priceDeltaPct > 0 ? "+" : ""}${stats.priceDeltaPct}%`,
      good: stats.priceDeltaPct <= 0,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-2 lg:w-fit lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="py-3">
            <CardContent className="flex gap-3 px-3">
              {item.icon}
              <div className="flex flex-col gap-0.5">
                <div className="text-muted-foreground text-xs">
                  {item.label}
                </div>
                <div
                  className={cn("text-xs font-semibold", {
                    "text-red-500 dark:text-red-200": !item.good,
                  })}
                >
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
