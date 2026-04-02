import type { MarketAnalysis } from "@carveri/shared/types/vehicle-report";

interface Props {
  market: MarketAnalysis;
}

export default function MarketView({ market }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">📊 Mercado</div>
      <h2 className="text-xl font-bold text-gray-900">Mercado</h2>

      {market.comparables.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay comparables de mercado disponibles para este vehículo.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {market.comparables.map((comp, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-700">{JSON.stringify(comp)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
