import { useTranslation } from "react-i18next";
import type { BookValue } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

const SOURCE_COLORS: Record<BookValue["source"], string> = {
  MMR: "bg-indigo-600",
  KBB: "bg-blue-600",
  JDP: "bg-violet-600",
  BB: "bg-cyan-600",
};

interface Props {
  bookValues: BookValue[];
}

export default function BookValues({ bookValues }: Readonly<Props>) {
  const { t } = useTranslation("home");
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {bookValues.map((bv) => (
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
            <div className="text-muted-foreground text-xs">
              ${Math.abs(bv.delta).toLocaleString()}{" "}
              {bv.delta <= 0 ? t("priceEval.below") : t("priceEval.above")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
