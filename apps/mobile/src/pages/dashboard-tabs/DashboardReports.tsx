import { useRouteLoaderData } from "react-router";
import type { DashboardData } from "@carveri/shared/types/dashboard.ts";
import { DownloadIcon, EyeIcon } from "lucide-react";
import { Link } from "react-router";

type ReportCardProps = {
  imgSrc: string;
  title: string;
  vin: string;
  id: string;
  date: string | null;
};

function ReportCard(props: Readonly<ReportCardProps>) {
  const { imgSrc, title, vin, id, date } = props;
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        alt={title}
        className="h-14 w-20 shrink-0 rounded-lg bg-gray-100 object-cover"
        src={imgSrc}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
        <p className="truncate font-mono text-[10px] text-gray-400">{vin}</p>
        {date && (
          <p className="mt-0.5 text-[10px] text-gray-400">
            {Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(date))}
          </p>
        )}
        <div className="mt-2 flex gap-2">
          <Link
            to={`/reports/${id}`}
            className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-blue-200 text-xs font-medium text-blue-600 hover:bg-blue-50"
          >
            <EyeIcon className="size-3.5" />
            View Report
          </Link>
          <button className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:text-gray-600">
            <DownloadIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

type DashboardReportsProps = Record<string, never>;

function DashboardReports(props: Readonly<DashboardReportsProps>) {
  const {} = props;
  const data = useRouteLoaderData("dashboard") as DashboardData;
  const reports = data?.reports ?? [];

  return (
    <div className="py-5">
      <div className="mb-4 px-4">
        <h1 className="text-xl font-bold text-gray-900">My Reports</h1>
        <p className="mt-0.5 text-xs text-gray-500">
          {reports.length} reports generated
        </p>
      </div>

      <div className="bg-card rounded-xl border border-gray-200 shadow-sm">
        <div className="divide-y divide-gray-100">
          {reports.map((item) => (
            <ReportCard
              key={item.id}
              imgSrc={item.imageThumbnail}
              title={item.vehicleName}
              vin={item.vin}
              id={item.id}
              date={item.deliveredAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardReports;
