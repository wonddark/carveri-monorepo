import { ArrowRight, ArrowRightIcon, CheckIcon, StarIcon } from "lucide-react";

function ReportPackagesPrice() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
      <div
        data-slot="card"
        className="bg-card text-card-foreground relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-gray-200 py-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div
          data-slot="card-content"
          className="flex h-full flex-col p-5 lg:p-6"
        >
          <div>
            <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
              Single Report
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-gray-900 lg:text-3xl">
                $29.99
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">1 report · $29.99 each</p>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            data-slot="separator"
            className="my-4 shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
          ></div>
          <ul className="flex-1 space-y-2">
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>1 Vehicle History Report</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Trust Score</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>5 Comparable Listings</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>PDF Download</span>
            </li>
          </ul>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[&gt;svg]:px-3 font-heading mt-5 inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-all outline-none hover:bg-gray-800 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          >
            Buy Single Report
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        data-slot="card"
        className="bg-card text-card-foreground relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-blue-200 py-6 shadow-lg ring-2 ring-blue-600 transition-shadow hover:shadow-md"
      >
        <div className="absolute top-0 right-0">
          <div className="rounded-bl-lg bg-blue-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
            <StarIcon className="-mt-0.5 mr-1 inline h-3 w-3" />
            Most Popular
          </div>
        </div>
        <div
          data-slot="card-content"
          className="flex h-full flex-col p-5 lg:p-6"
        >
          <div>
            <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
              Smart Buyer
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-gray-900 lg:text-3xl">
                $49.99
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              3 reports · $16.66 each
            </p>
            <span
              data-slot="badge"
              className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-primary/90 mt-2 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-700 transition-[color,box-shadow] focus-visible:ring-[3px]"
            >
              Save 44%
            </span>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            data-slot="separator"
            className="my-4 shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
          ></div>
          <ul className="flex-1 space-y-2">
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>3 Vehicle History Reports</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Trust Score</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>5 Comparable Listings per Report</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>PDF Download</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Priority Support</span>
            </li>
          </ul>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[&gt;svg]:px-3 font-heading mt-5 inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-all outline-none hover:bg-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          >
            Buy Smart Buyer
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        data-slot="card"
        className="bg-card text-card-foreground relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-gray-200 py-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div
          data-slot="card-content"
          className="flex h-full flex-col p-5 lg:p-6"
        >
          <div>
            <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
              Best Value
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-gray-900 lg:text-3xl">
                $69.99
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              5 reports · $14.00 each
            </p>
            <span
              data-slot="badge"
              className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-primary/90 mt-2 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-700 transition-[color,box-shadow] focus-visible:ring-[3px]"
            >
              Save 53%
            </span>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            data-slot="separator"
            className="my-4 shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
          ></div>
          <ul className="flex-1 space-y-2">
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />\
              <span>5 Vehicle History Reports</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Trust Score</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>5 Comparable Listings per Report</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>PDF Download</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Priority Support</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-gray-700 lg:text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Save Reports for Later</span>
            </li>
          </ul>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[&gt;svg]:px-3 font-heading mt-5 inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-all outline-none hover:bg-gray-800 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
          >
            Buy Best Value
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPackagesPrice;
