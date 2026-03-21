import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "@/components/BottomNavBar";
import HomeTab from "@/components/home/HomeTab.tsx";
import MarketTab from "@carveri/shared/components/market/MarketTab";
import NegotiateTab from "@carveri/shared/components/negotiate/NegotiateTab";
import VerdictTab from "@carveri/shared/components/verdict/VerdictTab";
import HistoryTab from "@/components/history/HistoryTab.tsx";
import type { TabId } from "@carveri/shared/data/report";
import { MOCK_REPORTS } from "@carveri/shared/data/report";
import { useParams } from "react-router";

const TAB_ORDER: TabId[] = [
  "home",
  "history",
  "market",
  "verdict",
  "negotiate",
];

export default function ReportPage() {
  const { vin } = useParams<{ vin: string }>();
  const report = vin ? MOCK_REPORTS[vin] : null;
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [prevTab, setPrevTab] = useState<TabId>("home");

  const handleTabChange = (tab: TabId) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const direction =
    TAB_ORDER.indexOf(activeTab) >= TAB_ORDER.indexOf(prevTab) ? 1 : -1;

  if (!report) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-slate-400">Report not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <main className="flex-1 pb-24">
        {/* overflow-hidden clips the horizontal slide animation without trapping vertical scroll */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {activeTab === "home" && (
                <HomeTab report={report} onNavigate={handleTabChange} />
              )}

              {activeTab === "history" && <HistoryTab report={report} />}

              {activeTab === "market" && <MarketTab report={report} />}

              {activeTab === "negotiate" && <NegotiateTab report={report} />}

              {activeTab === "verdict" && <VerdictTab report={report} />}

              {activeTab !== "home" &&
                activeTab !== "market" &&
                activeTab !== "negotiate" &&
                activeTab !== "verdict" &&
                activeTab !== "history" && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <p className="text-sm font-semibold capitalize">
                      {activeTab} tab
                    </p>
                    <p className="mt-1 text-xs">Coming soon</p>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
