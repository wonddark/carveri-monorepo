import { buildGaugeSvg } from "@carveri/shared/lib/gauge.ts";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn, getPercentile } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

type Props = {
  label: string;
  price: number;
  averageDeltaPct: number;
  minimum: number;
  maximum: number;
};

function ReportGauge(props: Readonly<Props>) {
  const { label, price, averageDeltaPct, minimum, maximum } = props;
  const { t, i18n } = useTranslation("vehicle-details");
  const lang = (i18n.resolvedLanguage || "en") as "es" | "en";
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const percentile = getPercentile({
    min: minimum,
    max: maximum,
    value: price,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bg-card mb-4 rounded-xl p-4 ${isVisible ? "" : "gauge-paused"}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="gauge-label">{t("gauge.priceEvaluation")}</span>

        <span
          className={cn("gauge-trend", {
            down: averageDeltaPct <= 0,
            up: averageDeltaPct > 0,
          })}
        >
          {averageDeltaPct <= 0 ? (
            <span>&#129158;</span>
          ) : (
            <span>&#129157;</span>
          )}{" "}
          {`${averageDeltaPct}%`}
        </span>
      </div>
      {parse(buildGaugeSvg(percentile, price, label, lang))}
      <div className="flex items-center justify-between px-6 py-2.5 lg:px-16">
        <div className="text-muted-foreground text-sm">
          {formatCurrency(minimum)}
        </div>
        <div className="text-muted-foreground text-sm">
          {formatCurrency(maximum)}
        </div>
      </div>
    </div>
  );
}

export default ReportGauge;
