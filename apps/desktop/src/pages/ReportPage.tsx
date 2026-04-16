import { Outlet, useLoaderData } from "react-router";
import ReportHeader from "@/components/ReportHeader";
import ReportSidebar from "@/components/ReportSidebar";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { useEffect } from "react";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";

export default function ReportPage() {
  const report = useLoaderData<TransformedReport>();
  const { year, make, model, trim } = report;

  useEffect(() => {
    document.title = generateReportTitle({ year, make, model, trim });
  }, [make, model, trim, year]);

  return (
    <>
      <ReportHeader />
      <div className="fixed inset-0 top-16 grid grid-cols-[1fr_min(80rem,100%)_1fr] gap-4 overflow-auto">
        <div></div>
        <div className="relative flex">
          <ReportSidebar />
          <main className="w-full px-6 pt-6 pb-24 md:pb-8 lg:px-8">
            <Outlet />
          </main>
        </div>
        <div></div>
      </div>
    </>
  );
}
