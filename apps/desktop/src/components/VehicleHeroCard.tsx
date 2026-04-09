import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { cn } from "@/lib/utils";
import VerdictBadge from "@carveri/shared/components/VerdictBadge";
import { Card } from "@carveri/shared/components/ui/card";

interface Props {
  images: string[];
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  location: string | null;
  score: number;
  verdict: string | null;
  aiSummary: string;
}

export default function VehicleHeroCard({
  images,
  year,
  make,
  model,
  trim,
  price,
  mileage,
  location,
  score,
  verdict,
  aiSummary,
}: Readonly<Props>) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const total = images.length;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + total) % total);
    },
    [total],
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % total);
    },
    [total],
  );

  const openLightbox = () => {
    setLightboxIndex(current);
    setLightboxOpen(true);
  };

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <Card className="overflow-hidden p-0">
        {/* ── Image carousel ── */}
        <div
          className="relative cursor-zoom-in overflow-hidden select-none"
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          aria-label="Open image gallery"
          onKeyDown={(e) => e.key === "Enter" && openLightbox()}
        >
          {/* Images */}
          <div className="relative h-85 w-full bg-slate-100 lg:h-100 dark:bg-slate-900">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${year} ${make} ${model} — photo ${i + 1}`}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-opacity duration-300",
                  i === current ? "opacity-100" : "opacity-0",
                )}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* Counter badge */}
          {total > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="size-3"
              >
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="13" r="1.5" />
                <path d="m21 15-5-5L5 20" />
              </svg>
              {current + 1}/{total}
            </div>
          )}

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "size-1.5 rounded-full transition-all",
                    i === current
                      ? "w-4 bg-white"
                      : "bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Info bar ── */}
        <div className="flex items-start gap-6 px-5 py-4">
          {/* Left: vehicle name + trim */}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg leading-tight font-bold tracking-tight">
              {year} <span className="uppercase">{make}</span> {model}
            </h2>
            {trim && (
              <p className="text-muted-foreground mt-0.5 text-sm">{trim}</p>
            )}
          </div>

          {/* Right: price + mileage/location + verdict badge */}
          <div className="shrink-0">
            <div className="mb-0.5 text-right text-xl font-bold">
              ${price.toLocaleString()}
            </div>
            <div className="text-muted-foreground mb-3 text-right text-xs">
              {mileage.toLocaleString()} mi
              {location && <> · {location}</>}
            </div>
            <VerdictBadge
              score={score}
              verdict={verdict}
              aiSummary={aiSummary}
            />
          </div>
        </div>
      </Card>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ scrollToZoom: true }}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </>
  );
}
