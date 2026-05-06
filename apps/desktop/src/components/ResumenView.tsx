import { ChartColumnIcon, HandshakeIcon, SparklesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import VehicleDataSection from "@carveri/shared/components/home/VehicleDataSection";
import AISummarySection from "@carveri/shared/components/home/AISummarySection";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import ReportGauge from "@carveri/shared/components/ReportGauge.tsx";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import VehicleHeroCard from "@/components/VehicleHeroCard";
import { Link, useParams } from "react-router";
import { IconClock } from "@tabler/icons-react";
import VehicleSummary from "@carveri/shared/components/VehicleSummary.tsx";
import CarveriEvaluation from "@carveri/shared/components/CarveriEvaluation.tsx";
import AppliedAdjustments from "@carveri/shared/components/AppliedAdjustments.tsx";

interface Props {
  report: TransformedReport;
  hideQuickLinks?: boolean;
}

export default function ResumenView(props: Readonly<Props>) {
  const { report, hideQuickLinks = false } = props;
  const { id } = useParams();
  const { t } = useTranslation("common");

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

  return (
    <div className="space-y-5">
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

      {/* Heading */}
      <div>
        <h2 className="dark:text-foreground text-[1.15rem] font-semibold tracking-tight text-slate-900">
          {t("resume.heading")}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
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

      {/* Quick stats 2×3 */}
      <VehicleSummary report={report} />

      {/* Price Evaluation */}
      <Card className="dark:bg-card dark:border-border rounded-[1.5rem] border border-slate-200/80 bg-linear-to-br from-white to-slate-50/80 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.22)] dark:bg-none">
        <CardContent className="px-5 py-5 lg:px-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="dark:text-foreground text-[13px] font-semibold tracking-tight text-slate-700">
              {t("resume.priceEvaluation")}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <CarveriEvaluation report={report} />
            <ReportGauge price={report.price} gauge={report.evaluation.gauge} />
          </div>
        </CardContent>
      </Card>

      {/* Applied adjustments */}
      <AppliedAdjustments report={report} />

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

      {/* AI summary */}
      <AISummarySection aiSummary={report.aiSummary} />

      {/* Quick navigation */}
      {!hideQuickLinks && (
        <div className="grid grid-cols-2 gap-3.5">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className="group border-border/70 bg-card rounded-2xl border p-4 text-left transition-all hover:border-blue-200 hover:shadow-[0_18px_40px_-30px_rgba(37,99,235,0.35)] dark:hover:border-blue-700"
            >
              <div
                data-loc="client/src/pages/VDP.tsx:563"
                className="text-muted-foreground mb-2.5 group-hover:text-blue-500 dark:group-hover:text-blue-400"
              >
                {item.icon}
              </div>
              <div
                data-loc="client/src/pages/VDP.tsx:564"
                className="text-sm font-semibold tracking-tight text-slate-900"
              >
                {t(item.title)}
              </div>
              <div
                data-loc="client/src/pages/VDP.tsx:565"
                className="text-[12px] leading-5 text-slate-400"
              >
                {t(item.description)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
