import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, Gauge, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@carveri/shared/lib/utils'
import type { VehicleReport } from '@carveri/shared/data/report'

interface Props {
  stats: VehicleReport['stats']
}

export default function StatsGrid({ stats }: Props) {
  const { t } = useTranslation('home')
  const items = [
    {
      icon: <ShieldCheck size={18} className="text-emerald-500" />,
      label: t('stats.title'),
      value: stats.titleStatus === 'Clean' ? t('stats.clean') : stats.titleStatus,
      good: stats.titleStatus === 'Clean',
    },
    {
      icon: <AlertTriangle size={18} className="text-slate-400" />,
      label: t('stats.accidents'),
      value: stats.accidents === 0 ? `0 ${t('stats.reported')}` : `${stats.accidents} ${t('stats.reported')}`,
      good: stats.accidents === 0,
    },
    {
      icon: <Gauge size={18} className="text-slate-400" />,
      label: t('stats.odometer'),
      value: stats.odometerVerified ? t('stats.verified') : t('stats.inconsistent'),
      good: stats.odometerVerified,
    },
    {
      icon: <Tag size={18} className="text-slate-400" />,
      label: t('stats.price'),
      value: `${stats.priceDeltaPct > 0 ? '+' : ''}${stats.priceDeltaPct}%`,
      good: stats.priceDeltaPct <= 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white rounded-xl p-3 flex items-center gap-2.5 border border-slate-100"
        >
          {item.icon}
          <div>
            <div className="text-[10px] text-slate-400">{item.label}</div>
            <div className={cn('text-xs font-bold', item.good ? 'text-slate-800' : 'text-red-500')}>
              {item.value}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
