import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VerdictTab from "@/components/verdict/VerdictTab";
import { useEffect } from "react";

export default function VerdictTabSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <VerdictTab report={report} />;
}
