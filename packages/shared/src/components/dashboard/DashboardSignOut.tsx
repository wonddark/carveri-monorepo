import { LogOutIcon } from "lucide-react";

function DashboardSignOut() {
  return (
    <div>
      <button
        data-slot="button"
        className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-2.5 inline-flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-transparent px-3 text-sm font-semibold whitespace-nowrap text-red-600 shadow-xs transition-all outline-none hover:bg-red-50 hover:text-red-700 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:w-auto dark:bg-transparent"
      >
        <LogOutIcon className="mr-2 size-4" />
        Sign Out
      </button>
    </div>
  );
}

export default DashboardSignOut;
