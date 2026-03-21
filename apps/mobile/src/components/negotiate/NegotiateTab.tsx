import { useState } from "react";
import { useTranslation } from "react-i18next";
import StrategySubtab from "@carveri/shared/components/negotiate/StrategySubtab.tsx";
import ArgumentsSubtab from "@carveri/shared/components/negotiate/ArgumentsSubtab.tsx";
import CostsSubtab from "@carveri/shared/components/negotiate/CostsSubtab.tsx";
import type { VehicleReport } from "@carveri/shared/data/report.ts";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubtabButton from "@carveri/shared/components/subtab-button.tsx";

type SubtabId = "strategy" | "arguments" | "costs";

interface Props {
  report: VehicleReport;
}

export default function NegotiateTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("negotiate");
  const SUBTABS: { id: SubtabId; label: string }[] = [
    { id: "strategy", label: t("tabs.strategy") },
    { id: "arguments", label: t("tabs.arguments") },
    { id: "costs", label: t("tabs.costs") },
  ];
  const [activeSubtab, setActiveSubtab] = useState<SubtabId>("strategy");

  return (
    <div className="relative">
      <AppHeader
        showAppName
        title={generateReportTitle({
          year: report.year,
          make: report.make,
          model: report.model,
        })}
        isTransparent={false}
      />

      <div className="px-4 pt-16">
        {/* Subtab pills */}
        <div className="mb-4 flex gap-2">
          {SUBTABS.map(({ id, label }) => (
            <SubtabButton
              key={id}
              onClick={() => setActiveSubtab(id)}
              active={activeSubtab === id}
            >
              {label}
            </SubtabButton>
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
      </div>
    </div>
  );
}
