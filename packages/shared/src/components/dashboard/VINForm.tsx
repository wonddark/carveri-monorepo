import { ArrowRightIcon, InfoIcon, SearchIcon } from "lucide-react";

function VinForm() {
  return (
    <div className="lg:col-span-2" style={{ opacity: 1, transform: "none" }}>
      <div
        data-slot="card"
        className="bg-card text-card-foreground relative flex flex-col gap-6 overflow-hidden rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{
            backgroundImage:
              'url("https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/bCnAe2mi6AFmpHe6bthNAZ/carveri-hero-banner-g5nTJuP5yrxG7ummNVBbnu.webp")',
          }}
        ></div>
        <div data-slot="card-content" className="relative p-5 lg:p-8">
          <span
            data-slot="badge"
            className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-primary/90 mb-2 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider whitespace-nowrap text-blue-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
          >
            Generate New Report
          </span>
          <h2 className="font-heading mb-1 text-lg font-bold text-gray-900 lg:text-2xl">
            Check Any Vehicle Instantly
          </h2>
          <p className="mb-4 max-w-lg text-xs text-gray-500 lg:text-sm">
            Enter a VIN to get a comprehensive history report with Trust Score
            and market comparables before you buy.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-11 w-full min-w-0 rounded-md border border-gray-200 bg-white px-3 py-1 pl-9 font-mono text-sm tracking-wider shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm lg:h-12 lg:text-base"
                placeholder="Enter VIN Number (17 characters)"
                maxLength={17}
                value=""
              />
              <span className="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[11px] text-gray-300">
                0/17
              </span>
            </div>
            <button
              data-slot="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-heading inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-bold whitespace-nowrap text-white shadow-sm transition-all outline-none hover:bg-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 lg:h-12 lg:px-8 lg:text-base [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              Check VIN
              <ArrowRightIcon className="ml-2 size-4" />
            </button>
          </div>
          <p className="mt-2.5 flex items-center gap-1 text-[10px] text-gray-400 lg:text-[11px]">
            <InfoIcon className="size-3" />
            Uses 1 of your available reports
          </p>
        </div>
      </div>
    </div>
  );
}

export default VinForm;
