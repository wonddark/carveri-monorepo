import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import NegotiateTab from "@/components/negotiate/NegotiateTab";
import { useEffect } from "react";

export default function NegotiateTabSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <NegotiateTab report={report} />;
}
