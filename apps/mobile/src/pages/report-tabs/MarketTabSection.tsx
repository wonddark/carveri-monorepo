import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import MarketTab from "@/components/market/MarketTab";

export default function MarketTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <MarketTab report={report} />;
}
