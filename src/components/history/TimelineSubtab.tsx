import { motion } from 'framer-motion'
import { Home, ChevronRight, Factory, Ship, User, FileText, Wrench, Building2, MapPin } from 'lucide-react'
import type { HistoryEvent } from '@/data/report'

const TYPE_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  manufacture: Factory,
  import:      Ship,
  owner:       User,
  title:       FileText,
  service:     Wrench,
  auction:     Building2,
  current:     MapPin,
}

const TYPE_BOX: Record<string, string> = {
  manufacture: 'bg-slate-100',
  import:      'bg-slate-100',
  owner:       'bg-indigo-50',
  title:       'bg-indigo-50',
  service:     'bg-green-50',
  auction:     'bg-amber-50',
  current:     'bg-indigo-600',
}

const TYPE_ICON_COLOR: Record<string, string> = {
  manufacture: 'text-slate-500',
  import:      'text-slate-500',
  owner:       'text-indigo-500',
  title:       'text-indigo-500',
  service:     'text-green-600',
  auction:     'text-amber-500',
  current:     'text-white',
}

interface Props {
  timeline: HistoryEvent[]
}

export default function TimelineSubtab({ timeline }: Props) {
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>History</span>
        <ChevronRight size={10} />
        <span>Timeline</span>
      </div>

      <h2 className="font-black text-slate-900 text-xl">Vehicle Timeline</h2>
      <p className="text-xs text-slate-400 -mt-2">Everything that has happened to this vehicle</p>

      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        {timeline.map((event, i) => {
          const Icon = TYPE_ICON[event.type]
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_BOX[event.type]}`}>
                {Icon && <Icon size={16} className={TYPE_ICON_COLOR[event.type]} />}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">{event.date}</div>
                <div className="text-sm font-bold text-slate-900">{event.title}</div>
                <div className="text-xs text-slate-500">{event.description}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
