import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronRight, Home } from "lucide-react";
import type { VerdictRisk } from "@/data/report";

interface Props {
  risks: VerdictRisk[];
}

export default function RisksSubtab({ risks }: Readonly<Props>) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>Verdict</span>
        <ChevronRight size={10} />
        <span>Risks</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">Risk Analysis</h2>

      <div className="space-y-3">
        {risks.map((risk, i) => {
          const isPositive = risk.type === "positive";
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex gap-3 rounded-2xl p-4 ${isPositive ? "border border-indigo-100 bg-indigo-50" : "border border-amber-100 bg-amber-50"}`}
            >
              {isPositive ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-indigo-500"
                />
              ) : (
                <AlertTriangle
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-amber-500"
                />
              )}
              <div>
                <p
                  className={`text-sm font-bold ${isPositive ? "text-indigo-700" : "text-amber-700"}`}
                >
                  {risk.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  {risk.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
