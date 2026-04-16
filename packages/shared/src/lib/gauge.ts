import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

export type SectionLabels = { startAt: number; text: string; color: string }[];

const CX = 160,
  CY = 145,
  OUTER_R = 115,
  INNER_R = 85;
const ARC_START = 150,
  ARC_SPAN = 240;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function svgArc(r: number, s: number, e: number) {
  const p1 = polar(r, s),
    p2 = polar(r, e);
  const large = e - s > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

function getColor(pct: number, labels: SectionLabels) {
  return (
    labels.find(
      ({ startAt }, idx, ar) =>
        pct >= startAt && pct < (ar.at(idx + 1)?.startAt || -1),
    )?.color ?? "#00000000"
  );
}

function tickStyle(i: number): { inner: number; sw: number; sc: string } {
  if (i % 6 === 0) return { inner: OUTER_R - 12, sw: 2, sc: "#999" };
  if (i % 3 === 0) return { inner: OUTER_R - 7, sw: 1, sc: "#666" };
  return { inner: OUTER_R - 4, sw: 0.6, sc: "#444" };
}

function buildArcSegments(percentile: number, labels: SectionLabels): string {
  let segs = "";
  for (let i = 0; i < 72; i++) {
    const pct = i / 72;
    const segStart = ARC_START + pct * ARC_SPAN;
    const segEnd = ARC_START + ((i + 1) / 72) * ARC_SPAN;
    const color = getColor(pct * 100, labels);
    const opacity = pct * 100 <= percentile ? 0.85 : 0.12;
    segs += `<path d="${svgArc(OUTER_R - 1, segStart, segEnd + 0.5)}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="butt" opacity="${opacity}"/>`;
  }
  return segs;
}

function buildTicks(): string {
  let ticks = "";
  for (let i = 0; i <= 30; i++) {
    const angle = ARC_START + (i / 30) * ARC_SPAN;
    const { inner, sw, sc } = tickStyle(i);
    const p1 = polar(OUTER_R + 2, angle),
      p2 = polar(inner, angle);
    ticks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${sc}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  return ticks;
}

function buildLabelArcDefs(labels: SectionLabels): string {
  return labels
    .map((l, idx, lbs) => {
      const sAngle = ARC_START + (l.startAt / 100) * ARC_SPAN;
      const eAngle =
        ARC_START + ((lbs.at(idx + 1)?.startAt ?? 100) / 100) * ARC_SPAN;
      const p1 = polar(OUTER_R + 20, sAngle);
      const p2 = polar(OUTER_R + 20, eAngle);
      const large = eAngle - sAngle > 180 ? 1 : 0;
      return `<path id="gla${idx}" d="M ${p1.x} ${p1.y} A ${OUTER_R + 20} ${OUTER_R + 20} 0 ${large} 1 ${p2.x} ${p2.y}"/>`;
    })
    .join("");
}

function buildLabels(labels: SectionLabels): string {
  return labels
    .map(
      (l, idx) =>
        `<text text-anchor="middle" fill="${l.color}" font-size="11" font-weight="700" font-family="'Outfit',sans-serif" letter-spacing="0.8"><textPath href="#gla${idx}" startOffset="50%">${l.text}</textPath></text>`,
    )
    .join("");
}

function buildGaugeSvg(
  percentile: number,
  price: number,
  label: string,
  labels: SectionLabels,
) {
  const needleTarget = ARC_START + (percentile / 100) * ARC_SPAN;
  const currentColor = getColor(percentile, labels);
  const arcSegs = buildArcSegments(percentile, labels);
  const ticks = buildTicks();
  const labelArcDefs = buildLabelArcDefs(labels);
  const lbls = buildLabels(labels);
  const needleLen = INNER_R - 6;
  const startDot = polar(OUTER_R - 1, ARC_START);
  const endDot = polar(OUTER_R - 1, ARC_START + ARC_SPAN);

  return `<svg viewBox="0 0 310 225" style="width:100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="gf" cx="50%" cy="48%" r="52%"><stop offset="0%" stop-color="#2E3138"/><stop offset="70%" stop-color="#1E2028"/><stop offset="100%" stop-color="#16181E"/></radialGradient>
      <filter id="ng" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="gs" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/></filter>
      <radialGradient id="ig" cx="50%" cy="48%" r="45%"><stop offset="0%" stop-color="${currentColor}" stop-opacity="0.06"/><stop offset="100%" stop-color="${currentColor}" stop-opacity="0"/></radialGradient>
      <linearGradient id="ndg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#888"/><stop offset="40%" stop-color="${currentColor}"/><stop offset="100%" stop-color="${currentColor}"/></linearGradient>
      ${labelArcDefs}
    </defs>
    <circle cx="${CX}" cy="${CY}" r="${OUTER_R + 12}" fill="url(#gf)" filter="url(#gs)"/>
    <circle cx="${CX}" cy="${CY}" r="${OUTER_R + 12}" fill="none" stroke="#444" stroke-width="1"/>
    <circle cx="${CX}" cy="${CY}" r="${OUTER_R + 10}" fill="none" stroke="#333" stroke-width="0.5"/>
    <circle cx="${CX}" cy="${CY}" r="${INNER_R + 5}" fill="url(#ig)"/>
    ${arcSegs}
    <path d="${svgArc(INNER_R, ARC_START, ARC_START + ARC_SPAN)}" fill="none" stroke="#333" stroke-width="0.5"/>
    ${ticks}
    ${lbls}
    <g class="gauge-needle" style="--needle-target:${needleTarget}deg">
      <polygon points="${CX + needleLen},${CY} ${CX + 12},${CY - 4.5} ${CX - 14},${CY} ${CX + 12},${CY + 4.5}" fill="url(#ndg)" filter="url(#ng)"/>
      <line x1="${CX + 14}" y1="${CY}" x2="${CX + needleLen - 2}" y2="${CY}" stroke="white" stroke-width="0.8" opacity="0.3"/>
    </g>
    <circle cx="${CX}" cy="${CY}" r="14" fill="#1A1C22" stroke="#555" stroke-width="1"/>
    <circle cx="${CX}" cy="${CY}" r="10" fill="#2A2D35" stroke="#444" stroke-width="0.5"/>
    <circle cx="${CX}" cy="${CY}" r="6" fill="${currentColor}" opacity="0.85"/>
    <circle cx="${CX}" cy="${CY}" r="3" fill="white" opacity="0.5"/>
    <text x="${CX}" y="${CY + 38}" text-anchor="middle" fill="white" font-size="24" font-weight="800" font-family="'Outfit',sans-serif" letter-spacing="-0.5">${formatCurrency(price)}</text>
    <rect x="${CX - 40}" y="${CY + 46}" width="80" height="18" rx="9" fill="${currentColor}" opacity="0.15"/>
    <text x="${CX}" y="${CY + 58}" text-anchor="middle" fill="${currentColor}" font-size="8.5" font-weight="800" font-family="'Outfit',sans-serif" letter-spacing="1.5">${label}</text>
    <circle cx="${startDot.x}" cy="${startDot.y}" r="3" fill="#22C55E" opacity="0.6"/>
    <circle cx="${endDot.x}" cy="${endDot.y}" r="3" fill="#EF4444" opacity="0.6"/>
  </svg>`;
}

export { buildGaugeSvg };
