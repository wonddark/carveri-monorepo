import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

type VehicleInfoCardProps = { report: TransformedReport };

export default function VehicleInfoCard(props: Readonly<VehicleInfoCardProps>) {
  const { report } = props;
  const { t } = useTranslation("homepage");

  const fields = [
    { label: t("preview.fields.vin"), value: report.vin, full: true },
    { label: t("preview.fields.year"), value: String(report.year) },
    { label: t("preview.fields.make"), value: report.make },
    { label: t("preview.fields.model"), value: report.model },
    { label: t("preview.fields.trim"), value: report.trim || "—" },
    { label: t("preview.fields.engine"), value: report.engine || "—" },
    { label: t("preview.fields.transmission"), value: report.transmission || "—" },
    { label: t("preview.fields.drive"), value: report.drivetrain || "—" },
    { label: t("preview.fields.color"), value: report.color || "—" },
    { label: t("preview.fields.odometer"), value: `${report.mileage.toLocaleString()} mi` },
    { label: t("preview.fields.title"), value: report.stats?.titleStatus || "—" },
  ];

  return (
    <Card className="dark:bg-card dark:border-border rounded-[1.5rem] border border-slate-200/80">
      <CardContent className="p-5">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-foreground">
          {t("preview.carInfoTitle")}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
          {fields.map(({ label, value, full }) => (
            <div key={label} className={cn(full && "col-span-2")}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
