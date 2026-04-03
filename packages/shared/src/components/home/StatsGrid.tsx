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
      icon: <IconCircleCheck className="size-5" />,
      label: t("stats.title"),
      value:
        stats?.titleStatus === "Clean" ? t("stats.clean") : stats?.titleStatus,
      good: stats?.titleStatus === "Clean",
    },
    {
      icon: <IconCircleCheck className="size-5" />,
      label: t("stats.accidents"),
      value:
        stats?.accidents === 0
          ? `0 ${t("stats.reported")}`
          : `${stats.accidents} ${t("stats.reported")}`,
      good: stats.accidents === 0,
    },
    {
      icon: <IconCircleCheck className="size-5" />,
      label: t("stats.odometer"),
      value: stats?.odometerVerified
        ? t("stats.verified")
        : t("stats.inconsistent"),
      good: stats?.odometerVerified,
    },
    {
      icon: <IconCircleCheck className="size-5" />,
      label: t("stats.price"),
      value: `${stats?.priceDeltaPct > 0 ? "+" : ""}${stats?.priceDeltaPct}%`,
      good: stats?.priceDeltaPct <= 0,
    },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="border-blue-200 bg-blue-50 py-3 text-blue-700">
            <CardContent className="flex items-center gap-3 px-3">
              {item.icon}
              <div className="flex flex-col gap-0.5">
                <div className="text-xs font-semibold">{item.label}</div>
                <div className="text-sm text-gray-800">{item.value}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
