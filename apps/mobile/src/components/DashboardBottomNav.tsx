import {
  FileTextIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "@carveri/shared/lib/utils";
import { useTranslation } from "react-i18next";

export default function DashboardBottomNav() {
  const { t } = useTranslation("common");

  const TABS = [
    {
      to: "/dashboard",
      end: true,
      label: t("dashboardNav.home"),
      icon: <LayoutDashboardIcon size={20} />,
    },
    {
      to: "/dashboard/reports",
      end: false,
      label: t("dashboardNav.reports"),
      icon: <FileTextIcon size={20} />,
    },
    {
      to: "/dashboard/buy-credits",
      end: false,
      label: t("dashboardNav.buy"),
      icon: <ShoppingBagIcon size={20} />,
    },
    {
      to: "/dashboard/transactions",
      end: false,
      label: t("dashboardNav.transactions"),
      icon: <ReceiptIcon size={20} />,
    },
    {
      to: "/dashboard/settings",
      end: false,
      label: t("dashboardNav.settings"),
      icon: <UserIcon size={20} />,
    },
  ];

  return (
    <nav className="border-border bg-background fixed bottom-0 left-1/2 z-50 flex w-full max-w-107.5 -translate-x-1/2 justify-around border-t px-1 pt-2 pb-4">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
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
