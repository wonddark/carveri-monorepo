import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { IconBuildingStore, IconGavel } from "@tabler/icons-react";
import { useEffect } from "react";
import type { PastSaleDetails } from "@carveri/shared/types/vehicle-report.ts";

// ── Subcomponents ──────────────────────────────────────────────────────────────

function SaleCard({ cycle }: Readonly<{ cycle: PastSaleDetails[0] }>) {
  const { t } = useTranslation("history");
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{cycle.sellerName}</p>
            <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[10px]">
              {t(
                cycle.sellerType === "dealer"
                  ? "pastSales.typeDealer"
                  : "pastSales.typeAuction",
              )}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {`${cycle.sellerType === "dealer" ? cycle.location + " · " : ""}${cycle.startDate} – ${cycle.endDate}`}
          </p>
        </div>
      </div>

      <div className="border-border mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <div className="flex flex-wrap gap-4">
          {/* Price history */}
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
              {t("pastSales.price")}
            </span>
            <div className="text-foreground/80 flex items-center gap-1.5 text-sm font-bold">
              {cycle.sellerType === "dealer" ? (
                <>
                  <span
                    className="text-muted-foreground line-through"
                    title={t("pastSales.initialPrice")}
                  >
                    {formatCurrency(cycle.startPrice ?? 0)}
                  </span>
                  <span>→</span>
                </>
              ) : null}
              <span title={t("pastSales.finalPrice")}>
                {formatCurrency(cycle.endPrice ?? 0)}
              </span>
            </div>
          </div>
        </div>

        <span className="text-muted-foreground shrink-0 text-xs">
          {t("pastSales.daysOnSlot", { count: cycle.daysOnMarket })}
        </span>
      </div>
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  salesCycles: PastSaleDetails;
}

export default function PastSalesSubtab({ salesCycles }: Readonly<Props>) {
  const { t } = useTranslation("history");

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (salesCycles.length === 0) {
    return (
      <>
        <SubTabHeader
          title={t("pastSales.heading")}
          subtitle={t("pastSales.subtitle")}
        />
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <IconBuildingStore className="text-muted-foreground/40 size-10" />
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

      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute top-5 bottom-5 left-5 w-px bg-slate-200 dark:bg-slate-700" />

        {salesCycles.map((cycle, i) => {
          const bg = "bg-muted";
          const ring = "ring-muted-foreground/30";
          const iconColor = "text-muted-foreground";

          return (
            <motion.div
              key={`${cycle.sellerType}::${cycle.sellerName}::${cycle.startDate}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4 pb-4"
            >
              {/* Circle node */}
              <div
                className={cn(
                  "ring-background relative z-10 flex size-10 shrink-0",
                  "items-center justify-center rounded-full ring-2",
                  bg,
                  ring,
                )}
              >
                {cycle.sellerType === "dealer" ? (
                  <IconBuildingStore size={18} className={iconColor} />
                ) : (
                  <IconGavel size={18} className={iconColor} />
                )}
              </div>

              {/* Card */}
              <div
                className={cn(
                  "border-border bg-card flex-1 rounded-xl border p-3 shadow-sm",
                  // cycle.isActive && "border-l-4 border-l-blue-500",
                )}
              >
                <SaleCard cycle={cycle} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
