import { Home } from "lucide-react";
import StatsGrid from "@carveri/shared/components/home/StatsGrid";
import BookValues from "@carveri/shared/components/home/BookValues";
import VehicleDataSection from "@carveri/shared/components/home/VehicleDataSection";
import AISummarySection from "@carveri/shared/components/home/AISummarySection";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import { getPercentile } from "@carveri/shared/lib/utils.ts";
import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

const PRICE_LABEL_TEXT: Record<VehicleReport["priceEval"]["label"], string> = {
  BARGAIN: "Ganga",
  LOW: "Por debajo del mercado",
  FAIR: "Precio justo",
  HIGH: "Por encima del mercado",
  OVERPRICED: "Caro",
};

interface Props {
  report: TransformedReport;
}

export default function ResumenView({ report }: Readonly<Props>) {
  const { priceEval, stats } = report;
  const isAbove = priceEval.marketAvgDeltaPct > 0;
  const absPct = Math.abs(priceEval.marketAvgDeltaPct).toFixed(1);

  const wholesale = 12000;
  const retail = 33000;
  const percentile = getPercentile({
    min: wholesale,
    max: retail,
    value: report.price,
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Home size={11} />
        <span>Resumen</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold">Resumen del Reporte</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Vista general de tu CarVeri para{" "}
          <span className="font-semibold">
            {generateReportTitle({
              year: report.year,
              make: report.make,
              model: report.model,
            })}
          </span>
        </p>
      </div>

      {/* Quick stats 2×2 */}
      <StatsGrid stats={stats} />

      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Price Evaluation (no gauge) */}
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium">
                $ Evaluación de Precio
              </span>
            </div>

            <div className="grid grid-cols-2 items-center gap-5">
              <div className="col-start-1 -col-end-1 text-center text-3xl font-semibold">
                ${report.price.toLocaleString()}
              </div>
              <p className="col-start-1 -col-end-1 mb-4 text-center text-xs font-semibold tracking-wide text-blue-600 uppercase">
                {PRICE_LABEL_TEXT[priceEval.label]} — {absPct}%{" "}
                {isAbove ? "por encima" : "por debajo"} del promedio
              </p>
              <ReportGauge
                percentile={percentile}
                label={priceEval.label}
                price={report.price}
                wholesale={wholesale}
                retail={retail}
              />

              <BookValues bookValues={priceEval.bookValues} />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle data */}
        <VehicleDataSection
          vin={report.vin}
          engine={report.engine}
          transmission={report.transmission}
          drivetrain={report.drivetrain}
          color={report.color}
          auction={report.auction}
          location={report.location}
          daysOnLot={report.daysOnLot}
          previousOwners={report.previousOwners}
        />
      </div>

      {/* AI summary */}
      {report.aiSummary ? (
        <AISummarySection aiSummary={report.aiSummary} />
      ) : null}
    </div>
  );
}
