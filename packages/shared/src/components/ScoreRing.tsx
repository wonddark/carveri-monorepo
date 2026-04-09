import { useEffect, useState } from "react";

function ScoreRing({ score, size = 52 }: Readonly<{ score: number; size?: number }>) {
  const SIZE = size;
  const STROKE = Math.max(3, Math.round(SIZE * 0.077));
  const r = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  const targetOffset = circumference * (1 - score / 10);

  const [offset, setOffset] = useState(circumference);

  const getStrokeColor = () => {
    if (score <= 4) return "stroke-red-500 dark:stroke-red-400";
    if (score <= 7) return "stroke-amber-500 dark:stroke-amber-400";
    return "stroke-emerald-500 dark:stroke-emerald-400";
  };

  const getFillColor = () => {
    if (score <= 4) return "fill-red-600 dark:fill-red-400";
    if (score <= 7) return "fill-amber-600 dark:fill-amber-400";
    return "fill-emerald-600 dark:fill-emerald-400";
  };

  useEffect(() => {
    let raf2: number;
    const raf1: number = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setOffset(targetOffset));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [targetOffset]);

  const fontSize = Math.round(SIZE * 0.23);

  return (
    <svg
      width={SIZE}
      height={SIZE}
      className="shrink-0"
      aria-label={`Score: ${score} out of 10`}
    >
      {/* Track ring */}
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={r}
        fill="none"
        strokeWidth={STROKE}
        className="stroke-gray-100 dark:stroke-gray-950"
      />
      {/* Progress arc */}
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={r}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={getStrokeColor()}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Score label */}
      <text
        x={SIZE / 2}
        y={SIZE / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={getFillColor()}
        style={{ fontSize: `${fontSize}px`, fontWeight: 900 }}
      >
        {score}
      </text>
    </svg>
  );
}

export default ScoreRing;
