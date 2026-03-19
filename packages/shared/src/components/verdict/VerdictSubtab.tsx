import { Home, ChevronRight, CheckCircle, TrendingDown, ShieldCheck, Gauge, Users, Wrench, Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { VerdictScoreItem } from '@/data/report'

// ICON_MAP resolves icon name strings from mock data to lucide components.
// CheckCircle is imported separately for the recommendation chip (not via ICON_MAP).
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingDown, ShieldCheck, Gauge, Users, Wrench, Building2,
}

function formatDelta(delta: number): string {
  const abs = Math.abs(delta)
  const formatted = abs % 1 === 0 ? abs.toFixed(0) : abs.toFixed(1)
  return delta >= 0 ? `+${formatted}` : `-${formatted}`
}

const CHIP_BG: Record<'BUY' | 'CONSIDER' | 'AVOID', string> = {
  BUY: 'bg-green-500',
  CONSIDER: 'bg-amber-500',
  AVOID: 'bg-red-500',
}

interface Props {
  score: number
  recommendation: 'BUY' | 'CONSIDER' | 'AVOID'
  summary: string
  scoreBreakdown: VerdictScoreItem[]
}

const RECOMMENDATION_KEY = {
  BUY: 'recommendation.buy',
  CONSIDER: 'recommendation.consider',
  AVOID: 'recommendation.avoid',
} as const;

export default function VerdictSubtab({ score, recommendation, summary, scoreBreakdown }: Props) {
  const { t } = useTranslation('verdict')
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>{t('tabs.verdict')}</span>
        <ChevronRight size={10} />
        <span>{t('tabs.verdict')}</span>
      </div>

      <h2 className="font-black text-slate-900 text-xl">{t('main.heading')}</h2>
      <p className="text-xs text-slate-400 -mt-2">{t('main.subtitle')}</p>

      {/* Score card */}
      <div className="bg-indigo-600 rounded-2xl p-4 flex gap-4 items-start">
        <div className="flex flex-col items-start">
          <span className="text-4xl font-black text-white">{score}</span>
          <span className="text-xs text-indigo-200 font-semibold">/10</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-indigo-200 font-semibold">{t('badge.label')}</p>
          <span className={`${CHIP_BG[recommendation]} text-white rounded-full px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 mt-1`}>
            <CheckCircle size={10} />
            {t(RECOMMENDATION_KEY[recommendation])}
          </span>
          <p className="text-xs text-indigo-100 leading-relaxed mt-1">{summary}</p>
        </div>
      </div>

      {/* Score breakdown card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        {scoreBreakdown.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const isPositive = item.delta >= 0
          return (
            <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isPositive ? 'bg-indigo-50' : 'bg-amber-50'}`}>
                {Icon && <Icon size={16} className={isPositive ? 'text-indigo-500' : 'text-amber-500'} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <span className={`text-sm font-black flex-shrink-0 ${isPositive ? 'text-indigo-600' : 'text-red-500'}`}>
                {formatDelta(item.delta)}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}
