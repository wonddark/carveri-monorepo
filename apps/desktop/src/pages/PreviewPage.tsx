import { useLoaderData, Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import VehicleInfoCard from "@carveri/shared/components/preview/VehicleInfoCard.tsx";
import SectionsChecklist from "@carveri/shared/components/preview/SectionsChecklist.tsx";
import PreviewCta from "@carveri/shared/components/preview/PreviewCta.tsx";
import BlurredPreviewOverlay from "@carveri/shared/components/preview/BlurredPreviewOverlay.tsx";
import ResumenView from "@/components/ResumenView.tsx";

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
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-border dark:bg-card/95">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <Link
            to="/"
            className="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-foreground"
          >
            {t("preview.backToHome")}
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-border" />
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-foreground">
              {title}
            </p>
            <p className="text-xs text-slate-500">{report.vin}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-foreground">
            {t("preview.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t("preview.subtitle")} <span className="font-semibold">{title}</span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Left column: vehicle info + sections checklist + CTA */}
          <div className="flex flex-col gap-5">
            <VehicleInfoCard report={report} />
            <SectionsChecklist report={report} />
            <PreviewCta />
          </div>

          {/* Right column: blurred overview preview */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-foreground">
              {t("preview.blurredTitle")}
            </p>
            <BlurredPreviewOverlay>
              <div className="bg-white p-5 dark:bg-card">
                <ResumenView report={report} hideQuickLinks />
              </div>
            </BlurredPreviewOverlay>
          </div>
        </div>
      </div>
    </div>
  );
}
