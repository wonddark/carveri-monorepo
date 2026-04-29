import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@carveri/shared/components/ui/combobox.tsx";
import { InputGroupAddon } from "@carveri/shared/components/ui/input-group.tsx";
import { FunnelIcon, SearchIcon } from "lucide-react";

type Status = { value: string; label: string };
const STATUSES: Status[] = [
  { value: "all", label: "All Status" },
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

function TransactionsSearch() {
  return (
    <div>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div data-slot="card-content" className="p-3 lg:p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 pl-9 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="Search by order ID or description..."
                value=""
              />
            </div>

            <Combobox
              items={STATUSES}
              defaultValue={STATUSES[0]}
              itemToStringValue={(status: Status) => status.value}
            >
              <ComboboxInput className="w-auto min-w-25 lg:w-40">
                <InputGroupAddon align="inline-start">
                  <FunnelIcon />
                </InputGroupAddon>
              </ComboboxInput>
              <ComboboxContent>
                <ComboboxList>
                  {(status: Status) => (
                    <ComboboxItem key={status.value} value={status.value}>
                      {status.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsSearch;
