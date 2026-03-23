export type TabId = 'home' | 'history' | 'market' | 'verdict' | 'negotiate'

export interface BookValue {
  source: 'MMR' | 'KBB' | 'JDP' | 'BB'
  value: number
  delta: number // negative = below asking price
}

export interface ComparableVehicle {
  id: string
  year: number
  make: string
  model: string
  trim: string
  price: number
  mileage: number
  distanceMi: number
  dealer: string
  image: string
  priceTag: 'CHEAPER' | 'SIMILAR' | 'PRICIER'
}

export interface NegotiateArgument {
  id: string
  title: string
  body: string
  tip: string
}

export interface VerdictScoreItem {
  id: string
  label: string
  description: string
  delta: number     // positive or negative (e.g. 1.5, -0.3)
  icon: string      // lucide-react icon name, e.g. "TrendingDown"
}

export interface VerdictRisk {
  id: string
  title: string
  description: string
  type: 'positive' | 'warning'
}

export interface VerdictChecklistGroup {
  id: string
  category: string
  categoryIcon: string  // lucide-react icon name
  items: string[]
}

export interface HistoryEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'manufacture' | 'import' | 'owner' | 'title' | 'service' | 'auction' | 'current' | 'accident'
}

export interface HistoryOwner {
  id: string
  label: string
  type: string
  state: string
  periodStart: string
  periodEnd: string
  periodMonths: number
  startMileage: number
  endMileage: number
}

export interface HistoryServiceRecord {
  id: string
  name: string
  type: string
  date: string
  mileage: number
}

export interface HistoryTitleItem {
  id: string
  title: string
  description: string
}

export interface VehicleReport {
  vin: string
  year: number
  make: string
  model: string
  trim: string
  price: number
  mileage: number
  location: string
  color: string
  engine: string
  transmission: string
  drivetrain: string
  daysOnLot: number
  previousOwners: number
  auction: { name: string; price: number }
  images: string[]

  score: number
  verdict: 'BUY' | 'CONSIDER' | 'AVOID'
  aiSummary: string

  stats: {
    titleStatus: 'Clean' | 'Salvage' | 'Rebuilt'
    accidents: number
    odometerVerified: boolean
    priceDeltaPct: number
  }

  priceEval: {
    label: 'BARGAIN' | 'LOW' | 'FAIR' | 'HIGH' | 'OVERPRICED'
    marketAvgDeltaPct: number
    bookValues: BookValue[]
  }

  market: {
    comparables: ComparableVehicle[]
  }

  negotiate: {
    strategy: {
      firstOffer: number
      midpoint: number
      maxRecommended: number
      tips: string[]
    }
    arguments: NegotiateArgument[]
    costs: {
      state: string
      taxRatePct: number
      tagAndTitle: number
      dealerFee: number
      monthlyEstimates: Array<{
        label: string
        low: number
        high: number
      }>
    }
  }

  verdictTab: {
    scoreBreakdown: VerdictScoreItem[]
    risks: VerdictRisk[]
    checklist: VerdictChecklistGroup[]
  }

  historyTab: {
    timeline: HistoryEvent[]
    auctionPhotos: string[]
    accidents: {
      count: number
      description: string
    }
    owners: HistoryOwner[]
    service: HistoryServiceRecord[]
    title: HistoryTitleItem[]
  }
}

