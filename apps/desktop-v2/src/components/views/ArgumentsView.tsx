import type { NegotiationArgument } from "@/types/app-report";

interface Props {
  args: NegotiationArgument[];
}

export default function ArgumentsView({ args }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">💬 Negociación / Argumentos</div>
      <h2 className="text-xl font-bold text-gray-900">Argumentos de Negociación</h2>

      {args.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay argumentos de negociación disponibles para este vehículo.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {args.map((arg) => (
            <div
              key={arg.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {arg.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    {arg.description}
                  </p>
                </div>
                {arg.estimatedSavings > 0 && (
                  <span className="shrink-0 rounded-lg bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    -${arg.estimatedSavings.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
