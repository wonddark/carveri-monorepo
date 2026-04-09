import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import DiagnosisSubtab from "@carveri/shared/components/verdict/DiagnosisSubtab";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab";

export default function VerdictAiSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <DiagnosisSubtab diagnosis={report.diagnosis} />
      </div>
      <div>
        <RisksSubtab risks={report.diagnosis.risks} />
      </div>
    </div>
  );
}
