import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "@/components/BottomNavBar";

const TAB_ORDER = ["home", "history", "market", "verdict", "negotiate"];

function getTabFromPath(pathname: string): string {
  return pathname.split("/").pop() ?? "home";
}

export default function ReportPage() {
  const location = useLocation();
  const currentTab = getTabFromPath(location.pathname);
  const prevTabRef = useRef(currentTab);

  const direction =
    TAB_ORDER.indexOf(currentTab) >= TAB_ORDER.indexOf(prevTabRef.current)
      ? 1
      : -1;

  useEffect(() => {
    prevTabRef.current = currentTab;
  }, [currentTab]);

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 pb-24">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={location.pathname}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
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
