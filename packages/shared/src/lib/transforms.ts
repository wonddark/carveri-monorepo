import type {
  AuctionHistory,
  ComparableItem,
  EvaluationGauge,
  EvaluationRaw,
  OdometerHistory,
  PastSaleDetails,
  PriceAdjustment,
  RawGauge,
  SaleCycle,
  SourceContribution,
  Timeline,
  VehicleHistory,
  VehicleReport,
} from "@carveri/shared/types/vehicle-report.ts";
import type { NegotiateArgument } from "@carveri/shared/data/report.ts";

// ── Basic types ───────────────────────────────────────────────────────────────

export type PriceHistoryPoint = {
  date: string;
  price: number;
};

export type PriceDynamics = {
  daysListed: number;
  priceDropsCount: number;
  currentPrice: number;
  history: PriceHistoryPoint[];
  totalDrop: number;
  totalDropPct: number;
};

// ── Dealer sale cycle (for "Ventas Anteriores" tab) ───────────────────────────

export type DealerSaleCycle = {
  id: string;
  dealerName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  daysOnLot: number;
  startPrice: number;
  endPrice: number;
  priceReductions: number;
  priceDrop: number;
  discountPct: number;
  mileage: number | null;
  vdpUrl: string;
  isActive: boolean;
};

// ── Auction sale (for "Historial de Subastas" tab) ────────────────────────────

export type AuctionSale = AuctionHistory & {
  id: string;
};

// ── Comparable vehicle (transformed) ─────────────────────────────────────────

export type TransformedComparable = {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  distanceMi: number;
  dealerName: string;
  dealerCity: string;
  dealerState: string;
  dealerPhone: string | null;
  image: string;
  vdpUrl: string;
  priceDiff: number;
  priceDiffPct: number;
  priceTag: "CHEAPER" | "SIMILAR" | "PRICIER";
  trustTier: "verificado" | "secundario";
  trustScore: number;
  daysOnMarket: number;
};

// ── Evaluation ────────────────────────────────────────────────────────────────

export type TransformedEvaluation = {
  fairPrice: number;
  dealerPrice: number;
  auctionPrice: number;
  dealerMargin: number;
  diffVsFair: number;
  gauge: EvaluationGauge;
  sourceContributions: SourceContribution[];
  adjustments: PriceAdjustment[];
};

// ── Diagnosis (AI analysis) ───────────────────────────────────────────────────

export type DiagnosisFinding = {
  id: string;
  label: string;
  type: "positive" | "warning";
  icon: string;
};

export type DiagnosisRiskDimension = {
  id: string;
  label: string;
  level: "none" | "low" | "medium" | "high";
  explanation: string;
  source: string;
};

export type DiagnosisChecklistGroup = {
  id: string;
  category: string;
  categoryIcon: string;
  items: string[];
};

export type DiagnosisData = {
  score: number;
  recommendation: "COMPRAR" | "NEGOCIAR" | "NO COMPRAR";
  riskLevel: "Bajo" | "Medio" | "Alto" | "Crítico";
  summary: string;
  fairPrice: number;
  priceDiff: number;
  findings: DiagnosisFinding[];
  redFlags: string[];
  risks: DiagnosisRiskDimension[];
  checklist: DiagnosisChecklistGroup[];
};

// ── Full transformed report ───────────────────────────────────────────────────

