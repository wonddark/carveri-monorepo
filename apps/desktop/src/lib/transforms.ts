// apps/desktop/src/lib/transforms.ts
import type { VehicleReport as ApiReport } from '@carveri/shared/types/vehicle-report'
import type {
  HistoryEvent,
  HistoryOwner,
  HistoryServiceRecord,
  HistoryTitleItem,
  VehicleReport as SharedReport,
} from '@carveri/shared/data/report'

export function parsePriceStr(s: string): number {
  return Number.parseFloat(s.replaceAll(/[$,]/g, '')) || 0
}

function mapTitleStatus(s: string): 'Clean' | 'Salvage' | 'Rebuilt' {
  const lower = s.toLowerCase()
  if (lower === 'limpio' || lower === 'clean') return 'Clean'
  if (lower === 'salvage') return 'Salvage'
  return 'Rebuilt'
}

function mapPriceLabel(s: string): 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED' {
  const map: Record<string, 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED'> = {
    GANGA: 'BARGAIN', BAJO: 'LOW', JUSTO: 'FAIR', ALTO: 'HIGH', CARO: 'OVERPRICED',
  }
  return map[s?.toUpperCase() ?? ''] ?? 'FAIR'
}

function mapOwners(raw: ApiReport): HistoryOwner[] {
  return raw.historial.propietarios.map((p) => ({
    id: String(p.numero),
    label: p.etiqueta,
    type: p.tipo,
    state: p.estados,
    periodStart: String(p.anioPurchased),
    periodEnd: '',
    periodMonths: 0,
    startMileage: 0,
    endMileage: Number.parseInt(p.ultimoOdometro.replace(/[^0-9]/g, '')) || 0,
  }))
}

function mapService(raw: ApiReport): HistoryServiceRecord[] {
  return raw.historial.mantenimiento.registros.map((r, i) => ({
    id: String(i),
    name: r.detalles[0] ?? r.tipo,
    type: r.tipo,
    date: r.fecha,
    mileage: Number.parseInt(r.odometro.replace(/[^0-9]/g, '')) || 0,
  }))
}

function mapTitle(raw: ApiReport): HistoryTitleItem[] {
  return raw.historial.tituloOdometro.historialTitulo.map((h, i) => ({
    id: String(i),
    title: h.tipo,
    description: h.detalles.join(' · ') || h.fuente,
  }))
}

export function transformToSharedReport(raw: ApiReport): SharedReport {
  const v = raw.vehiculo
  const manheim = raw.mercado.manheim
  const kbb = raw.mercado.kbb
  const jdp = raw.mercado.jdPower
  const bb = raw.mercado.blackBook
  const askingPrice = parsePriceStr(v.precioVenta)
  const mmrValue = parsePriceStr(manheim.baseMmr)
  const kbbValue = parsePriceStr(kbb.fairPurchasePrice)
  const jdpValue = parsePriceStr(jdp.tradeAvg.total)
  const bbValue = parsePriceStr(bb.wholesale.avg?.total ?? '$0')
  const priceDeltaPct = mmrValue > 0 ? ((askingPrice - mmrValue) / mmrValue) * 100 : 0

  return {
    vin: v.vin,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    price: askingPrice,
    mileage: Number.parseInt(v.odometro.replace(/[^0-9]/g, '')) || 0,
    location: '—',
    color: v.color === '-' ? '—' : v.color,
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drive,
    daysOnLot: 0,
    previousOwners: raw.historial.propietarios.length,
    auction: {
      name: raw.historial.subastasAnteriores.info.subasta,
      price: parsePriceStr(raw.historial.subastasAnteriores.info.finalBid),
    },
    images: raw.currentImages,
    score: 0,
    verdict: 'BUY',
    aiSummary: '',
    stats: {
      titleStatus: mapTitleStatus(raw.historial.tituloOdometro.titulo),
      accidents: raw.historial.accidentes.resumen.totalAccidentes,
      odometerVerified: raw.historial.tituloOdometro.odometroEstado
        .toLowerCase()
        .includes('consist'),
      priceDeltaPct,
    },
    priceEval: {
      label: mapPriceLabel(manheim.etiquetaPrecio),
      marketAvgDeltaPct: priceDeltaPct,
      bookValues: [
        { source: 'MMR', value: mmrValue, delta: mmrValue - askingPrice },
        { source: 'KBB', value: kbbValue, delta: kbbValue - askingPrice },
        { source: 'JDP', value: jdpValue, delta: jdpValue - askingPrice },
        { source: 'BB', value: bbValue, delta: bbValue - askingPrice },
      ],
    },
    market: { comparables: [] },
    negotiate: {
      strategy: { firstOffer: 0, midpoint: 0, maxRecommended: 0, tips: [] },
      arguments: [],
      costs: { state: '', taxRatePct: 0, tagAndTitle: 0, dealerFee: 0, monthlyEstimates: [] },
    },
    verdictTab: { scoreBreakdown: [], risks: [], checklist: [] },
    historyTab: {
      timeline: [] as HistoryEvent[],
      auctionPhotos: raw.historial.subastasAnteriores.imagenes,
      accidents: {
        count: raw.historial.accidentes.resumen.totalAccidentes,
        description: raw.historial.accidentes.resumen.reparado ?? '',
      },
      owners: mapOwners(raw),
      service: mapService(raw),
      title: mapTitle(raw),
    },
  }
}
