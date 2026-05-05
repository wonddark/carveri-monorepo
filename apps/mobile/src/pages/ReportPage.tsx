import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router";
import BottomNavBar from "@/components/BottomNavBar";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export default function ReportPage() {
  const { year, make, model, trim } = useLoaderData() as TransformedReport;

  useEffect(() => {
    globalThis.document.title = generateReportTitle({
      year,
      make,
      model,
      trim,
    });
  }, [make, model, trim, year]);

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 pb-24">
        <div className="overflow-hidden">
          <Outlet />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
