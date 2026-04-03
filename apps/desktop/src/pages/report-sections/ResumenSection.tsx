import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ResumenView from "@/components/ResumenView";

export default function ResumenSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ResumenView report={report} />;
}
