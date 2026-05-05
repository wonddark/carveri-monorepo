import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ServiceSubtab from "@carveri/shared/components/history/ServiceSubtab";

export default function ServiceSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return <ServiceSubtab service={report.historyTab.service} />;
}
