import { useTranslation } from "react-i18next";
import { IconAlertOctagon, IconAlertTriangle } from "@tabler/icons-react";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { Accident } from "@carveri/shared/types/vehicle-report";

interface Props {
  event: Accident;
}

export default function AccidentEventCard({ event }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const { numero, fecha, titulo, severidad, redFlag, detalles, impactAreas } =
    event;

  const Icon = redFlag ? IconAlertOctagon : IconAlertTriangle;

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
            {t("accidents.event", { number: numero })}
          </span>
          <span className="text-muted-foreground ml-auto text-xs">{fecha}</span>
        </div>

        {/* Fields */}
        <div className="space-y-2">
          <Field label={t("accidents.type")} value={titulo} />
          {severidad !== "-" && (
            <Field label={t("accidents.severity")} value={severidad} />
          )}
          {impactAreas.length > 0 && (
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-muted-foreground shrink-0 text-xs">
                {t("accidents.impactArea")}
              </span>
              <div className="flex flex-wrap justify-end gap-1">
                {impactAreas.map((area) => (
                  <span
                    key={area}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] leading-none font-medium",
                      {
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300":
                          redFlag,
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300":
                          !redFlag,
                      },
                    )}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail items */}
        {detalles.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {detalles.map((detalle) => (
              <div
                key={detalle}
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
                  {detalle}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Field({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-b-[--separator] pb-2 last:border-none last:pb-0">
      <span className="text-muted-foreground shrink-0 text-xs">{label}</span>
      <span className="text-right text-xs font-medium">{value}</span>
    </div>
  );
}