export type TransformedReport = {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  location: string | null;
  color: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  daysOnLot: number | null;
  previousOwners: number;
  auction: {
    name: string;
    price: number;
  };
  images: string[];
  aiSummary: string;
  stats: VehicleReport["stats"] | null;
  priceEval: VehicleReport["priceEval"];
  priceDynamics: PriceDynamics;
  dealerSaleCycles: DealerSaleCycle[];
  auctionSales: AuctionSale[];
  comparables: TransformedComparable[];
  evaluation: TransformedEvaluation;
  diagnosis: DiagnosisData;
  saleCycles: PastSaleDetails;
  negotiate: {
    strategy: {
      firstOffer: number;
      midpoint: number;
      maxRecommended: number;
      tips: string[];
    };
    arguments: NegotiateArgument[];
    costs: {
      state: string;
      taxRatePct: number;
      tagAndTitle: number;
      dealerFee: number;
      monthlyEstimates: [];
    };
  };
  historyTab: {
    timeline: Timeline;
    auctionPhotos: string[];
    accidents: VehicleHistory["accidents"];
    owners: VehicleHistory["owners"];
    service: VehicleHistory["service"];
    title: VehicleHistory["title"];
    odometerHistory: OdometerHistory;
  };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string, short = false): string {
  try {
    const d = new Date(iso);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (!short) options.year = "numeric";
    return d.toLocaleDateString("en-US", options);
  } catch {
    return iso;
  }
}

function transformPastSaleDetails(details: PastSaleDetails): PastSaleDetails {
  return details.map((item) => ({
    ...item,
    startDate: formatDate(item.startDate),
    endDate: formatDate(item.endDate),
  }));
}

function transformSaleCycles(cycles: SaleCycle[]): DealerSaleCycle[] {
  const dealer: DealerSaleCycle[] = [];

  cycles.forEach((cycle, idx) => {
    if (cycle.SellerType === "dealer") {
      const startPrice = cycle.StartPrice ?? 0;
      const endPrice = cycle.EndPrice ?? startPrice;
      const discountPct =
        startPrice > 0
          ? Math.round(((startPrice - endPrice) / startPrice) * 100)
          : 0;
      const lastRecord = cycle.Records.at(-1);
      const mileage = lastRecord?.Miles ?? null;

      // The current active cycle is the first dealer cycle (index 0, most recent)
      const isActive = idx === 0;

      dealer.push({
        id: `dealer-${idx}`,
        dealerName: cycle.DealerName,
        city: cycle.City,
        state: cycle.State,
        startDate: formatDate(cycle.StartDate),
        endDate: formatDate(cycle.EndDate),
        daysOnLot: cycle.DaysOnLot,
        startPrice,
        endPrice,
        priceReductions: cycle.PriceReductions,
        priceDrop: Math.abs(cycle.PriceDrop),
        discountPct,
        mileage,
        vdpUrl: lastRecord?.VdpUrl ?? "#",
        isActive,
      });
    }
  });

  return dealer;
}

function transformAuctionHistory(
  history: VehicleHistory["auctionHistory"],
): AuctionSale[] {
  return history.map((item) => ({
    id: `${item.auction}::${item.saleDate}`,
    ...item,
  }));
}

function getPriceTag(priceDiff: number, threshold: number) {
  if (priceDiff < -threshold) return "CHEAPER";
  if (priceDiff > threshold) return "PRICIER";
  return "SIMILAR";
}

function transformComparables(
  items: ComparableItem[],
  subjectPrice: number,
): TransformedComparable[] {
  return items
    .filter(
      (item) => !item.TrustScore.Disqualified && item.TrustScore.Score >= 50,
    )
    .map((item) => {
      const priceDiff = item.Price - subjectPrice;
      const priceDiffPct =
        subjectPrice > 0 ? Math.round((priceDiff / subjectPrice) * 100) : 0;
      const threshold = subjectPrice * 0.05;
      const priceTag: TransformedComparable["priceTag"] = getPriceTag(
        priceDiff,
        threshold,
      );

      return {
        id: item.Id,
        vin: item.Vin,
        year: item.Build.Year,
        make: item.Build.Make,
        model: item.Build.Model,
        trim: item.Build.Trim,
        price: item.Price,
        mileage: item.Miles,
        distanceMi: item.Distance,
        dealerName: item.Dealer.Name,
        dealerCity: item.Dealer.City,
        dealerState: item.Dealer.State,
        dealerPhone: item.Dealer.Phone,
        image: item.Photo,
        vdpUrl: item.VdpUrl,
        priceDiff,
        priceDiffPct,
        priceTag,
        trustTier: item.TrustScore.Tier,
        trustScore: item.TrustScore.Score,
        daysOnMarket: item.DaysOnMarketActive,
      };
    });
}

