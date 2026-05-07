/**
 * CarVeriGauge — Exact replica of the speedometer gauge from dev-m.carveri.com
 * viewBox: 0 0 310 245, center: (160, 145), arc radius: 114, label radius: 135
 * 5 zones: GANGA (green) → BAJO (lime) → JUSTO (yellow) → ALTO (orange) → CARO (red)
 * 240° sweep from 210° (bottom-left) to -30° (bottom-right)
 */
import React, { useMemo } from "react";
import type { SectionLabels } from "@carveri/shared/lib/gauge.ts";

interface CarVeriGaugeProps {
  /** Price to display inside the gauge */
  price: number;
  /** Score from 0 (GANGA/left) to 10 (CARO/right) */
  score: number;
  /** Low end of market range */
  rangeLow: number;
  /** High end of market range */
  rangeHigh: number;
  /** Unique ID prefix to avoid SVG id collisions when multiple gauges on page */
  idPrefix?: string;
  labels: SectionLabels;
}

// Geometry constants matching the dev site exactly
const CX = 160;
const CY = 145;
const FACE_R = 127;
const ARC_R = 114;
const ARC_W = 8;
const LABEL_R = 135;
const START_ANGLE = 210; // degrees (bottom-left)
const END_ANGLE = -30; // degrees (bottom-right)
const TOTAL_SWEEP = 240;

const toRad = (d: number) => (d * Math.PI) / 180;
const pX = (deg: number, r: number) => CX + r * Math.cos(toRad(deg));
const pY = (deg: number, r: number) => CY - r * Math.sin(toRad(deg));

// Needle drawn at angle=0 (pointing right); CSS rotation positions it via .gauge-needle
const NEEDLE_POINTS = `${CX + ARC_R - ARC_W - 6},${CY} ${CX},${CY - 12} ${CX - 14},${CY} ${CX},${CY + 12}`;

/** Generate individual arc segments for a zone (like the dev site does) */
function generateArcSegments(
  startDeg: number,
  endDeg: number,
  color: string,
  radius: number,
  numSegments: number,
) {
  const segments: { id: string; d: string; color: string }[] = [];
  const sweep = startDeg - endDeg;
  const segSweep = sweep / numSegments;
  const gap = segSweep * 0.06; // small gap between segments

  for (let i = 0; i < numSegments; i++) {
    const a1 = startDeg - i * segSweep;
    const a2 = startDeg - (i + 1) * segSweep + gap;
    const x1 = pX(a1, radius),
      y1 = pY(a1, radius);
    const x2 = pX(a2, radius),
      y2 = pY(a2, radius);
    const large = Math.abs(a1 - a2) > 180 ? 1 : 0;
    segments.push({
      id: `seg${i}`,
      d: `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`,
      color,
    });
  }
  return segments;
}

/** Generate tick marks matching the dev site (32 ticks total) */
function generateTicks() {
  const ticks: {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: number;
  }[] = [];

  const numTicks = 32;
  for (let i = 0; i <= numTicks; i++) {
    const angle = START_ANGLE - (i / numTicks) * TOTAL_SWEEP;
    const innerEdge = ARC_R - ARC_W;

    // Major ticks every 6, medium every 3
    const isMajor = i % 8 === 0;
    const isMedium = i % 4 === 0 && !isMajor;

    let len: number, stroke: string, sw: number;
    if (isMajor) {
      len = 9;
      stroke = "#999";
      sw = 2;
    } else if (isMedium) {
      len = 6;
      stroke = "#666";
      sw = 1;
    } else {
      len = 4;
      stroke = "#444";
      sw = 0.6;
    }

    ticks.push({
      id: `tick${i}`,
      x1: pX(angle, innerEdge),
      y1: pY(angle, innerEdge),
      x2: pX(angle, innerEdge - len),
      y2: pY(angle, innerEdge - len),
      stroke,
      strokeWidth: sw,
    });
  }
  return ticks;
}

