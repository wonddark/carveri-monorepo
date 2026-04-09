import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import ComparableCard from "./ComparableCard";
import type { TransformedComparable } from "@carveri/shared/lib/transforms.ts";

const PAGE_SIZE = 5;

interface Props {
  comparables: TransformedComparable[];
  subjectPrice: number;
  location: string;
}

export default function ComparablesList({
  comparables,
  subjectPrice,
  location,
}: Readonly<Props>) {
  const { t } = useTranslation("market");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < comparables.length) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, comparables.length));
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, comparables.length]);

  const visible = comparables.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <LayoutGrid size={16} className="text-primary" />
        <h3 className="text-sm font-semibold">{t("comparables.heading")}</h3>
        {comparables.length > 0 && (
          <span className="ml-auto text-xs text-muted-foreground">
            {visible.length} / {comparables.length}
          </span>
        )}
      </div>

      {location && (
        <p className="mb-1 text-xs text-muted-foreground">
          {t("comparables.similarVehicles", { city: location })}
        </p>
      )}

      {comparables.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {t("comparables.noComparables")}
        </p>
      ) : (
        <>
          {visible.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
            >
              <ComparableCard vehicle={vehicle} subjectPrice={subjectPrice} />
            </motion.div>
          ))}
          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-4" />
          {visibleCount < comparables.length && (
            <p className="py-2 text-center text-xs text-muted-foreground">
              {t("comparables.loadingMore", { defaultValue: "Loading more…" })}
            </p>
          )}
        </>
      )}
    </div>
  );
}
