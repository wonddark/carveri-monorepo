// apps/desktop/src/components/ResumenView.tsx
import { Home } from 'lucide-react'
import StatsGrid from '@carveri/shared/components/home/StatsGrid'
import BookValues from '@carveri/shared/components/home/BookValues'
import VehicleDataSection from '@carveri/shared/components/home/VehicleDataSection'
import AISummarySection from '@carveri/shared/components/home/AISummarySection'
import QuickNavGrid from '@carveri/shared/components/home/QuickNavGrid'
import type { VehicleReport } from '@carveri/shared/data/report'
import type { TabId } from '@carveri/shared/data/report'

import type { SectionId } from '@/pages/ReportPage'
export type { SectionId } from '@/pages/ReportPage'

const PRICE_LABEL_TEXT: Record<VehicleReport['priceEval']['label'], string> = {
  BARGAIN: 'Ganga',
  LOW: 'Por debajo del mercado',
  FAIR: 'Precio justo',
  HIGH: 'Por encima del mercado',
  OVERPRICED: 'Caro',
}

function tabIdToSection(tab: TabId): SectionId {
  const map: Record<TabId, SectionId> = {
    home: 'resumen',
    history: 'timeline',
    market: 'mercado',
    verdict: 'veredicto',
    negotiate: 'estrategia',
  }
  return map[tab]
}

interface Props {
  report: VehicleReport
  onNavigate: (s: SectionId) => void
}

export default function ResumenView({ report, onNavigate }: Readonly<Props>) {
  const { priceEval, stats } = report
  const isAbove = priceEval.marketAvgDeltaPct > 0
  const absPct = Math.abs(priceEval.marketAvgDeltaPct).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Home size={11} />
        <span>Resumen</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-black text-slate-900">Resumen del Reporte</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Vista general de tu CarVeri para{' '}
          <span className="font-semibold">
            {report.year} {report.make} {report.model}
          </span>
        </p>
      </div>

      {/* Quick stats 2×2 */}
      <StatsGrid stats={stats} />

      {/* Price Evaluation (no gauge) */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">$ Evaluación de Precio</span>
        </div>
        <div className="mb-1 text-center text-3xl font-black text-slate-900">
          ${report.price.toLocaleString()}
        </div>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-blue-600">
          {PRICE_LABEL_TEXT[priceEval.label]} —{' '}
          {absPct}% {isAbove ? 'por encima' : 'por debajo'} del promedio
        </p>
        <BookValues bookValues={priceEval.bookValues} />
      </div>

      {/* Vehicle data */}
      <VehicleDataSection
        vin={report.vin}
        engine={report.engine}
        transmission={report.transmission}
        drivetrain={report.drivetrain}
        color={report.color}
        auction={report.auction}
        location={report.location}
        daysOnLot={report.daysOnLot}
        previousOwners={report.previousOwners}
      />

      {/* AI summary */}
      {report.aiSummary ? (
        <AISummarySection aiSummary={report.aiSummary} />
      ) : null}

      {/* Quick-nav cards */}
      <QuickNavGrid onNavigate={(tab) => onNavigate(tabIdToSection(tab))} />
    </div>
  )
}
