import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ChecklistSubtab from "@carveri/shared/components/verdict/ChecklistSubtab";

export default function ChecklistSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ChecklistSubtab checklist={report.verdictTab.checklist} />;
}
