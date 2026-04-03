import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import OwnersSubtab from "@carveri/shared/components/history/OwnersSubtab";

export default function OwnersSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <OwnersSubtab owners={report.historyTab.owners} />;
}
