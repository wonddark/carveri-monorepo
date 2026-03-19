import { useState } from "react";
import { useTranslation } from "react-i18next";
import StrategySubtab from "./StrategySubtab";
import ArgumentsSubtab from "./ArgumentsSubtab";
import CostsSubtab from "./CostsSubtab";
import type { VehicleReport } from "@carveri/shared/data/report";

type SubtabId = "strategy" | "arguments" | "costs";

interface Props {
  report: VehicleReport;
}

export default function NegotiateTab({ report }: Readonly<Props>) {
  const { t } = useTranslation('negotiate');
  const SUBTABS: { id: SubtabId; label: string }[] = [
    { id: "strategy", label: t('tabs.strategy') },
    { id: "arguments", label: t('tabs.arguments') },
    { id: "costs", label: t('tabs.costs') },
  ];
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
