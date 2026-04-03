import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import NegotiateTab from "@/components/negotiate/NegotiateTab";

export default function NegotiateTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <NegotiateTab report={report} />;
}
