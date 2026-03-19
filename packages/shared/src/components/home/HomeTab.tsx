// src/components/home/HomeTab.tsx
import { useEffect, useRef, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsGrid from "./StatsGrid";
import PriceEvalSection from "./PriceEvalSection";
import VehicleDataSection from "./VehicleDataSection";
import AISummarySection from "./AISummarySection";
import QuickNavGrid from "./QuickNavGrid";
import type { TabId, VehicleReport } from "@carveri/shared/data/report";
import ImageCarousel from "@carveri/shared/components/ImageCarousel.tsx";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";

interface Props {
  report: VehicleReport;
  onNavigate: (tab: TabId) => void;
}

export default function HomeTab(props: Readonly<Props>) {
  const { report, onNavigate } = props;
  const { t } = useTranslation("home");
  const [isCarouselVisible, setIsCarouselVisible] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsCarouselVisible(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div ref={carouselRef}>
        <ImageCarousel images={report.images} />
      </div>

      <div
        className={cn(
          "bg-background relative -mt-4 space-y-3 rounded-t-3xl px-4 pt-3",
          "transition-all duration-300 ease-in-out",
          {
            "rounded-t-none": !isCarouselVisible,
          },
        )}
      >
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
    </div>
  );
}
