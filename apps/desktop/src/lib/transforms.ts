// apps/desktop/src/lib/transforms.ts
import type { VehicleReport as ApiReport } from "@carveri/shared/types/vehicle-report";
import type {
  HistoryEvent,
  HistoryOwner,
  HistoryServiceRecord,
  HistoryTitleItem,
  VehicleReport as SharedReport,
} from "@carveri/shared/data/report";

export function parsePriceStr(s: string): number {
  return Number.parseFloat(s.replaceAll(/[$,]/g, "")) || 0;
}

function mapTitleStatus(s: string): "Clean" | "Salvage" | "Rebuilt" {
  const lower = s.toLowerCase();
  if (lower === "limpio" || lower === "clean") return "Clean";
  if (lower === "salvage") return "Salvage";
  if (lower === "reconstruido" || lower === "rebuilt") return "Rebuilt";
  console.warn(
    `[transforms] Unknown title status: "${s}", defaulting to 'Rebuilt'`,
  );
  return "Rebuilt";
}

function mapPriceLabel(
  s: string,
): "BARGAIN" | "LOW" | "FAIR" | "HIGH" | "OVERPRICED" {
  const map: Record<
    string,
    "BARGAIN" | "LOW" | "FAIR" | "HIGH" | "OVERPRICED"
  > = {
    GANGA: "BARGAIN",
    BAJO: "LOW",
    JUSTO: "FAIR",
    ALTO: "HIGH",
    CARO: "OVERPRICED",
  };
  return map[s?.toUpperCase() ?? ""] ?? "FAIR";
}

function mapOwners(raw: ApiReport): HistoryOwner[] {
  return raw.historial.propietarios.map((p) => ({
    id: String(p.numero),
    label: p.etiqueta,
    type: p.tipo,
    state: p.estados,
    periodStart: String(p.anioPurchased),
    periodEnd: "",
    periodMonths: 0,
    startMileage: 0,
    endMileage: Number.parseInt(p.ultimoOdometro.replaceAll(/\D/g, "")) || 0,
  }));
}

function mapService(raw: ApiReport): HistoryServiceRecord[] {
  return raw.historial.mantenimiento.registros.map((r, i) => ({
    id: String(i),
    name: r.detalles[0] ?? r.tipo,
    type: r.tipo,
    date: r.fecha,
    mileage: Number.parseInt(r.odometro.replaceAll(/\D/g, "")) || 0,
  }));
}

function mapTitle(raw: ApiReport): HistoryTitleItem[] {
  return raw.historial.tituloOdometro.historialTitulo.map((h, i) => ({
    id: String(i),
    title: h.tipo,
    description: h.detalles.join(" · ") || h.fuente,
  }));
}

