import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import ComparableCard from "./ComparableCard";
import type { ComparableVehicle } from "@carveri/shared/data/report";

interface Props {
  comparables: ComparableVehicle[];
  location: string;
}

export default function ComparablesList({
  comparables,
  location,
}: Readonly<Props>) {
  const { t } = useTranslation('market');
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-1 flex items-center gap-2">
        <MapPin size={16} className="text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900">
          {t('comparables.heading')}
        </h3>
      </div>
      <p className="mb-3 text-[10px] text-slate-400">
        {t('comparables.similarVehicles', { city: location })}
      </p>

      <div>
        {comparables.map((vehicle, i) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ComparableCard vehicle={vehicle} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
