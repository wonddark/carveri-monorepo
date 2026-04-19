import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import type {
  DealerSaleCycle,
  TransformedReport,
} from "../../lib/transforms.ts";
import { IconBuildingStore } from "@tabler/icons-react";
import { useEffect } from "react";

// ── Node style helper ──────────────────────────────────────────────────────────

type NodeStyle = { bg: string; ring: string; iconColor: string };

function getNodeStyle(cycle: DealerSaleCycle): NodeStyle {
  if (cycle.isActive) {
    return {
      bg: "bg-blue-900/30",
      ring: "ring-blue-500",
      iconColor: "text-blue-400",
    };
  }
  return {
    bg: "bg-muted",
    ring: "ring-muted-foreground/30",
    iconColor: "text-muted-foreground",
  };
}

// ── Subcomponents ──────────────────────────────────────────────────────────────

function DealerCard({ cycle }: Readonly<{ cycle: DealerSaleCycle }>) {
  const { t } = useTranslation("history");
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{cycle.dealerName}</p>
            {cycle.isActive && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {t("pastSales.active")}
              </span>
            )}
            <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[10px]">
              {t("pastSales.typeDealer")}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {cycle.city}, {cycle.state} · {cycle.startDate} – {cycle.endDate}
          </p>
        </div>
        {cycle.discountPct > 0 && (
          <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
            -{cycle.discountPct}%
          </span>
        )}
      </div>

      <div className="border-border mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <div className="flex flex-wrap gap-4">
          {/* Price history */}
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
              {t("pastSales.price")}
            </span>
            <div className="text-foreground/80 flex items-center gap-1.5 text-sm font-bold">
              <span
                className="text-muted-foreground line-through"
                title={t("pastSales.initialPrice")}
              >
                {formatCurrency(cycle.startPrice)}
              </span>
              <span>→</span>
              <span title={t("pastSales.finalPrice")}>
                {formatCurrency(cycle.endPrice)}
              </span>
            </div>
          </div>

          {/* Mileage */}
          {cycle.mileage != null && (
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                {t("pastSales.miles")}
              </span>
              <span className="text-foreground/80 text-sm font-bold">
                {cycle.mileage.toLocaleString()} mi
              </span>
            </div>
          )}
        </div>

        <span className="text-muted-foreground shrink-0 text-xs">
          {t("pastSales.daysOnSlot", { count: cycle.daysOnLot })}
        </span>
      </div>

      {/* Price drops row */}
      {cycle.priceReductions > 0 && (
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-muted-foreground">
            {t("pastSales.priceDrops", { count: cycle.priceReductions })}
          </span>
          <span className="font-semibold text-red-500">
            -{formatCurrency(cycle.priceDrop)}
          </span>
        </div>
      )}
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  salesCycles: TransformedReport["dealerSaleCycles"];
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
          const { bg, ring, iconColor } = getNodeStyle(cycle);

          return (
            <motion.div
              key={cycle.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4 pb-4"
            >
              {/* Circle node */}
              <div
                className={cn(
                  "ring-background relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-2",
                  bg,
                  ring,
                )}
              >
                <IconBuildingStore size={18} className={iconColor} />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "border-border bg-card flex-1 rounded-xl border p-3 shadow-sm",
                  cycle.isActive && "border-l-4 border-l-blue-500",
                )}
              >
                <DealerCard cycle={cycle} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
