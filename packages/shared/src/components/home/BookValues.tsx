import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "../../lib/transforms.ts";

const SOURCE_COLORS: Record<
  TransformedReport["priceEval"]["bookValues"][0]["source"],
  string
> = {
  MMR: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
  KBB: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  JDP: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  BB: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
};

interface Props {
  bookValues: TransformedReport["priceEval"]["bookValues"];
}

export default function BookValues({ bookValues }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {bookValues.map((bv) => {
        const trendingUp = bv.delta > 0;
        return (
          <Card
            key={bv.source}
            className="rounded-2xl border border-slate-200/80 bg-white/90 py-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.24)]"
          >
            <CardContent className="flex flex-col items-center px-4">
              <span
                className={`mb-2 inline-block rounded-full px-2 py-1 text-[10px] font-bold ${SOURCE_COLORS[bv.source]}`}
              >
                {bv.source}
              </span>
              <div className="text-base font-semibold tracking-tight text-slate-900">
                {formatCurrency(bv.value)}
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
                <span>{formatCurrency(Math.abs(bv.delta))}</span>
                <span>
                  {trendingUp ? t("priceEval.above") : t("priceEval.below")}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
