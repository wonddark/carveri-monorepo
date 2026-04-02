import { Button } from "@carveri/shared/components/ui/button.tsx";
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";
import { FadeIn, FadeUp } from "@carveri/shared/components/animations.tsx";
import { useEffect, useRef, useState } from "react";
import { getVehicleList } from "@carveri/shared/data/api.ts";
import type { VehicleList } from "@carveri/shared/types/vehicle-list.ts";

function ExamplesSlider() {
  const [examples, setExamples] = useState<VehicleList>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
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
    <section className="overflow-hidden bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                Reportes recientes
              </span>
              <h2 className="mt-1 font-[Outfit] text-[1.5rem] font-black tracking-tight text-[#1D1D1F] sm:text-[1.75rem]">
                CarVeris de clientes reales
              </h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("left")}
                className="rounded-full border-gray-200 hover:border-gray-300"
              >
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollSlider("right")}
                className="rounded-full border-gray-200 hover:border-gray-300"
              >
                <IconChevronRight className="h-4 w-4" />
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
              <a
                key={car.id}
                href={`/reports/${car.vin}`}
                className="group w-65 shrink-0 snap-start sm:w-70"
              >
                <Card className="gap-0 overflow-hidden border-gray-100 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={car.imageThumbnail}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/*<Badge
                      className={`absolute top-3 left-3 ${car.verdictColor} rounded-md border-0 px-2 py-0.5 text-[11px] font-bold text-white`}
                    >
                      {car.verdict}
                    </Badge>*/}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="truncate font-[Outfit] text-[15px] font-bold text-[#1D1D1F]">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="font-[Outfit] text-lg font-black text-[#1D1D1F]">
                        {car.retailPrice}
                        {/* it was car.price */}
                      </span>
                      <span className="text-xs text-gray-400">
                        {car.odometro}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {car.auction}
                      {/* It was car.location */}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#042CD7] transition-all group-hover:gap-2">
                      Ver reporte completo{" "}
                      <IconArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ExamplesSlider;
