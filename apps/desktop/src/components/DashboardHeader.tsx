import { Form, Link, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { IconLogout } from "@tabler/icons-react";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import type { DashboardData } from "@carveri/shared/types/dashboard.ts";

export default function DashboardHeader() {
  const { t } = useTranslation("common");
  const data = useRouteLoaderData("dashboard") as DashboardData;

  return (
    <header className="border-border/60 bg-card/95 fixed inset-x-0 top-0 z-20 h-14 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 lg:px-5">
        <Link to="/">
          <LogoFullHorizontal className="h-7 w-auto" />
        </Link>

        <span className="text-[13px] font-semibold tracking-tight text-slate-700 dark:text-slate-300">
          {t("dashboard.header.title")}
        </span>

        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground mr-1 hidden text-[13px] sm:inline">
            {data.account.name}
          </span>
          <LanguageToggle variant="default" />
          <ThemeToggle />
          <Form method="post" action="/logout">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <IconLogout className="size-4" />
              <span className="hidden sm:inline">
                {t("dashboard.header.logout")}
              </span>
            </Button>
          </Form>
        </div>
      </div>
    </header>
  );
}
