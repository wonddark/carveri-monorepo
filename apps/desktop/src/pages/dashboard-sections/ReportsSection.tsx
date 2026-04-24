import { Link, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
} from "@carveri/shared/components/ui/card.tsx";
import {
  EvaluationBadge,
  ReportStatusBadge,
} from "@carveri/shared/components/dashboard/ReportStatusBadge.tsx";
import type { DashboardData, ReportOrderItem } from "@carveri/shared/types/dashboard.ts";

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function ReportRow({ report }: { report: ReportOrderItem }) {
  const { t, i18n } = useTranslation("common");
  const isViewable = report.status === "READY" || report.status === "ARCHIVED";

  return (
    <Card size="sm">
      <CardContent className="py-3">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            {report.imageThumbnail ? (
              <img
                src={report.imageThumbnail}
                alt={report.vehicleName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>

          {/* Main info */}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-[13px] font-semibold">
                {report.vehicleName}
              </p>
              <ReportStatusBadge status={report.status} />
              {report.evaluationResult && (
                <EvaluationBadge result={report.evaluationResult} />
              )}
            </div>

            <p className="font-mono text-[11px] text-slate-500">
              {t("dashboard.reports.vin")}: {report.vin}
            </p>

            <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-0.5 text-[11px]">
              <span>
                {t("dashboard.reports.requested")}:{" "}
                {formatDate(report.requestedAt, i18n.language)}
              </span>
              {report.deliveredAt && (
                <span>
                  {t("dashboard.reports.delivered")}:{" "}
                  {formatDate(report.deliveredAt, i18n.language)}
                </span>
              )}
            </div>
          </div>

          {/* Action */}
          {isViewable && (
            <Link
              to={`/reports/${report.id}`}
              className="text-primary shrink-0 text-[13px] font-semibold hover:underline"
            >
              {t("dashboard.reports.viewReport")} →
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReportsSection() {
  const data = useRouteLoaderData("dashboard") as DashboardData;
  const { t } = useTranslation("common");

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">
          {t("dashboard.reports.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("dashboard.reports.subtitle")}
        </p>
      </div>

      {data.reports.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {t("dashboard.reports.empty")}
        </p>
      ) : (
        <div className="space-y-3">
          {data.reports.map((report) => (
            <ReportRow key={report.id} report={report} />
          ))}
        </div>
      )}
    </section>
  );
}
