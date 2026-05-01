import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

type SectionsChecklistProps = { report: TransformedReport };

export default function SectionsChecklist(props: Readonly<SectionsChecklistProps>) {
  const { report } = props;
  const { t } = useTranslation("homepage");

  const sections = [
    { key: "timeline", available: report.historyTab.timeline.length > 0 },
    { key: "accidents", available: true },
    { key: "owners", available: report.historyTab.owners.length > 0 },
    { key: "service", available: report.historyTab.service.length > 0 },
    { key: "titleHistory", available: report.historyTab.title.length > 0 },
    { key: "auctionHistory", available: report.auctionSales.length > 0 },
    { key: "auctionPhotos", available: report.historyTab.auctionPhotos.length > 0 },
    { key: "comparables", available: report.comparables.length > 0 },
    { key: "priceDynamics", available: report.priceDynamics.history.length > 1 },
  ];

  return (
    <Card className="dark:bg-card dark:border-border rounded-[1.5rem] border border-slate-200/80">
      <CardContent className="p-5">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-foreground">
          {t("preview.sectionsTitle")}
        </h3>
        <ul className="flex flex-col gap-2.5">
          {sections.map(({ key, available }) => (
            <li key={key} className="flex items-center gap-2.5">
              {available ? (
                <CheckCircle2 className="size-4 shrink-0 text-green-500" />
              ) : (
                <XCircle className="size-4 shrink-0 text-slate-300 dark:text-slate-600" />
              )}
              <span
                className={cn(
                  "text-sm",
                  available
                    ? "font-medium text-slate-900 dark:text-foreground"
                    : "text-slate-400 dark:text-slate-500",
                )}
              >
                {t(`preview.sections.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
