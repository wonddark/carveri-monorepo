import type {
  VehicleStats,
  DealEvaluation,
  MarketAnalysis,
  Timeline,
  AccidentsDetail,
  OwnerDetails,
  ServiceDetails,
  TitleDetails,
} from "@carveri/shared/types/vehicle-report";

export type SectionId =
  | "resumen"
  | "timeline"
  | "fotos-subasta"
  | "accidentes"
  | "duenos"
  | "servicio"
  | "titulo"
  | "mercado"
  | "verdict-ai"
  | "checklist"
  | "estrategia"
  | "argumentos"
  | "costos";

export type AppReport = {
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
  auction: { name: string; price: number };
  images: string[];
  score: number;
  verdict: string;
  aiSummary: string | null;
  stats: VehicleStats;
  priceEval: DealEvaluation;
  market: MarketAnalysis;
  negotiate: {
    strategy: {
      firstOffer: number;
      midpoint: number;
      maxRecommended: number;
      tips: string[];
    };
    arguments: NegotiationArgument[];
    costs: {
      state: string;
      taxRatePct: number;
      tagAndTitle: number;
      dealerFee: number;
      monthlyEstimates: MonthlyEstimate[];
    };
  };
  verdictTab: {
    scoreBreakdown: ScoreBreakdownItem[];
    risks: Risk[];
    checklist: ChecklistItem[];
  };
  historyTab: {
    timeline: Timeline;
    auctionPhotos: string[];
    accidents: AccidentsDetail;
    owners: OwnerDetails[];
    service: ServiceDetails[];
    title: TitleDetails[];
  };
};

export type NegotiationArgument = {
  id: string;
  title: string;
  description: string;
  estimatedSavings: number;
};

export type MonthlyEstimate = {
  term: number;
  rate: number;
  monthly: number;
};

export type ScoreBreakdownItem = {
  id: string;
  label: string;
  description: string;
  delta: number;
  icon: string;
};

export type Risk = {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};
