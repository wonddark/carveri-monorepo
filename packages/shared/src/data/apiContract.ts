/**
 * API Response Contract — VehicleReportContract
 *
 * This file defines the ideal API response shape for the GET /reports/:vin endpoint.
 * It is a negotiation document for the backend team and is NOT yet used in production code.
 *
 * Once approved by the backend team, this will replace:
 *   - packages/shared/src/types/vehicle-report.ts  (desktop, Spanish fields, raw data)
 *   - The inline VehicleReport type in packages/shared/src/data/report.ts  (mobile, mock data)
 *
 * Field comments indicate which tab/component consumes each field.
 */

// ---------------------------------------------------------------------------
// Sub-interfaces
// ---------------------------------------------------------------------------

/**
 * A single book valuation from one of the 4 pricing sources.
 * Used in: MarketTab → price gauge, book value cards
 */
export interface BookValue {
  /** Valuation source identifier */
  source: "MMR" | "KBB" | "JDP" | "BB";
  /** Book value in USD */
  value: number;
  /** Difference vs the vehicle's asking price in USD (negative = below asking price) */
  delta: number;
  // TODO: here add the values we had in the modal from previous versions
}

/**
 * A comparable vehicle listing from the market.
 * Used in: MarketTab → comparables list
 */
export interface ComparableVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  /** Asking price in USD */
  price: number;
  /** Odometer reading in miles */
  mileage: number;
  /** Distance from the buyer's searched location in miles */
  distanceMi: number;
  /** Dealer or seller name */
  dealer: string;
  /** Listing photo URL */
  image: string;
  /** Price classification relative to the subject vehicle */
  priceTag: "CHEAPER" | "SIMILAR" | "PRICIER";
}

/**
 * A single event in the vehicle's chronological history.
 * Used in: HistoryTab → timeline
 */
export interface HistoryEvent {
  id: string;
  /** Human-readable date, e.g. "Jan 2024" */
  date: string;
  title: string;
  description: string;
  type:
    | "manufacture"
    | "import"
    | "owner"
    | "title"
    | "service"
    | "auction"
    | "accident"
    | "current";
}

/**
 * An ownership period for this vehicle.
 * Used in: HistoryTab → owners section
 */
export interface HistoryOwner {
  id: string;
  /** Display label, e.g. "Owner #1" */
  label: string;
  /** Usage type, e.g. "Personal", "Corporate", "Rental" */
  type: string;
  /** US state where the vehicle was registered during this period */
  state: string;
  /** Start of ownership period, e.g. "Mar 2024" */
  periodStart: string;
  /** End of ownership period, e.g. "Dec 2024" */
  periodEnd: string;
  /** Duration in months */
  periodMonths: number;
  /** Odometer at start of ownership period in miles */
  startMileage: number;
  /** Odometer at end of ownership period in miles */
  endMileage: number;
}

/**
 * A single service/maintenance record.
 * Used in: HistoryTab → service records section
 */
export interface HistoryServiceRecord {
  id: string;
  /** Service name, e.g. "Oil Change & Filter" */
  name: string;
  /** Service category, e.g. "Routine", "Repair" */
  type: string;
  /** Service date, e.g. "Jun 2024" */
  date: string;
  /** Odometer at time of service in miles */
  mileage: number;
}

/**
 * A title/legal status item.
 * Used in: HistoryTab → title & legal section
 */
export interface HistoryTitleItem {
  id: string;
  /** Status label, e.g. "Clean Title", "No Pending Recalls", "No Liens Reported" */
  title: string;
  description: string;
}

/**
 * An AI-generated negotiation argument card.
 * Used in: NegotiateTab → argument cards
 */
export interface NegotiateArgument {
  id: string;
  /** Argument headline, e.g. "Auction Price", "Cheaper Comparables" */
  title: string;
  /** Full argument explanation with supporting data */
  body: string;
  /** Short tactical tip for how to use this argument */
  tip: string;
}

/**
 * A per-factor breakdown of the overall score.
 * Used in: VerdictTab → score breakdown list
 */
