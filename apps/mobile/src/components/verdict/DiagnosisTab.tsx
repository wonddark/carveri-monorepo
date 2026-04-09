import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DiagnosisSubtab from "@carveri/shared/components/verdict/DiagnosisSubtab.tsx";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab.tsx";
import ChecklistSubtab from "@carveri/shared/components/verdict/ChecklistSubtab.tsx";
import ValuacionSubtab from "@carveri/shared/components/verdict/ValuacionSubtab.tsx";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import TabPills from "@/components/TabPills.tsx";

interface Props {
  report: TransformedReport;
}

export default function DiagnosisTab({ report }: Readonly<Props>) {
  const { t } = useTranslation("verdict");
  const SUBTABS = [
    { id: "diagnosis", label: t("tabs.diagnosis") },
    { id: "risks", label: t("tabs.risks") },
    { id: "checklist", label: t("tabs.checklist") },
    { id: "valuation", label: t("tabs.valuation") },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function selectPill(idx: number) {
    setActiveIdx(idx);
    const track = trackRef.current;
    if (!track) return;
    const pill = track.children[idx] as HTMLElement;
    const trackCenter = track.clientWidth / 2;
    const pillCenter = pill.offsetLeft + pill.clientWidth / 2;
    track.scrollTo({ left: pillCenter - trackCenter, behavior: "smooth" });
  }

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
        <TabPills
          activeIdx={activeIdx}
          selectPill={selectPill}
          trackRef={trackRef}
          tabs={SUBTABS}
        />

        {activeIdx === 0 && <DiagnosisSubtab diagnosis={report.diagnosis} />}
        {activeIdx === 1 && <RisksSubtab risks={report.diagnosis.risks} />}
        {activeIdx === 2 && (
          <ChecklistSubtab checklist={report.diagnosis.checklist} />
        )}
        {activeIdx === 3 && <ValuacionSubtab evaluation={report.evaluation} />}
      </div>
    </div>
  );
}
