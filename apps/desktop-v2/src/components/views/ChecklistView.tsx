import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/types/app-report";

interface Props {
  items: ChecklistItem[];
}

export default function ChecklistView({ items }: Props) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">✅ Checklist</div>
      <h2 className="text-xl font-bold text-gray-900">Checklist de Inspección</h2>

      {items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            No hay ítems de checklist disponibles.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3",
                item.checked
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white",
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  item.checked ? "text-green-600" : "text-gray-400",
                )}
              >
                {item.checked ? "✓" : "○"}
              </span>
              <span
                className={cn(
                  "text-sm",
                  item.checked ? "text-green-800 font-medium" : "text-gray-600",
                )}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
