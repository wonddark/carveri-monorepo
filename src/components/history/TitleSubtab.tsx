import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Home, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { HistoryTitleItem } from '@/data/report'

interface Props {
  title: HistoryTitleItem[]
}

export default function TitleSubtab({ title }: Props) {
  const { t } = useTranslation('history')
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>{t('bottomNav.history', { ns: 'common' })}</span>
        <ChevronRight size={10} />
        <span>{t('tabs.title')}</span>
      </div>

      <h2 className="font-black text-slate-900 text-xl">{t('titleStatus.heading')}</h2>
      <p className="text-xs text-slate-400 -mt-2">{t('titleStatus.subtitle')}</p>

      {title.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-3"
        >
          <CheckCircle2 size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-indigo-700">{item.title}</div>
            <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
          </div>
        </motion.div>
      ))}
    </>
  )
}
