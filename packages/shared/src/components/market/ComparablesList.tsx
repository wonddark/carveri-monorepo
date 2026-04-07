import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import ComparableCard from "./ComparableCard";
import type { ComparableVehicle } from "@carveri/shared/data/report";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

interface Props {
  comparables: ComparableVehicle[];
  location: string;
}

export default function ComparablesList({
  comparables,
  location,
}: Readonly<Props>) {
  const { t } = useTranslation("market");
  return (
    <Card>
      <CardContent>
        <div className="mb-1 flex items-center gap-2">
          <MapPin size={16} className="text-indigo-500" />
          <h3 className="text-sm font-semibold">{t("comparables.heading")}</h3>
        </div>

        <p className="text-muted-foreground mb-3 text-xs">
          {t("comparables.similarVehicles", { city: location })}
        </p>

        {comparables.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            {t("comparables.noComparables")}
          </p>
        ) : (
          comparables.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="border-border border-b last:border-0"
            >
              <ComparableCard vehicle={vehicle} />
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
