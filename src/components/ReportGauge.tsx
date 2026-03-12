import { buildGaugeSvg, fmt } from "@/lib/gauge.ts";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

type Props = {
  percentile: number;
  label: string;
  price: number;
  wholesale: number;
  retail: number;
};

function ReportGauge(props: Readonly<Props>) {
  const { percentile, label, price, wholesale, retail } = props;
  const [gaugeSvg, setGaugeSvg] = useState<string>(() =>
    buildGaugeSvg(0, 0, "Sin datos"),
  );

  useEffect(() => {
    (async () => {
      const gauge = buildGaugeSvg(percentile, price, label);
      setGaugeSvg(gauge);
    })();
  }, [percentile, label, price]);

  return (
    <div className="mb-4 rounded-xl bg-linear-135 from-[#1a1c22] to-[#16181e] p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1"></div>
          <span className="gauge-label">Evaluación de Precio</span>
        </div>
        <span className="gauge-trend">↘ -2.8%</span>
      </div>
      {parse(gaugeSvg)}
      <div className="gauge-bottom-stats">
        <div className="gauge-stat">
          <div className="gauge-stat-label">Wholesale</div>
          <div className="gauge-stat-value">{fmt(wholesale)}</div>
        </div>
        <div className="gauge-stat">
          <div className="gauge-stat-label">Retail</div>
          <div className="gauge-stat-value">{fmt(retail)}</div>
        </div>
        <div className="gauge-stat">
          <div className="gauge-stat-label">Percentil</div>
          <div className="gauge-stat-value">Top {percentile}%</div>
        </div>
      </div>
    </div>
  );
}

export default ReportGauge;
