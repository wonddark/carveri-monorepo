import type { AppReport } from "@/types/app-report";

interface Props {
  report: AppReport;
}

export default function VerdictAIView({ report }: Props) {
  const { scoreBreakdown } = report.verdictTab;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-xs text-gray-400">🤖 Veredicto IA</div>
      <h2 className="text-xl font-bold text-gray-900">Veredicto IA</h2>

      {/* Score */}
      <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white">
          {report.score.toFixed(1)}
        </div>
        <div>
          <p className="text-base font-bold text-blue-900">
            Veredicto CarVeri
          </p>
          <p className="text-sm text-blue-700">{report.verdict}</p>
        </div>
      </div>

      {/* AI Summary */}
      {report.aiSummary && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Análisis IA
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            {report.aiSummary}
          </p>
        </div>
      )}

      {/* Score breakdown */}
      {scoreBreakdown.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">
            Desglose del Score
          </p>
          {scoreBreakdown.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <span
                className={
                  item.delta >= 0
                    ? "text-sm font-semibold text-green-600"
                    : "text-sm font-semibold text-red-500"
                }
              >
                {item.delta >= 0 ? "+" : ""}
                {item.delta.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