function transformGauge(rawGauge: RawGauge): EvaluationGauge {
  return {
    currentZone: { en: rawGauge.currentZone, es: rawGauge.currentZoneEs },
    minimum: rawGauge.items.at(0)?.value || 0,
    maximum: rawGauge.items.at(-1)?.value || 0,
    labels: rawGauge.items.map((item) => ({
      startAt: item.colorPorcentStart,
      color: item.color,
      text: { en: item.labelText, es: item.labelTextES },
    })),
  };
}

function transformEvaluation(
  evalRaw: EvaluationRaw | null,
  priceEval: VehicleReport["priceEval"],
  askingPrice: number,
): TransformedEvaluation {
  if (evalRaw) {
    const auctionPrice = priceEval?.auction?.price ?? 0;
    const fairPrice = evalRaw.finalPrice;
    return {
      fairPrice,
      dealerPrice: askingPrice,
      auctionPrice,
      dealerMargin: askingPrice - auctionPrice,
      diffVsFair: askingPrice - fairPrice,
      gauge: transformGauge(evalRaw.gauge),
      sourceContributions: evalRaw.sourceContributions,
      adjustments: evalRaw.adjustments,
    };
  }

  const auctionPrice = priceEval?.auction?.price ?? 0;
  const bookValues = priceEval?.bookValues ?? [];

  const fairPrice =
    bookValues.length > 0
      ? Math.round(
          bookValues.reduce((sum, bv) => sum + bv.value, 0) / bookValues.length,
        )
      : 0;

  const diffVsFair = fairPrice > 0 ? askingPrice - fairPrice : 0;
  const dealerMargin = auctionPrice > 0 ? askingPrice - auctionPrice : 0;

  const sourceKeyMap: Record<string, string> = {
    KBB: "kbb",
    JDP: "jdpower",
    BB: "blackbook",
    Carfax: "carfax",
    MMR: "mmr",
  };
  const totalBookValue = bookValues.reduce((s, bv) => s + bv.value, 0);
  const sourceContributions =
    fairPrice > 0 && bookValues.length > 0
      ? bookValues.map((bv) => ({
          sourceKey: sourceKeyMap[bv.source] ?? bv.source.toLowerCase(),
          rawValue: bv.value,
          nominalWeight: Math.round((bv.value / totalBookValue) * 100) / 100,
          effectiveWeight: Math.round((bv.value / totalBookValue) * 100) / 100,
          contribution: Math.round((bv.value / totalBookValue) * fairPrice),
          wasAvailable: true,
        }))
      : [];

  return {
    fairPrice,
    dealerPrice: askingPrice,
    auctionPrice,
    dealerMargin,
    diffVsFair,
    gauge: {
      currentZone: { es: "PrecioJusto", en: "FairPrice" },
      minimum: 19511.74,
      maximum: 29267.6,
      labels: [
        {
          text: {
            en: "OPPORTUNITY",
            es: "OPORTUNIDAD",
          },
          color: "#22C55E",
          startAt: 0,
        },
        {
          text: {
            en: "LOW",
            es: "BAJO",
          },
          color: "#84CC16",
          startAt: 25,
        },
        {
          text: {
            en: "FAIR",
            es: "JUSTO",
          },
          color: "#EAB308",
          startAt: 42.5,
        },
        {
          text: {
            en: "HIGH",
            es: "ALTO",
          },
          color: "#F97316",
          startAt: 57.5,
        },
        {
          text: {
            en: "EXPENSIVE",
            es: "CARO",
          },
          color: "#EF4444",
          startAt: 75,
        },
        {
          text: {
            en: "UNFAIR",
            es: "INJUSTO",
          },
          color: "#000000",
          startAt: 100,
        },
      ],
    },
    sourceContributions,
    adjustments: [],
  };
}

