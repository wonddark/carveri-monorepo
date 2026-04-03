import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import AccidentsSubtab from "@carveri/shared/components/history/AccidentsSubtab";

export default function AccidentsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <AccidentsSubtab accidents={report.historyTab.accidents} />;
}
