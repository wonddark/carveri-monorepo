import { ClockIcon, DownloadIcon, FileCheckIcon } from "lucide-react";

function TransactionsHistoryDesktop() {
  return (
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
              Date
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Order ID
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Description
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Payment Method
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Status
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 text-right align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Amount
            </th>
            <th
              data-slot="table-head"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] h-10 px-2 pr-6 text-right align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase"
            >
              Invoice
            </th>
          </tr>
        </thead>
        <tbody
          data-slot="table-body"
          className="[&amp;_tr:last-child]:border-0"
        >
          <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="size-3.5 text-gray-300" />

                <span className="text-xs whitespace-nowrap text-gray-500">
                  Apr 25, 2026, 3:38 PM
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="font-mono text-xs text-gray-500">
                ORD-8F03DFD
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-sm text-gray-900">
                Vehicle History Report — 1HGCV1F34PA012345
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5">
                <FileCheckIcon className="size-3.5 text-blue-500" />
                <span className="text-xs font-medium text-blue-600">
                  Report Used
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span
                data-slot="badge"
                className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                Success
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 text-right align-middle whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-gray-400">—</span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
            ></td>
          </tr>
          <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="size-3.5 text-gray-300" />
                <span className="text-xs whitespace-nowrap text-gray-500">
                  Apr 22, 2026, 10:15 AM
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="font-mono text-xs text-gray-500">
                ORD-7A12BCE
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-sm text-gray-900">
                Smart Buyer Pack — 3 Reports
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-xs text-gray-500">Visa ****4242</span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span
                data-slot="badge"
                className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                Success
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 text-right align-middle whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-gray-900">
                $49.99
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
            >
              <button
                data-slot="button"
                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-gray-400 opacity-50 transition-opacity outline-none group-hover:opacity-100 hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                <DownloadIcon className="size-3.5" />
              </button>
            </td>
          </tr>
          <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="size-3.5 text-gray-300" />
                <span className="text-xs whitespace-nowrap text-gray-500">
                  Apr 18, 2026, 2:20 PM
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="font-mono text-xs text-gray-500">
                ORD-6C09AAF
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-sm text-gray-900">
                Vehicle History Report — 5YJSA1E26MF123456
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5">
                <FileCheckIcon className="size-3.5 text-blue-500" />
                <span className="text-xs font-medium text-blue-600">
                  Report Used
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span
                data-slot="badge"
                className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                Success
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 text-right align-middle whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-gray-400">—</span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
            ></td>
          </tr>
          <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="size-3.5 text-gray-300" />
                <span className="text-xs whitespace-nowrap text-gray-500">
                  Apr 10, 2026, 9:45 AM
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="font-mono text-xs text-gray-500">
                ORD-5B08DDE
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-sm text-gray-900">
                Single Report Purchase
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-xs text-gray-500">Visa ****4242</span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span
                data-slot="badge"
                className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                Success
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 text-right align-middle whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-gray-900">
                $29.99
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
            >
              <button
                data-slot="button"
                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-gray-400 opacity-50 transition-opacity outline-none group-hover:opacity-100 hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                <DownloadIcon className="size-3.5" />
              </button>
            </td>
          </tr>
          <tr className="group border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/50">
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pl-6 align-middle whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="size-3.5 text-gray-300" />
                <span className="text-xs whitespace-nowrap text-gray-500">
                  Mar 28, 2026, 4:12 PM
                </span>
              </div>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="font-mono text-xs text-gray-500">
                ORD-4A07CCB
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-sm text-gray-900">
                Single Report Purchase
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span className="text-xs text-gray-500">Visa ****4242</span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 align-middle whitespace-nowrap"
            >
              <span
                data-slot="badge"
                className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-blue-50 px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap text-blue-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                Refunded
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 text-right align-middle whitespace-nowrap"
            >
              <span className="text-sm font-semibold text-gray-900">
                $29.99
              </span>
            </td>
            <td
              data-slot="table-cell"
              className="[&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px] p-2 pr-6 text-right align-middle whitespace-nowrap"
            >
              <button
                data-slot="button"
                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 has-[&gt;svg]:px-2.5 inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-gray-400 opacity-50 transition-opacity outline-none group-hover:opacity-100 hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              >
                <DownloadIcon className="size-3.5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsHistoryDesktop;
