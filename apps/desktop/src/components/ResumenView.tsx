import {
  ChartColumnIcon,
  HandshakeIcon,
  Home,
  SparklesIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsGrid from "@carveri/shared/components/home/StatsGrid";
import BookValues from "@carveri/shared/components/home/BookValues";
import VehicleDataSection from "@carveri/shared/components/home/VehicleDataSection";
import AISummarySection from "@carveri/shared/components/home/AISummarySection";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VehicleHeroCard from "@/components/VehicleHeroCard";
import { Link, useParams } from "react-router";
import { IconClock } from "@tabler/icons-react";

interface Props {
  report: TransformedReport;
}

export default function ResumenView({ report }: Readonly<Props>) {
  const { id } = useParams();
  const { t } = useTranslation("common");
  const { priceEval, stats } = report;
  const isAbove = priceEval.marketAvgDeltaPct > 0;
  const absPct = Math.abs(priceEval.marketAvgDeltaPct).toFixed(1);

  const QUICK_LINKS = [
    {
      id: `/reports/${id}/timeline`,
      icon: <IconClock className="size-5" />,
      title: "common.timeline",
      description: "common.timelineDescription",
    },
    {
      id: `/reports/${id}/market`,
      icon: <ChartColumnIcon className="size-5" />,
      title: "common.market",
      description: "common.marketDescription",
    },
    {
      id: `/reports/${id}/diagnosis`,
      icon: <SparklesIcon className="size-5" />,
      title: "common.ai_diagnosis",
      description: "common.ai_diagnosisDescription",
    },
    {
      id: `/reports/${id}/strategy`,
      icon: <HandshakeIcon className="size-5" />,
      title: "common.negotiation",
      description: "common.negotiationDescription",
    },
  ];

  const priceLabelMap: Record<VehicleReport["priceEval"]["label"], string> = {
    BARGAIN: t("resume.priceLabels.BARGAIN"),
    LOW: t("resume.priceLabels.LOW"),
    FAIR: t("resume.priceLabels.FAIR"),
    HIGH: t("resume.priceLabels.HIGH"),
    OVERPRICED: t("resume.priceLabels.OVERPRICED"),
  };

  return (
    <div className="space-y-6">
      {/* Vehicle hero: image carousel + vehicle name + summary card */}
      <VehicleHeroCard
        images={report.images}
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

      {/* Breadcrumb */}
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Home size={11} />
        <span>{t("resume.breadcrumb")}</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold">{t("resume.heading")}</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">
          {t("resume.subtitle")}{" "}
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
      {stats && <StatsGrid stats={stats} />}

      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Price Evaluation */}
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium">
                {t("resume.priceEvaluation")}
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_40%]">
              <div className="col-start-1 -col-end-1 text-center text-3xl font-semibold">
                ${report.price.toLocaleString()}
              </div>
              <p className="col-start-1 -col-end-1 mb-4 text-center text-xs font-semibold tracking-wide text-blue-600 uppercase">
                {priceLabelMap[priceEval.label]} — {absPct}%{" "}
                {isAbove ? t("resume.above") : t("resume.below")}{" "}
                {t("resume.ofAverage")}
              </p>
              <ReportGauge
                price={report.price}
                averageDeltaPct={report.priceEval.marketAvgDeltaPct}
                gauge={report.evaluation.gauge}
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
      <AISummarySection aiSummary={report.aiSummary} />

      {/* Quick navigation */}
      <div className="grid grid-cols-2 gap-3">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            className="group border-border bg-card rounded-xl border p-4 text-left transition-all hover:border-blue-300 hover:shadow-sm dark:hover:border-blue-600"
          >
            <div
              data-loc="client/src/pages/VDP.tsx:563"
              className="text-muted-foreground mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400"
            >
              {item.icon}
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:564"
              className="text-sm font-semibold text-gray-900"
            >
              {t(item.title)}
            </div>
            <div
              data-loc="client/src/pages/VDP.tsx:565"
              className="text-xs text-gray-400"
            >
              {t(item.description)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
