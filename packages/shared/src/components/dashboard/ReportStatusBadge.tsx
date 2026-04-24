import { useTranslation } from "react-i18next";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { EvaluationResult, ReportStatus } from "@carveri/shared/types/dashboard.ts";

const STATUS_STYLES: Record<ReportStatus, string> = {
  PENDING:
    "border-border text-muted-foreground",
  PROCESSING:
    "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900",
  READY:
    "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900",
  ARCHIVED:
    "bg-secondary text-secondary-foreground border-transparent",
};

const EVAL_STYLES: Record<EvaluationResult, string> = {
  BUY: "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900",
  NEGOTIATE:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  AVOID:
    "bg-destructive/10 text-destructive border-transparent",
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const { t } = useTranslation("common");
  return (
    <Badge
      variant="outline"
      className={cn("border font-medium", STATUS_STYLES[status])}
    >
      {t(`dashboard.reports.status.${status}`)}
    </Badge>
  );
}

export function EvaluationBadge({ result }: { result: EvaluationResult }) {
  const { t } = useTranslation("common");
  return (
    <Badge
      variant="outline"
      className={cn("border font-semibold", EVAL_STYLES[result])}
    >
      {t(`dashboard.reports.evaluation.${result}`)}
    </Badge>
  );
}
