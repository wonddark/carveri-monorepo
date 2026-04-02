import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { TransformedReport } from "../../lib/transforms.ts";

const SOURCE_COLORS: Record<
  TransformedReport["priceEval"]["bookValues"][0]["source"],
  string
> = {
  MMR: "bg-indigo-600",
  KBB: "bg-blue-600",
  JDP: "bg-violet-600",
  BB: "bg-cyan-600",
};

interface Props {
  bookValues: TransformedReport["priceEval"]["bookValues"];
}

export default function BookValues({ bookValues }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {bookValues.map((bv) => {
        const trendingUp = bv.delta > 0;
        return (
          <Card key={bv.source} className="py-3">
            <CardContent className="flex flex-col items-center px-3">
              <span
                className={`mb-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black text-white ${SOURCE_COLORS[bv.source]}`}
              >
                {bv.source}
              </span>
              <div className="text-sm font-bold">
                ${bv.value.toLocaleString()}
              </div>
              <div
                className={cn("flex items-center gap-1 text-xs", {
                  "text-red-600 dark:text-red-400": trendingUp,
                  "text-green-600 dark:text-green-400": !trendingUp,
                })}
              >
                {trendingUp ? (
                  <IconTrendingUp className="size-3" />
                ) : (
                  <IconTrendingDown className="size-3" />
                )}
                <span>${Math.abs(bv.delta).toLocaleString()}</span>
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
