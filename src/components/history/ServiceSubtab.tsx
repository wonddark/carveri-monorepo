import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronRight, Home, Wrench } from "lucide-react";
import type { HistoryServiceRecord } from "@/data/report";

interface Props {
  service: HistoryServiceRecord[];
}

export default function ServiceSubtab({ service }: Readonly<Props>) {
  const { t } = useTranslation('history');
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>{t('bottomNav.history', { ns: 'common' })}</span>
        <ChevronRight size={10} />
        <span>{t('tabs.service')}</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">{t('service.heading')}</h2>
      <p className="-mt-2 text-xs text-slate-400">
        {t('service.recordsSuffix', { count: service.length })}
      </p>

      {service.map((record, i) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Wrench size={16} className="text-indigo-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-slate-900">
              {record.name}
            </div>
            <div className="text-xs text-slate-400">{record.type}</div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-xs font-semibold text-indigo-600">
              {record.date}
            </div>
            <div className="text-xs text-slate-400">
              {record.mileage.toLocaleString()} mi
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
