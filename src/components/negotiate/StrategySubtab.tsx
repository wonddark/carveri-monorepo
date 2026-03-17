import { Home, ChevronRight, Lightbulb, ArrowRight } from 'lucide-react'
import type { VehicleReport } from '@/data/report'

interface Props {
  strategy: VehicleReport['negotiate']['strategy']
}

export default function StrategySubtab({ strategy }: Props) {
  const { firstOffer, midpoint, maxRecommended, tips } = strategy

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>Negotiate</span>
        <ChevronRight size={10} />
        <span>Strategy</span>
      </div>

      <h2 className="font-black text-slate-900 text-xl">Negotiation Strategy</h2>

      {/* 3-column price row */}
      <div className="flex gap-2">
        <div className="flex-1 bg-white rounded-xl border border-slate-100 p-3 text-center">
          <p className="text-[10px] font-semibold text-indigo-600 mb-1">First Offer</p>
          <p className="text-base font-black text-slate-900">${firstOffer.toLocaleString()}</p>
        </div>
        <div className="flex-1 bg-amber-50 rounded-xl border border-amber-100 p-3 text-center">
          <p className="text-[10px] font-semibold text-amber-600 mb-1">Midpoint</p>
          <p className="text-base font-black text-amber-600">${midpoint.toLocaleString()}</p>
        </div>
        <div className="flex-1 bg-red-50 rounded-xl border border-red-100 p-3 text-center">
          <p className="text-[10px] font-semibold text-red-600 mb-1">Max Recommended</p>
          <p className="text-base font-black text-red-600">${maxRecommended.toLocaleString()}</p>
        </div>
      </div>

      {/* Tips card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900">Negotiation Tips</h3>
        </div>
        <div className="space-y-0">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-2 items-start py-2 border-b border-slate-100 last:border-0">
              <ArrowRight size={12} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
