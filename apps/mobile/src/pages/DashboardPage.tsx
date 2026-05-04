import { Outlet } from "react-router";
import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import LanguageToggle from "@carveri/shared/components/LanguageToggle";
import ThemeToggle from "@carveri/shared/components/ThemeToggle";
import DashboardBottomNav from "@/components/DashboardBottomNav";

type DashboardPageProps = Record<string, never>;

function DashboardPage(props: Readonly<DashboardPageProps>) {
  const {} = props;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border/60 bg-background/95 fixed inset-x-0 top-0 z-20 h-14 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-107.5 items-center justify-between px-4">
          <LogoFullHorizontal className="h-6 w-auto" />
          <div className="flex items-center gap-1.5">
            <LanguageToggle variant="default" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-14 pb-24">
        <Outlet />
      </main>

      <DashboardBottomNav />
    </div>
  );
}

export default DashboardPage;
