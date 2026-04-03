import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VerdictTab from "@/components/verdict/VerdictTab";

export default function VerdictTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <VerdictTab report={report} />;
}
