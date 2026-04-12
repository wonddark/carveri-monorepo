import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { FadeIn, FadeUp } from "@carveri/shared/components/animations.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import { getVehicleList } from "@carveri/shared/data/api.ts";
import type { VehicleListItem } from "@carveri/shared/types/vehicle-list.ts";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";

function getTitleBadge(
  titleDetails: string | null,
): { label: string; green: boolean } | null {
  if (!titleDetails) return null;
  const isClean = titleDetails.toUpperCase().includes("CLEAN");
  return {
    label: isClean ? "✓ Clean Title" : `⚠ ${titleDetails}`,
    green: isClean,
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

type CardProps = {
  car: VehicleListItem;
  tViewReport: string;
  tDataHint: string;
};

function ExampleCard({ car, tViewReport, tDataHint }: Readonly<CardProps>) {
  const badge = getTitleBadge(car.titleDetails);
  const title = generateReportTitle({
    year: car.year ?? 0,
    make: car.make ?? "-",
    model: car.model ?? "-",
    trim: car.trim ?? "-",
  });

  return (
    <a href={`/reports/${car.id}`} className="group w-72 shrink-0 snap-start">
      <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        {/* Photo */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={car.imageThumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {badge && (
            <span
              className={cn(
                "absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white",
                badge.green ? "bg-green-600/90" : "bg-amber-600/90",
              )}
            >
              {badge.label}
            </span>
          )}
          {car.auction && (
            <span className="absolute right-2.5 bottom-2.5 text-[10px] font-medium text-white/55">
              {car.auction}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="truncate font-[Outfit] text-[15px] font-bold">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="font-[Outfit] text-lg font-black">
              {formatPrice(car.retailPrice)}
            </span>
            <span className="text-xs text-muted-foreground">{car.odometro}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{tDataHint}</p>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-primary text-xs font-semibold">{tViewReport}</span>
            <span className="text-primary text-sm">→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function ExamplesSlider() {
  const { t } = useTranslation("homepage");
  const [examples, setExamples] = useState<VehicleListItem[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    (async () => {
      const vList = await getVehicleList();
      setExamples(vList.data);
    })();
  }, []);

  return (
    <section className="overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-primary font-[Outfit] text-xs font-bold uppercase tracking-widest">
                {t("examples.eyebrow")}
              </span>
              <h2 className="mt-1 font-[Outfit] text-[1.5rem] font-black tracking-tight sm:text-[1.75rem]">
                {t("examples.title")}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t("examples.subtitle")}
              </p>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("left")}
                className="rounded-full border-border hover:border-border/90"
              >
                <IconChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("right")}
                className="rounded-full border-border hover:border-border/90"
              >
                <IconChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </FadeUp>

        <FadeIn>
          <div
            ref={sliderRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {examples.map((car) => (
              <ExampleCard
                key={car.id}
                car={car}
                tViewReport={t("examples.viewReport")}
                tDataHint={t("examples.dataHint")}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ExamplesSlider;
