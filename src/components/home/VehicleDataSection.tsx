import { Car } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { VehicleReport } from '@/data/report'

interface Props {
  vin: string
  engine: string
  transmission: string
  drivetrain: string
  color: string
  auction: VehicleReport['auction']
  location: string
  daysOnLot: number
  previousOwners: number
}

export default function VehicleDataSection(props: Props) {
  const { vin, engine, transmission, drivetrain, color, auction, location, daysOnLot, previousOwners } = props
  const { t } = useTranslation('home')

  const rows = [
    { label: t('vehicleDetails.vin'),          value: vin },
    { label: t('vehicleDetails.engine'),        value: engine },
    { label: t('vehicleDetails.transmission'),  value: transmission },
    { label: t('vehicleDetails.drivetrain'),    value: drivetrain },
    { label: t('vehicleDetails.color'),         value: color },
    { label: t('vehicleDetails.auction'),       value: `${auction.name} — $${auction.price.toLocaleString()}` },
    { label: t('vehicleDetails.location'),      value: location },
    { label: t('vehicleDetails.daysOnLot'),     value: `${daysOnLot} ${t('vehicleDetails.days')}` },
    { label: t('vehicleDetails.prevOwners'),    value: `${previousOwners}` },
  ]

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100">
      <div className="flex items-center gap-2 mb-3">
        <Car size={16} className="text-indigo-500" />
        <h3 className="font-bold text-slate-900 text-sm">{t('vehicleDetails.title')}</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0">
        {rows.map(row => (
          <div key={row.label} className="py-2 border-b border-slate-50">
            <div className="text-[10px] text-slate-400">{row.label}</div>
            <div className="text-xs font-semibold text-slate-800 leading-snug break-words">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