function transformTimelineToOdometerHistory(
  timeline: Timeline,
): OdometerHistory {
  return timeline
    .filter(
      (item) =>
        item.odometer !== null &&
        !Number.isNaN(Number(item.odometer)) &&
        item.date !== null,
    )
    .map((item) => ({
      date: item.date!,
      mileage: item.odometer!,
    }))
    .sort((a, b) =>
      new Date(a.date).valueOf() > new Date(b.date).valueOf() ? 1 : -1,
    );
}

function getRiskLevel(isRebuilt: boolean, accidents: number) {
  if (isRebuilt) return "Alto";
  if (accidents >= 2) return "Medio";
  return "Bajo";
}

function getExplanation(accidents: number) {
  if (accidents >= 2)
    return "Se reportaron múltiples accidentes con daño estructural potencial.";
  if (accidents === 1)
    return "Se reportó un accidente. Se recomienda inspección independiente.";
  return "No se reportaron daños estructurales.";
}

function getScores(isRebuilt: boolean, accidents: number) {
  if (isRebuilt) return 6.5;
  if (accidents === 0) return 8.2;
  return 7;
}

function getAccidentsLevel(accidents: number) {
  if (accidents >= 2) return "high";
  if (accidents === 1) return "medium";
  return "none";
}

function getRecommendation(isRebuilt: boolean, accidents: number) {
  if (!isRebuilt && accidents === 0) return "COMPRAR";
  return "NEGOCIAR";
}

function getRedFlags(isRebuilt: boolean, accidents: number) {
  const result: string[] = [];
  if (isRebuilt) result.push("Historial de título reconstruido");
  if (accidents >= 2) result.push("Múltiples accidentes reportados");
  return result;
}

