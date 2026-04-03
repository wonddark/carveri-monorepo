import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VerdictSubtab from "@carveri/shared/components/verdict/VerdictSubtab";
import RisksSubtab from "@carveri/shared/components/verdict/RisksSubtab";

export default function VerdictAiSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  const { verdictTab } = report;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <VerdictSubtab
          score={report.score}
          recommendation={report.verdict}
          summary={report.aiSummary}
          scoreBreakdown={verdictTab.scoreBreakdown}
        />
      </div>
      <div>
        <RisksSubtab risks={verdictTab.risks} />
      </div>
    </div>
  );
}
