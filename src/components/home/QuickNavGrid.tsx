import { motion } from "framer-motion";
import { BarChart2, CalendarDays, Handshake, Sparkles } from "lucide-react";
import type { TabId } from "@/data/report";

interface Props {
  onNavigate: (tab: TabId) => void;
}

const ITEMS: {
  tab: TabId;
  icon: React.ReactNode;
  title: string;
  sub: string;
}[] = [
  {
    tab: "history",
    icon: <CalendarDays size={20} className="text-indigo-500" />,
    title: "Timeline",
    sub: "Full vehicle history",
  },
  {
    tab: "market",
    icon: <BarChart2 size={20} className="text-indigo-500" />,
    title: "Market",
    sub: "Price & comparables",
  },
  {
    tab: "verdict",
    icon: <Sparkles size={20} className="text-indigo-500" />,
    title: "AI Verdict",
    sub: "Detailed analysis",
  },
  {
    tab: "negotiate",
    icon: <Handshake size={20} className="text-indigo-500" />,
    title: "Negotiate",
    sub: "Strategy & arguments",
  },
];

export default function QuickNavGrid({ onNavigate }: Readonly<Props>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ITEMS.map((item) => (
        <motion.button
          key={item.tab}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate(item.tab)}
          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left"
        >
          <div className="rounded-xl bg-indigo-50 p-2">{item.icon}</div>
          <div>
            <div className="text-xs font-bold text-slate-900">{item.title}</div>
            <div className="text-[10px] leading-snug text-slate-400">
              {item.sub}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
