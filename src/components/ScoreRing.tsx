import { useEffect, useState } from "react";

function ScoreRing({ score }: Readonly<{ score: number }>) {
  const SIZE = 52;
  const STROKE = 4;
  const r = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  const targetOffset = circumference * (1 - score / 10);

  const [offset, setOffset] = useState(circumference);

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
        className="stroke-indigo-100 dark:stroke-indigo-900"
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
        className="stroke-indigo-600 dark:stroke-indigo-400"
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
        className="fill-indigo-700 dark:fill-indigo-300"
        style={{ fontSize: "12px", fontWeight: 900 }}
      >
        {score}
      </text>
    </svg>
  );
}

export default ScoreRing;
