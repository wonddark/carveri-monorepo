import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import BottomNavBar from "@/components/BottomNavBar";
import ImageCarousel from "@/components/ImageCarousel";
import CarSummaryCard from "@/components/CarSummaryCard";
import HomeTab from "@/components/home/HomeTab";
import MarketTab from "@/components/market/MarketTab";
import NegotiateTab from "@/components/negotiate/NegotiateTab";
import VerdictTab from "@/components/verdict/VerdictTab";
import HistoryTab from "@/components/history/HistoryTab";
import type { TabId } from "@/data/report";
import { MOCK_REPORTS } from "@/data/report";
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
      <AppHeader />
      <ImageCarousel images={report.images} />
      <CarSummaryCard
        year={report.year}
        make={report.make}
        model={report.model}
        trim={report.trim}
        price={report.price}
        mileage={report.mileage}
        location={report.location}
        score={report.score}
        verdict={report.verdict}
        aiSummary={report.aiSummary}
      />

      {/* Main scrollable content with slide transition between tabs */}
      <main className="flex-1 overflow-hidden pb-24">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="space-y-3 px-4 pt-4"
          >
            {activeTab === "home" && (
              <HomeTab report={report} onNavigate={handleTabChange} />
            )}

            {activeTab === "market" && <MarketTab report={report} />}

            {activeTab === "negotiate" && <NegotiateTab report={report} />}

            {activeTab === "verdict" && <VerdictTab report={report} />}

            {activeTab === "history" && <HistoryTab report={report} />}

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
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
