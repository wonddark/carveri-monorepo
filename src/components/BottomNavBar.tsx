import { BarChart2, Clock, Handshake, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TabId } from "@/data/report";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "history", label: "History", icon: <Clock size={20} /> },
  { id: "market", label: "Market", icon: <BarChart2 size={20} /> },
  { id: "verdict", label: "Verdict", icon: <Sparkles size={20} /> },
  { id: "negotiate", label: "Negotiate", icon: <Handshake size={20} /> },
];

export default function BottomNavBar({
  activeTab,
  onTabChange,
}: Readonly<Props>) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-107.5 -translate-x-1/2 justify-around border-t border-slate-100 bg-white px-1 pt-2 pb-4">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-semibold transition-colors",
            activeTab === tab.id ? "text-indigo-600" : "text-slate-400",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
