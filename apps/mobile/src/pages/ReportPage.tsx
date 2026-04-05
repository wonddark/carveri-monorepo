import { useEffect, useRef } from "react";
import { Outlet, useLocation, useRouteLoaderData } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "@/components/BottomNavBar";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";

const TAB_ORDER = ["home", "history", "market", "verdict", "negotiate"];

function getTabFromPath(pathname: string): string {
  return pathname.split("/").pop() ?? "home";
}

const tabVariants = {
  initial: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

export default function ReportPage() {
  const location = useLocation();
  const currentTab = getTabFromPath(location.pathname);
  const prevTabRef = useRef(currentTab);
  const { year, make, model, trim } = useRouteLoaderData(
    "report",
  ) as TransformedReport;

  const direction =
    TAB_ORDER.indexOf(currentTab) >= TAB_ORDER.indexOf(prevTabRef.current)
      ? 1
      : -1;

  useEffect(() => {
    prevTabRef.current = currentTab;
  }, [currentTab]);

  useEffect(() => {
    document.title = generateReportTitle({ year, make, model, trim });
  }, [make, model, trim, year]);

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 pb-24">
        <div className="overflow-hidden">
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={direction}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
