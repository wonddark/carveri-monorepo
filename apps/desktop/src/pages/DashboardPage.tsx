import { Outlet } from "react-router";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <div className="dark:bg-background fixed inset-0 top-14 grid grid-cols-[1fr_min(76rem,100%)_1fr] gap-3 overflow-auto bg-slate-50/70">
        <div />
        <div className="relative flex">
          <DashboardSidebar />
          <main className="w-full px-5 pt-5 pb-24 md:pb-8 lg:px-6">
            <Outlet />
          </main>
        </div>
        <div />
      </div>
    </>
  );
}
