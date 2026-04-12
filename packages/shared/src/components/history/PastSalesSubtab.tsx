import { useTranslation } from "react-i18next";
import { Store } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import {
  IconArrowNarrowRight,
  IconBuilding,
  IconCalendar,
} from "@tabler/icons-react";
import { Activity } from "react";

interface Props {
  salesCycles: TransformedReport["saleCycles"];
}

export default function PastSalesSubtab({ salesCycles }: Readonly<Props>) {
  const { t } = useTranslation("history");

  if (salesCycles.length === 0) {
    return (
      <>
        <SubTabHeader
          title={t("pastSales.heading")}
          subtitle={t("pastSales.subtitle")}
        />
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Store className="text-muted-foreground/40 size-10" />
          <p className="text-muted-foreground text-sm">
            {t("pastSales.noPastSales")}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SubTabHeader
        title={t("pastSales.heading")}
        subtitle={t("pastSales.subtitle")}
      />

      <div className="flex flex-col gap-3">
        {salesCycles.map((cycle, i) => (
          <motion.div
            key={cycle.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="border-border bg-card rounded-xl border p-4 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{cycle.dealerName}</p>
                    {cycle.isActive && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {t("pastSales.active")}
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
                    {/* Location */}
                    <div className="flex items-center gap-1">
                      <IconBuilding className="size-3" />
                      <span>
                        {cycle.city}, {cycle.state}
                      </span>
                    </div>

                    {/* Date range + stats */}
                    <div className="flex items-center gap-1">
                      <IconCalendar className="size-3" />
                      <span>
                        {cycle.startDate} – {cycle.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                {cycle.discountPct > 0 && (
                  <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    -{cycle.discountPct}%
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="border-border mt-3 flex gap-4 border-t pt-3">
                  {/* Price history */}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      {t("pastSales.price")}
                    </span>
                    <div className="text-foreground/80 flex items-center gap-2 text-sm font-bold">
                      <span title={t("pastSales.initialPrice")}>
                        {formatCurrency(cycle.startPrice)}
                      </span>
                      <IconArrowNarrowRight className="size-3" />
                      <span title={t("pastSales.finalPrice")}>
                        {formatCurrency(cycle.endPrice)}
                      </span>
                    </div>
                  </div>

                  <Activity
                    mode={cycle.priceReductions > 0 ? "visible" : "hidden"}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {t("pastSales.priceDrops", {
                          count: cycle.priceReductions,
                        })}
                      </span>
                      <span className="font-semibold text-red-500">
                        -{formatCurrency(cycle.priceDrop)}
                      </span>
                    </div>
                  </Activity>

                  {/* Mileage */}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      {t("pastSales.miles")}
                    </span>
                    <div className="text-foreground/80 flex items-center gap-2 text-sm font-bold">
                      <span title={t("pastSales.miles")}>
                        {`${cycle.mileage} mi`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                  {t("pastSales.daysOnSlot", { count: cycle.daysOnLot })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