function buildMockDiagnosis(
  raw: VehicleReport,
  askingPrice: number,
  fairPrice: number,
): DiagnosisData {
  const SOURCE_CARFAX = "Carfax";
  const SOURCE_MVD = "Motor Vehicle Dept.";

  const titleStatus = raw.stats?.titleStatus ?? "";
  const accidents = raw.stats?.accidents ?? 0;
  const ownerCount = raw.history?.owners?.length ?? 0;
  const isRebuilt =
    titleStatus.toLowerCase().includes("rebuilt") ||
    titleStatus.toLowerCase().includes("salvage");

  const recommendation: DiagnosisData["recommendation"] = getRecommendation(
    isRebuilt,
    accidents,
  );

  const riskLevel: DiagnosisData["riskLevel"] = getRiskLevel(
    isRebuilt,
    accidents,
  );

  const findings: DiagnosisFinding[] = [
    {
      id: "price",
      label:
        askingPrice <= fairPrice * 1.05
          ? "Buen precio vs. mercado"
          : "Precio por encima del mercado",
      type: askingPrice <= fairPrice * 1.05 ? "positive" : "warning",
      icon: "TrendingDown",
    },
    {
      id: "title",
      label: isRebuilt ? "Título reconstruido" : "Título limpio verificado",
      type: isRebuilt ? "warning" : "positive",
      icon: "FileCheck",
    },
    {
      id: "odometer",
      label: raw.stats?.odometerVerified
        ? "Odómetro consistente"
        : "Odómetro no verificado",
      type: raw.stats?.odometerVerified ? "positive" : "warning",
      icon: "Gauge",
    },
    {
      id: "accident",
      label:
        accidents === 0
          ? "Sin accidentes reportados"
          : `${accidents} accidente(s) reportado(s)`,
      type: accidents === 0 ? "positive" : "warning",
      icon: "ShieldAlert",
    },
    {
      id: "price-drop",
      label: "Dealer bajó el precio",
      type: "warning",
      icon: "ArrowDownCircle",
    },
    {
      id: "lot-time",
      label: "Tiempo en el lote",
      type: "warning",
      icon: "Clock",
    },
  ];

  const redFlags: string[] = getRedFlags(isRebuilt, accidents);

  const risks: DiagnosisRiskDimension[] = [
    {
      id: "title",
      label: "Título",
      level: isRebuilt ? "high" : "none",
      explanation: isRebuilt
        ? "El vehículo tiene título reconstruido, lo que indica daño estructural previo."
        : "Título limpio verificado en el estado.",
      source: SOURCE_MVD,
    },
    {
      id: "structural",
      label: "Daño Estructural",
      level: getAccidentsLevel(accidents),
      explanation: getExplanation(accidents),
      source: SOURCE_CARFAX,
    },
    {
      id: "odometer",
      label: "Odómetro",
      level: raw.stats?.odometerVerified ? "none" : "medium",
      explanation: raw.stats?.odometerVerified
        ? "Las lecturas del odómetro son consistentes a lo largo del historial."
        : "No se pudo verificar la consistencia del odómetro.",
      source: SOURCE_CARFAX,
    },
    {
      id: "ownership",
      label: "Historial de Propiedad",
      level: ownerCount >= 3 ? "medium" : "low",
      explanation: `${ownerCount} dueño(s) previo(s) registrado(s).`,
      source: SOURCE_MVD,
    },
    {
      id: "fraud",
      label: "Indicadores de Fraude",
      level: "none",
      explanation: "No se detectaron indicadores de fraude en el historial.",
      source: SOURCE_CARFAX,
    },
    {
      id: "price-market",
      label: "Precio vs. Mercado",
      level: askingPrice > fairPrice * 1.1 ? "medium" : "low",
      explanation:
        askingPrice > fairPrice * 1.1
          ? "El precio pedido está significativamente por encima del precio justo estimado."
          : "El precio está dentro del rango del mercado.",
      source: "MarketCheck",
    },
    {
      id: "geographic",
      label: "Historial Geográfico",
      level: "low",
      explanation: "El vehículo ha sido registrado en múltiples estados.",
      source: SOURCE_MVD,
    },
  ];

  const checklist: DiagnosisChecklistGroup[] = [
    {
      id: "critical",
      category: "Verificación Crítica",
      categoryIcon: "ShieldAlert",
      items: [
        "Verificar título y estado en DMV",
        "Confirmar lectura del odómetro",
        "Revisar recalls abiertos en NHTSA",
        "Verificar VIN en el vehículo vs. documentos",
      ],
    },
    {
      id: "mechanical",
      category: "Inspección Mecánica",
      categoryIcon: "Wrench",
      items: [
        "Motor: revisar aceite, fugas y ruidos",
        "Transmisión automática: cambios suaves",
        "Frenos: pastillas y discos",
        "Suspensión: amortiguadores y rótulas",
        "Sistema AWD/RWD: diferencial",
      ],
    },
    {
      id: "exterior",
      category: "Exterior e Interior",
      categoryIcon: "Car",
      items: [
        "Pintura: buscar retoques o paneles repintados",
        "Paneles: alineación y espacios uniformes",
        "Llantas y neumáticos: desgaste parejo",
        "Interior: tapicería, pantallas y controles",
      ],
    },
    {
      id: "dealer-docs",
      category: "Documentación del Dealer",
      categoryIcon: "FileText",
      items: [
        "Historial de servicio completo",
        "Factura original de subasta",
        "Garantía del dealer (si aplica)",
        "Verificar que no hay liens activos",
      ],
    },
    {
      id: "before-signing",
      category: "Antes de Firmar",
      categoryIcon: "ClipboardCheck",
      items: [
        "Test drive: arranque, aceleración, frenado",
        "Confirmar seguro antes del papeleo",
        "Comparar precio con comparables del mercado",
        "Considerar inspección independiente certificada",
      ],
    },
  ];

  return {
    score: getScores(isRebuilt, accidents),
    recommendation,
    riskLevel,
    summary:
      raw.summary ??
      "Este vehículo presenta un historial complejo con múltiples propietarios y registros de accidentes. Se recomienda una inspección mecánica independiente antes de la compra para evaluar el estado estructural y mecánico del vehículo dado su historial de título reconstruido.",
    fairPrice,
    priceDiff: askingPrice - fairPrice,
    findings,
    redFlags,
    risks,
    checklist,
  };
}

