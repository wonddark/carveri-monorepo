import { cn } from "@/lib/utils";
import type { AppReport } from "@/types/app-report";

const PRICE_LABEL: Record<string, string> = {
  BARGAIN: "Ganga",
  LOW: "Por debajo del mercado",
  FAIR: "Precio Justo",
  HIGH: "Por encima del mercado",
  OVERPRICED: "Caro",
};

const GAUGE_POS: Record<string, number> = {
  BARGAIN: 5,
  LOW: 25,
  FAIR: 50,
  HIGH: 70,
  OVERPRICED: 90,
};

interface Props {
  report: AppReport;
}

export default function ResumenView({ report }: Props) {
  const { stats, priceEval } = report;
  const isAbove = priceEval.marketAvgDeltaPct > 0;
  const absPct = Math.abs(priceEval.marketAvgDeltaPct).toFixed(1);
  const gaugePos = GAUGE_POS[priceEval.label] ?? 50;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400">🏠 Resumen</div>

      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Resumen del Reporte</h2>
        <p className="mt-1 text-sm text-gray-500">
          Vista general del reporte para{" "}
          <span className="font-semibold text-gray-700">
            {report.year} {report.make} {report.model} {report.trim}
          </span>
        </p>
      </div>

      {/* Stats 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Título"
          value={stats.titleStatus}
          variant={stats.titleStatus.toLowerCase() === "clean" ? "good" : "bad"}
        />
        <StatCard
          label="Accidentes"
          value={
            stats.accidents === 0
              ? "0 reportados"
              : `${stats.accidents} reportados`
          }
          variant={stats.accidents === 0 ? "good" : "bad"}
        />
        <StatCard
          label="Odómetro"
          value={stats.odometerVerified ? "Verificado" : "No verificado"}
          variant={stats.odometerVerified ? "good" : "bad"}
        />
        <StatCard
          label="Precio"
          value={`${PRICE_LABEL[priceEval.label] ?? priceEval.label} (${stats.priceDeltaPct >= 0 ? "+" : ""}${stats.priceDeltaPct.toFixed(1)}%)`}
          variant={
            ["BARGAIN", "LOW"].includes(priceEval.label)
              ? "good"
              : priceEval.label === "FAIR"
                ? "warn"
                : "bad"
          }
        />
      </div>

      {/* Price card */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="mb-4 text-sm font-semibold text-gray-700">
          $ Evaluación de Precio
        </p>

        <div className="mb-1 text-center text-3xl font-bold text-gray-900">
          ${report.price.toLocaleString()}
        </div>
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wide text-blue-600">
          {PRICE_LABEL[priceEval.label] ?? priceEval.label} — {absPct}%{" "}
          {isAbove ? "por encima" : "por debajo"} del promedio
        </p>

        {/* Gauge */}
        <div className="relative mb-1 h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow"
            style={{ left: `${gaugePos}%` }}
          />
        </div>
        <div className="mb-5 flex justify-between text-xs text-gray-400">
          <span>Ganga</span>
          <span>Más barato</span>
          <span>Justo</span>
          <span>Caro</span>
          <span>Muy caro</span>
        </div>

        {/* Book values */}
        <div className="grid grid-cols-2 gap-2">
          {priceEval.bookValues.map((bv) => (
            <div
              key={bv.source}
              className="rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  {bv.source}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    bv.delta > 0 ? "text-red-500" : "text-green-600",
                  )}
                >
                  {bv.delta > 0 ? "+" : "-"}$
                  {Math.abs(bv.delta).toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">
                ${bv.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle specs */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="mb-3 text-sm font-semibold text-gray-700">
          🚗 Datos del Vehículo
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <SpecRow label="VIN" value={report.vin} mono />
          <SpecRow label="Motor" value={report.engine} />
          <SpecRow label="Transmisión" value={report.transmission} />
          <SpecRow label="Tracción" value={report.drivetrain} />
          <SpecRow label="Color" value={report.color} />
          <SpecRow
            label="Subasta"
            value={`${report.auction.name} — $${report.auction.price.toLocaleString()}`}
          />
          {report.location && (
            <SpecRow label="Ubicación" value={report.location} />
          )}
          {report.daysOnLot !== null && (
            <SpecRow label="Días en lote" value={`${report.daysOnLot} días`} />
          )}
          <SpecRow
            label="Dueños anteriores"
            value={String(report.previousOwners)}
          />
        </div>
      </div>

      {/* AI summary */}
      {report.aiSummary && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            🤖 Resumen IA
          </p>
          <p className="text-sm leading-relaxed text-blue-900">
            {report.aiSummary}
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "good" | "warn" | "bad";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        variant === "good" && "border-green-200 bg-green-50",
        variant === "warn" && "border-yellow-200 bg-yellow-50",
        variant === "bad" && "border-red-200 bg-red-50",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-bold",
          variant === "good" && "text-green-700",
          variant === "warn" && "text-yellow-700",
          variant === "bad" && "text-red-700",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SpecRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <span className="text-gray-500">{label}: </span>
      <span
        className={cn(
          "font-medium text-gray-800",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </span>
    </div>
  );
}
