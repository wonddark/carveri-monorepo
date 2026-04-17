import {
  buildGaugeSvg,
  type SectionLabels,
} from "@carveri/shared/lib/gauge.ts";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPercentile } from "@carveri/shared/lib/utils.ts";
import { formatCurrency } from "@carveri/shared/lib/formatters.ts";
import type { EvaluationGauge } from "@carveri/shared/types/vehicle-report.ts";

type Props = {
  price: number;
  gauge: EvaluationGauge;
};

function ReportGauge(props: Readonly<Props>) {
  const { price, gauge } = props;
  const { i18n } = useTranslation("vehicle-details");
  const lang = (i18n.resolvedLanguage || "en") as "es" | "en";
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const minimum = gauge.minimum;
  const maximum = gauge.maximum;

  const percentile = getPercentile({
    min: minimum,
    max: maximum,
    value: price,
  });

  const labels: SectionLabels = gauge.labels.map((label) => ({
    ...label,
    text: label.text[lang],
  }));

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
      {parse(buildGaugeSvg(percentile, price, gauge.currentZone[lang], labels))}
      <div className="grid grid-cols-8 py-2">
        <div></div>
        <div className="text-sm font-black text-[#22C55E]">
          {formatCurrency(gauge.minimum)}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div className="text-sm font-black text-[#EF4444]">
          {formatCurrency(gauge.maximum)}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default ReportGauge;
