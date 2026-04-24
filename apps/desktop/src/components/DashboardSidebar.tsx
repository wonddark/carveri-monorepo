import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  IconCreditCard,
  IconFileDescription,
  IconSettings,
} from "@tabler/icons-react";

interface NavItem {
  path: string;
  label: string;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  children: NavItem[];
}

type NavEntry =
  | { type: "item"; path: string; label: string; icon: ReactNode }
  | { type: "group"; group: NavGroup };

const NAV: NavEntry[] = [
  {
    type: "item",
    path: "/dashboard/plan",
    label: "dashboard.nav.plan",
    icon: <IconCreditCard className="w-4" />,
  },
  {
    type: "item",
    path: "/dashboard/reports",
    label: "dashboard.nav.reports",
    icon: <IconFileDescription className="w-4" />,
  },
  {
    type: "group",
    group: {
      label: "dashboard.nav.settings",
      icon: <IconSettings className="w-4" />,
      children: [
        {
          path: "/dashboard/settings/profile",
          label: "dashboard.nav.profile",
        },
        {
          path: "/dashboard/settings/security",
          label: "dashboard.nav.security",
        },
        {
          path: "/dashboard/settings/account",
          label: "dashboard.nav.account",
        },
      ],
    },
  },
];

export default function DashboardSidebar() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const isInSettings = location.pathname.includes("/dashboard/settings/");

  // Persist manual toggle state; auto-open when navigating into settings
  const [settingsManualOpen, setSettingsManualOpen] = useState(() => isInSettings);
  const settingsOpen = settingsManualOpen || isInSettings;

  const toggleGroup = (label: string) => {
    if (label === "dashboard.nav.settings") {
      setSettingsManualOpen(!settingsOpen);
    }
  };

  return (
    <aside className="border-border/60 bg-card/90 sticky top-0 flex h-[calc(100vh-56px)] w-52 shrink-0 grow-0 flex-col self-start overflow-y-auto border-r backdrop-blur-sm">
      <div className="flex-auto p-2.5">
        <nav className="space-y-1.5">
          {NAV.map((entry) => {
            if (entry.type === "item") {
              return (
                <NavLink
                  key={entry.path}
                  to={entry.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium",
                      "text-foreground/65 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                      isActive &&
                        "pointer-events-none bg-blue-50/80 text-blue-700 shadow-sm ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-900",
                    )
                  }
                >
                  {entry.icon}
                  {t(entry.label)}
                </NavLink>
              );
            }

            const { group } = entry;
            const isOpen = group.label === "dashboard.nav.settings" ? settingsOpen : false;
            const isChildActive = group.children.some((c) =>
              location.pathname.startsWith(c.path),
            );

            return (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-[13px] font-medium",
                    "text-foreground/65 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                    isChildActive && !isOpen && "text-primary",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {group.icon} {t(group.label)}
                  </div>
                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {isOpen && (
                  <div className="border-border/60 mt-1 ml-3.5 space-y-0.5 border-l pl-3">
                    {group.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }: { isActive: boolean }) =>
                          cn(
                            "gap-2 rounded-lg px-2",
                            "text-muted-foreground flex w-full cursor-pointer items-center py-1.5 pr-3 text-[11px] transition-colors duration-200 ease-in-out",
                            isActive
                              ? "text-primary font-semibold"
                              : "hover:text-foreground/80 font-medium",
                          )
                        }
                      >
                        <div className="size-1 rounded-full bg-current/35" />
                        {t(child.label)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