export interface VerdictScoreItem {
  id: string;
  /** Factor label, e.g. "Accident History", "Price vs Market" */
  label: string;
  /** One-liner explanation of this factor's score */
  description: string;
  /** Score contribution — positive adds to score, negative detracts */
  delta: number;
  /** Lucide-react icon name, e.g. "ShieldCheck", "TrendingDown" */
  icon: string;
}

/**
 * A risk or positive flag flagged by the AI analysis.
 * Used in: VerdictTab → risks & positives list
 */
export interface VerdictRisk {
  id: string;
  title: string;
  description: string;
  type: "positive" | "warning";
}

/**
 * A category of pre-purchase inspection items.
 * Used in: VerdictTab → pre-purchase checklist
 */
export interface VerdictChecklistGroup {
  id: string;
  /** Category name, e.g. "Visual Inspection", "Documentation" */
  category: string;
  /** Lucide-react icon name for the category */
  categoryIcon: string;
  /** Action items the buyer should check */
  items: string[];
}

// ---------------------------------------------------------------------------
// Root contract
// ---------------------------------------------------------------------------

/**
 * Full API response for GET /reports/:vin
 *
 * One endpoint returns everything the UI needs — vehicle data, AI analysis,
 * market data, history, and negotiation guidance — ready to render across all tabs.
 */
export interface VehicleReportContract {
  // -------------------------------------------------------------------------
  // vehicle
  // Used in: HomeTab hero card (image gallery + info card), all tab headers
  // -------------------------------------------------------------------------
  vehicle: {
    /** Vehicle Identification Number */
    vin: string;
    year: number;
    make: string;
    model: string;
    trim: string;
    /** Exterior color */
    color: string;
    /** Engine description, e.g. "Gasoline", "2.5L 4-cyl Hybrid" */
    engine: string;
    /** Transmission type, e.g. "Continuously Variable (CVT)" */
    transmission: string;
    /** Drivetrain, e.g. "AWD", "FWD", "RWD" */
    drivetrain: string;
    /** Dealer asking price in USD */
    price: number;
    /** Current odometer reading in miles */
    mileage: number;
    /** How many days the vehicle has been listed at the dealer */
    daysOnLot: number;
    /** City and state where the vehicle is listed, e.g. "Tampa, FL" */
    location: string;
    /** Name of the selling dealer */
    dealer: string;
    /** Ordered array of vehicle photo URLs for the image gallery */
    images: string[];
    /** Total number of previous registered owners */
    previousOwners: number;
  };

  // -------------------------------------------------------------------------
  // summary
  // Used in: HomeTab → score ring, verdict badge, AI summary paragraph
  // -------------------------------------------------------------------------
  summary: {
    /** Overall vehicle score from 0 to 10, computed by AI */
    score: number;
    /** AI buy recommendation */
    verdict: "BUY" | "CONSIDER" | "AVOID";
    /** 2–3 sentence AI-generated plain-language summary of the vehicle */
    aiSummary: string;
  };

  // -------------------------------------------------------------------------
  // stats
  // Used in: HomeTab → 4 stat chips below the AI summary
  //          HistoryTab → accident count, odometer status
  // -------------------------------------------------------------------------
  stats: {
    /** Title brand status */
    titleStatus: "Clean" | "Salvage" | "Rebuilt";
    /** Number of accidents reported across all sources */
    accidents: number;
    /** Whether the odometer reading is consistent across all records */
    odometerVerified: boolean;
    /**
     * Percentage difference between the asking price and the market average.
     * Negative means the vehicle is priced below market (a deal).
     * e.g. -2.8 means 2.8% below market average
     */
    priceDeltaPct: number;
  };

