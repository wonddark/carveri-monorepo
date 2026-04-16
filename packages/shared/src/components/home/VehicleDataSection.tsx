import { Car } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import type { TransformedReport } from "../../lib/transforms.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

interface Props {
  vin: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  color: string;
  auction: TransformedReport["auction"];
  location: string | null;
  daysOnLot: number | null;
  previousOwners: number;
}

export default function VehicleDataSection(props: Readonly<Props>) {
  const {
    vin,
    engine,
    transmission,
    drivetrain,
    color,
    auction,
    location,
    daysOnLot,
    previousOwners,
  } = props;
  const { t } = useTranslation("home");

  const rows = [
    { label: t("vehicleDetails.vin"), value: vin },
    { label: t("vehicleDetails.engine"), value: engine },
    { label: t("vehicleDetails.transmission"), value: transmission },
    { label: t("vehicleDetails.drivetrain"), value: drivetrain },
    { label: t("vehicleDetails.color"), value: color },
    {
      label: t("vehicleDetails.auction"),
      value: `${auction.name} — ${auction.price != null ? formatCurrency(auction.price) : ""}`,
    },
    { label: t("vehicleDetails.location"), value: location ?? "-" },
    {
      label: t("vehicleDetails.daysOnLot"),
      value: daysOnLot ? `${daysOnLot} ${t("vehicleDetails.days")}` : "-",
    },
    { label: t("vehicleDetails.prevOwners"), value: `${previousOwners}` },
  ];

  return (
    <Card className="rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/80 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.22)]">
      <CardContent className="px-5 py-5 lg:px-6">
        <div className="mb-4 flex items-center gap-2.5">
          <Car size={15} className="text-primary" />
          <h3 className="text-[13px] font-semibold tracking-tight text-slate-800">
            {t("vehicleDetails.title")}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-4">
          {rows.map((row) => (
            <div key={row.label} className="py-2">
              <div className="text-muted-foreground text-[11px] font-medium tracking-wide">
                {row.label}
              </div>
              <div className="mt-1 text-[13px] leading-5 font-medium break-words text-slate-700">
                {row.value || "-"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
