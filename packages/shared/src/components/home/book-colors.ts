import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export const SOURCE_COLORS: Record<
  TransformedReport["priceEval"]["bookValues"][0]["source"],
  string
> = {
  MMR: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
  KBB: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  JDP: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  BB: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
};
