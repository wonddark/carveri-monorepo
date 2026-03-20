// apps/desktop/src/components/ReportHeader.tsx
import { ChevronLeft, Download, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import LanguageToggle from '@carveri/shared/components/LanguageToggle'
import ThemeToggle from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import type { VehicleReport } from '@carveri/shared/data/report'

interface Props {
  vehicle: Pick<VehicleReport, 'year' | 'make' | 'model' | 'trim' | 'vin'>
}

export default function ReportHeader({ vehicle }: Readonly<Props>) {
  const navigate = useNavigate()
  const { year, make, model, trim, vin } = vehicle

  return (
    <header className={cn(
      'sticky top-0 z-20 flex h-14 items-center justify-between',
      'border-b border-slate-100 bg-white px-4',
      'dark:border-slate-800 dark:bg-slate-900',
    )}>
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <ChevronLeft size={18} />
        </button>
        <img
          src="/logo.svg"
          alt="CarVeri"
          className="h-6"
          onError={(e) => {
            // Fallback if logo asset missing
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <span className="hidden text-base font-black tracking-tight text-slate-900 dark:text-slate-100 sm:block">
          CarVeri
        </span>
      </div>

      {/* Center: vehicle name + VIN */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {year} {make} {model} {trim}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {vin}
        </span>
      </div>

      {/* Right: language + actions */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Share2 size={13} />
          <span className="hidden sm:inline">Compartir</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Download size={13} />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </header>
  )
}
