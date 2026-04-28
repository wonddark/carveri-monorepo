import { ChevronRightIcon, DownloadIcon, EyeIcon } from "lucide-react";
import { Link } from "react-router";

type ReportRowProps = {
  imgSrc: string;
  title: string;
  vin: string;
  id: string;
  date: string;
};
function ReportRowDesktop(props: Readonly<ReportRowProps>) {
  const { imgSrc, title, vin, id, date } = props;
  return (
    <tr
      data-slot="table-row"
      className="data-[state=selected]:bg-muted border-b border-gray-100 transition-colors hover:bg-gray-50/50"
    >
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
      >
        <div className="flex items-center gap-3">
          <img
            alt="2023 Honda Accord"
            className="h-10 w-14 rounded bg-gray-100 object-cover"
            src={imgSrc}
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="font-mono text-[11px] text-gray-400">{vin}</p>
          </div>
        </div>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <span className="font-mono text-xs text-gray-500">{id}</span>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
      >
        <span className="text-xs text-gray-500">{date}</span>
      </td>
      <td
        data-slot="table-cell"
        className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
      >
        <div className="flex items-center justify-end gap-1">
          <Link to={`/reports/${id}`}>
            <button
              data-slot="button"
              className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-blue-600 transition-all outline-none hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            >
              View
            </button>
          </Link>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-7 w-7 shrink-0 items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap text-gray-400 transition-all outline-none hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          >
            <DownloadIcon className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
function ReportRowMobile(props: Readonly<ReportRowProps>) {
  const { imgSrc, title, vin, id, date } = props;
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        alt="2023 Honda Accord"
        className="h-10 w-14 shrink-0 rounded bg-gray-100 object-cover"
        src={imgSrc}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
        <p className="truncate font-mono text-[10px] text-gray-400">{vin}</p>
        <p className="mt-0.5 text-[10px] text-gray-400">{date}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          data-slot="button"
          className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap text-blue-600 transition-all outline-none hover:bg-blue-50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
        >
          <EyeIcon className="size-4" />
        </button>
        <button
          data-slot="button"
          className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-1.5 rounded-md p-0 text-sm font-medium whitespace-nowrap text-gray-400 transition-all outline-none hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
        >
          <DownloadIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

function RecentReports() {
  return (
    <div style={{ opacity: 1, transform: "none" }}>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 pb-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] lg:pb-3 [.border-b]:pb-6"
        >
          <div className="flex items-center justify-between">
            <div
              data-slot="card-title"
              className="font-heading text-base font-semibold text-gray-900"
            >
              Recent Reports
            </div>
            <Link href="/dashboard/reports">
              <button
                data-slot="button"
                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium whitespace-nowrap text-gray-500 transition-all outline-none hover:text-gray-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                View All
                <ChevronRightIcon className="ml-1 size-3" />
              </button>
            </Link>
          </div>
        </div>
        <div data-slot="card-content" className="px-0 pb-2">
          <div className="hidden md:block">
            <div
              data-slot="table-container"
              className="relative w-full overflow-x-auto"
            >
              <table
                data-slot="table"
                className="w-full caption-bottom text-sm"
              >
                <thead data-slot="table-header" className="[&amp;_tr]:border-b">
                  <tr
                    data-slot="table-row"
                    className="data-[state=selected]:bg-muted border-b border-gray-200 transition-colors hover:bg-transparent"
                  >
                    <th
                      data-slot="table-head"
                      className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 pl-6 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
                    >
                      Vehicle
                    </th>
                    <th
                      data-slot="table-head"
                      className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
                    >
                      Report ID
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
                  {[].map((item) => (
                    <ReportRowDesktop
                      imgSrc={""}
                      title={""}
                      vin={""}
                      id={""}
                      date={""}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-gray-100 md:hidden">
            {[].map((item) => (
              <ReportRowMobile
                imgSrc={""}
                title={""}
                vin={""}
                id={""}
                date={""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentReports;
