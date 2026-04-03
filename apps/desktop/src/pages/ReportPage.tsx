import { useLoaderData, Outlet } from "react-router";
import ReportHeader from "@/components/ReportHeader";
import ReportSidebar from "@/components/ReportSidebar";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

export default function ReportPage() {
  const report = useLoaderData<TransformedReport>();

  return (
    <div className="relative mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden">
      <ReportHeader />
      <div className="fixed inset-0 mx-auto flex max-w-7xl flex-1 overflow-auto pt-15">
        <ReportSidebar report={report} />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
