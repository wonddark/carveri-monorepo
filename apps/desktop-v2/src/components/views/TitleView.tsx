import type { TitleDetails } from "@carveri/shared/types/vehicle-report";

interface Props {
  title: TitleDetails[];
}

export default function TitleView({ title }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Título</div>
      <h2 className="text-xl font-bold text-gray-900">Título</h2>

      {title.length === 0 ? (
        <p className="text-sm text-gray-400">
          No hay información de título disponible.
        </p>
      ) : (
        <div className="space-y-3">
          {title.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-xs text-gray-600">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