function sortKey(date: string, year?: number): number {
  if (year !== undefined) return new Date(year, 0, 1).getTime();
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function buildTimeline(raw: ApiReport): HistoryEvent[] {
  const accidents: HistoryEvent[] = raw.historial.accidentes.eventos.map(
    (ev, i) => {
      const desc = [ev.severidad, ...(ev.detalles ?? [])]
        .filter((s) => s && s !== "-")
        .join(" · ");
      return {
        id: `acc-${i}`,
        date: ev.fecha,
        title: ev.titulo,
        description: desc || ev.titulo,
        type: "accident",
      };
    },
  );

  const owners: HistoryEvent[] = raw.historial.propietarios.map((p) => ({
    id: `own-${p.numero}`,
    date: String(p.anioPurchased),
    title: p.etiqueta,
    description: [p.tipo, p.estados].filter((s) => s && s !== "-").join(" · "),
    type: "owner",
  }));

  const service: HistoryEvent[] = raw.historial.mantenimiento.registros.map(
    (r, i) => {
      const desc = (r.detalles ?? []).filter((s) => s && s !== "-").join(" · ");
      return {
        id: `svc-${i}`,
        date: r.fecha,
        title: r.tipo,
        description: desc || r.fuente,
        type: "service",
      };
    },
  );

  return [...accidents, ...owners, ...service].sort((a, b) => {
    const aYear = a.type === "owner" ? Number(a.date) : undefined;
    const bYear = b.type === "owner" ? Number(b.date) : undefined;
    return sortKey(a.date, aYear) - sortKey(b.date, bYear);
  });
}

export function transformToSharedReport(raw: ApiReport): SharedReport {
  const v = raw.vehiculo;
  const manheim = raw.mercado.manheim;
  const kbb = raw.mercado.kbb;
  const jdp = raw.mercado.jdPower;
  const bb = raw.mercado.blackBook;
  const askingPrice = parsePriceStr(v.precioVenta);
  const mmrValue = parsePriceStr(manheim.baseMmr);
  const kbbValue = parsePriceStr(kbb.fairPurchasePrice);
  const jdpValue = parsePriceStr(jdp.tradeAvg.total);
  const bbValue = parsePriceStr(bb.wholesale.avg?.total ?? "$0");
  const priceDeltaPct =
    mmrValue > 0 ? ((askingPrice - mmrValue) / mmrValue) * 100 : 0;

  console.log(raw);

  return {
    vin: v.vin,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    price: askingPrice,
    mileage: Number.parseInt(v.odometro.replaceAll(/\D/g, "")) || 0,
    location: "—", // TODO: not available in API
    color: v.color === "-" ? "—" : v.color, // API returns '-' when color is unknown
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drive,
    daysOnLot: 0, // TODO: not available in API
    previousOwners: raw.historial.propietarios.length,
    auction: {
      name: raw.historial.subastasAnteriores.info.subasta,
      price: parsePriceStr(raw.historial.subastasAnteriores.info.finalBid),
    },
    images: raw.currentImages,
    score: 8.2, // TODO: not available in API — derive from backend when available
    verdict: "BUY", // TODO: not available in API — derive from backend when available
    aiSummary: "", // TODO: not available in API — derive from backend when available
    stats: {
      titleStatus: mapTitleStatus(raw.historial.tituloOdometro.titulo),
      accidents: raw.historial.accidentes.resumen.totalAccidentes,
      odometerVerified: raw.historial.tituloOdometro.odometroEstado
        .toLowerCase()
        .includes("consist"),
      priceDeltaPct,
    },
    priceEval: {
      label: mapPriceLabel(manheim.etiquetaPrecio),
      marketAvgDeltaPct: priceDeltaPct,
      bookValues: [
        { source: "MMR", value: mmrValue, delta: mmrValue - askingPrice },
        { source: "KBB", value: kbbValue, delta: kbbValue - askingPrice },
        { source: "JDP", value: jdpValue, delta: jdpValue - askingPrice },
        { source: "BB", value: bbValue, delta: bbValue - askingPrice },
      ],
    },
    market: { comparables: [] },
    negotiate: {
      strategy: { firstOffer: 0, midpoint: 0, maxRecommended: 0, tips: [] },
      arguments: [],
      costs: {
        state: "",
        taxRatePct: 0,
        tagAndTitle: 0,
        dealerFee: 0,
        monthlyEstimates: [],
      },
    },
    verdictTab: {
      scoreBreakdown:
        // TODO: USe real data from backend when available
        [
          {
            id: "1",
            label: "Price vs. market",
            description: "2.8% below fair price",
            delta: 0.2,
            icon: "TrendingDown",
          },
          {
            id: "2",
            label: "Accident history",
            description: "No reported accidents",
            delta: -0.2,
            icon: "ShieldCheck",
          },
          {
            id: "1",
            label: "Odometer",
            description: "Miles consistent with age",
            delta: 0.2,
            icon: "Gauge",
          },
          {
            id: "1",
            label: "Number of owners",
            description: "2 owners in 1 year (normal for auction)",
            delta: 0.2,
            icon: "Users",
          },
          {
            id: "1",
            label: "Service history",
            description: "Limited documented service",
            delta: 0.2,
            icon: "Wrench",
          },
          {
            id: "1",
            label: "Auction origin",
            description: "Vehicle went through IAAI auction",
            delta: -0.2,
            icon: "Building2",
          },
        ],
      risks: [],
      checklist: [],
    },
    historyTab: {
      timeline: buildTimeline(raw),
      auctionPhotos: raw.historial.subastasAnteriores.imagenes,
      accidents: {
        count: raw.historial.accidentes.resumen.totalAccidentes,
        description: raw.historial.accidentes.resumen.reparado ?? "",
      },
      owners: mapOwners(raw),
      service: mapService(raw),
      title: mapTitle(raw),
    },
  };
}
