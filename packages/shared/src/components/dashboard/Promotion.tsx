import {
  ArrowRightIcon,
  BookmarkIcon,
  FileCheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Link } from "react-router";

function Promotion() {
  return (
    <div style={{ opacity: 1, transform: "none" }}>
      <div
        data-slot="card"
        className="bg-card text-card-foreground relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              'url("https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/bCnAe2mi6AFmpHe6bthNAZ/carveri-packages-promo-2MJ5Rd3rVYzwFjMUMKgx58.webp")',
          }}
        ></div>
        <div
          data-slot="card-content"
          className="relative flex h-full flex-col justify-between p-5 lg:p-6"
        >
          <div>
            <span
              data-slot="badge"
              className="[&&gt;svg]:size-3 [&&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&]:hover:bg-primary/90 mb-2 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider whitespace-nowrap text-emerald-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
            >
              Save up to 53%
            </span>
            <h3 className="font-heading mb-1.5 text-base font-bold text-gray-900 lg:text-lg">
              Compare Before You Buy
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 lg:text-sm">
              Get 5 reports for just $14 each. Check multiple vehicles side by
              side and make a confident decision.
            </p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-700 lg:text-sm">
                <ShieldCheckIcon className="size-3.5 shrink-0 text-emerald-600" />
                <span>Trust Score on every report</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 lg:text-sm">
                <FileCheckIcon className="size-3.5 shrink-0 text-emerald-600" />
                <span>5 comparable listings per report</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 lg:text-sm">
                <BookmarkIcon className="size-3.5 shrink-0 text-emerald-600" />
                <span>Save reports for later review</span>
              </div>
            </div>
          </div>
          <Link to="/dashboard/buy-credits">
            <button
              data-slot="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[&gt;svg]:px-3 font-heading mt-4 inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-sm transition-all outline-none hover:bg-blue-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              View All Packages
              <ArrowRightIcon className="ml-1 size-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
