import type { AppReport } from "@/types/app-report";

interface Props {
  costs: AppReport["negotiate"]["costs"];
}

export default function CostsView({ costs }: Props) {
  const hasData =
    costs.taxRatePct > 0 ||
    costs.tagAndTitle > 0 ||
    costs.dealerFee > 0 ||
    costs.monthlyEstimates.length > 0;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">💬 Negociación / Costos</div>
      <h2 className="text-xl font-bold text-gray-900">Desglose de Costos</h2>

      {!hasData ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay desglose de costos disponible para este vehículo.
          </p>
        </div>
      ) : (
        <>
          {/* Fees */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-sm font-semibold text-gray-700">
              Impuestos y Cargos
              {costs.state && (
                <span className="ml-1 font-normal text-gray-400">
                  ({costs.state})
                </span>
              )}
            </p>
            <div className="space-y-2 text-sm">
              {costs.taxRatePct > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuesto de venta</span>
                  <span className="font-medium">{costs.taxRatePct}%</span>
                </div>
              )}
              {costs.tagAndTitle > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Placa y título</span>
                  <span className="font-medium">
                    ${costs.tagAndTitle.toLocaleString()}
                  </span>
                </div>
              )}
              {costs.dealerFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee del dealer</span>
                  <span className="font-medium">
                    ${costs.dealerFee.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Monthly estimates */}
          {costs.monthlyEstimates.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                Estimados de Pago Mensual
              </p>
              <div className="grid grid-cols-3 gap-3">
                {costs.monthlyEstimates.map((est, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-gray-50 p-3 text-center"
                  >
                    <p className="text-xs text-gray-500">{est.term} meses</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${est.monthly.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{est.rate}% APR</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
