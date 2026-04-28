import { ChevronRightIcon, ClockIcon } from "lucide-react";
import { cn } from "@carveri/shared/lib/utils.ts";

const TRANSACTIONS = [
  {
    date: "Apr 25, 2026, 3:38 PM",
    id: "ORD-8F03DFD",
    vin: "1HGCV1F34PA012345",
    status: "pending",
    amount: null,
  },
  {
    date: "Apr 22, 2026, 10:15 AM",
    id: "ORD-7A12BCE",
    vin: "3 Reports",
    status: "success",
    amount: 49.99,
  },
  {
    date: "Apr 18, 2026, 2:20 PM",
    id: "ORD-6C09AAF",
    vin: "5YJSA1E26MF123456",
    status: "failed",
    amount: null,
  },
  {
    date: "Apr 10, 2026, 9:45 AM",
    id: "ORD-5B08DDE",
    vin: "Single Report",
    status: "success",
    amount: 29.99,
  },
];

type TransactionItemProps = {
  date: string;
  id: string;
  vin: string;
  status: string;
  amount: number | null;
};
function TransactionItemDesktop(props: Readonly<TransactionItemProps>) {
  const { date, id, vin, status, amount } = props;
  return (
    <tr
      data-slot="table-row"
      className="data-[state=selected]:bg-muted border-b border-gray-100 transition-colors hover:bg-gray-50/50"
    >
      <td
        data-slot="table-cell"
        className="p-2 pl-6 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
      >
        <div className="flex items-center gap-2">
          <ClockIcon className="size-3.5 text-gray-300" />
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </td>
      <td
        data-slot="table-cell"
        className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
      >
        <span className="font-mono text-xs text-gray-500">{id}</span>
      </td>
      <td
        data-slot="table-cell"
        className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
      >
        <span className="text-sm text-gray-900">
          Vehicle History Report — {vin}
        </span>
      </td>
      <td
        data-slot="table-cell"
        className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
      >
        <span
          data-slot="badge"
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "aria-invalid:border-destructive [a&]:hover:bg-secondary/90",
            "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1",
            "overflow-hidden rounded-md border-0 border-transparent bg-emerald-50",
            "px-2 py-0 text-[10px] font-semibold tracking-wider whitespace-nowrap",
            "text-emerald-700 uppercase transition-[color,box-shadow]",
            "focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
            {
              "bg-slate-50 text-slate-700": status === "pending",
              "bg-red-50 text-red-700": status === "failed",
            },
          )}
        >
          {status}
        </span>
      </td>
      <td
        data-slot="table-cell"
        className="p-2 pr-6 text-right align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
      >
        <span className="text-sm font-semibold text-gray-400">
          {amount ? `$${amount.toFixed(2)}` : "-"}
        </span>
      </td>
    </tr>
  );
}
function TransactionItemMobile(props: Readonly<TransactionItemProps>) {
  const { date, vin, status, amount } = props;
  return (
    <div className="px-4 py-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="mr-2 flex-1 truncate text-sm font-medium text-gray-900">
          Vehicle History Report — {vin}
        </p>
        <span className="shrink-0 text-sm font-bold text-gray-400">
          {amount ?? "-"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-400">{date}</span>
        <span className="text-[10px] text-gray-300">•</span>
        <span
          data-slot="badge"
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "aria-invalid:border-destructive [a&]:hover:bg-secondary/90",
            "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1",
            "overflow-hidden rounded-md border-0 border-transparent",
            "bg-emerald-50 px-2 py-0 text-[10px] font-semibold tracking-wider",
            "whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow]",
            "focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
            {
              "bg-slate-50 text-slate-700": status === "pending",
              "bg-red-50 text-red-700": status === "failed",
            },
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function RecentTransactions() {
  return (
    <div className="lg:col-span-2" style={{ opacity: 1, transform: "none" }}>
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
              Recent Transactions
            </div>
            <a href="/transactions">
              <button
                data-slot="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium whitespace-nowrap text-gray-500 transition-all outline-none hover:text-gray-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                View All
                <ChevronRightIcon className="ml-1 size-3" />
              </button>
            </a>
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
                <thead data-slot="table-header" className="[&_tr]:border-b">
                  <tr
                    data-slot="table-row"
                    className="data-[state=selected]:bg-muted border-b border-gray-200 transition-colors hover:bg-transparent"
                  >
                    <th
                      data-slot="table-head"
                      className="h-10 px-2 pl-6 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
                    >
                      Date
                    </th>
                    <th
                      data-slot="table-head"
                      className="h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
                    >
                      Order ID
                    </th>
                    <th
                      data-slot="table-head"
                      className="h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
                    >
                      Description
                    </th>
                    <th
                      data-slot="table-head"
                      className="h-10 px-2 text-left align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
                    >
                      Status
                    </th>
                    <th
                      data-slot="table-head"
                      className="h-10 px-2 pr-6 text-right align-middle text-[11px] font-semibold tracking-wider whitespace-nowrap text-gray-400 uppercase [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody
                  data-slot="table-body"
                  className="[&_tr:last-child]:border-0"
                >
                  {TRANSACTIONS.map((item) => (
                    <TransactionItemDesktop key={item.id} {...item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-gray-100 md:hidden">
            {TRANSACTIONS.map((item) => (
              <TransactionItemMobile key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;