export const MOCK_REPORTS: Record<string, VehicleReport> = {
  'JA4J4VA86RZ079851': {
    vin: 'JA4J4VA86RZ079851',
    year: 2024,
    make: 'MITSUBISHI',
    model: 'Outlander',
    trim: 'SE, Ralliart Edition',
    price: 25000,
    mileage: 33500,
    location: 'Tampa, FL',
    color: 'Dark Blue',
    engine: 'Gasoline',
    transmission: 'Continuously Variable (CVT)',
    drivetrain: 'AWD',
    daysOnLot: 18,
    previousOwners: 2,
    auction: { name: 'IAAI', price: 21600 },
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    score: 8.2,
    verdict: 'BUY',
    aiSummary:
      'This 2024 Mitsubishi Outlander SE is fairly priced compared to market. Clean history, no reported accidents, consistent odometer. Recommend a mechanical inspection before closing.',
    stats: {
      titleStatus: 'Clean',
      accidents: 0,
      odometerVerified: true,
      priceDeltaPct: -2.8,
    },
    priceEval: {
      label: 'FAIR',
      marketAvgDeltaPct: 17.8,
      bookValues: [
        { source: 'MMR', value: 21600, delta: -3400 },
        { source: 'KBB', value: 22310, delta: -2690 },
        { source: 'JDP', value: 20075, delta: -4925 },
        { source: 'BB',  value: 20925, delta: -4075 },
      ],
    },
    market: {
      comparables: [
        {
          id: 'c1',
          year: 2024, make: 'Mitsubishi', model: 'Outlander', trim: 'SE',
          price: 24200, mileage: 28400, distanceMi: 8, dealer: 'Tampa Mitsubishi',
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80',
          priceTag: 'CHEAPER',
        },
        {
          id: 'c2',
          year: 2024, make: 'Mitsubishi', model: 'Outlander', trim: 'SE',
          price: 25800, mileage: 22100, distanceMi: 15, dealer: 'Brandon Auto Mall',
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80',
          priceTag: 'SIMILAR',
        },
        {
          id: 'c3',
          year: 2023, make: 'Mitsubishi', model: 'Outlander', trim: 'SEL',
          price: 23500, mileage: 41200, distanceMi: 22, dealer: 'Clearwater Motors',
          image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80',
          priceTag: 'CHEAPER',
        },
        {
          id: 'c4',
          year: 2024, make: 'Mitsubishi', model: 'Outlander', trim: 'SE',
          price: 26900, mileage: 19800, distanceMi: 31, dealer: 'Lakeland Mitsubishi',
          image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
          priceTag: 'PRICIER',
        },
        {
          id: 'c5',
          year: 2023, make: 'Mitsubishi', model: 'Outlander', trim: 'SE',
          price: 22800, mileage: 38900, distanceMi: 42, dealer: 'Sarasota Auto Group',
          image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80',
          priceTag: 'CHEAPER',
        },
      ],
    },
    negotiate: {
      strategy: {
        firstOffer: 22500,
        midpoint: 23500,
        maxRecommended: 24500,
        tips: [
          "Ask if the dealer fee ($799) is negotiable — the Florida average is $699",
          "Decline extended warranties at point of purchase — you can buy them later for less",
          "Don't accept a 'market adjustment' — current market conditions don't justify it for this model",
          "Ask them to include at least one free oil change and detailing",
        ],
      },
      arguments: [
        {
          id: 'a1',
          title: 'Auction Price',
          body: 'This vehicle was sold at IAAI auction for $21,600. The dealer margin is $3,400 over acquisition cost.',
          tip: 'Use this to justify a lower offer.',
        },
        {
          id: 'a2',
          title: 'Cheaper Comparables',
          body: 'There are 3 similar vehicles (same model, year and trim) within 50 miles for under $24,500.',
          tip: 'Show the seller you have other options.',
        },
        {
          id: 'a3',
          title: 'Limited Service History',
          body: 'Only 3 documented services on Carfax for a vehicle with 33,500 miles. This raises questions about actual maintenance.',
          tip: 'Ask for a discount due to lack of documentation.',
        },
        {
          id: 'a4',
          title: 'Days in Inventory',
          body: "This vehicle has been on the dealer's lot for 18 days. Every day that passes, the dealer pays floorplan interest on their inventory.",
          tip: 'After 30 days dealers are more willing to negotiate.',
        },
      ],
      costs: {
        state: 'Florida',
        taxRatePct: 6,
        tagAndTitle: 450,
        dealerFee: 799,
        monthlyEstimates: [
          { label: 'Insurance', low: 180, high: 220 },
          { label: 'Gas', low: 150, high: 180 },
          { label: 'Maintenance', low: 50, high: 80 },
        ],
      },
    },
    verdictTab: {
      scoreBreakdown: [
        { id: 'sb1', label: 'Price vs Market',    description: '2.8% below fair price',                   delta:  1.5, icon: 'TrendingDown' },
        { id: 'sb2', label: 'Accident History',   description: 'No accidents reported',                   delta:  2,   icon: 'ShieldCheck'  },
        { id: 'sb3', label: 'Odometer',           description: 'Mileage consistent with age',             delta:  1,   icon: 'Gauge'        },
        { id: 'sb4', label: 'Number of Owners',   description: '2 owners in 1 year (normal for auction)', delta:  0.5, icon: 'Users'        },
        { id: 'sb5', label: 'Service History',    description: 'Limited documented service',              delta: -0.3, icon: 'Wrench'       },
        { id: 'sb6', label: 'Auction Origin',     description: 'Vehicle went through IAAI auction',       delta: -0.5, icon: 'Building2'    },
      ],
      risks: [
        { id: 'r1', type: 'positive', title: 'Clean Title',           description: 'The title is clean, with no salvage, flood or rebuilt marks.' },
        { id: 'r2', type: 'positive', title: 'Verified Odometer',     description: 'Odometer readings are consistent across all records.' },
        { id: 'r3', type: 'positive', title: 'No Accidents Reported', description: 'No accidents found in Carfax or auction records.' },
        { id: 'r4', type: 'warning',  title: 'Auction Vehicle',       description: 'This vehicle went through IAAI auction. Not necessarily negative, but worth verifying the reason for sale.' },
        { id: 'r5', type: 'warning',  title: 'Limited Service',       description: 'Only 3 documented services. There may be services not reported to Carfax.' },
        { id: 'r6', type: 'positive', title: 'No Pending Recalls',    description: 'No open recalls for this vehicle according to NHTSA.' },
      ],
      checklist: [
        {
          id: 'visual',
          category: 'Visual Inspection',
          categoryIcon: 'Eye',
          items: [
            'Check paint on all panels — look for color differences',
            'Verify panel alignment and uniform gaps',
            'Check tire condition (tread depth)',
            'Inspect windows for chips or cracks',
            'Verify all lights work',
          ],
        },
        {
          id: 'mechanical',
          category: 'Mechanical Inspection',
          categoryIcon: 'Wrench',
          items: [
            'Check CVT transmission — known weak point on Outlander',
            'Listen for abnormal noises on cold start',
            'Test brakes at different speeds',
            'Verify air conditioning (cold and heat)',
            'Check suspension — listen for bumps on rough roads',
            'Verify AWD engages correctly',
          ],
        },
        {
          id: 'documentation',
          category: 'Documentation',
          categoryIcon: 'FileText',
          items: [
            'Confirm title matches VIN: JA4J4VA86RZ079851',
            'Verify odometer shows ~33,500 mi',
            'Request service history from current dealer',
            'Confirm no liens on the title',
            'Verify registration is current',
          ],
        },
      ],
    },
    historyTab: {
      timeline: [
        { id: 'e1',  date: 'Jan 2024', title: 'Manufactured',   description: 'Okazaki Plant, Japan',                       type: 'manufacture' },
        { id: 'e2',  date: 'Feb 2024', title: 'Imported to US', description: 'Port of Long Beach, CA',                     type: 'import'      },
        { id: 'e3',  date: 'Mar 2024', title: 'First Owner',    description: 'AutoNation Mitsubishi, Miami FL',             type: 'owner'       },
        { id: 'e4',  date: 'Mar 2024', title: 'Title Issued',   description: 'Florida — Clean Title',                      type: 'title'       },
        { id: 'e5',  date: 'Jun 2024', title: 'Service',        description: 'Oil change @ 5,200 mi',                      type: 'service'     },
        { id: 'e6',  date: 'Sep 2024', title: 'Service',        description: 'Tire rotation @ 12,400 mi',                  type: 'service'     },
        { id: 'e7',  date: 'Nov 2024', title: 'Service',        description: 'Multi-point inspection @ 16,800 mi',         type: 'service'     },
        { id: 'e8',  date: 'Dec 2024', title: 'Second Owner',   description: 'Title transfer — Tampa, FL',                 type: 'owner'       },
        { id: 'e9',  date: 'Feb 2025', title: 'IAAI Auction',   description: 'Sold for $21,600 — Run & Drive',             type: 'auction'     },
        { id: 'e10', date: 'Mar 2025', title: 'Current State',  description: '33,500 mi — Tampa, FL',                     type: 'current'     },
      ],
      auctionPhotos: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
      ],
      accidents: {
        count: 0,
        description: 'No accidents reported in Carfax, NMVTIS or auction records.',
      },
      owners: [
        {
          id: 'o1',
          label: 'Owner #1',
          type: 'Personal',
          state: 'Florida',
          periodStart: 'Mar 2024',
          periodEnd: 'Dec 2024',
          periodMonths: 9,
          startMileage: 0,
          endMileage: 18200,
        },
        {
          id: 'o2',
          label: 'Owner #2',
          type: 'Personal',
          state: 'Florida',
          periodStart: 'Dec 2024',
          periodEnd: 'Feb 2025',
          periodMonths: 2,
          startMileage: 18200,
          endMileage: 33500,
        },
      ],
      service: [
        { id: 's1', name: 'Oil Change & Filter',    type: 'Routine', date: 'Jun 2024', mileage: 5200  },
        { id: 's2', name: 'Tire Rotation',          type: 'Routine', date: 'Sep 2024', mileage: 12400 },
        { id: 's3', name: 'Multi-point Inspection', type: 'Routine', date: 'Nov 2024', mileage: 16800 },
      ],
      title: [
        { id: 't1', title: 'Clean Title',        description: 'Clean title registered in Florida. No salvage, flood, rebuilt or lemon marks.' },
        { id: 't2', title: 'No Pending Recalls', description: 'No open recalls for this vehicle according to NHTSA.' },
        { id: 't3', title: 'No Liens Reported',  description: 'No active liens found on this vehicle\'s title.' },
      ],
    },
  },
}
