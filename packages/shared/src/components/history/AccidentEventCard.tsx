import { useTranslation } from "react-i18next";
import { IconAlertOctagon, IconAlertTriangle } from "@tabler/icons-react";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { AccidentEvent } from "@carveri/shared/types/vehicle-report";
import CarDamageMap, { parseDamageZones } from "./CarDamageMap.tsx";

interface Props {
  event: AccidentEvent;
  index: number;
}

export default function AccidentEventCard({
  event,
  index,
}: Readonly<Props>) {
  const { t } = useTranslation("history");
  const { date, title, details, redFlag } = event;

  const Icon = redFlag ? IconAlertOctagon : IconAlertTriangle;
  const hasImpactMap = parseDamageZones(details).size > 0;

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        {/* Header */}
        <div
          className={cn("flex items-center gap-2", {
            "text-red-600 dark:text-red-400": redFlag,
            "text-orange-500 dark:text-orange-400": !redFlag,
          })}
        >
          <Icon size={16} className="shrink-0" />
          <span className="text-sm font-semibold">
            {t("accidents.event", { number: index + 1 })}
          </span>
          <span className="text-muted-foreground ml-auto text-xs">{date}</span>
        </div>

        {/* Title */}
        <p className="text-sm font-medium">{title}</p>

        {/* Details + damage map side by side when map is available */}
        <div className={cn("flex gap-4", hasImpactMap && "items-start")}>
          {/* Detail items */}
          {details.length > 0 && (
            <div className="flex flex-1 flex-col gap-1.5">
              {details.map((detail) => (
                <div
                  key={detail}
                  className={cn(
                    "flex items-start gap-2 rounded-xl border px-3 py-2",
                    {
                      "border-red-100 bg-red-50 dark:border-red-700/25 dark:bg-red-900/20":
                        redFlag,
                      "border-orange-100 bg-orange-50 dark:border-orange-700/25 dark:bg-orange-900/20":
                        !redFlag,
                    },
                  )}
                >
                  <Icon
                    size={12}
                    className={cn("mt-0.5 shrink-0", {
                      "text-red-500 dark:text-red-400": redFlag,
                      "text-orange-500 dark:text-orange-400": !redFlag,
                    })}
                  />
                  <p
                    className={cn("text-xs leading-relaxed", {
                      "text-red-700 dark:text-red-300": redFlag,
                      "text-orange-700 dark:text-orange-300": !redFlag,
                    })}
                  >
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Car damage map */}
          {hasImpactMap && (
            <div className="shrink-0">
              <CarDamageMap details={details} redFlag={redFlag} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
