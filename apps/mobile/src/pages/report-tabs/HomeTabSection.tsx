import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import HomeTab from "@/components/home/HomeTab";

export default function HomeTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <HomeTab report={report} />;
}
