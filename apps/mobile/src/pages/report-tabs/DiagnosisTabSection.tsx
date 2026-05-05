import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import DiagnosisTab from "@/components/verdict/DiagnosisTab";
import { useEffect } from "react";

export default function DiagnosisTabSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <DiagnosisTab report={report} />;
}
