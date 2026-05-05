import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import StrategySubtab from "@carveri/shared/components/negotiate/StrategySubtab";

export default function StrategySection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return <StrategySubtab strategy={report.negotiate.strategy} />;
}
