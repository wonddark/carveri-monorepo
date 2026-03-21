import { BarChart2, Clock, Handshake, Home, Sparkles } from "lucide-react";
import { cn } from "@carveri/shared/lib/utils";
import type { TabId } from "@carveri/shared/data/report";
import { useTranslation } from "react-i18next";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNavBar({
  activeTab,
  onTabChange,
}: Readonly<Props>) {
  const { t } = useTranslation("common");
  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: t("bottomNav.home"), icon: <Home size={20} /> },
    { id: "history", label: t("bottomNav.history"), icon: <Clock size={20} /> },
    {
      id: "market",
      label: t("bottomNav.market"),
      icon: <BarChart2 size={20} />,
    },
    {
      id: "verdict",
      label: t("bottomNav.verdict"),
      icon: <Sparkles size={20} />,
    },
    {
      id: "negotiate",
      label: t("bottomNav.negotiate"),
      icon: <Handshake size={20} />,
    },
  ];
  return (
    <nav className="border-border bg-background fixed bottom-0 left-1/2 z-50 flex w-full max-w-107.5 -translate-x-1/2 justify-around border-t px-1 pt-2 pb-4">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-semibold transition-colors",
            activeTab === tab.id ? "text-primary" : "text-slate-400",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
