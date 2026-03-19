import { Lightbulb } from "lucide-react";
import type { NegotiateArgument } from "@carveri/shared/data/report";

interface Props {
  argument: NegotiateArgument;
}

export default function ArgumentCard({ argument }: Readonly<Props>) {
  return (
    <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
      <p className="text-sm font-bold text-slate-900">{argument.title}</p>
      <p className="text-sm leading-relaxed text-blue-500">{argument.body}</p>
      <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
        <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-amber-500" />
        <p className="text-xs text-amber-700">{argument.tip}</p>
      </div>
    </div>
  );
}
