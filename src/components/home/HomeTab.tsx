// src/components/home/HomeTab.tsx
import { useEffect, useRef } from "react";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsGrid from "./StatsGrid";
import PriceEvalSection from "./PriceEvalSection";
import VehicleDataSection from "./VehicleDataSection";
import AISummarySection from "./AISummarySection";
import QuickNavGrid from "./QuickNavGrid";
import type { TabId, VehicleReport } from "@/data/report";
import ImageCarousel from "@/components/ImageCarousel.tsx";
import CarSummaryCard from "@/components/CarSummaryCard.tsx";

interface Props {
  report: VehicleReport;
  onNavigate: (tab: TabId) => void;
  onCarouselVisibilityChange: (visible: boolean) => void;
}

export default function HomeTab({ report, onNavigate, onCarouselVisibilityChange }: Readonly<Props>) {
  const { t } = useTranslation("home");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => onCarouselVisibilityChange(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onCarouselVisibilityChange]);

  return (
    <>
      <div ref={carouselRef}>
        <ImageCarousel images={report.images} />
      </div>

      <div className="space-y-3 px-4 pt-3">
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
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-100 p-1.5">
            <LayoutDashboard size={14} className="text-indigo-600" />
          </div>
          <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Summary
          </span>
        </div>
        <h2 className="-mt-1 text-xl font-black text-slate-900">
          {t("reportSummary")}
        </h2>
        <p className="-mt-2 text-xs text-slate-400">
          {t("overviewFor", {
            name: `${report.year} ${report.make} ${report.model}`,
          })}
        </p>
        <StatsGrid stats={report.stats} />
        <PriceEvalSection price={report.price} priceEval={report.priceEval} />
        <VehicleDataSection
          vin={report.vin}
          engine={report.engine}
          transmission={report.transmission}
          drivetrain={report.drivetrain}
          color={report.color}
          auction={report.auction}
          location={report.location}
          daysOnLot={report.daysOnLot}
          previousOwners={report.previousOwners}
        />
        <AISummarySection aiSummary={report.aiSummary} />
        <QuickNavGrid onNavigate={onNavigate} />
      </div>
    </>
  );
}
