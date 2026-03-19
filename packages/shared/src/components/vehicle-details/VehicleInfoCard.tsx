import React from "react";
import {
  IconCalendar,
  IconCheck,
  IconExternalLink,
  IconGauge,
  IconMapPin,
  IconShield,
} from "@tabler/icons-react";
import { type Vehicle } from "@carveri/shared/types/vehicle-detail";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface Props {
  vehicle: Vehicle;
}

export const VehicleInfoCard: React.FC<Props> = ({ vehicle }) => {
  const { t } = useTranslation("vehicle-details");
  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <Card className="z-10 max-sm:-mt-6">
      <CardHeader>
        <CardTitle>
          {`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
        </CardTitle>
        <CardDescription>{vehicle.package}</CardDescription>
        <CardAction className="text-2xl font-extrabold whitespace-nowrap">
          {fmt(vehicle.price)}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="mt-2.5 flex flex-wrap gap-2">
          <Badge variant="secondary">
            <IconGauge />
            {vehicle.mileage} mi
          </Badge>
          <Badge variant="secondary">
            <IconMapPin />
            {vehicle.location}
          </Badge>
          <Badge variant="secondary">
            <IconShield />
            {vehicle.title}
          </Badge>
          <Badge variant="secondary">
            <IconCalendar />
            {vehicle.daysOnLot} {t('infoCard.daysOnLot')}
          </Badge>
        </div>

        <Badge
          variant="default"
          className="border-green-400 bg-green-200 text-green-800 dark:border-green-100 dark:bg-green-100 dark:text-green-700"
        >
          <IconCheck className="stroke-2.5" />
          {t('infoCard.fairPrice')}
        </Badge>

        <div className="mt-2">
          <Link
            to={vehicle.listingUrl}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors duration-300 ease-in-out hover:text-blue-800 active:text-blue-950 dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconExternalLink className="h-3 w-3" />
            {t('infoCard.viewListing')} {vehicle.dealer}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
