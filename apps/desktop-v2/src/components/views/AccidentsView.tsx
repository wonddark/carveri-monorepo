import { cn } from "@/lib/utils";
import type { AccidentsDetail } from "@carveri/shared/types/vehicle-report";

interface Props {
  accidents: AccidentsDetail;
}

export default function AccidentsView({ accidents }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Accidentes</div>
      <h2 className="text-xl font-bold text-gray-900">Accidentes</h2>

      {/* Summary */}
      <div
        className={cn(
          "rounded-xl border p-4",
          accidents.count === 0
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50",
        )}
      >
        <p
          className={cn(
            "text-lg font-bold",
            accidents.count === 0 ? "text-green-700" : "text-red-700",
          )}
        >
          {accidents.count === 0
            ? "✓ Sin accidentes reportados"
            : `${accidents.count} accidente${accidents.count > 1 ? "s" : ""} reportado${accidents.count > 1 ? "s" : ""}`}
        </p>
        {accidents.description && (
          <p className="mt-1 text-sm text-gray-600">{accidents.description}</p>
        )}
      </div>

      {/* Events */}
      {accidents.events.length > 0 && (
        <div className="space-y-3">
          {accidents.events.map((event, i) => (
             
            <div
              // eslint-disable-next-line @eslint-react/no-array-index-key
              key={`${event.title}-${i}`}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  {event.title}
                </p>
                {event.redFlag && (
                  <span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                    ⚠ Alerta
                  </span>
                )}
              </div>
              <p className="mb-2 text-xs text-gray-500">{event.date}</p>
              {event.details.length > 0 && (
                <ul className="space-y-1">
                  {event.details.map((d, j) => (
                    // eslint-disable-next-line @eslint-react/no-array-index-key
                    <li key={`${event.title}-detail-${j}`} className="text-xs text-gray-600">
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
