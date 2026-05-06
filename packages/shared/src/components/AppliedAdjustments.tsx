import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { SlidersHorizontalIcon } from "lucide-react";

type Props = {
  report: TransformedReport;
};
function AppliedAdjustments(_: Readonly<Props>) {
  return (
    <div
      data-loc="client/src/pages/VDP.tsx:468"
      className="dark:border-border dark:bg-card rounded-xl border border-gray-200 bg-white p-4"
    >
      <h3
        data-loc="client/src/pages/VDP.tsx:469"
        className="dark:text-foreground mb-3 flex items-center gap-2 font-semibold text-gray-900"
      >
        <SlidersHorizontalIcon className="size-4 text-gray-500" />
        <span>Ajustes Aplicados</span>
      </h3>
      <div data-loc="client/src/pages/VDP.tsx:472" className="overflow-x-auto">
        <table
          data-loc="client/src/pages/VDP.tsx:473"
          className="w-full text-sm"
        >
          <thead data-loc="client/src/pages/VDP.tsx:474">
            <tr
              data-loc="client/src/pages/VDP.tsx:475"
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <th
                data-loc="client/src/pages/VDP.tsx:476"
                className="py-2 pr-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase"
              >
                Factor
              </th>
              <th
                data-loc="client/src/pages/VDP.tsx:477"
                className="py-2 pr-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase"
              >
                Descripción
              </th>
              <th
                data-loc="client/src/pages/VDP.tsx:478"
                className="py-2 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase"
              >
                Monto aplicado
              </th>
            </tr>
          </thead>
          <tbody data-loc="client/src/pages/VDP.tsx:481">
            <tr
              data-loc="client/src/pages/VDP.tsx:483"
              className="dark:border-border border-b border-gray-50 last:border-0"
            >
              <td
                data-loc="client/src/pages/VDP.tsx:484"
                className="py-2.5 pr-4 text-xs font-medium text-gray-600"
              >
                Título Limpio
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:485"
                className="py-2.5 pr-4 text-gray-700"
              >
                Título limpio{" "}
                <span
                  data-loc="client/src/pages/VDP.tsx:485"
                  className="text-xs text-gray-400"
                >
                  (AutoCheck)
                </span>
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:486"
                className="py-2.5 text-right font-bold text-gray-400 tabular-nums"
              >
                $0.00
              </td>
            </tr>
            <tr
              data-loc="client/src/pages/VDP.tsx:483"
              className="dark:border-border border-b border-gray-50 last:border-0"
            >
              <td
                data-loc="client/src/pages/VDP.tsx:484"
                className="py-2.5 pr-4 text-xs font-medium text-gray-600"
              >
                Sin Accidentes
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:485"
                className="py-2.5 pr-4 text-gray-700"
              >
                Sin accidentes reportados{" "}
                <span
                  data-loc="client/src/pages/VDP.tsx:485"
                  className="text-xs text-gray-400"
                >
                  (AutoCheck)
                </span>
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:486"
                className="py-2.5 text-right font-bold text-gray-400 tabular-nums"
              >
                $0.00
              </td>
            </tr>
            <tr
              data-loc="client/src/pages/VDP.tsx:483"
              className="dark:border-border border-b border-gray-50 last:border-0"
            >
              <td
                data-loc="client/src/pages/VDP.tsx:484"
                className="py-2.5 pr-4 text-xs font-medium text-gray-600"
              >
                Dueños Anteriores
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:485"
                className="py-2.5 pr-4 text-gray-700"
              >
                2 dueños anteriores{" "}
                <span
                  data-loc="client/src/pages/VDP.tsx:485"
                  className="text-xs text-gray-400"
                >
                  (AutoCheck)
                </span>
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:486"
                className="py-2.5 text-right font-bold text-red-600 tabular-nums"
              >
                -$200.00
              </td>
            </tr>
            <tr
              data-loc="client/src/pages/VDP.tsx:483"
              className="dark:border-border border-b border-gray-50 last:border-0"
            >
              <td
                data-loc="client/src/pages/VDP.tsx:484"
                className="py-2.5 pr-4 text-xs font-medium text-gray-600"
              >
                Kilometraje
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:485"
                className="py-2.5 pr-4 text-gray-700"
              >
                Millas ligeramente por encima del promedio{" "}
                <span
                  data-loc="client/src/pages/VDP.tsx:485"
                  className="text-xs text-gray-400"
                >
                  (Odómetro)
                </span>
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:486"
                className="py-2.5 text-right font-bold text-red-600 tabular-nums"
              >
                -$450.00
              </td>
            </tr>
            <tr
              data-loc="client/src/pages/VDP.tsx:483"
              className="dark:border-border border-b border-gray-50 last:border-0"
            >
              <td
                data-loc="client/src/pages/VDP.tsx:484"
                className="py-2.5 pr-4 text-xs font-medium text-gray-600"
              >
                Mantenimiento
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:485"
                className="py-2.5 pr-4 text-gray-700"
              >
                Historial de servicio limitado{" "}
                <span
                  data-loc="client/src/pages/VDP.tsx:485"
                  className="text-xs text-gray-400"
                >
                  (AutoCheck)
                </span>
              </td>
              <td
                data-loc="client/src/pages/VDP.tsx:486"
                className="py-2.5 text-right font-bold text-red-600 tabular-nums"
              >
                -$350.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedAdjustments;
