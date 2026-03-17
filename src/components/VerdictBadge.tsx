import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  score: number
  verdict: 'BUY' | 'CONSIDER' | 'AVOID'
  aiSummary: string
}

const VERDICT_CONFIG = {
  BUY:     { label: 'BUY',     icon: CheckCircle,  classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CONSIDER:{ label: 'CONSIDER',icon: AlertCircle,  classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  AVOID:   { label: 'AVOID',   icon: XCircle,      classes: 'bg-red-50 text-red-700 border-red-200' },
}

export default function VerdictBadge({ score, verdict, aiSummary }: Props) {
  const config = VERDICT_CONFIG[verdict]
  const Icon = config.icon

  return (
    <div className="flex gap-3 bg-slate-50 rounded-xl p-3 mt-2">
      <div className="bg-indigo-600 text-white rounded-xl px-3 py-2 text-center min-w-[52px]">
        <div className="text-xl font-black leading-none">{score}</div>
        <div className="text-[9px] opacity-70 mt-0.5">/10</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-slate-400 font-medium mb-1">CarVeri Verdict</div>
        <div className={cn('inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border', config.classes)}>
          <Icon size={11} />
          {config.label}
        </div>
        <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">{aiSummary}</p>
      </div>
    </div>
  )
}
