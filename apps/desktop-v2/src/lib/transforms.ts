import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";
import type { NegotiateArgument } from "@carveri/shared/data/report.ts";

export type TransformedReport = {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  location: string;
  color: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  daysOnLot: number;
  previousOwners: number;
  auction: {
    name: string;
    price: number;
  };
  images: string[];
  score: number;
  verdict: string;
  aiSummary: string;
  stats: VehicleReport["stats"];
  priceEval: VehicleReport["priceEval"];
  market: VehicleReport["market"];
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
  verdictTab: {
    scoreBreakdown: {
      id: string;
      label: string;
      description: string;
      delta: number;
      icon: string;
    }[];
    risks: [];
    checklist: [];
  };
  historyTab: {
    timeline: VehicleReport["history"]["timeline"];
    auctionPhotos: string[];
    accidents: VehicleReport["history"]["accidents"];
    owners: VehicleReport["history"]["owners"];
    service: VehicleReport["history"]["service"];
    title: VehicleReport["history"]["title"];
  };
};

export function transformToSharedReport(raw: VehicleReport): TransformedReport {
  const v = raw.vehicle;
  const askingPrice = v.price;

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
    previousOwners: raw.history.owners.length,
    auction: {
      name: raw.priceEval.auction.name,
      price: raw.priceEval.auction.price,
    },
    images: v.images,
    score: 8.2,
    verdict: raw.verdict || "",
    aiSummary: raw.summary,
    stats: raw.stats,
    priceEval: raw.priceEval,
    market: raw.market,
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
      scoreBreakdown: [
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
          id: "3",
          label: "Odometer",
          description: "Miles consistent with age",
          delta: 0.2,
          icon: "Gauge",
        },
        {
          id: "4",
          label: "Number of owners",
          description: "2 owners in 1 year (normal for auction)",
          delta: 0.2,
          icon: "Users",
        },
        {
          id: "5",
          label: "Service history",
          description: "Limited documented service",
          delta: 0.2,
          icon: "Wrench",
        },
        {
          id: "6",
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
      timeline: raw.history.timeline,
      auctionPhotos: raw.history.auctionPhotos,
      accidents: raw.history.accidents,
      owners: raw.history.owners,
      service: raw.history.service,
      title: raw.history.title,
    },
  };
}
