import { formatCurrency } from "@carveri/shared/lib/formatters.ts";

function buildGaugeSvg(
  percentile: number,
  price: number,
  label: string,
  lang: "es" | "en",
  minimum: number = 0,
  maximum: number = 100000,
) {
  const needleTarget = 150 + (percentile / 100) * 240;
  const cx = 160,
    cy = 145,
    outerR = 115,
    innerR = 85;
  const arcStart = 150,
    arcSpan = 240;
  function polar(r: number, deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arc(r: number, s: number, e: number) {
    const p1 = polar(r, s),
      p2 = polar(r, e);
    const large = e - s > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
  }
  function getColor(pct: number) {
    if (pct <= 30) return "#22C55E";
    if (pct <= 50) return "#84CC16";
    if (pct <= 65) return "#EAB308";
    if (pct <= 80) return "#F97316";
    return "#EF4444";
  }
  const currentColor = getColor(percentile);

  // Arc segments
  let arcSegs = "";
  for (let i = 0; i < 72; i++) {
    const pct = i / 72;
    const segStart = arcStart + pct * arcSpan;
    const segEnd = arcStart + ((i + 1) / 72) * arcSpan;
    const color = getColor(pct * 100);
    const active = pct * 100 <= percentile;
    arcSegs += `<path d="${arc(outerR - 1, segStart, segEnd + 0.5)}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="butt" opacity="${active ? 0.85 : 0.12}"/>`;
  }

  // Ticks
  let ticks = "";
  for (let i = 0; i <= 30; i++) {
    const pct = i / 30;
    const angle = arcStart + pct * arcSpan;
    const isMajor = i % 6 === 0;
    const isMid = i % 3 === 0 && !isMajor;
    const tickOuter = outerR + 2;
    const tickInner = isMajor ? outerR - 12 : isMid ? outerR - 7 : outerR - 4;
    const p1 = polar(tickOuter, angle),
      p2 = polar(tickInner, angle);
    const sw = isMajor ? 2 : isMid ? 1 : 0.6;
    const sc = isMajor ? "#999" : isMid ? "#666" : "#444";
    ticks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${sc}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  // Labels
  const labels = [
    { pct: 0, text: { es: "GANGA", en: "BARGAIN" } },
    { pct: 0.25, text: { es: "BAJO", en: "LOW" } },
    { pct: 0.5, text: { es: "JUSTO", en: "FAIR" } },
    { pct: 0.75, text: { es: "ALTO", en: "HIGH" } },
    { pct: 1, text: { es: "CARO", en: "OVERPRICED" } },
  ];
  const lbls = labels
    .map((l) => {
      const pos = polar(outerR + 20, arcStart + l.pct * arcSpan);
      const getTextAnchor = () => {
        if (l.pct === 0.5) return "middle";
        if (l.pct < 0.5) return "end";
        return "start";
      };
      return `<text x="${pos.x}" y="${pos.y}" text-anchor="${getTextAnchor()}" dominant-baseline="middle" fill="#888" font-size="7.5" font-weight="700" font-family="'Outfit',sans-serif" letter-spacing="0.8">${l.text[lang]}</text>`;
    })
    .join("");

  const needleLen = innerR - 6;
  const startDot = polar(outerR - 1, arcStart);
  const endDot = polar(outerR - 1, arcStart + arcSpan);

  return `<svg viewBox="0 0 320 225" style="width:100%" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="gf" cx="50%" cy="48%" r="52%"><stop offset="0%" stop-color="#2E3138"/><stop offset="70%" stop-color="#1E2028"/><stop offset="100%" stop-color="#16181E"/></radialGradient>
      <filter id="ng" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="gs" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/></filter>
      <radialGradient id="ig" cx="50%" cy="48%" r="45%"><stop offset="0%" stop-color="${currentColor}" stop-opacity="0.06"/><stop offset="100%" stop-color="${currentColor}" stop-opacity="0"/></radialGradient>
      <linearGradient id="ndg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#888"/><stop offset="40%" stop-color="${currentColor}"/><stop offset="100%" stop-color="${currentColor}"/></linearGradient>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${outerR + 12}" fill="url(#gf)" filter="url(#gs)"/>
    <circle cx="${cx}" cy="${cy}" r="${outerR + 12}" fill="none" stroke="#444" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="${outerR + 10}" fill="none" stroke="#333" stroke-width="0.5"/>
    <circle cx="${cx}" cy="${cy}" r="${innerR + 5}" fill="url(#ig)"/>
    ${arcSegs}
    <path d="${arc(innerR, arcStart, arcStart + arcSpan)}" fill="none" stroke="#333" stroke-width="0.5"/>
    ${ticks}
    ${lbls}
    <g class="gauge-needle" style="--needle-target:${needleTarget}deg">
      <polygon points="${cx + needleLen},${cy} ${cx + 12},${cy - 4.5} ${cx - 14},${cy} ${cx + 12},${cy + 4.5}" fill="url(#ndg)" filter="url(#ng)"/>
      <line x1="${cx + 14}" y1="${cy}" x2="${cx + needleLen - 2}" y2="${cy}" stroke="white" stroke-width="0.8" opacity="0.3"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="14" fill="#1A1C22" stroke="#555" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="10" fill="#2A2D35" stroke="#444" stroke-width="0.5"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${currentColor}" opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="white" opacity="0.5"/>
    <text x="${cx}" y="${cy + 38}" text-anchor="middle" fill="white" font-size="24" font-weight="800" font-family="'Outfit',sans-serif" letter-spacing="-0.5">${formatCurrency(price)}</text>
    <rect x="${cx - 40}" y="${cy + 46}" width="80" height="18" rx="9" fill="${currentColor}" opacity="0.15"/>
    <text x="${cx}" y="${cy + 58}" text-anchor="middle" fill="${currentColor}" font-size="8.5" font-weight="800" font-family="'Outfit',sans-serif" letter-spacing="1.5">${label}</text>
    <text x="${cx - 85}" y="${cy + 78}" text-anchor="middle" fill="#555" font-size="7" font-family="'Source Sans 3',sans-serif">${formatCurrency(minimum)}</text>
    <text x="${cx + 85}" y="${cy + 78}" text-anchor="middle" fill="#555" font-size="7" font-family="'Source Sans 3',sans-serif">${formatCurrency(maximum)}</text>
    <circle cx="${startDot.x}" cy="${startDot.y}" r="3" fill="#22C55E" opacity="0.6"/>
    <circle cx="${endDot.x}" cy="${endDot.y}" r="3" fill="#EF4444" opacity="0.6"/>
  </svg>`;
}

export { buildGaugeSvg };
