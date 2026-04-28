import { ChevronRightIcon, ShieldCheckIcon } from "lucide-react";

function AvailableReports() {
  return (
    <div style={{ opacity: 1, transform: "none" }}>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex h-full flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div
          data-slot="card-content"
          className="flex h-full flex-col justify-between p-5 lg:p-6"
        >
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Your Reports
            </p>
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 lg:h-20 lg:w-20">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                  ></circle>
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="143.112 213.6"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-base font-bold text-gray-900 lg:text-lg">
                    2
                  </span>
                  <span className="text-[8px] text-gray-400 lg:text-[9px]">
                    / 3
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Available Reports
                </p>
                <p className="mt-0.5 text-xs text-gray-400">2 of 3 remaining</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Each report includes:
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheckIcon className="size-3 shrink-0 text-emerald-500" />
                <span>Full Vehicle History</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheckIcon className="size-3 shrink-0 text-emerald-500" />
                <span>Trust Score</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheckIcon className="size-3 shrink-0 text-emerald-500" />
                <span>5 Market Comparables</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <ShieldCheckIcon className="size-3 shrink-0 text-emerald-500" />
                <span>PDF Download</span>
              </div>
            </div>
          </div>
          <a href="/buy-credits">
            <button
              data-slot="button"
              className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[&gt;svg]:px-3 font-heading mt-4 inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-all outline-none hover:bg-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            >
              Get More Reports
              <ChevronRightIcon className="ml-2 size-4" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AvailableReports;
