import { cn } from "@/lib/utils";
import type { Timeline } from "@carveri/shared/types/vehicle-report";

interface Props {
  items: Timeline;
}

export default function TimelineView({ items }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Timeline</div>
      <h2 className="text-xl font-bold text-gray-900">Timeline</h2>

      {items.length === 0 ? (
        <EmptyState message="No hay eventos en el timeline." />
      ) : (
        <div className="relative space-y-0 pl-6">
          <div className="absolute top-0 bottom-0 left-2 w-px bg-gray-200" />
          {items.map((item, i) => (
            <div key={item.id ?? i} className="relative pb-5">
              <div
                className={cn(
                  "absolute -left-4 top-1 h-3 w-3 rounded-full border-2 border-white",
                  item.redFlag ? "bg-red-500" : "bg-blue-500",
                )}
              />
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  {item.redFlag && (
                    <span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                      ⚠ Alerta
                    </span>
                  )}
                </div>
                <p className="mb-1 text-xs text-gray-500">{item.date}</p>
                {item.description && (
                  <p className="text-xs text-gray-600">{item.description}</p>
                )}
                {item.odometer !== null && item.odometer !== undefined && (
                  <p className="mt-1 text-xs text-gray-400">
                    Odómetro: {item.odometer.toLocaleString()} mi
                  </p>
                )}
                {item.source && (
                  <p className="mt-1 text-xs text-gray-400">{item.source}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-gray-400">{message}</p>;
}
