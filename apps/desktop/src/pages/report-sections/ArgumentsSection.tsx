import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import ArgumentsSubtab from "@carveri/shared/components/negotiate/ArgumentsSubtab";

export default function ArgumentsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <ArgumentsSubtab args={report.negotiate.arguments} />;
}
