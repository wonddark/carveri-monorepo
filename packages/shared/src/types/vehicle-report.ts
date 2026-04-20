export type VehicleReportResponse = {
  succeeded: boolean;
  data: VehicleReport;
  message: string;
  error: string | null;
  statusCode: number;
};

export type VehicleReport = {
  vehicle: VehicleDetails;
  summary: string | null;
  stats: VehicleStats;
  priceEval: DealEvaluation;
  market: MarketAnalysis;
  history: VehicleHistory | null;
  negotiate: any;
  verdict: unknown;
  marketCheckRaw: MarketCheckRaw | null;
  evaluationRaw: EvaluationRaw | null;
};

export type VehicleDetails = {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  color: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  price: number;
  mileage: number;
  daysOnLot: number | null;
  location: string | null;
  dealer: string | null;
  images: VehicleImages;
  previousOwners: number;
};

export type VehicleImages = string[];

export type VehicleStats = {
  titleStatus: string;
  accidents: number;
  odometerVerified: boolean;
  priceDeltaPct: number;
};

export type DealEvaluation = {
  label: string;
  marketAvgDeltaPct: number;
  auction: {
    name: string;
    price: number;
  };
  bookValues: BooksDetail[];
};

export type MMRDetails = {
  source: "MMR";
  value: number;
  delta: number;
  rawData: {
    baseMmr: number;
    typicalRange: { min: number; max: number };
    avgOdometer: number;
    avgCondition: number;
    adjustedMmr: number;
    projectedAvg: number;
    historicalAvg: {
      past30Days: number;
      sixMonths: number;
      lastYear: number;
    };
    estimatedRetail: number;
    estimatedRetailRange: { min: number; max: number };
  };
};

export type KBBDetails = {
  source: "KBB";
  value: number;
  delta: number;
  rawData: {
    fairPurchasePrice: number;
    fairMarketRange: { min: number; max: number };
    lending: { base: number; mileageAdj: number; total: number };
    tradeBook: { base: number; mileageAdj: number; total: number };
    privateParty: {
      base: number;
      mileageAdj: number;
      total: number;
    };
    retail: { base: number; mileageAdj: number; total: number };
    auction: { base: number; mileageAdj: number; total: number };
  };
};

export type JDPDetails = {
  source: "JDP";
  value: number;
  delta: number;
  rawData: {
    tradeClean: { base: number; mileageAdj: number; total: number };
    tradeAvg: { base: number; mileageAdj: number; total: number };
    tradeRough: { base: number; mileageAdj: number; total: number };
    loan: { base: number; mileageAdj: number; total: number };
    retail: { base: number; mileageAdj: number; total: number };
    auctionLow: { base: number; mileageAdj: number; total: number };
    auctionAvg: { base: number; mileageAdj: number; total: number };
    auctionHigh: { base: number; mileageAdj: number; total: number };
  };
};

export type BBDetails = {
  source: "BB";
  value: number;
  delta: number;
  rawData: {
    wholesale: {
      xClean: { base: number; total: number };
      clean: { base: number; total: number };
      avg: { base: number; total: number };
      rough: { base: number; total: number };
    };
    retail: {
      xClean: { base: number; total: number };
      clean: { base: number; total: number };
      avg: { base: number; total: number };
      rough: { base: number; total: number };
    };
    trade: {
      clean: { base: number; total: number };
      avg: { base: number; total: number };
      rough: { base: number; total: number };
    };
    finance: { avg: { base: number; total: number } };
  };
};

export type BooksDetail = MMRDetails | KBBDetails | JDPDetails | BBDetails;

export type MarketAnalysis = {
  comparables: any[];
};

export type VehicleHistory = {
  timeline: Timeline;
  auctionPhotos: VehicleImages;
  accidents: AccidentsDetail;
  owners: OwnerDetails[];
  service: ServiceDetails[];
  title: TitleDetails[];
};

export type Timeline = {
  id: string;
  date: string | null;
  title: string;
  description: string;
  type: string | null;
  source: string;
  odometer: number | null;
  redFlag: boolean;
}[];

export type AccidentsDetail = {
  count: number;
  description: string;
  events: AccidentEvent[];
};

export type AccidentEvent = {
  date: string;
  title: string;
  details: string[];
  redFlag: boolean;
};

export type OwnerDetails = {
  id: string;
  label: string;
  type: string;
  state: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  periodMonths: number | null;
  startMileage: number | null;
  endMileage: number | null;
  avgMilesPerYear: number | null;
};

export type ServiceDetails = {
  id: string;
  name: string;
  type: string | null;
  date: string;
  mileage: number | null;
  details: string[];
};

export type TitleDetails = {
  id: string;
  title: string;
  description: string;
};

// ── MarketCheck raw types ─────────────────────────────────────────────────────

export type MarketCheckRaw = {
  DataType: number;
  SchemaVersion: number;
  SchemaSource: string;
  Vin: string;
  FetchedAt: string;
  InputMiles: number;
  InputZip: string;
  InputRadius: number;
  InputRows: number;
  Decoded: MarketCheckDecoded;
  VinHistory: MarketCheckVinHistory;
  Comparables: MarketCheckComparables;
};

