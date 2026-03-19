import { buildGaugeSvg, fmt } from "@carveri/shared/lib/gauge.ts";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  percentile: number;
  label: string;
  price: number;
  wholesale: number;
  retail: number;
};

function ReportGauge(props: Readonly<Props>) {
  const { percentile, label, price, wholesale, retail } = props;
  const { t } = useTranslation("vehicle-details");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className={`mb-4 rounded-xl bg-linear-135 from-[#1a1c22] to-[#16181e] p-4${isVisible ? "" : " gauge-paused"}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1"></div>
          <span className="gauge-label">{t('gauge.priceEvaluation')}</span>
        </div>
        <span className="gauge-trend">↘ -2.8%</span>
      </div>
      {parse(buildGaugeSvg(percentile, price, label))}
      <div className="gauge-bottom-stats">
        <div className="gauge-stat">
          <div className="gauge-stat-label">{t('gauge.wholesale')}</div>
          <div className="gauge-stat-value">{fmt(wholesale)}</div>
        </div>
        <div className="gauge-stat">
          <div className="gauge-stat-label">{t('gauge.retail')}</div>
          <div className="gauge-stat-value">{fmt(retail)}</div>
        </div>
        <div className="gauge-stat">
          <div className="gauge-stat-label">{t('gauge.percentile')}</div>
          <div className="gauge-stat-value">{t('gauge.top')} {percentile.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}

export default ReportGauge;
