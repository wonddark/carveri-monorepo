import { DollarSignIcon, FileTextIcon, TrendingUpIcon } from "lucide-react";

function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-4">
      <div style={{ opacity: 1, transform: "none" }}>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
        >
          <div data-slot="card-content" className="p-3 lg:p-4">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-3 lg:text-left">
              <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 lg:mb-0 lg:h-10 lg:w-10">
                <FileTextIcon className="size-4 text-blue-600 lg:size-5" />
              </div>
              <div>
                <p className="text-[9px] leading-tight font-medium text-gray-400 lg:text-[11px]">
                  Reports This Month
                </p>
                <p className="font-heading text-lg font-bold text-gray-900 lg:text-xl">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ opacity: 1, transform: "none" }}>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
        >
          <div data-slot="card-content" className="p-3 lg:p-4">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-3 lg:text-left">
              <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 lg:mb-0 lg:h-10 lg:w-10">
                <DollarSignIcon className="size-4 text-emerald-600 lg:size-5" />
              </div>
              <div>
                <p className="text-[9px] leading-tight font-medium text-gray-400 lg:text-[11px]">
                  Total Spent
                </p>
                <p className="font-heading text-lg font-bold text-gray-900 lg:text-xl">
                  $186
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ opacity: 1, transform: "none" }}>
        <div
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
        >
          <div data-slot="card-content" className="p-3 lg:p-4">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-3 lg:text-left">
              <div className="mb-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 lg:mb-0 lg:h-10 lg:w-10">
                <TrendingUpIcon className="size-4 text-blue-600 lg:size-5" />
              </div>
              <div>
                <p className="text-[9px] leading-tight font-medium text-gray-400 lg:text-[11px]">
                  Reports Generated
                </p>
                <p className="font-heading text-lg font-bold text-gray-900 lg:text-xl">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
