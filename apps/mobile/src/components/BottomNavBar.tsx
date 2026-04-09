import { BarChart2, Clock, Handshake, Home, Sparkles } from "lucide-react";
import { NavLink, useParams } from "react-router";
import { cn } from "@carveri/shared/lib/utils";
import { useTranslation } from "react-i18next";

export default function BottomNavBar() {
  const { vin } = useParams<{ vin: string }>();
  const { t } = useTranslation("common");

  const TABS = [
    { id: "home", label: t("bottomNav.home"), icon: <Home size={20} /> },
    { id: "history", label: t("bottomNav.history"), icon: <Clock size={20} /> },
    {
      id: "market",
      label: t("bottomNav.market"),
      icon: <BarChart2 size={20} />,
    },
    {
      id: "diagnosis",
      label: t("bottomNav.diagnosis"),
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
        <NavLink
          key={tab.id}
          to={`/reports/${vin}/${tab.id}`}
          className={({ isActive }: { isActive: boolean }) =>
            cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-semibold transition-colors",
              isActive ? "text-primary" : "text-slate-400",
            )
          }
        >
          {tab.icon}
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
