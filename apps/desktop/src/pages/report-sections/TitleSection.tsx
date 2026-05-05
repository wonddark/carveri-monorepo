import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TitleSubtab from "@carveri/shared/components/history/TitleSubtab";

export default function TitleSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return <TitleSubtab title={report.historyTab.title} />;
}
