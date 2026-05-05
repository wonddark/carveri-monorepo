import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ValuacionSubtab from "@carveri/shared/components/verdict/ValuacionSubtab";

export default function ValuationSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return <ValuacionSubtab evaluation={report.evaluation} />;
}
