import { DollarSignIcon, ReceiptIcon } from "lucide-react";

function TransactionsOverview() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4">
      <div>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
        >
          <div
            data-slot="card-content"
            className="flex items-center gap-3 p-3 lg:p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 lg:h-10 lg:w-10">
              <DollarSignIcon className="size-4 text-blue-600 lg:size-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 lg:text-xs">
                Total Spent
              </p>
              <p className="font-heading text-lg font-bold text-gray-900 lg:text-xl">
                $79.98
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
        >
          <div
            data-slot="card-content"
            className="flex items-center gap-3 p-3 lg:p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 lg:h-10 lg:w-10">
              <ReceiptIcon className="size-4 text-emerald-600 lg:size-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 lg:text-xs">
                Transactions
              </p>
              <p className="font-heading text-lg font-bold text-gray-900 lg:text-xl">
                5
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsOverview;
