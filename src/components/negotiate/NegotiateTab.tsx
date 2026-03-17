import { useState } from "react";
import StrategySubtab from "./StrategySubtab";
import ArgumentsSubtab from "./ArgumentsSubtab";
import CostsSubtab from "./CostsSubtab";
import type { VehicleReport } from "@/data/report";

type SubtabId = "strategy" | "arguments" | "costs";

const SUBTABS: { id: SubtabId; label: string }[] = [
  { id: "strategy", label: "Strategy" },
  { id: "arguments", label: "Arguments" },
  { id: "costs", label: "Costs" },
];

interface Props {
  report: VehicleReport;
}

export default function NegotiateTab({ report }: Readonly<Props>) {
  const [activeSubtab, setActiveSubtab] = useState<SubtabId>("strategy");

  return (
    <>
      {/* Subtab pills */}
      <div className="mb-4 flex gap-2">
        {SUBTABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveSubtab(id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeSubtab === id
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSubtab === "strategy" && (
        <StrategySubtab strategy={report.negotiate.strategy} />
      )}
      {activeSubtab === "arguments" && (
        <ArgumentsSubtab args={report.negotiate.arguments} />
      )}
      {activeSubtab === "costs" && (
        <CostsSubtab price={report.price} costs={report.negotiate.costs} />
      )}
    </>
  );
}
