import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ChecklistSubtab from "@carveri/shared/components/verdict/ChecklistSubtab";

export default function InspectionSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return <ChecklistSubtab checklist={report.diagnosis.checklist} />;
}
