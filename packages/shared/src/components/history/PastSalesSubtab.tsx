import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import {
  IconBuildingStore,
  IconCar,
  IconChevronLeft,
  IconChevronRight,
  IconGavel,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import type { PastSaleDetails } from "@carveri/shared/types/vehicle-report.ts";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

// ── Subcomponents ──────────────────────────────────────────────────────────────

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
      <IconCar className="size-12 text-slate-300 dark:text-slate-600" />
    </div>
  );
}

function SaleCard({ cycle }: Readonly<{ cycle: PastSaleDetails[0] }>) {
  const { t } = useTranslation("history");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [current, setCurrent] = useState(0);

  const [erroredIndices, setErroredIndices] = useState<Set<number>>(new Set());

  const slides = cycle.photoLinks.map((src) => ({ src }));
  const total = slides.length;
  const hasPhotos = total > 0;
  const showPlaceholder = !hasPhotos || erroredIndices.has(current);

  function handleImageError(index: number) {
    setErroredIndices((prev) => new Set([...prev, index]));
  }
  const openLightbox = () => {
    setLightboxIndex(current);
    setLightboxOpen(true);
  };
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
  return (
    <>
      <div className="grid grid-cols-[1fr_30%] gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{cycle.sellerName}</p>
                <span
                  className={cn(
                    "text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[10px]",
                    {
                      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200":
                        cycle.sellerType === "dealer",
                      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200":
                        cycle.sellerType !== "dealer",
                    },
                  )}
                >
                  {t(
                    cycle.sellerType === "dealer"
                      ? "pastSales.typeDealer"
                      : "pastSales.typeAuction",
                  )}
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {`${cycle.sellerType === "dealer" ? cycle.location + " · " : ""}${cycle.sellerType === "dealer" ? cycle.startDate + " – " : ""}${cycle.endDate}`}
              </p>
            </div>
          </div>
          <div className="border-border mt-3 flex items-center justify-between gap-2 border-t pt-3">
            <div className="flex flex-wrap gap-4">
              {/* Price history */}
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                  {t("pastSales.price")}
                </span>
                <div className="text-foreground/80 flex items-center gap-1.5 text-sm font-bold">
                  {cycle.sellerType === "dealer" &&
                  cycle.startPrice !== cycle.endPrice ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-xs">
                          {t("pastSales.initialPrice")}
                        </span>
                        <span
                          className="text-muted-foreground line-through"
                          title={t("pastSales.initialPrice")}
                        >
                          {formatCurrency(cycle.startPrice ?? 0)}
                        </span>
                      </div>
                      <span>→</span>
                    </>
                  ) : null}
                  <div className="flex flex-col">
                    {cycle.startPrice === cycle.endPrice ? null : (
                      <span className="text-muted-foreground text-xs">
                        {t("pastSales.finalPrice")}
                      </span>
                    )}
                    <span title={t("pastSales.finalPrice")}>
                      {formatCurrency(cycle.endPrice ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ── Image carousel ── */}
        <button
          className="relative h-full cursor-zoom-in overflow-hidden rounded-xl select-none"
          onClick={openLightbox}
          tabIndex={0}
          aria-label="Open image gallery"
          onKeyDown={(e) => e.key === "Enter" && openLightbox()}
        >
          {/* Images */}
          <div className="dark:bg-background relative aspect-video h-full bg-slate-100">
            {cycle.photoLinks.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${cycle.sellerName} — ${i + 1}`}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-opacity duration-300",
                  i === current && !erroredIndices.has(i) ? "opacity-100" : "opacity-0",
                )}
                loading={i === 0 ? "eager" : "lazy"}
                onError={() => handleImageError(i)}
              />
            ))}
            {showPlaceholder && <ImagePlaceholder />}
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
                <IconChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="dark:bg-background/85 dark:text-foreground dark:ring-ring dark:hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/92 p-2 text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:bg-white"
              >
                <IconChevronRight className="size-3.5" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/12 px-2 py-1 backdrop-blur-sm">
              {cycle.photoLinks.map((item, i) => (
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
      </div>
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

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  salesCycles: PastSaleDetails;
}

export default function PastSalesSubtab({ salesCycles }: Readonly<Props>) {
  const { t } = useTranslation("history");

  useEffect(() => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (salesCycles.length === 0) {
    return (
      <>
        <SubTabHeader
          title={t("pastSales.heading")}
          subtitle={t("pastSales.subtitle")}
        />
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <IconBuildingStore className="text-muted-foreground/40 size-10" />
          <p className="text-muted-foreground text-sm">
            {t("pastSales.noPastSales")}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SubTabHeader
        title={t("pastSales.heading")}
        subtitle={t("pastSales.subtitle")}
      />

      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute top-5 bottom-5 left-5 w-px bg-slate-200 dark:bg-slate-700" />

        {salesCycles.map((cycle, i) => {
          const bg =
            cycle.sellerType === "dealer"
              ? "bg-green-100 dark:bg-green-900"
              : "bg-indigo-100 dark:bg-indigo-900";
          const ring =
            cycle.sellerType === "dealer"
              ? "text-green-600/30 dark:text-green-300/30"
              : "text-indigo-600/30 dark:text-indigo-300/30";
          const iconColor =
            cycle.sellerType === "dealer"
              ? "text-green-600 dark:text-green-100"
              : "text-indigo-600 dark:text-indigo-100";

          return (
            <motion.div
              key={`${cycle.sellerType}::${cycle.sellerName}::${cycle.startDate}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-4 pb-4"
            >
              {/* Circle node */}
              <div
                className={cn(
                  "ring-background relative z-10 flex size-10 shrink-0",
                  "items-center justify-center rounded-full ring-2",
                  bg,
                  ring,
                )}
              >
                {cycle.sellerType === "dealer" ? (
                  <IconBuildingStore size={18} className={iconColor} />
                ) : (
                  <IconGavel size={18} className={iconColor} />
                )}
              </div>

              {/* Card */}
              <div
                className={cn(
                  "border-border bg-card flex-1 rounded-xl border p-3 shadow-sm",
                  // cycle.isActive && "border-l-4 border-l-blue-500",
                )}
              >
                <SaleCard cycle={cycle} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
