import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import HistoryTab from "@/components/history/HistoryTab";

export default function HistoryTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <HistoryTab report={report} />;
}
