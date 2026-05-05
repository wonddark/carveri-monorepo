import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import HomeTab from "@/components/home/HomeTab";
import { useEffect } from "react";

export default function HomeTabSection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <HomeTab report={report} />;
}
