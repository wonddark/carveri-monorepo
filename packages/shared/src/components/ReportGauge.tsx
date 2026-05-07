import { type SectionLabels } from "@carveri/shared/lib/gauge.ts";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { EvaluationGauge } from "@carveri/shared/types/vehicle-report.ts";
import CarVeriGauge from "@carveri/shared/components/CarVeriGauge.tsx";

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
      className={`bg-card mb-4 w-full rounded-xl p-4 ${isVisible ? "" : "gauge-paused"}`}
    >
      <CarVeriGauge
        price={price}
        score={8.2}
        rangeLow={gauge.minimum}
        rangeHigh={gauge.maximum}
        labels={labels}
      />
    </div>
  );
}

export default ReportGauge;
