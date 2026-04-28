import {
  ArrowDownWideNarrowIcon,
  DownloadIcon,
  EyeIcon,
  SearchIcon,
} from "lucide-react";
import { Link, useRouteLoaderData } from "react-router";
import type {
  DashboardData,
  ReportOrderItem,
} from "@carveri/shared/types/dashboard.ts";

type ReportItemProps = {
  imgSrc: string;
  title: string;
  trim: string;
  vin: string;
  id: string;
  date: string | null;
};
function ReportItemDesktop(props: Readonly<ReportItemProps>) {
  const { imgSrc, title, trim, vin, id, date } = props;
  return (
    <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
      >
        <img
          alt="2023 Honda Accord"
          className="h-11 w-16 rounded bg-gray-100 object-cover"
          src={imgSrc}
        />
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-400">{trim}</p>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <span className="font-mono text-xs tracking-wide text-gray-500">
          {vin}
        </span>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <p className="font-mono text-xs text-gray-900">{`${id.slice(0, 4)}...${id.slice(-4)}`}</p>
        <p className="text-[11px] text-gray-400">Vehicle History Report</p>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <span className="text-xs text-gray-500">
          {date
            ? Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(date))
            : "--"}
        </span>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
      >
        <div className="flex items-center justify-end gap-1 opacity-50 transition-opacity group-hover:opacity-100">
          <Link to={`/reports/${id}`}>
            <button
              data-slot="button"
              className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium whitespace-nowrap text-blue-600 transition-all outline-none hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            >
              <EyeIcon className="mr-1 size-3.5" />
              View Report
            </button>
          </Link>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-gray-400 transition-all outline-none hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          >
            <DownloadIcon className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
function ReportItemMobile(props: Readonly<ReportItemProps>) {
  const { imgSrc, title, vin, id, date } = props;
  return (
    <div data-loc="client/src/pages/MyReports.tsx:167" className="p-3">
      <div data-loc="client/src/pages/MyReports.tsx:174" className="flex gap-3">
        <img
          data-loc="client/src/pages/MyReports.tsx:175"
          alt="2023 Honda Accord"
          className="h-14 w-20 shrink-0 rounded-lg bg-gray-100 object-cover"
          src={imgSrc}
        />
        <div
          data-loc="client/src/pages/MyReports.tsx:180"
          className="min-w-0 flex-1"
        >
          <p
            data-loc="client/src/pages/MyReports.tsx:181"
            className="truncate text-sm font-semibold text-gray-900"
          >
            {title}
          </p>
          <p
            data-loc="client/src/pages/MyReports.tsx:184"
            className="truncate font-mono text-[10px] text-gray-400"
          >
            {vin}
          </p>
          <div
            data-loc="client/src/pages/MyReports.tsx:185"
            className="mt-1 flex items-center gap-2"
          >
            <span
              data-loc="client/src/pages/MyReports.tsx:186"
              className="text-[10px] text-gray-400"
            >
              {`${id.slice(0, 4)}...${id.slice(-4)}`}
            </span>
            <span
              data-loc="client/src/pages/MyReports.tsx:187"
              className="text-[10px] text-gray-300"
            >
              •
            </span>
            <span
              data-loc="client/src/pages/MyReports.tsx:188"
              className="text-[10px] text-gray-400"
            >
              {date
                ? Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(date))
                : "--"}
            </span>
          </div>
        </div>
      </div>
      <div
        data-loc="client/src/pages/MyReports.tsx:192"
        className="mt-2 flex items-center gap-2 pl-23"
      >
        <button
          data-loc="client/src/pages/MyReports.tsx:193"
          data-slot="button"
          className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-2.5 inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-blue-200 bg-transparent px-3 text-xs font-medium whitespace-nowrap text-blue-600 shadow-xs transition-all outline-none hover:bg-blue-50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent"
        >
          <EyeIcon className="mr-1.5 size-3.5" />
          View Report
        </button>
        <button
          data-loc="client/src/pages/MyReports.tsx:202"
          data-slot="button"
          className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-2.5 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-transparent p-0 text-sm font-medium whitespace-nowrap text-gray-400 shadow-xs transition-all outline-none hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent"
        >
          <DownloadIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function ReportsListDesktop(props: Readonly<{ reports: ReportOrderItem[] }>) {
  const { reports } = props;
  return (
    <div className="hidden md:block">
      <div
        data-slot="table-container"
        className="relative w-full overflow-x-auto"
      >
        <table data-slot="table" className="w-full caption-bottom text-sm">
          <thead data-slot="table-header" className="[&amp;_tr]:border-b">
            <tr
              data-slot="table-row"
              className="data-[state=selected]:bg-muted border-b border-gray-200 transition-colors hover:bg-transparent"
            >
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 pl-6 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                Photo
              </th>
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                Year / Make / Model
              </th>
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                VIN
              </th>
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                Report ID / Type
              </th>
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                Date
              </th>
              <th
                data-slot="table-head"
                className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 pr-6 text-right align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody
            data-slot="table-body"
            className="[&amp;_tr:last-child]:border-0"
          >
            {reports.map((item) => (
              <ReportItemDesktop
                key={item.id}
                vin={item.vin}
                date={item.deliveredAt}
                id={item.id}
                imgSrc={item.imageThumbnail}
                trim=""
                title={item.vehicleName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsListMobile(props: Readonly<{ reports: ReportOrderItem[] }>) {
  const { reports } = props;
  return (
    <div
      data-loc="client/src/pages/MyReports.tsx:165"
      className="divide-y divide-gray-100 md:hidden"
    >
      {reports.map((item) => (
        <ReportItemMobile
          key={item.id}
          imgSrc={item.imageThumbnail}
          title={item.vehicleName}
          trim=""
          vin={item.vin}
          id={item.id}
          date={item.deliveredAt}
        />
      ))}
    </div>
  );
}

function Reports() {
  const loadedData = useRouteLoaderData("dashboard") as DashboardData;
  const reports = loadedData.reports;
  return (
    <main className="flex-1 p-6">
      <div className="space-y-4 lg:space-y-6">
        <div style={{ opacity: 1, transform: "none" }}>
          <h1 className="font-heading text-xl font-bold text-gray-900 lg:text-2xl">
            My Reports
          </h1>
          <p className="mt-0.5 text-xs text-gray-500 lg:text-sm">
            5 reports generated
          </p>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
          >
            <div data-slot="card-content" className="p-3 lg:p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    data-slot="input"
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 pl-9 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Search by VIN, make, model, or year..."
                    value=""
                  />
                </div>
                <button
                  data-slot="button"
                  className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:border-input dark:hover:bg-input/50 inline-flex size-9 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent"
                >
                  <ArrowDownWideNarrowIcon className="size-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
          >
            <div data-slot="card-content" className="p-0">
              <ReportsListDesktop reports={reports} />
              <ReportsListMobile reports={reports} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Reports;
