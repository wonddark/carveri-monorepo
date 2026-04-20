import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@carveri/shared/components/ui/dialog.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import { cn } from "@carveri/shared/lib/utils.ts";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, ClockIcon, XIcon } from "lucide-react";
import type { MMRDetails } from "@carveri/shared/types/vehicle-report.ts";

type Props = {
  book: MMRDetails;
};

function MmrBookDetails(props: Readonly<Props>) {
  const { book } = props;
  const { t } = useTranslation(["books", "common"]);
  const trendingUp = book.delta > 0;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Card className="dark:border-border dark:bg-card rounded-2xl border border-slate-200/80 bg-white/90 py-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.24)]">
            <CardContent className="flex flex-col items-center px-4">
              <span className="mb-2 inline-flex items-center justify-center rounded-lg bg-orange-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                MMR
              </span>
              <div className="dark:text-card-foreground text-base font-semibold tracking-tight text-slate-900">
                {formatCurrency(book.value)}
              </div>
              <div
                className={cn(
                  "mt-1.5 flex items-center gap-1 text-[12px] font-medium",
                  {
                    "text-red-600 dark:text-red-300": trendingUp,
                    "text-green-600 dark:text-green-300": !trendingUp,
                  },
                )}
              >
                {trendingUp ? (
                  <IconTrendingUp className="size-3" />
                ) : (
                  <IconTrendingDown className="size-3" />
                )}
                <span>{formatCurrency(Math.abs(book.delta))}</span>
                <span>
                  {trendingUp
                    ? t("common:resume.above")
                    : t("common:resume.below")}
                </span>
              </div>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-0">
        <div className="animate-in slide-in-from-bottom-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-2xl duration-300 md:rounded-2xl">
          <div className="relative bg-orange-50 px-4 pt-4 pr-12 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:rounded-t-2xl">
            <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm transition-colors hover:bg-white">
              <XIcon className="size-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                MMR
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {t("mmr.market_report")}
                </div>
                <div className="text-muted-foreground text-xs">DESCONOCIDO</div>
              </div>
            </div>
          </div>
          <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-center sm:p-3">
                <div className="mb-1 text-[9px] font-semibold tracking-wider text-gray-400 uppercase sm:text-[10px]">
                  {t("mmr.base")}
                </div>
                <div className="text-base font-bold text-gray-900 sm:text-lg">
                  {formatCurrency(book.rawData.baseMmr)}
                </div>
              </div>
              <div className="relative rounded-xl border-2 border-orange-300 bg-orange-50 p-2 text-center sm:p-3">
                <div className="mb-1 text-[9px] font-semibold tracking-wider text-orange-500 uppercase sm:text-[10px]">
                  {t("mmr.wholesale")}
                </div>
                <div className="text-lg font-bold text-orange-600 sm:text-xl">
                  {formatCurrency(book.value)}
                </div>
                <div className="mt-1 text-[9px] font-semibold text-emerald-500 sm:text-[10px]">
                  {book.delta}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-center sm:p-3">
                <div className="mb-1 text-[9px] font-semibold tracking-wider text-emerald-600 uppercase sm:text-[10px]">
                  {t("mmr.retail")}
                </div>
                <div className="text-base font-bold text-emerald-700 sm:text-lg">
                  {formatCurrency(book.rawData.estimatedRetail)}
                </div>
                <div className="mt-0.5 text-[9px] text-emerald-500 sm:text-[10px]">
                  {`${formatCurrency(book.rawData.estimatedRetailRange.min)} - ${formatCurrency(book.rawData.estimatedRetailRange.min)}`}
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 sm:p-4">
              <div className="mb-3 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                {t("mmr.wholesale_range")}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="mb-0.5 text-xs text-gray-400">{t("low")}</div>
                  <div className="text-sm font-bold text-gray-700 sm:text-base">
                    {formatCurrency(book.rawData.typicalRange.min)}
                  </div>
                </div>
                <div className="mx-3 flex flex-1 items-center sm:mx-4">
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <ArrowRightIcon className="mx-1 size-4 text-gray-300" />
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
                <div className="text-center">
                  <div className="mb-0.5 text-xs text-gray-400">
                    {t("high")}
                  </div>
                  <div className="text-sm font-bold text-gray-700 sm:text-base">
                    {formatCurrency(book.rawData.typicalRange.max)}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 sm:p-4">
              <div className="mb-3 flex items-center gap-1.5">
                <ClockIcon className="text-muted-foreground size-3.5" />
                <div className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                  {t("mmr.historical_avg")}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-lg border border-gray-100 bg-white px-1.5 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="mb-1 text-[9px] font-medium text-gray-400 sm:text-[10px]">
                    {t("mmr.30D")}
                  </div>
                  <div className="text-xs font-bold text-gray-900 sm:text-sm">
                    {formatCurrency(book.rawData.historicalAvg.past30Days)}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white px-1.5 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="mb-1 text-[9px] font-medium text-gray-400 sm:text-[10px]">
                    {t("mmr.6M")}
                  </div>
                  <div className="text-xs font-bold text-gray-900 sm:text-sm">
                    {formatCurrency(book.rawData.historicalAvg.sixMonths)}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-100 bg-white px-1.5 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="mb-1 text-[9px] font-medium text-gray-400 sm:text-[10px]">
                    {t("mmr.1Y")}
                  </div>
                  <div className="text-xs font-bold text-gray-900 sm:text-sm">
                    {formatCurrency(book.rawData.historicalAvg.lastYear)}
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground mt-2 text-center text-[11px]">
                {t("mmr.projected", {
                  value: formatCurrency(book.rawData.projectedAvg),
                })}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-semibold text-gray-700">
                {t("methodology")}
              </div>
              <p className="text-xs leading-relaxed text-gray-500">
                Wholesale auction transactions from Manheim auctions in the last
                90 days for comparable vehicles.
              </p>
            </div>
            <div className="flex gap-3 pt-1 pb-1">
              <button className="flex-1 rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">
                {t("common:close")}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MmrBookDetails;
