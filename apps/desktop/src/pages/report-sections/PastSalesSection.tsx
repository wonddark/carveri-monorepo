import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import PastSalesSubtab from "@carveri/shared/components/history/PastSalesSubtab";

export default function PastSalesSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <PastSalesSubtab salesCycles={report.dealerSaleCycles} />;
}
