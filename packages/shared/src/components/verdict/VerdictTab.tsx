import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import VerdictSubtab from './VerdictSubtab'
import RisksSubtab from './RisksSubtab'
import ChecklistSubtab from './ChecklistSubtab'
import type { VehicleReport } from '@carveri/shared/data/report'

type SubtabId = 'verdict' | 'risks' | 'checklist'

interface Props {
  report: VehicleReport
}

export default function VerdictTab({ report }: Props) {
  const { t } = useTranslation('verdict')
  const SUBTABS: { id: SubtabId; label: string }[] = [
    { id: 'verdict',   label: t('tabs.verdict')   },
    { id: 'risks',     label: t('tabs.risks')     },
    { id: 'checklist', label: t('tabs.checklist') },
  ]
  const [activeSubtab, setActiveSubtab] = useState<SubtabId>('verdict')

  return (
    <>
      {/* Subtab pills */}
      <div className="flex gap-2 mb-4">
        {SUBTABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveSubtab(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${
              activeSubtab === id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSubtab === 'verdict' && (
        <VerdictSubtab
          score={report.score}
          recommendation={report.verdict}
          summary={report.aiSummary}
          scoreBreakdown={report.verdictTab.scoreBreakdown}
        />
      )}
      {activeSubtab === 'risks'     && <RisksSubtab risks={report.verdictTab.risks} />}
      {activeSubtab === 'checklist' && <ChecklistSubtab checklist={report.verdictTab.checklist} />}
    </>
  )
}
