import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { cn } from "@/lib/utils";
import VerdictBadge from "@carveri/shared/components/VerdictBadge";
import { Card } from "@carveri/shared/components/ui/card";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

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
      <Card className="dark:border-border dark:bg-background overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-0 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.28)] ring-0 dark:shadow-md">
        {/* ── Image carousel ── */}
        <button
          className="relative cursor-zoom-in overflow-hidden select-none"
          onClick={openLightbox}
          tabIndex={0}
          aria-label="Open image gallery"
          onKeyDown={(e) => e.key === "Enter" && openLightbox()}
        >
          {/* Images */}
          <div className="dark:bg-background relative h-84 w-full bg-slate-100 lg:h-96">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${year} ${make} ${model} — ${i + 1}`}
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
            <div className="dark:bg-background dark:text-foreground dark:ring-ring absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/88 px-2.5 py-1 text-[10px] font-semibold text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
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
                className="dark:bg-background/85 dark:text-foreground dark:ring-ring dark:hover:bg-background absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/92 p-2 text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="dark:bg-background/85 dark:text-foreground dark:ring-ring dark:hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/92 p-2 text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/12 px-2 py-1 backdrop-blur-sm">
              {images.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all",
                    i === current
                      ? "w-4 bg-white"
                      : "bg-white/55 hover:bg-white/85",
                  )}
                />
              ))}
            </div>
          )}
        </button>

        {/* ── Info bar ── */}
        <div className="flex items-start gap-5 border-t border-slate-100 px-5 py-5 lg:px-6">
          {/* Left: vehicle name + trim */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[1.15rem] leading-tight font-semibold tracking-tight text-slate-900">
              {year} <span className="uppercase">{make}</span> {model}
            </h2>
            {trim && (
              <p className="text-muted-foreground mt-1 text-sm">{trim}</p>
            )}
          </div>

          {/* Right: price + mileage/location + verdict badge */}
          <div className="shrink-0 space-y-3 self-stretch lg:w-65">
            <div className="text-right text-[1.55rem] font-semibold tracking-tight text-slate-900">
              {formatCurrency(price)}
            </div>
            <div className="text-muted-foreground text-right text-[12px]">
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
