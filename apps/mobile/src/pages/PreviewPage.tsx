import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import StatsGrid from "@carveri/shared/components/home/StatsGrid.tsx";
import PriceEvalSection from "@carveri/shared/components/home/PriceEvalSection.tsx";
import VehicleDataSection from "@carveri/shared/components/home/VehicleDataSection.tsx";
import AISummarySection from "@carveri/shared/components/home/AISummarySection.tsx";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard.tsx";
import VehicleInfoCard from "@carveri/shared/components/preview/VehicleInfoCard.tsx";
import SectionsChecklist from "@carveri/shared/components/preview/SectionsChecklist.tsx";
import PreviewCta from "@carveri/shared/components/preview/PreviewCta.tsx";
import BlurredPreviewOverlay from "@carveri/shared/components/preview/BlurredPreviewOverlay.tsx";

export default function PreviewPage() {
  const report = useLoaderData() as TransformedReport;
  const { t } = useTranslation("homepage");

  const title = generateReportTitle({
    year: report.year,
    make: report.make,
    model: report.model,
    trim: report.trim,
  });

  return (
    <div className="dark:bg-background min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="dark:border-border dark:bg-card/95 sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/"
            className="dark:hover:text-foreground text-sm text-slate-500 transition-colors hover:text-slate-800"
          >
            {t("preview.backToHome")}
          </Link>
          <div className="dark:bg-border h-4 w-px bg-slate-200" />
          <p className="dark:text-foreground text-sm font-semibold text-slate-900">
            {title}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 py-6">
        {/* Page heading */}
        <div>
          <h1 className="dark:text-foreground text-lg font-bold tracking-tight text-slate-900">
            {t("preview.title")}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {t("preview.subtitle")}{" "}
            <span className="font-semibold">{title}</span>
          </p>
        </div>
        <PreviewCta />

        {/* Vehicle info + sections */}
        <VehicleInfoCard report={report} />
        <SectionsChecklist report={report} />

        {/* Blurred overview preview */}
        <div className="flex flex-col gap-3">
          <p className="dark:text-foreground text-sm font-semibold text-slate-700">
            {t("preview.blurredTitle")}
          </p>
          <BlurredPreviewOverlay>
            <div className="dark:bg-card flex flex-col gap-4 bg-white p-4">
              <CarSummaryCard
                year={report.year}
                make={report.make}
                model={report.model}
                trim={report.trim}
                price={report.price}
                mileage={report.mileage}
                location={report.location}
                score={report.diagnosis.score}
                verdict={report.diagnosis.recommendation}
                aiSummary={report.aiSummary}
              />
              {report.stats && <StatsGrid stats={report.stats} />}
              <PriceEvalSection
                price={report.price}
                priceEval={report.priceEval}
                gauge={report.evaluation.gauge}
              />
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
              <AISummarySection aiSummary={report.aiSummary} />
            </div>
          </BlurredPreviewOverlay>
        </div>
      </div>
    </div>
  );
}
