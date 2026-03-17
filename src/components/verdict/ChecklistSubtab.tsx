import { useState } from "react";
import { Check, ChevronRight, Eye, FileText, Home, Wrench } from "lucide-react";
import type { VerdictChecklistGroup } from "@/data/report";

// ICON_MAP resolves categoryIcon strings from mock data to lucide components.
// Check is imported separately for the checked checkbox state (not via ICON_MAP).
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Eye,
  Wrench,
  FileText,
};

interface Props {
  checklist: VerdictChecklistGroup[];
}

export default function ChecklistSubtab({ checklist }: Readonly<Props>) {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>Verdict</span>
        <ChevronRight size={10} />
        <span>Checklist</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">
        Inspection Checklist
      </h2>

      {checklist.map((group) => {
        const CategoryIcon = ICON_MAP[group.categoryIcon];
        return (
          <div
            key={group.id}
            className="rounded-2xl border border-slate-100 bg-white p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              {CategoryIcon && (
                <CategoryIcon size={16} className="text-indigo-500" />
              )}
              <h3 className="text-sm font-bold text-slate-900">
                {group.category}
              </h3>
            </div>
            {group.items.map((item, i) => {
              const key = `${group.id}-${i}`;
              const isChecked = checked.has(key);
              return (
                <button
                  key={key}
                  className="flex cursor-pointer appearance-none items-start gap-3 border-b border-slate-100 py-2 last:border-0"
                  onClick={() => toggle(key)}
                >
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${isChecked ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}
                  >
                    {isChecked && <Check size={10} className="text-white" />}
                  </div>
                  <span
                    className={`text-sm ${isChecked ? "text-slate-400 line-through" : "text-slate-700"}`}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
