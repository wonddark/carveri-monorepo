import type { OwnerDetails } from "@carveri/shared/types/vehicle-report";

interface Props {
  owners: OwnerDetails[];
}

export default function OwnersView({ owners }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Dueños</div>
      <h2 className="text-xl font-bold text-gray-900">Dueños</h2>

      {owners.length === 0 ? (
        <p className="text-sm text-gray-400">No hay información de dueños.</p>
      ) : (
        <div className="space-y-3">
          {owners.map((owner, i) => (
            <div
              key={owner.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  {owner.label}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>Tipo: {owner.type}</span>
                {owner.state && <span>Estado: {owner.state}</span>}
                <span>Desde: {owner.periodStart}</span>
                <span>Hasta: {owner.periodEnd}</span>
                {owner.periodMonths > 0 && (
                  <span>{owner.periodMonths} meses</span>
                )}
                {owner.startMileage != null && owner.endMileage != null && (
                  <span>
                    {owner.startMileage.toLocaleString()} –{" "}
                    {owner.endMileage.toLocaleString()} mi
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
