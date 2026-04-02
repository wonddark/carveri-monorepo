import { useState } from "react";
import { useTranslation } from "react-i18next";
import VerdictSubtab from "@carveri/shared/components/verdict/VerdictSubtab.tsx";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab.tsx";
import ChecklistSubtab from "@carveri/shared/components/verdict/ChecklistSubtab.tsx";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubtabButton from "@carveri/shared/components/subtab-button.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

type SubtabId = "verdict" | "risks" | "checklist";

interface Props {
  report: TransformedReport;
}

export default function VerdictTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const SUBTABS: { id: SubtabId; label: string }[] = [
    { id: "verdict", label: t("tabs.verdict") },
    { id: "risks", label: t("tabs.risks") },
    { id: "checklist", label: t("tabs.checklist") },
  ];
  const [activeSubtab, setActiveSubtab] = useState<SubtabId>("verdict");

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

        {activeSubtab === "verdict" && (
          <VerdictSubtab
            score={report.score}
            recommendation={report.verdict}
            summary={report.aiSummary}
            scoreBreakdown={report.verdictTab.scoreBreakdown}
          />
        )}
        {activeSubtab === "risks" && (
          <RisksSubtab risks={report.verdictTab.risks} />
        )}
        {activeSubtab === "checklist" && (
          <ChecklistSubtab checklist={report.verdictTab.checklist} />
        )}
      </div>
    </div>
  );
}