export type MarketCheckDecoded = {
  IsValid: boolean;
  Year: number;
  Make: string;
  Model: string;
  Trim: string;
  BodyType: string;
  Transmission: string;
  Drivetrain: string;
  FuelType: string;
  Engine: string;
  EngineSize: number;
  Doors: number;
  Cylinders: number;
  MadeIn: string;
  Seating: string;
  HighwayMpg: number;
  CityMpg: number;
};

export type MarketCheckVinHistory = {
  TotalRecords: number;
  SaleCycles: SaleCycle[];
  PriceEvolution: PriceEvolutionPoint[];
  CurrentCyclePriceEvolution: PriceEvolutionPoint[];
  CurrentListing: CurrentListing | null;
  Summary: VinHistorySummary;
};

export type SaleCycle = {
  DealerId: string;
  DealerName: string;
  City: string;
  State: string;
  Zip: string;
  SellerType: "dealer" | "auction";
  StartDate: string;
  EndDate: string;
  DaysOnLot: number;
  StartPrice: number | null;
  EndPrice: number | null;
  PriceReductions: number;
  PriceDrop: number;
  RecordCount: number;
  Records: SaleCycleRecord[];
};

export type SaleCycleRecord = {
  Price: number | null;
  Miles: number | null;
  Date: string;
  Source: string;
  VdpUrl: string;
};

export type PriceEvolutionPoint = {
  Date: string;
  Price: number;
  DealerName: string | null;
  City: string | null;
  State: string | null;
};

export type CurrentListing = {
  Price: number;
  Miles: number;
  DealerName: string;
  City: string;
  State: string;
  Zip: string;
  DaysOnLot: number;
  LastSeen: string;
};

export type VinHistorySummary = {
  TotalDaysOnMarket: number;
  TotalPriceReductions: number;
  TotalPriceDropAmount: number;
  UniqueDealers: number;
  CurrentDealerName: string;
  CurrentDealerCity: string;
  CurrentDealerState: string;
  FirstSeenDate: string;
  LastSeenDate: string;
};

export type ComparableSearchParams = Record<string, unknown>;

export type MarketCheckComparables = {
  NumFound: number;
  MarketStats: ComparableMarketStats;
  Items: ComparableItem[];
  SearchParams: ComparableSearchParams;
};

export type ComparableMarketStats = {
  AvgPrice: number;
  MinPrice: number;
  MaxPrice: number;
  AvgMiles: number;
  TotalListings: number;
};

export type ComparableItem = {
  Id: string;
  Vin: string;
  DealerId: string;
  Heading: string;
  Price: number;
  Miles: number;
  Msrp: number | null;
  ExteriorColor: string | null;
  InteriorColor: string | null;
  DaysOnMarket: number;
  DaysOnMarketActive: number;
  SellerType: string;
  InventoryType: string;
  VdpUrl: string;
  Distance: number;
  PriceChangePercent: number | null;
  Photo: string;
  Dealer: ComparableDealer;
  Build: ComparableBuild;
  TrustScore: TrustScore;
};

export type ComparableDealer = {
  Name: string;
  City: string;
  State: string;
  Zip: string;
  Phone: string | null;
  Website: string | null;
  Distance: number;
};

export type ComparableBuild = {
  Year: number;
  Make: string;
  Model: string;
  Trim: string;
  BodyType: string;
  Transmission: string;
  Drivetrain: string;
  FuelType: string;
  Engine: string;
  CityMpg: number;
  HighwayMpg: number;
};

export type TrustScore = {
  Score: number;
  Tier: "verificado" | "secundario";
  Disqualified: boolean;
  DisqualifyReason: string | null;
  Breakdown: Record<string, number>;
};

// ── Evaluation raw types ──────────────────────────────────────────────────────

export type EvaluationRaw = {
  dataType: number;
  schemaVersion: number;
  schemaSource: string;
  strategyName: string;
  titleType: string;
  finalPrice: number;
  vehicleRetailPrice: number;
  gauge: RawGauge;
  weightsWereRenormalized: boolean;
  computedAt: string;
  sourceContributions: SourceContribution[];
  adjustments: PriceAdjustment[];
};

export type RawGauge = {
  currentZone: string;
  currentZoneEs: string;
  items: {
    key: string;
    value: number;
    porcent: number;
    labelText: string;
    labelTextES: string;
    color: string;
    colorPorcent: number;
    colorPorcentStart: number;
  }[];
};

export type EvaluationGauge = {
  currentZone: { es: string; en: string };
  minimum: number;
  maximum: number;
  labels: {
    startAt: number;
    text: { en: string; es: string };
    color: string;
  }[];
};

export type SourceContribution = {
  sourceKey: string;
  rawValue: number | null;
  nominalWeight: number;
  effectiveWeight: number;
  contribution: number;
  wasAvailable: boolean;
};

export type PriceAdjustment = {
  factorKey: string;
  label: string;
  amountDelta: number | null;
  percentageDelta: number | null;
  appliedAmount: number;
  source: string;
};
