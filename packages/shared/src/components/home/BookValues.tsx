import { useTranslation } from "react-i18next";
import type { BookValue } from "@carveri/shared/data/report";

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
        <div
          key={bv.source}
          className="rounded-xl border border-slate-100 bg-slate-50 p-3"
        >
          <span
            className={`mb-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-black text-white ${SOURCE_COLORS[bv.source]}`}
          >
            {bv.source}
          </span>
          <div className="text-sm font-black text-slate-900">
            ${bv.value.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400">
            ${Math.abs(bv.delta).toLocaleString()}{" "}
            {bv.delta <= 0 ? t("priceEval.below") : t("priceEval.above")}
          </div>
        </div>
      ))}
    </div>
  );
}
