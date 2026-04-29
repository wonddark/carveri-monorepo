import { ZapIcon } from "lucide-react";

function BuyReportsHeader() {
  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-gray-900 lg:text-2xl">
            Buy Reports
          </h1>
          <p className="mt-0.5 max-w-lg text-xs text-gray-500 lg:text-sm">
            Check the history of any vehicle before you buy it. The more cars
            you're comparing, the more you save per report.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg bg-blue-50 px-3 py-2 lg:self-auto lg:px-4 lg:py-2.5">
          <ZapIcon className="size-4 shrink-0 text-blue-600" />
          <span className="text-xs text-gray-600 lg:text-sm">
            Current balance:
          </span>
          <span className="font-heading text-base font-bold text-blue-700 lg:text-lg">
            2
          </span>
          <span className="text-xs text-gray-500 lg:text-sm">reports</span>
        </div>
      </div>
    </div>
  );
}

export default BuyReportsHeader;