// ── Main transform ────────────────────────────────────────────────────────────

export function transformToSharedReport(raw: VehicleReport): TransformedReport {
  const v = raw.vehicle;
  const askingPrice = v.price;

  // Price dynamics from current cycle
  const currentCycleHistory =
    raw.marketCheckRaw?.VinHistory?.CurrentCyclePriceEvolution ?? [];

  const priceDynamicsHistory: PriceHistoryPoint[] = currentCycleHistory
    .filter((p) => p.Price != null)
    .map((p) => ({
      date: formatDate(p.Date, true),
      price: p.Price,
    }));

  const currentCycle = raw.marketCheckRaw?.VinHistory?.SaleCycles?.[0];
  const daysListed =
    raw.marketCheckRaw?.VinHistory?.CurrentListing?.DaysOnLot ??
    currentCycle?.DaysOnLot ??
    0;
  const priceDropsCount = currentCycle?.PriceReductions ?? 0;
  const currentPrice = currentCycle?.EndPrice ?? askingPrice;
  const startPrice = currentCycle?.StartPrice ?? currentPrice;
  const totalDrop = startPrice - currentPrice;
  const totalDropPct =
    startPrice > 0 ? Math.round((totalDrop / startPrice) * 100) : 0;

  const priceDynamics: PriceDynamics = {
    daysListed,
    priceDropsCount,
    currentPrice,
    history:
      priceDynamicsHistory.length > 0
        ? priceDynamicsHistory
        : [{ date: "Now", price: currentPrice }],
    totalDrop,
    totalDropPct,
  };

  // Sale cycles split by type
  const allCycles = raw.marketCheckRaw?.VinHistory?.SaleCycles ?? [];
  const dealerSaleCycles = transformSaleCycles(allCycles);
  const auctionSales = transformAuctionHistory(
    raw.history?.auctionHistory ?? [],
  );

  // Comparables
  const comparableItems = raw.marketCheckRaw?.Comparables?.Items ?? [];
  const comparables = transformComparables(comparableItems, askingPrice);

  // Evaluation
  const evaluation = transformEvaluation(
    raw.evaluationRaw,
    raw.priceEval,
    askingPrice,
  );

  // Diagnosis (AI analysis — mocked since verdict is null in API)
  const diagnosis = buildMockDiagnosis(raw, askingPrice, evaluation.fairPrice);

  return {
    vin: v.vin,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    price: askingPrice,
    mileage: v.mileage,
    location: v.location,
    color: v.color,
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drivetrain,
    daysOnLot: v.daysOnLot,
    previousOwners: raw.history?.owners?.length ?? v.previousOwners ?? 0,
    auction: {
      name: raw.priceEval?.auction?.name ?? "",
      price: raw.priceEval?.auction?.price ?? 0,
    },
    images: v.images,
    aiSummary: diagnosis.summary,
    stats: raw.stats,
    priceEval: raw.priceEval,
    priceDynamics,
    dealerSaleCycles,
    auctionSales,
    comparables,
    evaluation,
    diagnosis,
    saleCycles: transformPastSaleDetails(raw.pastSalesDetails ?? []),
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
    historyTab: {
      timeline: raw.history?.timeline ?? [],
      auctionPhotos: raw.history?.auctionPhotos ?? [],
      accidents: raw.history?.accidents ?? {
        count: 0,
        description: "",
        events: [],
      },
      owners: raw.history?.owners ?? [],
      service: raw.history?.service ?? [],
      title: raw.history?.title ?? [],
      odometerHistory: transformTimelineToOdometerHistory(
        raw.history?.timeline ?? [],
      ),
    },
  };
}
