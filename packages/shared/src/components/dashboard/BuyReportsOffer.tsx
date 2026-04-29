import { GiftIcon } from "lucide-react";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

function BuyReportsOffer() {
  return (
    <Card className="bg-linear-to-r from-blue-700 to-blue-600 py-6 text-white shadow-sm">
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 lg:h-10 lg:w-10">
            <GiftIcon className="size-4 text-blue-100 lg:h-5 lg:w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Limited Time Offer</p>
            <p className="text-xs text-blue-100/70">
              Use code CARVERI25 for 25% off your first Best Value pack
              purchase.
            </p>
          </div>
          <button
            data-slot="button"
            className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-2.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 self-start rounded-md border border-white/25 bg-transparent px-3 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-all outline-none hover:bg-white/10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:self-auto dark:bg-transparent"
          >
            Copy Code
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default BuyReportsOffer;
