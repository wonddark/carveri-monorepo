// src/components/home/HomeTab.tsx
import { useEffect, useRef, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsGrid from "@carveri/shared/components/home/StatsGrid.tsx";
import PriceEvalSection from "@carveri/shared/components/home/PriceEvalSection.tsx";
import VehicleDataSection from "@carveri/shared/components/home/VehicleDataSection.tsx";
import AISummarySection from "@carveri/shared/components/home/AISummarySection.tsx";
import type { VehicleReport } from "@carveri/shared/data/report.ts";
import ImageCarousel from "@carveri/shared/components/ImageCarousel.tsx";
import CarSummaryCard from "@carveri/shared/components/CarSummaryCard.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import AppHeader from "@/components/AppHeader.tsx";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  report: VehicleReport;
}

export default function HomeTab(props: Readonly<Props>) {
  const { report } = props;
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
      <AppHeader
        showAppName={!isCarouselVisible}
        title={generateReportTitle({
          year: report.year,
          make: report.make,
          model: report.model,
        })}
        isTransparent={isCarouselVisible}
      />

      <div ref={carouselRef} className="h-80">
        <ImageCarousel images={report.images} />
      </div>

      <div
        className={cn(
          "bg-background relative -mt-4 space-y-3 rounded-t-3xl px-4 pt-4",
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
          <div className="bg-primary/15 rounded-full p-1.5">
            <LayoutDashboard size={14} className="text-primary" />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase">
            Summary
          </span>
        </div>

        <SubTabHeader
          title={t("reportSummary")}
          subtitle={t("overviewFor", {
            name: `${report.year} ${report.make} ${report.model}`,
          })}
        />

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
      </div>
    </div>
  );
}
