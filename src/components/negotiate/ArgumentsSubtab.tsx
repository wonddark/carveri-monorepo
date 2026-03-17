import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import ArgumentCard from "./ArgumentCard";
import type { NegotiateArgument } from "@/data/report";

interface Props {
  args: NegotiateArgument[];
}

export default function ArgumentsSubtab({ args }: Readonly<Props>) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>Negotiate</span>
        <ChevronRight size={10} />
        <span>Arguments</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">
        Negotiation Arguments
      </h2>

      <div className="space-y-3">
        {args.map((argument, i) => (
          <motion.div
            key={argument.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <ArgumentCard argument={argument} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
