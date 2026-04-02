export type VehicleReportResponse = {
  succeeded: boolean;
  data: VehicleReport;
  message: string;
  error: string | null;
  statusCode: number;
};

export type VehicleReport = {
  vehicle: VehicleDetails;
  summary: string;
  stats: VehicleStats;
  priceEval: DealEvaluation;
  market: MarketAnalysis;
  history: VehicleHistory;
  negotiate: any;
  verdict: string | null;
};

export type VehicleDetails = {
  vin: "1FMCU9GX0DUA27119";
  year: number;
  make: "Ford";
  model: "Escape";
  trim: "Special Edition";
  color: "Blue";
  engine: "1.6L";
  transmission: "Automatic";
  drivetrain: "Four wheel drive";
  price: number;
  mileage: number;
  daysOnLot: number;
  location: string;
  dealer: string;
  images: VehicleImages;
  previousOwners: 3;
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

export type BooksDetail = {
  source: string;
  value: number;
  delta: number;
};

export type MarketAnalysis = {
  comparables: [];
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
  date: string;
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
  events: HistoryEvent[];
};

export type HistoryEvent = {
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
  periodStart: string;
  periodEnd: string;
  periodMonths: number;
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
