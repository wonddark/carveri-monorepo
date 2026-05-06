import { CalendarIcon, CircleCheckIcon, TrendingDownIcon } from "lucide-react";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

type Props = {
  report: TransformedReport;
};
function VehicleSummary(props: Readonly<Props>) {
  const { report } = props;
  return (
    <div data-loc="client/src/components/ScrollReveal.tsx:46" className="">
      <div
        data-loc="client/src/pages/VDP.tsx:378"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        <div
          data-loc="client/src/pages/VDP.tsx:382"
          className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3"
        >
          <CircleCheckIcon className="size-5 shrink-0 text-blue-600" />
          <div data-loc="client/src/pages/VDP.tsx:384">
            <div
              data-loc="client/src/pages/VDP.tsx:385"
              className="text-xs font-semibold text-blue-700"
            >
              Título
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:386"
              className="text-sm font-medium text-gray-800"
            >
              {report.title}
            </div>
          </div>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:382"
          className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3"
        >
          <CircleCheckIcon className="size-5 shrink-0 text-blue-600" />
          <div data-loc="client/src/pages/VDP.tsx:384">
            <div
              data-loc="client/src/pages/VDP.tsx:385"
              className="text-xs font-semibold text-blue-700"
            >
              Accidentes
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:386"
              className="text-sm font-medium text-gray-800"
            >
              {report.summary?.accidentsReported || 0} reported
            </div>
          </div>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:382"
          className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3"
        >
          <CircleCheckIcon className="size-5 shrink-0 text-blue-600" />
          <div data-loc="client/src/pages/VDP.tsx:384">
            <div
              data-loc="client/src/pages/VDP.tsx:385"
              className="text-xs font-semibold text-blue-700"
            >
              Odómetro
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:386"
              className="text-sm font-medium text-gray-800"
            >
              {report.summary?.odometerVerified || "-"}
            </div>
          </div>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:382"
          className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3"
        >
          <CircleCheckIcon className="size-5 shrink-0 text-blue-600" />
          <div data-loc="client/src/pages/VDP.tsx:384">
            <div
              data-loc="client/src/pages/VDP.tsx:385"
              className="text-xs font-semibold text-blue-700"
            >
              Precio
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:386"
              className="text-sm font-medium text-gray-800"
            >
              {report.summary?.verdict || "-"} (-2.8%)
            </div>
          </div>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:396"
          className="flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3"
        >
          <CalendarIcon className="h-5 w-5 shrink-0 text-amber-600" />
          <div data-loc="client/src/pages/VDP.tsx:398">
            <div
              data-loc="client/src/pages/VDP.tsx:399"
              className="text-xs font-semibold text-amber-700"
            >
              Días en el Lote
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:400"
              className="text-sm font-medium text-gray-800"
            >
              {report.daysOnLot} días
            </div>
          </div>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:410"
          className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3"
        >
          <TrendingDownIcon className="size-5 shrink-0 text-red-600" />
          <div data-loc="client/src/pages/VDP.tsx:412" className="min-w-0">
            <div
              data-loc="client/src/pages/VDP.tsx:413"
              className="text-xs font-semibold text-red-700"
            >
              Tendencia
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:414"
              className="truncate text-sm font-medium text-gray-800"
            >
              <span>↓4 (-$2,444)</span>
              <span
                data-loc="client/src/pages/VDP.tsx:414"
                className="ml-1 text-xs text-gray-500"
              >
                26d
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleSummary;
