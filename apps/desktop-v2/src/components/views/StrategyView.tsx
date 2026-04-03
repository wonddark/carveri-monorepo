import type { AppReport } from "@/types/app-report";

interface Props {
  strategy: AppReport["negotiate"]["strategy"];
}

export default function StrategyView({ strategy }: Props) {
  const hasData =
    strategy.firstOffer > 0 ||
    strategy.midpoint > 0 ||
    strategy.maxRecommended > 0 ||
    strategy.tips.length > 0;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">💬 Negociación / Estrategia</div>
      <h2 className="text-xl font-bold text-gray-900">Estrategia de Negociación</h2>

      {!hasData ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay estrategia de negociación disponible para este vehículo.
          </p>
        </div>
      ) : (
        <>
          {(strategy.firstOffer > 0 ||
            strategy.midpoint > 0 ||
            strategy.maxRecommended > 0) && (
            <div className="grid grid-cols-3 gap-3">
              <PriceCard
                label="Oferta Inicial"
                value={strategy.firstOffer}
                color="green"
              />
              <PriceCard
                label="Punto Medio"
                value={strategy.midpoint}
                color="yellow"
              />
              <PriceCard
                label="Máximo Recomendado"
                value={strategy.maxRecommended}
                color="red"
              />
            </div>
          )}
          {strategy.tips.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="mb-3 text-sm font-semibold text-blue-700">
                💡 Consejos
              </p>
              <ul className="space-y-2">
                {strategy.tips.map((tip, i) => (
                  // eslint-disable-next-line @eslint-react/no-array-index-key
                  <li key={`tip-${i}`} className="text-sm text-blue-800">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PriceCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "yellow" | "red";
}) {
  const styles = {
    green: "border-green-200 bg-green-50 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <div className={`rounded-xl border p-4 text-center ${styles[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold">${value.toLocaleString()}</p>
    </div>
  );
}
