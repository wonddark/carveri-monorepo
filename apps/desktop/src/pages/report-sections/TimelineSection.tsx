import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TimelineSubtab from "@carveri/shared/components/history/TimelineSubtab";

export default function TimelineSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return (
    <TimelineSubtab
      timeline={report.historyTab.timeline}
      odometerHistory={report.historyTab.odometerHistory}
    />
  );
}
