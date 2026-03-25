import { Car } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { VehicleReport } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  vin: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  color: string;
  auction: VehicleReport["auction"];
  location: string;
  daysOnLot: number;
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
      value: `${auction.name} — $${auction.price.toLocaleString()}`,
    },
    { label: t("vehicleDetails.location"), value: location },
    {
      label: t("vehicleDetails.daysOnLot"),
      value: `${daysOnLot} ${t("vehicleDetails.days")}`,
    },
    { label: t("vehicleDetails.prevOwners"), value: `${previousOwners}` },
  ];

  return (
    <Card className="lg:w-fit">
      <CardContent>
        <div className="mb-3 flex items-center gap-2">
          <Car size={16} className="text-primary" />
          <h3 className="text-sm font-semibold">{t("vehicleDetails.title")}</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {rows.map((row) => (
            <div key={row.label} className="py-2">
              <div className="text-muted-foreground text-xs">{row.label}</div>
              <div className="text-xs leading-snug font-medium break-words">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