  // -------------------------------------------------------------------------
  // priceEval
  // Used in: MarketTab → price label badge, market gauge, book value cards,
  //          NegotiateTab → auction price argument
  // -------------------------------------------------------------------------
  priceEval: {
    /** AI-assigned price classification relative to the market */
    label: "BARGAIN" | "LOW" | "FAIR" | "HIGH" | "OVERPRICED";
    /**
     * Percentage difference vs the market average across comparable listings.
     * Used to position the gauge needle on MarketTab.
     */
    marketAvgDeltaPct: number;
    /**
     * Auction at which this vehicle was last sold, or null if no auction history.
     * Used in NegotiateTab to build the "Auction Price" argument card.
     */
    auction: {
      /** Auction house name, e.g. "IAAI", "Manheim", "Copart" */
      name: string;
      /** Final auction sale price in USD — used as dealer acquisition cost */
      price: number;
    } | null;
    /** Book valuations from all 4 pricing sources */
    bookValues: BookValue[];
  };

  // -------------------------------------------------------------------------
  // market
  // Used in: MarketTab → comparable vehicles list
  // -------------------------------------------------------------------------
  market: {
    /**
     * Similar vehicles currently listed for sale near the buyer's location.
     * Used to show context for the subject vehicle's price positioning.
     */
    comparables: ComparableVehicle[];
  };

  // -------------------------------------------------------------------------
  // history
  // Used in: HistoryTab → all subsections (timeline, auction photos,
  //          accidents, owners, service records, title & legal)
  // -------------------------------------------------------------------------
  history: {
    /** Chronological list of events in the vehicle's life */
    timeline: HistoryEvent[];
    /** Auction inspection photo URLs, shown in the HistoryTab gallery */
    auctionPhotos: string[];
    /** Accident summary — count and plain-language description */
    accidents: {
      count: number;
      /** e.g. "No accidents reported in Carfax, NMVTIS or auction records." */
      description: string;
    };
    /** Registered ownership periods, ordered from first to most recent */
    owners: HistoryOwner[];
    /** Documented service and maintenance records */
    service: HistoryServiceRecord[];
    /**
     * Title and legal status items displayed as a checklist.
     * e.g. "Clean Title", "No Pending Recalls", "No Liens Reported"
     */
    title: HistoryTitleItem[];
  };

  // -------------------------------------------------------------------------
  // negotiate
  // Used in: NegotiateTab → strategy card, argument cards, cost breakdown
  // -------------------------------------------------------------------------
  negotiate: {
    /** AI-generated price negotiation strategy */
    strategy: {
      /** Recommended opening offer in USD */
      firstOffer: number;
      /** Expected settlement price in USD */
      midpoint: number;
      /** Maximum price to pay — walk-away point in USD */
      maxRecommended: number;
      /** List of tactical negotiation tips specific to this vehicle and deal */
      tips: string[];
    };
    /** AI-generated argument cards the buyer can use during negotiation */
    arguments: NegotiateArgument[];
    /** Estimated total purchase costs beyond the vehicle price */
    costs: {
      /** Buyer's state — used to calculate the applicable sales tax rate */
      state: string;
      /** Sales tax rate as a percentage, e.g. 6 for 6% */
      taxRatePct: number;
      /** Estimated tag and title fees in USD */
      tagAndTitle: number;
      /** Dealer documentation fee in USD */
      dealerFee: number;
      /** Estimated monthly ownership costs */
      monthlyEstimates: Array<{
        /** Cost category, e.g. "Insurance", "Gas", "Maintenance" */
        label: string;
        /** Low end of monthly estimate in USD */
        low: number;
        /** High end of monthly estimate in USD */
        high: number;
      }>;
    };
  };

  // -------------------------------------------------------------------------
  // verdict
  // Used in: VerdictTab → score breakdown, risks & positives, pre-purchase checklist
  // -------------------------------------------------------------------------
  verdict: {
    /**
     * Per-factor breakdown of the overall score.
     * Each item shows what drove the score up or down.
     */
    scoreBreakdown: VerdictScoreItem[];
    /**
     * AI-identified risk flags and positive signals.
     * Displayed as a mixed list on VerdictTab.
     */
    risks: VerdictRisk[];
    /**
     * Grouped pre-purchase inspection checklist.
     * Items are vehicle-specific (e.g. known weak points for this make/model).
     */
    checklist: VerdictChecklistGroup[];
  };
}
