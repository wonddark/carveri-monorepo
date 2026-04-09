import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import DiagnosisTab from "@/components/verdict/DiagnosisTab";

export default function DiagnosisTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <DiagnosisTab report={report} />;
}
