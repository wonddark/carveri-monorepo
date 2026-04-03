import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import MarketTab from "@carveri/shared/components/market/MarketTab";

export default function MarketSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <MarketTab report={report} />;
}
