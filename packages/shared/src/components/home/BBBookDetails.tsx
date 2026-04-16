import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@carveri/shared/components/ui/dialog.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import { cn } from "@carveri/shared/lib/utils.ts";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { useTranslation } from "react-i18next";
import { SOURCE_COLORS } from "@carveri/shared/components/home/book-colors.ts";
import { TrendingDownIcon, XIcon } from "lucide-react";

type Props = {
  book: TransformedReport["priceEval"]["bookValues"][0];
};

function BbBookDetails(props: Readonly<Props>) {
  const { book } = props;
  const { t } = useTranslation("home");
  const trendingUp = book.delta > 0;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Card className="rounded-2xl border border-slate-200/80 bg-white/90 py-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.24)]">
            <CardContent className="flex flex-col items-center px-4">
              <span
                className={`mb-2 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${SOURCE_COLORS[book.source]}`}
              >
                {book.source}
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
                  {trendingUp ? t("priceEval.above") : t("priceEval.below")}
                </span>
              </div>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-0">
        <div className="relative bg-gray-50 px-5 pt-5 pb-4 md:rounded-t-2xl">
          <DialogClose asChild>
            <button className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-sm transition-colors hover:bg-white">
              <XIcon className="size-4" />
            </button>
          </DialogClose>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-gray-800 px-3 py-1 text-sm font-bold text-white">
              BB
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Black Book
              </div>
              <div className="text-xs text-gray-500">Mar 2025</div>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-xs font-medium text-gray-400">
                Adjusted Value
              </div>
              <div className="text-3xl font-bold text-gray-900">$20,925</div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
              <TrendingDownIcon className="size-4" />
              +$575 vs asking
            </div>
          </div>
        </div>
        <div className="space-y-5 px-5 py-4">
          <div>
            <div className="mb-2 text-xs font-semibold text-gray-700">
              Applied Adjustments
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="text-sm text-gray-700">Mileage Adj.</span>
                <span className="text-sm font-semibold text-red-500">
                  $550
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trending-down ml-1 inline h-3 w-3"
                  >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="text-sm text-gray-700">Condition Adj.</span>
                <span className="text-sm font-semibold text-red-500">
                  $125
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trending-down ml-1 inline h-3 w-3"
                  >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="text-sm text-gray-700">Region Adj.</span>
                <span className="text-sm font-semibold text-emerald-600">
                  +$280
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trending-up ml-1 inline h-3 w-3"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold text-gray-700">
              Methodology
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              Weekly wholesale market data from 100,000+ auction transactions.
              Updated every business day.
            </p>
          </div>
          <div className="gap-3 pt-2 pb-2">
            <DialogClose asChild>
              <button className="w-full cursor-pointer rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">
                Close
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BbBookDetails;
