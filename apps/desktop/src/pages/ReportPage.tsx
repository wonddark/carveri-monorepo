import { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { VehicleReport as ApiReport } from '@carveri/shared/types/vehicle-report'
import { transformToSharedReport } from '@/lib/transforms'
import ReportHeader from '@/components/ReportHeader'
import ReportSidebar from '@/components/ReportSidebar'
import ReportMainContent from '@/components/ReportMainContent'

export type SectionId =
  | 'resumen'
  | 'timeline'
  | 'fotos-subasta'
  | 'accidentes'
  | 'duenos'
  | 'servicio'
  | 'titulo'
  | 'mercado'
  | 'veredicto'
  | 'riesgos'
  | 'checklist'
  | 'estrategia'
  | 'argumentos'
  | 'costos'

export default function ReportPage() {
  const apiReport = useLoaderData<ApiReport>()
  const report = transformToSharedReport(apiReport)
  const [activeSection, setActiveSection] = useState<SectionId>('resumen')

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <ReportHeader vehicle={report} />
      <div className="flex flex-1 overflow-hidden">
        <ReportSidebar
          report={report}
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="flex-1 overflow-y-auto bg-white p-8">
          <ReportMainContent
            activeSection={activeSection}
            report={report}
            onNavigate={setActiveSection}
          />
        </main>
      </div>
    </div>
  )
}