/** Generate textPath arc definitions for zone labels */
function generateLabelPaths() {
  // These are the exact paths from the dev site (radius 135)
  return [
    {
      id: "gla0",
      d: `M ${pX(210, LABEL_R)} ${pY(210, LABEL_R)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${pX(157.2, LABEL_R)} ${pY(157.2, LABEL_R)}`,
    },
    {
      id: "gla1",
      d: `M ${pX(157.2, LABEL_R)} ${pY(157.2, LABEL_R)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${pX(109.2, LABEL_R)} ${pY(109.2, LABEL_R)}`,
    },
    {
      id: "gla2",
      d: `M ${pX(109.2, LABEL_R)} ${pY(109.2, LABEL_R)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${pX(66, LABEL_R)} ${pY(66, LABEL_R)}`,
    },
    {
      id: "gla3",
      d: `M ${pX(66, LABEL_R)} ${pY(66, LABEL_R)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${pX(18, LABEL_R)} ${pY(18, LABEL_R)}`,
    },
    {
      id: "gla4",
      d: `M ${pX(18, LABEL_R)} ${pY(18, LABEL_R)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${pX(-30, LABEL_R)} ${pY(-30, LABEL_R)}`,
    },
  ];
}

export default function CarVeriGauge(props: Readonly<CarVeriGaugeProps>) {
  const { price, score, rangeLow, rangeHigh, labels, idPrefix = "g" } = props;
  // Zone definitions
  const ZONES = [
    { frac: 0.22, color: "#22C55E", label: labels[0].text },
    { frac: 0.2, color: "#84CC16", label: labels[1].text },
    { frac: 0.18, color: "#EAB308", label: labels[2].text },
    { frac: 0.2, color: "#F97316", label: labels[3].text },
    { frac: 0.2, color: "#EF4444", label: labels[4].text },
  ];
  const VERDICT_MAP: Record<string, string> = {
    GANGA: labels[0].text,
    BAJO: labels[1].text,
    JUSTO: labels[2].text,
    ALTO: labels[3].text,
    CARO: labels[4].text,
  };
  const data = useMemo(() => {
    // Build zone arcs
    let cumFrac = 0;
    const zoneArcs = ZONES.map((z) => {
      const a1 = START_ANGLE - cumFrac * TOTAL_SWEEP;
      cumFrac += z.frac;
      const a2 = START_ANGLE - cumFrac * TOTAL_SWEEP;
      return { ...z, a1, a2 };
    });

    // Generate segmented arcs for each zone
    const allSegments = zoneArcs.flatMap((z) => {
      const zoneSweep = z.a1 - z.a2;
      const numSegs = Math.max(3, Math.round(zoneSweep / 3.5));
      return generateArcSegments(z.a1, z.a2, z.color, ARC_R, numSegs);
    });

    // Determine active zone
    const scoreFrac = score / 10;
    const activeZone = zoneArcs.find((z) => {
      const zStart = (START_ANGLE - z.a1) / TOTAL_SWEEP;
      const zEnd = (START_ANGLE - z.a2) / TOTAL_SWEEP;
      return scoreFrac >= zStart && scoreFrac <= zEnd;
    });
    const verdictLabel = activeZone?.label || "JUSTO";
    const verdictColor = activeZone?.color || "#EAB308";

    // Ticks
    const ticks = generateTicks();

    // Label paths
    const labelPaths = generateLabelPaths();

    // Endpoint dots
    const startDot = {
      x: pX(START_ANGLE, ARC_R - ARC_W + 3),
      y: pY(START_ANGLE, ARC_R - ARC_W + 3) + 10,
    };
    const endDot = {
      x: pX(END_ANGLE, ARC_R - ARC_W + 3),
      y: pY(END_ANGLE, ARC_R - ARC_W + 3) + 10,
    };

    return {
      allSegments,
      verdictLabel,
      verdictColor,
      ticks,
      labelPaths,
      startDot,
      endDot,
    };
  }, [score]);

  const { allSegments, verdictLabel, verdictColor, ticks, labelPaths, startDot, endDot } = data;
  const cssTarget = 150 + (score / 10) * TOTAL_SWEEP;

  return (
    <svg
      viewBox="0 0 310 245"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%" }}
    >
      <defs>
        {/* Face gradient — dark metallic */}
        <radialGradient id={`${idPrefix}-gf`} cx="50%" cy="48%" r="52%">
          <stop offset="0%" stopColor="#2E3138" />
          <stop offset="70%" stopColor="#1E2028" />
          <stop offset="100%" stopColor="#16181E" />
        </radialGradient>

        {/* Needle glow filter */}
        <filter
          id={`${idPrefix}-ng`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gauge shadow */}
        <filter
          id={`${idPrefix}-gs`}
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="6"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>

        {/* Inner glow based on verdict color */}
        <radialGradient id={`${idPrefix}-ig`} cx="50%" cy="48%" r="45%">
          <stop offset="0%" stopColor={verdictColor} stopOpacity="0.06" />
          <stop offset="100%" stopColor={verdictColor} stopOpacity="0" />
        </radialGradient>

        {/* Needle gradient */}
        <linearGradient
          id={`${idPrefix}-ndg`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#888" />
          <stop offset="40%" stopColor={verdictColor} />
          <stop offset="100%" stopColor={verdictColor} />
        </linearGradient>

        {/* Label arc paths */}
        {labelPaths.map((lp) => (
          <path key={lp.id} id={`${idPrefix}-${lp.id}`} d={lp.d} />
        ))}

        {/* Clip path */}
        <clipPath id={`${idPrefix}-clip`}>
          <rect x="0" y="0" width="320" height="225" />
        </clipPath>
      </defs>

      {/* Background face */}
      <g clipPath={`url(#${idPrefix}-clip)`}>
        <circle
          cx={CX}
          cy={CY}
          r={FACE_R}
          fill={`url(#${idPrefix}-gf)`}
          filter={`url(#${idPrefix}-gs)`}
        />
        <circle
          cx={CX}
          cy={CY}
          r={FACE_R}
          fill="none"
          stroke="#444"
          strokeWidth={1}
        />
        <circle
          cx={CX}
          cy={CY}
          r={FACE_R - 2}
          fill="none"
          stroke="#333"
          strokeWidth={0.5}
        />
        <circle cx={CX} cy={CY} r={90} fill={`url(#${idPrefix}-ig)`} />
      </g>

      {/* Colored arc segments */}
      {allSegments.map((seg) => (
        <path
          key={seg.id}
          d={seg.d}
          fill="none"
          stroke={seg.color}
          strokeWidth={ARC_W}
          strokeLinecap="butt"
          opacity={0.85}
        />
      ))}

      {/* Tick marks */}
      {ticks.map((t) => (
        <line
          key={t.id}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.stroke}
          strokeWidth={t.strokeWidth}
        />
      ))}

      {/* Zone labels via textPath */}
      {ZONES.map((z, i) => (
        <text
          key={z.frac}
          fill={z.color}
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.5"
        >
          <textPath
            href={`#${idPrefix}-gla${i}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {z.label}
          </textPath>
        </text>
      ))}

      {/* Needle */}
      <g
        className="gauge-needle"
        style={{ "--needle-target": `${cssTarget}deg` } as React.CSSProperties}
      >
        <polygon
          points={NEEDLE_POINTS}
          fill={`url(#${idPrefix}-ndg)`}
          filter={`url(#${idPrefix}-ng)`}
        />
      </g>

      {/* Hub — concentric circles */}
      <circle
        cx={CX}
        cy={CY}
        r={14}
        fill="#1A1C22"
        stroke="#555"
        strokeWidth={1}
      />
      <circle
        cx={CX}
        cy={CY}
        r={10}
        fill="#2A2D35"
        stroke="#444"
        strokeWidth={0.5}
      />
      <circle cx={CX} cy={CY} r={6} fill={verdictColor} />
      <circle cx={CX} cy={CY} r={3} fill="white" />

      {/* Endpoint dots */}
      <circle cx={startDot.x} cy={startDot.y} r={3} fill="#22C55E" />
      <circle cx={endDot.x} cy={endDot.y} r={3} fill="#EF4444" />

      {/* Price — large white text */}
      <text
        x={CX}
        y={183}
        fill="white"
        fontSize="24"
        fontWeight="800"
        fontFamily="Outfit, sans-serif"
        textAnchor="middle"
      >
        ${price.toLocaleString()}
      </text>

      {/* Verdict badge */}
      <rect
        x={CX - 40}
        y={191}
        width={80}
        height={18}
        rx={9}
        fill={verdictColor}
        opacity={0.15}
      />
      <text
        x={CX}
        y={203}
        fill={verdictColor}
        fontSize="8.5"
        fontWeight="800"
        fontFamily="Outfit, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {VERDICT_MAP[verdictLabel] || verdictLabel}
      </text>

      {/* Min / Max prices */}
      <text
        x={61}
        y={238}
        fill="#22C55E"
        fontSize="10"
        fontWeight="700"
        fontFamily="Outfit, sans-serif"
        textAnchor="middle"
      >
        ${rangeLow.toLocaleString()}
      </text>
      <text
        x={259}
        y={238}
        fill="#EF4444"
        fontSize="10"
        fontWeight="700"
        fontFamily="Outfit, sans-serif"
        textAnchor="middle"
      >
        ${rangeHigh.toLocaleString()}
      </text>
    </svg>
  );
}
