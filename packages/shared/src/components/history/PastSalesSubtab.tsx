import { useTranslation } from "react-i18next";
import { Store } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";

interface Props {
  dealerSaleCycles: TransformedReport["dealerSaleCycles"];
}

export default function PastSalesSubtab({ dealerSaleCycles }: Readonly<Props>) {
  const { t } = useTranslation("history");

  if (dealerSaleCycles.length === 0) {
    return (
      <>
        <SubTabHeader
          title={t("pastSales.heading")}
          subtitle={t("pastSales.subtitle")}
        />
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Store className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{t("pastSales.noPastSales")}</p>
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
        {dealerSaleCycles.map((cycle, i) => (
          <motion.div
            key={cycle.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{cycle.dealerName}</p>
                    {cycle.isActive && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {t("pastSales.active")}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {cycle.city}, {cycle.state}
                  </p>
                </div>
                {cycle.discountPct > 0 && (
                  <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    -{cycle.discountPct}%
                  </span>
                )}
              </div>

              {/* Date range + stats */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>
                  {cycle.startDate} – {cycle.endDate}
                </span>
                <span>{t("pastSales.daysOnLot", { count: cycle.daysOnLot })}</span>
                {cycle.mileage != null && (
                  <span>{cycle.mileage.toLocaleString()} mi</span>
                )}
              </div>

              {/* Price history */}
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{t("pastSales.initialPrice")}</span>
                  <span className="font-semibold">
                    ${cycle.startPrice.toLocaleString()}
                  </span>
                </div>

                {cycle.priceReductions > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {t("pastSales.priceDrops", { count: cycle.priceReductions })}
                    </span>
                    <span className="font-semibold text-red-500">
                      -${cycle.priceDrop.toLocaleString()}
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-xs",
                    cycle.isActive
                      ? "bg-primary/5"
                      : "bg-slate-50 dark:bg-slate-800/40",
                  )}
                >
                  <span className="font-semibold">{t("pastSales.finalPrice")}</span>
                  <span className="text-base font-bold">
                    ${cycle.endPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
