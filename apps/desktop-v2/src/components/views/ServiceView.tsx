import type { ServiceDetails } from "@carveri/shared/types/vehicle-report";

interface Props {
  records: ServiceDetails[];
}

export default function ServiceView({ records }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Servicio</div>
      <h2 className="text-xl font-bold text-gray-900">Servicio</h2>

      {records.length === 0 ? (
        <p className="text-sm text-gray-400">
          No hay registros de servicio disponibles.
        </p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-1 flex items-start justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  {record.name}
                </p>
                {record.type && (
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {record.type}
                  </span>
                )}
              </div>
              <p className="mb-2 text-xs text-gray-500">
                {record.date}{record.mileage != null ? ` · ${record.mileage.toLocaleString()} mi` : ""}
              </p>
              {record.details.length > 0 && (
                <ul className="space-y-0.5">
                  {record.details.map((d, i) => (
                    <li key={i} className="text-xs text-gray-600">
                      • {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
