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
import type { KBBDetails } from "@carveri/shared/types/vehicle-report.ts";
import { XIcon } from "lucide-react";

type Props = {
  book: KBBDetails;
};

function KbbBookDetails(props: Readonly<Props>) {
  const { book } = props;
  const { t } = useTranslation(["books", "common"]);
  const trendingUp = book.delta > 0;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Card className="rounded-2xl border border-slate-200/80 bg-white/90 py-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.24)]">
            <CardContent className="flex flex-col items-center px-4">
              <span className="mb-2 inline-block rounded-lg bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                KBB
              </span>
              <div className="text-base font-semibold tracking-tight text-slate-900">
                {formatCurrency(book.value)}
              </div>
              <div
                className={cn(
                  "mt-1.5 flex items-center gap-1 text-[12px] font-medium",
                  {
                    "text-red-600 dark:text-red-400": trendingUp,
                    "text-green-600 dark:text-green-400": !trendingUp,
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
                  {t(
                    trendingUp ? "common:resume.above" : "common:resume.below",
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="w-full max-w-4xl! p-0">
        <div className="max-h-[90vh] overflow-y-auto bg-white duration-300">
          <div className="relative border-b border-blue-100 bg-blue-50 px-4 pt-4 pr-12 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:rounded-t-2xl">
            <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm transition-colors hover:bg-white">
              <XIcon className="lucide lucide-x h-4 w-4 text-gray-500" />
            </button>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-bold text-white">
                KBB
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {t("kbb.book")}
                </div>
                <div className="text-xs text-gray-500">DESCONOCIDO</div>
              </div>
            </div>
            <span className="mt-2 inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
              {formatCurrency(book.value)}
            </span>
            <div className="mt-3 flex flex-wrap items-end gap-4 sm:gap-6">
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase">
                  {t("kbb.fair_purchase")}
                </div>
                <div className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {formatCurrency(book.rawData.fairPurchasePrice)}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                  {t("kbb.fair_market")}
                </div>
                <div className="text-base font-semibold text-gray-700 sm:text-lg">
                  {`${formatCurrency(book.rawData.fairMarketRange.min)} - ${formatCurrency(book.rawData.fairMarketRange.max)}`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4 sm:p-5 md:border-r md:border-gray-100">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="mx-0 overflow-x-auto">
                  <table className="w-full min-w-120 text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="w-20 px-2 py-2.5 text-left text-[10px] font-semibold tracking-wider text-gray-400 uppercase sm:w-25 sm:px-3"></th>
                        <th className="px-2 py-2.5 text-right text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-500 uppercase sm:px-3">
                          {t("kbb.lending")}
                        </th>
                        <th className="px-2 py-2.5 text-right text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-500 uppercase sm:px-3">
                          {t("kbb.trade_book")}
                        </th>
                        <th className="px-2 py-2.5 text-right text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-500 uppercase sm:px-3">
                          {t("kbb.privacy_party")}
                        </th>
                        <th className="px-2 py-2.5 text-right text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-500 uppercase sm:px-3">
                          {t("kbb.retail")}
                        </th>
                        <th className="px-2 py-2.5 text-right text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-500 uppercase sm:px-3">
                          {t("kbb.auction")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-2 py-2.5 font-medium whitespace-nowrap text-gray-700 sm:px-3">
                          {`${t("base")} / ${t("kbb.pay")}`}
                        </td>
                        <td className="px-2 py-2.5 text-right whitespace-nowrap text-gray-600 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.lending.base)}
                        </td>
                        <td className="px-2 py-2.5 text-right whitespace-nowrap text-gray-600 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.tradeBook.base)}
                        </td>
                        <td className="px-2 py-2.5 text-right whitespace-nowrap text-gray-600 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.privateParty.base)}
                        </td>
                        <td className="px-2 py-2.5 text-right whitespace-nowrap text-gray-600 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.retail.base)}
                        </td>
                        <td className="px-2 py-2.5 text-right whitespace-nowrap text-gray-600 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.auction.base)}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-2 py-2.5 font-medium whitespace-nowrap text-red-500 sm:px-3">
                          Mileage Adj.
                        </td>
                        <td className="px-2 py-2.5 text-right font-medium whitespace-nowrap text-red-500 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.lending.mileageAdj)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-medium whitespace-nowrap text-red-500 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.tradeBook.mileageAdj)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-medium whitespace-nowrap text-red-500 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.privateParty.mileageAdj)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-medium whitespace-nowrap text-red-500 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.retail.mileageAdj)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-medium whitespace-nowrap text-red-500 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.auction.mileageAdj)}
                        </td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-2 py-2.5 font-bold whitespace-nowrap text-gray-900 sm:px-3">
                          {t("kbb.total")}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-gray-900 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.lending.total)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-gray-900 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.tradeBook.total)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-gray-900 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.privateParty.total)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-gray-900 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.retail.total)}
                        </td>
                        <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-gray-900 tabular-nums sm:px-3">
                          {formatCurrency(book.rawData.auction.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 py-1.5 text-center text-[10px] text-gray-400 sm:hidden">
                  {t("kbb.swipe_for_more")}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 md:border-t-0">
              <div className="w-full shrink-0 space-y-4 bg-white p-4 sm:p-5 md:w-[320px]">
                <div>
                  <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {t("kbb.adjusted_value")}
                  </div>
                  <div className="mt-1 flex flex-wrap items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {formatCurrency(book.rawData.fairPurchasePrice)}
                    </span>
                    <span className="pb-0.5 text-xs font-semibold text-emerald-500 sm:pb-1 sm:text-sm">
                      {t("kbb.vs_asking", {
                        value: formatCurrency(book.delta),
                        sign: book.delta > 0 ? "+" : "-",
                      })}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-medium text-gray-400">
                      {t("condition")}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-gray-900">
                      DESCONOCIDO
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-gray-400">
                      {t("valuation_date")}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-gray-900">
                      DESCONOCIDO
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-xs font-semibold text-gray-700">
                    {t("price_range")}
                  </div>
                  <div className="relative">
                    <div className="relative h-2.5 overflow-visible rounded-full bg-gray-100">
                      <div className="h-full w-full rounded-full bg-gray-800 opacity-20"></div>
                      <div
                        className="absolute top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800 shadow-md"
                        style={{
                          left: "44.0625%",
                        }}
                      ></div>
                      <div
                        className="absolute top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500 shadow-md"
                        style={{
                          left: "18.75%",
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                      <span>
                        {t("low", {
                          value: formatCurrency(
                            book.rawData.fairMarketRange.min,
                          ),
                        })}
                      </span>
                      <span>
                        {t("high", {
                          value: formatCurrency(
                            book.rawData.fairMarketRange.max,
                          ),
                        })}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
                        <span className="text-[11px] text-gray-500">KBB</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                        <span className="text-[11px] text-gray-500">
                          {t("common:asking_price")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 text-xs font-semibold text-gray-700">
                    Methodology
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Retail fair market value based on actual dealer
                    transactions, private party sales, and trade-in data.
                  </p>
                </div>
                <div className="flex gap-3 pt-1 pb-1">
                  <button className="flex-1 rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">
                    {t("common:close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default KbbBookDetails;
