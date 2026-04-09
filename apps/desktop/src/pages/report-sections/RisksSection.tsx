import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab";

export default function RisksSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <RisksSubtab risks={report.diagnosis.risks} />;
}
