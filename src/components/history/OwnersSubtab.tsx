import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import type { HistoryOwner } from "@/data/report";

interface Props {
  owners: HistoryOwner[];
}

export default function OwnersSubtab({ owners }: Readonly<Props>) {
  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>History</span>
        <ChevronRight size={10} />
        <span>Owners</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">Owner History</h2>
      <p className="-mt-2 text-xs text-slate-400">
        {owners.length} registered owners
      </p>

      {owners.map((owner, i) => (
        <motion.div
          key={owner.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-slate-100 bg-white p-4"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-600">
              #{i + 1}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {owner.label}
              </div>
              <div className="text-xs text-slate-400">
                {owner.type} · {owner.state}
              </div>
            </div>
          </div>
          {[
            {
              label: "Period",
              value: `${owner.periodStart} — ${owner.periodEnd} (${owner.periodMonths} mo)`,
            },
            {
              label: "Start mileage",
              value: `${owner.startMileage.toLocaleString()} mi`,
            },
            {
              label: "End mileage",
              value: `${owner.endMileage.toLocaleString()} mi`,
            },
            {
              label: "Miles driven",
              value: `${(owner.endMileage - owner.startMileage).toLocaleString()} mi`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between border-b border-slate-100 py-1.5 last:border-0"
            >
              <span className="text-xs text-slate-500">{label}</span>
              <span className="text-xs font-semibold text-slate-900">
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      ))}
    </>
  );
}
