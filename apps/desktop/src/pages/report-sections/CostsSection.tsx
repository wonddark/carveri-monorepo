import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import CostsSubtab from "@carveri/shared/components/negotiate/CostsSubtab";

export default function CostsSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <CostsSubtab price={report.price} costs={report.negotiate.costs} />;
}
