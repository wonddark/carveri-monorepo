import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import DiagnosisSubtab from "@carveri/shared/components/verdict/DiagnosisSubtab";

export default function DiagnosisSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <DiagnosisSubtab diagnosis={report.diagnosis} />;
}
