import { useTranslation } from "react-i18next";
import { Banknote, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { Activity } from "react";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

interface Props {
  auctionSales: TransformedReport["auctionSales"];
  auctionPhotos: TransformedReport["historyTab"]["auctionPhotos"];
}

export default function AuctionHistorySubtab({
  auctionSales,
  auctionPhotos,
}: Readonly<Props>) {
  const { t } = useTranslation("history");

  const soldCount = auctionSales.filter((s) => s.sold).length;
  const lastOdometer =
    auctionSales.find((s) => s.mileage != null)?.mileage || null;

  return (
    <>
      <SubTabHeader
        title={t("auctionHistory.heading")}
        subtitle={t("auctionHistory.subtitle")}
      />

      {auctionSales.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Banknote className="text-muted-foreground/40 size-10" />
          <p className="text-muted-foreground text-sm">
            {t("auctionHistory.noAuctions")}
          </p>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="flex flex-col gap-1 py-3">
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Banknote size={13} />
                  {t("auctionHistory.sales")}
                </div>
                <span className="text-2xl font-bold">{soldCount}</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-1 py-3">
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Gauge size={13} />
                  {t("auctionHistory.odometer")}
                </div>
                <span className="text-2xl font-bold">
                  {lastOdometer ? `${lastOdometer.toLocaleString()} mi` : "—"}
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Auction timeline */}
          <div className="relative flex flex-col">
            <div className="absolute top-5 bottom-5 left-4 w-px bg-slate-200 dark:bg-slate-700" />

            {auctionSales.map((sale, i) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex gap-4 pb-4"
              >
                {/* Node */}
                <div
                  className={cn(
                    "ring-background relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2",
                    sale.sold
                      ? "bg-green-500 text-white"
                      : "bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-300",
                  )}
                >
                  {i + 1}
                </div>

                {/* Card */}
                <div className="border-border bg-card flex-1 rounded-xl border p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {sale.auctionName}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {sale.city}, {sale.state} · {sale.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span>{sale.price != null ? formatCurrency(sale.price) : "—"}</span>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          sale.sold
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Activity mode={sale.sold ? "visible" : "hidden"}>
                          <IconCircleCheck className="size-3" />
                        </Activity>
                        <Activity mode={sale.sold ? "hidden" : "visible"}>
                          <IconCircleX className="size-3" />
                        </Activity>
                        {sale.sold
                          ? t("auctionHistory.sold")
                          : t("auctionHistory.notSold")}
                      </span>
                    </div>
                  </div>

                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-3 text-xs">
                    {sale.price != null && (
                      <span className="text-foreground font-semibold">
                        {formatCurrency(sale.price)}
                      </span>
                    )}
                    {sale.mileage != null && (
                      <span>{sale.mileage.toLocaleString()} mi</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Auction photos gallery */}
          {auctionPhotos.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t("auctionHistory.photos")}
              </h3>
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                {auctionPhotos.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Auction photo ${i + 1}`}
                    className="aspect-square w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
