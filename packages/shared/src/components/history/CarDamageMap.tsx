/**
 * Top-down car diagram that highlights impact zones inferred from
 * Carfax/accident detail strings (e.g. "Front end damage", "Driver side").
 *
 * Zones: front · rear · left · right · front-left · front-right · rear-left · rear-right · roof
 */

type Zone =
  | "front"
  | "rear"
  | "left"
  | "right"
  | "front-left"
  | "front-right"
  | "rear-left"
  | "rear-right"
  | "roof";

// ── Zone detection ────────────────────────────────────────────────────────────

export function parseDamageZones(details: string[]): Set<Zone> {
  const text = details.join(" ").toLowerCase();
  const zones = new Set<Zone>();

  const hasFront = /\bfront\b|hood|grille|bumper(?!.*rear)|windshield|headlight/.test(text);
  const hasRear = /\brear\b|\bback\b|trunk|tail(?:gate|light)|bumper.*rear|rear.*bumper/.test(text);
  const hasLeft = /\bleft\b|driver(?:'?s)?\s*side|driver(?:'?s)?\s*front|driver(?:'?s)?\s*rear/.test(text);
  const hasRight = /\bright\b|passenger(?:'?s)?\s*side|passenger(?:'?s)?\s*front|passenger(?:'?s)?\s*rear/.test(text);
  const hasRoof = /\broof\b|rollover|overturn|top of/.test(text);

  if (hasRoof) zones.add("roof");

  // Corners take precedence over their parent sides
  if (hasFront && hasLeft) {
    zones.add("front-left");
  } else if (hasFront && hasRight) {
    zones.add("front-right");
  } else {
    if (hasFront) zones.add("front");
    if (hasLeft) zones.add("left");
    if (hasRight) zones.add("right");
  }

  if (hasRear && hasLeft) {
    zones.add("rear-left");
  } else if (hasRear && hasRight) {
    zones.add("rear-right");
  } else {
    if (hasRear) zones.add("rear");
  }

  return zones;
}

// ── SVG zone geometry (viewBox 0 0 100 200) ──────────────────────────────────
//
//   Cars occupy x: 15–85, y: 8–192
//   Wheels at each corner extend slightly outside the body.
//
//   Zone bounds:
//     front      : y 8–60,   x 15–85
//     rear       : y 140–192, x 15–85
//     left       : x 15–30,  y 60–140
//     right      : x 70–85,  y 60–140
//     front-left : x 15–40,  y 8–60
//     front-right: x 60–85,  y 8–60
//     rear-left  : x 15–40,  y 140–192
//     rear-right : x 60–85,  y 140–192
//     roof       : x 28–72,  y 75–125

const ZONE_RECTS: Record<Zone, { x: number; y: number; w: number; h: number; rx?: number }> = {
  front:        { x: 15, y: 8,   w: 70, h: 52, rx: 14 },
  rear:         { x: 15, y: 140, w: 70, h: 52, rx: 14 },
  left:         { x: 15, y: 60,  w: 15, h: 80 },
  right:        { x: 70, y: 60,  w: 15, h: 80 },
  "front-left": { x: 15, y: 8,   w: 25, h: 52, rx: 14 },
  "front-right":{ x: 60, y: 8,   w: 25, h: 52, rx: 14 },
  "rear-left":  { x: 15, y: 140, w: 25, h: 52, rx: 14 },
  "rear-right": { x: 60, y: 140, w: 25, h: 52, rx: 14 },
  roof:         { x: 28, y: 75,  w: 44, h: 50, rx: 6 },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  details: string[];
  redFlag: boolean;
}

export default function CarDamageMap({ details, redFlag }: Readonly<Props>) {
  const zones = parseDamageZones(details);
  if (zones.size === 0) return null;

  const hitColor = redFlag ? "#ef4444" : "#f97316"; // red-500 or orange-500
  const hitFill = redFlag ? "#fef2f2" : "#fff7ed";  // red-50 or orange-50

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg
        viewBox="0 0 100 200"
        width={110}
        height={220}
        aria-label="Car damage diagram"
        className="overflow-visible"
      >
        {/* ── Damage zone overlays (drawn first, under body) ── */}
        {Array.from(zones).map((zone) => {
          const r = ZONE_RECTS[zone];
          return (
            <rect
              key={zone}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={r.rx ?? 2}
              fill={hitColor}
              fillOpacity={0.25}
              stroke={hitColor}
              strokeWidth={1.5}
              strokeDasharray="3 2"
            />
          );
        })}

        {/* ── Wheels ── */}
        {[
          { x: 6,  y: 42 },  // front-left
          { x: 81, y: 42 },  // front-right
          { x: 6,  y: 138 }, // rear-left
          { x: 81, y: 138 }, // rear-right
        ].map(({ x, y }, i) => (
          <rect
            key={i}
            x={x} y={y}
            width={13} height={22}
            rx={3}
            fill="currentColor"
            className="text-slate-300 dark:text-slate-600"
          />
        ))}

        {/* ── Car body ── */}
        {/* Main body */}
        <rect
          x={15} y={8}
          width={70} height={184}
          rx={16}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
          className="text-slate-200 dark:text-slate-700"
          style={{ stroke: "var(--color-slate-400, #94a3b8)" }}
        />

        {/* Hood area */}
        <rect
          x={20} y={14}
          width={60} height={46}
          rx={10}
          fill="currentColor"
          className="text-slate-100 dark:text-slate-800"
        />

        {/* Windshield */}
        <rect
          x={22} y={62}
          width={56} height={22}
          rx={4}
          fill="currentColor"
          fillOpacity={0.6}
          className="text-sky-200 dark:text-sky-900"
        />

        {/* Cabin / roof */}
        <rect
          x={20} y={84}
          width={60} height={34}
          rx={2}
          fill="currentColor"
          className="text-slate-300 dark:text-slate-600"
        />

        {/* Rear window */}
        <rect
          x={22} y={118}
          width={56} height={20}
          rx={4}
          fill="currentColor"
          fillOpacity={0.6}
          className="text-sky-200 dark:text-sky-900"
        />

        {/* Trunk area */}
        <rect
          x={20} y={140}
          width={60} height={44}
          rx={10}
          fill="currentColor"
          className="text-slate-100 dark:text-slate-800"
        />

        {/* Front grille line */}
        <line
          x1={32} y1={16} x2={68} y2={16}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-500"
        />

        {/* Headlights */}
        <rect x={21} y={18} width={14} height={7} rx={2}
          fill="currentColor" className="text-amber-200 dark:text-amber-800" />
        <rect x={65} y={18} width={14} height={7} rx={2}
          fill="currentColor" className="text-amber-200 dark:text-amber-800" />

        {/* Tail lights */}
        <rect x={21} y={175} width={14} height={7} rx={2}
          fill="currentColor" className="text-red-200 dark:text-red-900" />
        <rect x={65} y={175} width={14} height={7} rx={2}
          fill="currentColor" className="text-red-200 dark:text-red-900" />

        {/* ── Hit zone fill on top (semi-transparent) ── */}
        {Array.from(zones).map((zone) => {
          const r = ZONE_RECTS[zone];
          return (
            <rect
              key={`top-${zone}`}
              x={r.x} y={r.y}
              width={r.w} height={r.h}
              rx={r.rx ?? 2}
              fill={hitFill}
              fillOpacity={0.45}
            />
          );
        })}

        {/* ── Impact markers (X dot) ── */}
        {Array.from(zones).map((zone) => {
          const r = ZONE_RECTS[zone];
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          return (
            <g key={`marker-${zone}`}>
              <circle cx={cx} cy={cy} r={6} fill={hitColor} fillOpacity={0.9} />
              <text
                x={cx} y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={8}
                fontWeight={900}
              >
                ✕
              </text>
            </g>
          );
        })}

        {/* ── Direction labels ── */}
        <text x={50} y={4}  textAnchor="middle" fontSize={6}
          className="fill-slate-400 dark:fill-slate-500" fontWeight={600} letterSpacing={1}>
          FRONT
        </text>
        <text x={50} y={199} textAnchor="middle" fontSize={6}
          className="fill-slate-400 dark:fill-slate-500" fontWeight={600} letterSpacing={1}>
          REAR
        </text>
      </svg>

      {/* Zone labels below diagram */}
      <div className="flex flex-wrap justify-center gap-1">
        {Array.from(zones).map((zone) => (
          <span
            key={zone}
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
              redFlag
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
            }`}
          >
            {zone.replace("-", " ")}
          </span>
        ))}
      </div>
    </div>
  );
}
