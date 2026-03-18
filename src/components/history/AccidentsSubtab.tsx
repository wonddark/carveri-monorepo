import { useTranslation } from "react-i18next";
import { CheckCircle2, ChevronRight, Home } from "lucide-react";

interface Props {
  accidents: { count: number; description: string };
}

export default function AccidentsSubtab({ accidents }: Readonly<Props>) {
  const { t } = useTranslation('history');
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>History</span>
        <ChevronRight size={10} />
        <span>Accidents</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">Accident History</h2>
      <p className="-mt-2 text-xs text-slate-500">{accidents.description}</p>

      {accidents.count === 0 && (
        <div className="mt-2 flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-green-50 p-8">
          <CheckCircle2 size={40} className="text-green-500" />
          <p className="text-sm font-bold text-green-700">{t('accidents.cleanHistory')}</p>
          <p className="text-center text-xs text-green-600">
            {t('accidents.noAccidents')}
          </p>
        </div>
      )}
    </>
  );
}
