import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

type Props = {
  report: TransformedReport;
};
function CarveriEvaluation(props: Readonly<Props>) {
  const { report } = props;
  return (
    <div
      data-loc="client/src/pages/VDP.tsx:436"
      className="w-full shrink-0 lg:w-[45%]"
    >
      <div data-loc="client/src/pages/VDP.tsx:437" className="space-y-3">
        <div
          data-loc="client/src/pages/VDP.tsx:438"
          className="flex items-center justify-between py-2"
        >
          <span
            data-loc="client/src/pages/VDP.tsx:439"
            className="dark:text-muted-foreground text-sm font-medium text-gray-500"
          >
            PRECIO PEDIDO
          </span>
          <span
            data-loc="client/src/pages/VDP.tsx:440"
            className="dark:text-foreground text-3xl font-extrabold text-gray-900 tabular-nums"
          >
            {formatCurrency(report.summary?.price || 0)}
          </span>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:442"
          className="dark:border-border border-t border-gray-100"
        ></div>
        <div
          data-loc="client/src/pages/VDP.tsx:443"
          className="flex items-center justify-between py-2"
        >
          <span
            data-loc="client/src/pages/VDP.tsx:444"
            className="dark:text-muted-foreground text-sm font-medium text-gray-500"
          >
            RECOMENDADO CARVERI
          </span>
          <span
            data-loc="client/src/pages/VDP.tsx:445"
            className="text-3xl font-bold text-emerald-600 tabular-nums dark:text-emerald-300"
          >
            $22,310
          </span>
        </div>
        <div
          data-loc="client/src/pages/VDP.tsx:447"
          className="dark:border-border border-t border-gray-100"
        ></div>
        <div
          data-loc="client/src/pages/VDP.tsx:448"
          className="flex items-center justify-between py-2"
        >
          <span
            data-loc="client/src/pages/VDP.tsx:449"
            className="dark:text-muted-foreground text-sm font-medium text-gray-500"
          >
            Diferencia
          </span>
          <span
            data-loc="client/src/pages/VDP.tsx:450"
            className="text-xl font-bold text-emerald-600 tabular-nums dark:text-emerald-300"
          >
            −$810{" "}
            <span
              data-loc="client/src/pages/VDP.tsx:451"
              className="text-sm font-medium"
            >
              (3.6%)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CarveriEvaluation;
