// apps/desktop/src/components/ReportMainContent.tsx
import TimelineSubtab from '@carveri/shared/components/history/TimelineSubtab'
import AuctionPhotosSubtab from '@carveri/shared/components/history/AuctionPhotosSubtab'
import AccidentsSubtab from '@carveri/shared/components/history/AccidentsSubtab'
import OwnersSubtab from '@carveri/shared/components/history/OwnersSubtab'
import ServiceSubtab from '@carveri/shared/components/history/ServiceSubtab'
import TitleSubtab from '@carveri/shared/components/history/TitleSubtab'
import MarketTab from '@carveri/shared/components/market/MarketTab'
import VerdictSubtab from '@carveri/shared/components/verdict/VerdictSubtab'
import RisksSubtab from '@carveri/shared/components/verdict/RisksSubtab'
import ChecklistSubtab from '@carveri/shared/components/verdict/ChecklistSubtab'
import StrategySubtab from '@carveri/shared/components/negotiate/StrategySubtab'
import ArgumentsSubtab from '@carveri/shared/components/negotiate/ArgumentsSubtab'
import CostsSubtab from '@carveri/shared/components/negotiate/CostsSubtab'
import ResumenView from '@/components/ResumenView'
import type { VehicleReport } from '@carveri/shared/data/report'
import type { SectionId } from '@/pages/ReportPage'

interface Props {
  activeSection: SectionId
  report: VehicleReport
  onNavigate: (s: SectionId) => void
}

export default function ReportMainContent({ activeSection, report, onNavigate }: Readonly<Props>) {
  const { historyTab, verdictTab, negotiate } = report

  switch (activeSection) {
    case 'resumen':
      return <ResumenView report={report} onNavigate={onNavigate} />
    case 'timeline':
      return <TimelineSubtab timeline={historyTab.timeline} />
    case 'fotos-subasta':
      return <AuctionPhotosSubtab photos={historyTab.auctionPhotos} />
    case 'accidentes':
      return <AccidentsSubtab accidents={historyTab.accidents} />
    case 'duenos':
      return <OwnersSubtab owners={historyTab.owners} />
    case 'servicio':
      return <ServiceSubtab service={historyTab.service} />
    case 'titulo':
      return <TitleSubtab title={historyTab.title} />
    case 'mercado':
      return <MarketTab report={report} />
    case 'veredicto':
      return (
        <VerdictSubtab
          score={report.score}
          recommendation={report.verdict}
          summary={report.aiSummary}
          scoreBreakdown={verdictTab.scoreBreakdown}
        />
      )
    case 'riesgos':
      return <RisksSubtab risks={verdictTab.risks} />
    case 'checklist':
      return <ChecklistSubtab checklist={verdictTab.checklist} />
    case 'estrategia':
      return <StrategySubtab strategy={negotiate.strategy} />
    case 'argumentos':
      return <ArgumentsSubtab args={negotiate.arguments} />
    case 'costos':
      return <CostsSubtab price={report.price} costs={negotiate.costs} />
    default:
      return null
  }
}
