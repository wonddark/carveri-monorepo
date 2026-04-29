import { TriangleAlertIcon } from "lucide-react";

function BuyReportsLearnMore() {
  return (
    <div>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div data-slot="card-content" className="p-5 lg:p-8">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 lg:h-14 lg:w-14">
              <TriangleAlertIcon className="lucide lucide-triangle-alert h-6 w-6 text-amber-600 lg:h-7 lg:w-7" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading text-base font-bold text-gray-900 lg:text-lg">
                Why Check Before You Buy?
              </h3>
              <p className="mt-1 max-w-lg text-xs text-gray-500 lg:text-sm">
                A single report can save you thousands by revealing hidden
                accidents, title issues, odometer rollbacks, and unreliable
                sellers. Don't risk your money on a vehicle you haven't
                verified.
              </p>
            </div>
            <button
              data-slot="button"
              className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-3 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-semibold whitespace-nowrap text-gray-700 shadow-xs transition-all outline-none hover:bg-gray-50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyReportsLearnMore;
