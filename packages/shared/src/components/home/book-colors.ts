import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export const SOURCE_COLORS: Record<
  TransformedReport["priceEval"]["bookValues"][0]["source"],
  string
> = {
  MMR: "bg-orange-500 text-white",
  KBB: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  JDP: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  BB: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
};
