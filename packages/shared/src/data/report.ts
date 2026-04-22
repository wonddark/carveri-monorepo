import type { VehicleReport } from "@carveri/shared/types/vehicle-report.ts";

export interface ComparableVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  distanceMi: number;
  dealer: string;
  image: string;
  priceTag: "CHEAPER" | "SIMILAR" | "PRICIER";
}

export interface NegotiateArgument {
  id: string;
  title: string;
  body: string;
  tip: string;
}

export interface VerdictScoreItem {
  id: string;
  label: string;
  description: string;
  delta: number; // positive or negative (e.g. 1.5, -0.3)
  icon: string; // lucide-react icon name, e.g. "TrendingDown"
}

export interface VerdictRisk {
  id: string;
  title: string;
  description: string;
  type: "positive" | "warning";
}

export interface VerdictChecklistGroup {
  id: string;
  category: string;
  categoryIcon: string; // lucide-react icon name
  items: string[];
}

export interface HistoryEvent {
  id: string;
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
    | "current"
    | "accident";
}

export interface HistoryOwner {
  id: string;
  label: string;
  type: string;
  state: string;
  periodStart: string;
  periodEnd: string;
  periodMonths: number;
  startMileage: number;
  endMileage: number;
}

export interface HistoryServiceRecord {
  id: string;
  name: string;
  type: string;
  date: string;
  mileage: number;
  details: string[];
}

export interface HistoryTitleItem {
  id: string;
  title: string;
  description: string;
}

export const MOCK_REPORTS: Record<string, VehicleReport> = {
  "1FMCU9GX0DUA27119": {
    vehicle: {
      vin: "1FMCU9GX0DUA27119",
      year: 2013,
      make: "Ford",
      model: "Escape",
      trim: "Special Edition",
      color: "Blue",
      engine: "1.6L",
      transmission: "Automatic",
      drivetrain: "Four wheel drive",
      price: 5000,
      mileage: 30000,
      daysOnLot: 0,
      location: "",
      dealer: "",
      images: [
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020859_61800837_1883151588452370_8291753781645803520_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020859_61817078_1883151825119013_3051752655274639360_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020859_61909430_1883151455119050_177048649409232896_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020859_62060577_1883151498452379_5311024462219444224_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020859_62128761_1883151658452363_747920416604946432_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020900_62241132_1883151788452350_3223609462317121536_n.jpg",
        "https://sasubdev.blob.core.windows.net/ai-images/1FMCU9GX0DUA27119/20260402020900_62464189_1883151548452374_3978506653862461440_n.jpg",
      ],
      previousOwners: 3,
    },
    pastSalesDetails: [],
    summary: "",
    stats: {
      titleStatus: "Salvage",
      accidents: 2,
      odometerVerified: false,
      priceDeltaPct: 51.1,
    },
    priceEval: {
      label: "OVERPRICED",
      marketAvgDeltaPct: 62.6,
      auction: {
        name: "Copart",
        price: 1100,
      },
      bookValues: [
        {
          source: "MMR",
          value: 36200,
          delta: 4101,
          rawData: {
            baseMmr: 32000,
            typicalRange: { min: 27700, max: 36400 },
            avgOdometer: 58812,
            avgCondition: 4.2,
            adjustedMmr: 36200,
            projectedAvg: 0,
            historicalAvg: {
              past30Days: 30700,
              sixMonths: 32200,
              lastYear: 38300,
            },
            estimatedRetail: 36500,
            estimatedRetailRange: { min: 27400, max: 37400 },
          },
        },
        {
          source: "KBB",
          value: 37160,
          delta: 3141,
          rawData: {
            fairPurchasePrice: 37160,
            fairMarketRange: { min: 35860, max: 38360 },
            lending: { base: 29780, mileageAdj: 6670, total: 36450 },
            tradeBook: { base: 27380, mileageAdj: 6670, total: 34050 },
            privateParty: {
              base: 29100,
              mileageAdj: 6670,
              total: 35770,
            },
            retail: { base: 32600, mileageAdj: 6670, total: 39270 },
            auction: { base: 27880, mileageAdj: 6670, total: 34550 },
          },
        },
        {
          source: "JDP",
          value: 31475,
          delta: 8826,
          rawData: {
            tradeClean: { base: 27500, mileageAdj: 3900, total: 31400 },
            tradeAvg: { base: 26325, mileageAdj: 3900, total: 30225 },
            tradeRough: { base: 24850, mileageAdj: 3900, total: 28750 },
            loan: { base: 24925, mileageAdj: 3900, total: 28825 },
            retail: { base: 30650, mileageAdj: 3900, total: 34550 },
            auctionLow: { base: 24625, mileageAdj: 3900, total: 28525 },
            auctionAvg: { base: 27575, mileageAdj: 3900, total: 31475 },
            auctionHigh: { base: 30550, mileageAdj: 3900, total: 34450 },
          },
        },
        {
          source: "BB",
          value: 33800,
          delta: 6501,
          rawData: {
            wholesale: {
              xClean: { base: 30475, total: 36450 },
              clean: { base: 28500, total: 35400 },
              avg: { base: 25800, total: 33800 },
              rough: { base: 23225, total: 31850 },
            },
            retail: {
              xClean: { base: 36025, total: 41375 },
              clean: { base: 33775, total: 39950 },
              avg: { base: 29350, total: 37850 },
              rough: { base: 26550, total: 34850 },
            },
            trade: {
              clean: { base: 28895, total: 35555 },
              avg: { base: 26340, total: 34200 },
              rough: { base: 21870, total: 30615 },
            },
            finance: { avg: { base: 29600, total: 35300 } },
          },
        },
      ],
    },
    market: {
      comparables: [],
    },
    history: {
      timeline: [
        {
          id: "9-1",
          date: "Dec 22, 2025",
          title: "New owner reported",
          description:
            "⚠ NOT ACTUAL MILEAGE TITLE ISSUED · Titled or registered as personal vehicle · Vehicle color noted as Blue",
          type: "",
          source: "Florida, Motor Vehicle Dept., Cape Coral, FL",
          odometer: 156656,
          redFlag: true,
        },
        {
          id: "9-0",
          date: "Oct 15, 2025",
          title: "Vehicle purchase reported",
          description: "",
          type: "",
          source: "Florida, Motor Vehicle Dept.",
          odometer: 0,
          redFlag: false,
        },
        {
          id: "8-3",
          date: "Dec 2, 2024",
          title: "Vehicle serviced",
          description: "Oil and filter changed",
          type: "",
          source: "Take 5 Oil Change, Venice, FL, 941-275-6559",
          odometer: 153639,
          redFlag: false,
        },
        {
          id: "8-2",
          date: "May 6, 2024",
          title: "New owner reported",
          description:
            "⚠ NOT ACTUAL MILEAGE TITLE ISSUED · Loan or lien reported",
          type: null,
          source: "Indiana, Motor Vehicle Dept., Elkhart, IN",
          odometer: null,
          redFlag: true,
        },
        {
          id: "8-1",
          date: "May 6, 2024",
          title: "Registration issued or renewed",
          description: "Vehicle color noted as Blue",
          type: null,
          source: "Indiana, Motor Vehicle Dept., Elkhart, IN",
          odometer: null,
          redFlag: false,
        },
        {
          id: "8-0",
          date: "Apr 15, 2024",
          title: "Vehicle purchase reported",
          description: "",
          type: null,
          source: "Indiana, Motor Vehicle Dept.",
          odometer: 152015,
          redFlag: false,
        },
        {
          id: "7-2",
          date: "Mar 26, 2024",
          title: "Title issued or updated",
          description: "Duplicate title issued",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Coldwater, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "7-1",
          date: "Mar 25, 2024",
          title: "Title issued or updated",
          description: "New owner reported",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Coldwater, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "7-0",
          date: "Feb 9, 2024",
          title: "Vehicle purchase reported",
          description: "",
          type: null,
          source: "Michigan, Motor Vehicle Dept.",
          odometer: null,
          redFlag: false,
        },
        {
          id: "6-10",
          date: "Jan 18, 2024",
          title: "Title or registration issued to insurance company",
          description: "",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Bloomington, IL",
          odometer: 145215,
          redFlag: false,
        },
        {
          id: "6-9",
          date: "Jan 16, 2024",
          title: "Vehicle purchase reported",
          description: "",
          type: null,
          source: "Michigan, Motor Vehicle Dept.",
          odometer: null,
          redFlag: false,
        },
        {
          id: "6-8",
          date: "Dec 13, 2023",
          title: "Damage reported: minor damage",
          description: "Damage to front",
          type: null,
          source: "Damage Report",
          odometer: null,
          redFlag: false,
        },
        {
          id: "6-7",
          date: "Dec 12, 2023",
          title: "TOTAL LOSS VEHICLE",
          description:
            "Vehicle declared a total loss by an insurance company · Non-collision damage reported",
          type: null,
          source: "Damage Report",
          odometer: null,
          redFlag: true,
        },
        {
          id: "6-6",
          date: "Dec 5, 2023",
          title: "Vehicle serviced",
          description:
            "Maintenance inspection completed · Battery/charging system checked · Brakes checked · Drive belts checked · Fluids checked · Oil and filter changed · Tire condition and pressure checked · Tires rotated · Vehicle washed/detailed",
          type: null,
          source:
            "Morrie's Grand Ledge Ford Lincoln, Grand Ledge, MI, 517-627-8100",
          odometer: 130014,
          redFlag: false,
        },
        {
          id: "6-5",
          date: "Feb 28, 2023",
          title: "Registration issued or renewed",
          description: "Titled or registered as lease vehicle",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Leslie, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "6-4",
          date: "Nov 30, 2022",
          title: "Vehicle serviced",
          description:
            "Maintenance inspection completed · Battery/charging system checked · Lower control arm(s) replaced · Sway bar link(s)  replaced · Tire condition and pressure checked",
          type: null,
          source:
            "Morrie's Grand Ledge Ford Lincoln, Grand Ledge, MI, 517-627-8100",
          odometer: 124927,
          redFlag: false,
        },
        {
          id: "6-3",
          date: "Nov 14, 2022",
          title: "Vehicle serviced",
          description:
            "Maintenance inspection completed · Battery/charging system checked · Tire condition and pressure checked · Vehicle washed/detailed",
          type: null,
          source:
            "Morrie's Grand Ledge Ford Lincoln, Grand Ledge, MI, 517-627-8100",
          odometer: 124445,
          redFlag: false,
        },
        {
          id: "6-2",
          date: "Feb 20, 2022",
          title: "Registration issued or renewed",
          description: "Titled or registered as lease vehicle",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Leslie, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "6-1",
          date: "Apr 27, 2021",
          title: "Vehicle serviced",
          description: "Glass repaired",
          type: null,
          source: "Glass America, 877-734-6680, glassusa.com",
          odometer: 89945,
          redFlag: false,
        },
        {
          id: "6-0",
          date: "Mar 25, 2021",
          title: "Title issued or updated",
          description:
            "New owner reported · Titled or registered as lease vehicle",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Leslie, MI",
          odometer: 85964,
          redFlag: false,
        },
        {
          id: "5-5",
          date: "Mar 25, 2021",
          title: "Registration issued or renewed",
          description:
            "Loan or lien reported · Titled or registered as lease vehicle",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Leslie, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "5-4",
          date: "Mar 19, 2021",
          title: "Vehicle purchase reported",
          description: "",
          type: null,
          source: "Michigan, Motor Vehicle Dept.",
          odometer: null,
          redFlag: false,
        },
        {
          id: "5-3",
          date: "Feb 25, 2021",
          title: "Title issued or updated",
          description: "Titled or registered as lease vehicle",
          type: null,
          source: "Michigan, Motor Vehicle Dept., Wyoming, MI",
          odometer: null,
          redFlag: false,
        },
        {
          id: "5-2",
          date: "Feb 12, 2021",
          title: "Vehicle purchase reported",
          description: "",
          type: null,
          source: "Michigan, Motor Vehicle Dept.",
          odometer: null,
          redFlag: false,
        },
        {
          id: "5-1",
          date: "Feb 12, 2021",
          title: "Vehicle sold",
          description: "",
          type: null,
          source: "Auto Auction",
          odometer: 85811,
          redFlag: false,
        },
        {
          id: "5-0",
          date: "Nov 25, 2020",
          title: "Passed Ontario safety standards inspection",
          description: "New owner reported",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "4-0",
          date: "Nov 12, 2020",
          title: "Passed Ontario safety standards inspection",
          description: "New owner reported",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-27",
          date: "Sep 9, 2020",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 134,343 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 83477,
          redFlag: false,
        },
        {
          id: "3-26",
          date: "May 26, 2020",
          title: "Registration issued or renewed",
          description: "Registered as personal vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-25",
          date: "May 23, 2020",
          title: "Odometer reading reported",
          description: "Odometer reported as 133,503 kilometers",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: 82955,
          redFlag: false,
        },
        {
          id: "3-24",
          date: "Feb 7, 2020",
          title: "Vehicle serviced",
          description:
            "Antifreeze/coolant flushed/changed · Power steering checked · Timing belt replaced · Water pump gasket replaced · Water pump replaced · Odometer reported as 131,425 kilometers",
          type: null,
          source: "Lambton Motors Ltd, Sarnia, ON, 519-464-4000",
          odometer: 81664,
          redFlag: false,
        },
        {
          id: "3-23",
          date: "Dec 17, 2019",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 129,391 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 80400,
          redFlag: false,
        },
        {
          id: "3-22",
          date: "Aug 28, 2019",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 123,705 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 76867,
          redFlag: false,
        },
        {
          id: "3-21",
          date: "Apr 22, 2019",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 121,085 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 75239,
          redFlag: false,
        },
        {
          id: "3-20",
          date: "Sep 7, 2018",
          title: "Vehicle serviced",
          description:
            "Cabin air filter replaced/cleaned · Oil and filter changed · Odometer reported as 115,604 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 71833,
          redFlag: false,
        },
        {
          id: "3-19",
          date: "Jan 23, 2018",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 111,244 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 69124,
          redFlag: false,
        },
        {
          id: "3-18",
          date: "Aug 25, 2017",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 104,604 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 64998,
          redFlag: false,
        },
        {
          id: "3-17",
          date: "Feb 21, 2017",
          title: "Vehicle serviced",
          description:
            "Air filter replaced · Oil and filter changed · Odometer reported as 101,358 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 62981,
          redFlag: false,
        },
        {
          id: "3-16",
          date: "Oct 5, 2016",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 99,391 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 61759,
          redFlag: false,
        },
        {
          id: "3-15",
          date: "Sep 12, 2016",
          title: "Manufacturer Customer Satisfaction Program issued",
          description:
            "Program #16R01 C1A SIDE DOOR LATCH REGIONAL WARNING NOT ALL VEHICLES REQUIRE REPAIR PLEASE READ 16R01 SERVICE ACTION BEFORE INITIATING REPAIR",
          type: null,
          source: "Ford Motor Company",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-14",
          date: "May 26, 2016",
          title: "Registration issued or renewed",
          description: "Registered as personal vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-13",
          date: "Apr 19, 2016",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 95,191 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 59149,
          redFlag: false,
        },
        {
          id: "3-12",
          date: "Apr 11, 2016",
          title: "Odometer reading reported",
          description: "Odometer reported as 94,715 kilometers",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: 58853,
          redFlag: false,
        },
        {
          id: "3-11",
          date: "Jan 17, 2016",
          title: "Vehicle serviced",
          description:
            "Cabin air filter replaced/cleaned · Oil and filter changed · Odometer reported as 90,225 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 56063,
          redFlag: false,
        },
        {
          id: "3-10",
          date: "Oct 19, 2015",
          title: "Vehicle serviced",
          description:
            "Recommended maintenance performed · Oil and filter changed",
          type: null,
          source: "AutoMax (Sarnia), Sarnia, ON, 519-332-1232",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-9",
          date: "Oct 19, 2015",
          title: "Vehicle serviced",
          description:
            "Recommended maintenance performed · Oil and filter changed · Odometer reported as 84,811 kilometers",
          type: null,
          source: "Service Facility, Sarnia, ON",
          odometer: 52699,
          redFlag: false,
        },
        {
          id: "3-8",
          date: "Jul 23, 2015",
          title: "Vehicle serviced",
          description:
            "Air filter replaced · Oil and filter changed · Odometer reported as 80,184 kilometers",
          type: null,
          source: "Take 5 Oil Change, Sarnia, ON, 519-344-2288",
          odometer: 49824,
          redFlag: false,
        },
        {
          id: "3-7",
          date: "May 26, 2015",
          title: "Registration issued or renewed",
          description: "Registered as personal vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-6",
          date: "Apr 23, 2015",
          title: "Vehicle serviced",
          description: "Oil and filter changed",
          type: null,
          source: "AutoMax (Sarnia), Sarnia, ON, 519-332-1232",
          odometer: null,
          redFlag: false,
        },
        {
          id: "3-5",
          date: "Apr 23, 2015",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 75,140 kilometers",
          type: null,
          source: "Service Facility, Sarnia, ON",
          odometer: 46690,
          redFlag: false,
        },
        {
          id: "3-4",
          date: "Mar 18, 2015",
          title: "Odometer reading reported",
          description: "Odometer reported as 73,193 kilometers",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: 45480,
          redFlag: false,
        },
        {
          id: "3-3",
          date: "Mar 9, 2015",
          title: "Vehicle serviced",
          description:
            "Electrical system checked · Odometer reported as 70,262 kilometers",
          type: null,
          source: "Lambton Motors Ltd, Sarnia, ON, 519-464-4000",
          odometer: 43659,
          redFlag: false,
        },
        {
          id: "3-2",
          date: "Feb 23, 2015",
          title: "Vehicle serviced",
          description: "Odometer reported as 70,245 kilometers",
          type: null,
          source: "Lambton Motors Ltd, Sarnia, ON, 519-464-4000",
          odometer: 43648,
          redFlag: false,
        },
        {
          id: "3-1",
          date: "Jan 28, 2015",
          title: "Vehicle serviced",
          description: "Odometer reported as 70,241 kilometers",
          type: null,
          source: "Lambton Motors Ltd, Sarnia, ON, 519-464-4000",
          odometer: 43646,
          redFlag: false,
        },
        {
          id: "3-0",
          date: "Jan 27, 2015",
          title: "Passed Ontario safety standards inspection",
          description: "New owner reported",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "2-2",
          date: "Jan 23, 2015",
          title: "Vehicle serviced",
          description:
            "Maintenance inspection completed · Emissions inspection performed · Oil and filter changed",
          type: null,
          source: "AutoMax (Sarnia), Sarnia, ON, 519-332-1232",
          odometer: null,
          redFlag: false,
        },
        {
          id: "2-1",
          date: "Aug 26, 2014",
          title: "Manufacturer Customer Satisfaction issued",
          description:
            "Program #14N02 EXTENDED WARRANTY COVERAGE FOR PCM REPROGRAMING IN THE EVENT OF ABS VEHICLE SPEED SIGNAL RELATED COMMUNICATION LOSS THAT DISABLES OBDII SYSTEM MONITORS",
          type: null,
          source: "Ford Motor Company",
          odometer: null,
          redFlag: false,
        },
        {
          id: "2-0",
          date: "May 26, 2014",
          title: "Registration issued or renewed",
          description:
            "New owner reported · Registered as personal vehicle · Odometer reported as 58,422 kilometers",
          type: null,
          source: "Ontario, Ministry of Transportation, Southwestern Ontario",
          odometer: 36302,
          redFlag: false,
        },
        {
          id: "1-13",
          date: "May 9, 2014",
          title: "Vehicle offered for sale",
          description: "",
          type: null,
          source: "Dealer Inventory",
          odometer: null,
          redFlag: false,
        },
        {
          id: "1-12",
          date: "May 7, 2014",
          title: "Vehicle sold",
          description: "Odometer reported as 58,419 kilometers",
          type: null,
          source: "Fleet Management Co.",
          odometer: 36300,
          redFlag: false,
        },
        {
          id: "1-11",
          date: "Mar 24, 2014",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Tires rotated · Odometer reported as 55,801 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 34673,
          redFlag: false,
        },
        {
          id: "1-10",
          date: "Mar 2, 2014",
          title: "Registration issued or renewed",
          description: "Registered as commercial vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation, Sarnia, ON",
          odometer: null,
          redFlag: false,
        },
        {
          id: "1-9",
          date: "Dec 1, 2013",
          title: "Registration issued or renewed",
          description: "Registered as commercial vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "1-8",
          date: "Nov 22, 2013",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Tires rotated · Transmission serviced · Odometer reported as 46,380 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 28819,
          redFlag: false,
        },
        {
          id: "1-7",
          date: "Oct 19, 2013",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Windshield washer checked · Odometer reported as 42,450 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 26377,
          redFlag: false,
        },
        {
          id: "1-6",
          date: "Jul 15, 2013",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Vehicle washed/detailed · Odometer reported as 33,358 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 20728,
          redFlag: false,
        },
        {
          id: "1-5",
          date: "May 2, 2013",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Tires rotated · Odometer reported as 24,937 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 15495,
          redFlag: false,
        },
        {
          id: "1-4",
          date: "Jan 10, 2013",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Tire(s) balanced · Tire(s) replaced · Odometer reported as 17,000 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 10563,
          redFlag: false,
        },
        {
          id: "1-3",
          date: "Dec 1, 2012",
          title: "Registration issued or renewed",
          description: "Registered as commercial vehicle",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "1-2",
          date: "Oct 26, 2012",
          title: "Vehicle serviced",
          description:
            "Oil and filter changed · Odometer reported as 9,700 kilometers",
          type: null,
          source: "Service Facility",
          odometer: 6027,
          redFlag: false,
        },
        {
          id: "1-1",
          date: "Jun 28, 2012",
          title: "Registration issued or renewed",
          description:
            "First owner reported · Registered as commercial vehicle · Passed safety inspection · Vehicle color noted as Blue",
          type: null,
          source: "Ontario, Ministry of Transportation",
          odometer: null,
          redFlag: false,
        },
        {
          id: "1-0",
          date: "Jun 16, 2012",
          title: "Vehicle manufactured and shipped to original dealer",
          description: "",
          type: null,
          source: "Ford Motor Company",
          odometer: null,
          redFlag: false,
        },
      ],
      auctionPhotos: [
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_1-cfb514030e1535eea2d4dd3ab1b866e2a69a5640.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_2-e04dfbb5a5c2a1cf67844a3bd7eed3b6c78ea968.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_3-3f5b3a99805d932b45c4af5cfa76b458ef01ecda.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_4-48b901634dd0329e8f5a1f73186a04bf9ef46468.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_5-fa018ccfe24cad32098593e801efdf1b1a56f65a.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231918_6-1e12e90152120a86f0aa7718e539662cf7670a94.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_7-3e8ed3edd74960a72091a51eba47535d88996ae2.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_8-d9a5e5bec38da86806e95086f7b56b4927923b40.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_9-2a4bd6d761ef33e7e5f568764adda8586268c205.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_10-56eec627c7a490cfc3ce4531debd03268121f6f7.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_11-a5726162ecbad23dcdc552daadc2c672c2c352ae.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_12-a16035f80120b3bb51944ae11c87c27348cab059.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_13-0422795867b353d5d49194dc1d3c535b35736f21.jpg",
        "http://127.0.0.1:10000/devstoreaccount1/ai-images/1FMCU9GX0DUA27119/20260323231919_14-48856a174c0bd2959d83d6031c46be556b554850.jpg",
      ],
      accidents: {
        count: 2,
        description: "2 accident(s) reported.",
        events: [
          {
            date: "Dec 12, 2023",
            title: "TOTAL LOSS VEHICLE",
            details: [
              "Vehicle declared a total loss by an insurance company",
              "Non-collision damage reported",
            ],
            redFlag: true,
          },
          {
            date: "Dec 13, 2023",
            title: "Damage reported: minor damage",
            details: [],
            redFlag: false,
          },
        ],
      },
      owners: [
        {
          id: "1",
          label: "Owner #1",
          type: "Commercial Vehicle",
          state: null,
          periodStart: "Jun 16, 2012",
          periodEnd: "May 9, 2014",
          periodMonths: 23,
          startMileage: 6027,
          endMileage: 36300,
          avgMilesPerYear: 19542,
        },
        {
          id: "2",
          label: "Owner #2",
          type: "Personal Vehicle",
          state: null,
          periodStart: "May 26, 2014",
          periodEnd: "Jan 23, 2015",
          periodMonths: 8,
          startMileage: 36302,
          endMileage: 36302,
          avgMilesPerYear: null,
        },
        {
          id: "3",
          label: "Owner #3",
          type: "Personal Vehicle",
          state: null,
          periodStart: "Jan 27, 2015",
          periodEnd: "Sep 9, 2020",
          periodMonths: 68,
          startMileage: 43646,
          endMileage: 83477,
          avgMilesPerYear: 7088,
        },
        {
          id: "4",
          label: "Owner #4",
          type: "Personal Vehicle",
          state: null,
          periodStart: "Nov 12, 2020",
          periodEnd: "Nov 12, 2020",
          periodMonths: 0,
          startMileage: null,
          endMileage: null,
          avgMilesPerYear: null,
        },
        {
          id: "5",
          label: "Owner #5",
          type: "Lease Vehicle",
          state: null,
          periodStart: "Nov 25, 2020",
          periodEnd: "Mar 25, 2021",
          periodMonths: 4,
          startMileage: 85811,
          endMileage: 85811,
          avgMilesPerYear: null,
        },
        {
          id: "6",
          label: "Owner #6",
          type: "Lease Vehicle",
          state: null,
          periodStart: "Mar 25, 2021",
          periodEnd: "Jan 18, 2024",
          periodMonths: 34,
          startMileage: 85964,
          endMileage: 145215,
          avgMilesPerYear: 21017,
        },
        {
          id: "7",
          label: "Owner #7",
          type: "Personal Vehicle",
          state: null,
          periodStart: "Feb 9, 2024",
          periodEnd: "Mar 26, 2024",
          periodMonths: 1,
          startMileage: null,
          endMileage: null,
          avgMilesPerYear: null,
        },
        {
          id: "8",
          label: "Owner #8",
          type: "Personal Vehicle",
          state: null,
          periodStart: "Apr 15, 2024",
          periodEnd: "Dec 2, 2024",
          periodMonths: 8,
          startMileage: 152015,
          endMileage: 153639,
          avgMilesPerYear: null,
        },
        {
          id: "9",
          label: "Owner #9",
          type: "Personal Vehicle",
          state: null,
          periodStart: "Oct 15, 2025",
          periodEnd: "Dec 22, 2025",
          periodMonths: 2,
          startMileage: 156656,
          endMileage: 156656,
          avgMilesPerYear: null,
        },
      ],
      service: [
        {
          id: "0",
          name: "First owner reported",
          type: null,
          date: "Jun 28, 2012",
          mileage: null,
          details: [
            "First owner reported",
            "Registered as commercial vehicle",
            "Passed safety inspection",
            "Vehicle color noted as Blue",
          ],
        },
        {
          id: "1",
          name: "Oil and filter changed",
          type: null,
          date: "Oct 26, 2012",
          mileage: 6027,
          details: [
            "Oil and filter changed",
            "Odometer reported as 9,700 kilometers",
          ],
        },
        {
          id: "2",
          name: "Oil and filter changed",
          type: null,
          date: "Jan 10, 2013",
          mileage: 10563,
          details: [
            "Oil and filter changed",
            "Tire(s) balanced",
            "Tire(s) replaced",
            "Odometer reported as 17,000 kilometers",
          ],
        },
        {
          id: "3",
          name: "Oil and filter changed",
          type: null,
          date: "May 2, 2013",
          mileage: 15495,
          details: [
            "Oil and filter changed",
            "Tires rotated",
            "Odometer reported as 24,937 kilometers",
          ],
        },
        {
          id: "4",
          name: "Oil and filter changed",
          type: null,
          date: "Jul 15, 2013",
          mileage: 20728,
          details: [
            "Oil and filter changed",
            "Vehicle washed/detailed",
            "Odometer reported as 33,358 kilometers",
          ],
        },
        {
          id: "5",
          name: "Oil and filter changed",
          type: null,
          date: "Oct 19, 2013",
          mileage: 26377,
          details: [
            "Oil and filter changed",
            "Windshield washer checked",
            "Odometer reported as 42,450 kilometers",
          ],
        },
        {
          id: "6",
          name: "Oil and filter changed",
          type: null,
          date: "Nov 22, 2013",
          mileage: 28819,
          details: [
            "Oil and filter changed",
            "Tires rotated",
            "Transmission serviced",
            "Odometer reported as 46,380 kilometers",
          ],
        },
        {
          id: "7",
          name: "Oil and filter changed",
          type: null,
          date: "Mar 24, 2014",
          mileage: 34673,
          details: [
            "Oil and filter changed",
            "Tires rotated",
            "Odometer reported as 55,801 kilometers",
          ],
        },
        {
          id: "8",
          name: "Maintenance inspection completed",
          type: null,
          date: "Jan 23, 2015",
          mileage: null,
          details: [
            "Maintenance inspection completed",
            "Emissions inspection performed",
            "Oil and filter changed",
          ],
        },
        {
          id: "9",
          name: "New owner reported",
          type: null,
          date: "Jan 27, 2015",
          mileage: null,
          details: ["New owner reported"],
        },
        {
          id: "10",
          name: "Odometer reported as 70,241 kilometers",
          type: null,
          date: "Jan 28, 2015",
          mileage: 43646,
          details: ["Odometer reported as 70,241 kilometers"],
        },
        {
          id: "11",
          name: "Odometer reported as 70,245 kilometers",
          type: null,
          date: "Feb 23, 2015",
          mileage: 43648,
          details: ["Odometer reported as 70,245 kilometers"],
        },
        {
          id: "12",
          name: "Electrical system checked",
          type: null,
          date: "Mar 9, 2015",
          mileage: 43659,
          details: [
            "Electrical system checked",
            "Odometer reported as 70,262 kilometers",
          ],
        },
        {
          id: "13",
          name: "Oil and filter changed",
          type: null,
          date: "Apr 23, 2015",
          mileage: 46690,
          details: [
            "Oil and filter changed",
            "Odometer reported as 75,140 kilometers",
          ],
        },
        {
          id: "14",
          name: "Oil and filter changed",
          type: null,
          date: "Apr 23, 2015",
          mileage: null,
          details: ["Oil and filter changed"],
        },
        {
          id: "15",
          name: "Air filter replaced",
          type: null,
          date: "Jul 23, 2015",
          mileage: 49824,
          details: [
            "Air filter replaced",
            "Oil and filter changed",
            "Odometer reported as 80,184 kilometers",
          ],
        },
        {
          id: "16",
          name: "Recommended maintenance performed",
          type: null,
          date: "Oct 19, 2015",
          mileage: 52699,
          details: [
            "Recommended maintenance performed",
            "Oil and filter changed",
            "Odometer reported as 84,811 kilometers",
          ],
        },
        {
          id: "17",
          name: "Recommended maintenance performed",
          type: null,
          date: "Oct 19, 2015",
          mileage: null,
          details: [
            "Recommended maintenance performed",
            "Oil and filter changed",
          ],
        },
        {
          id: "18",
          name: "Cabin air filter replaced/cleaned",
          type: null,
          date: "Jan 17, 2016",
          mileage: 56063,
          details: [
            "Cabin air filter replaced/cleaned",
            "Oil and filter changed",
            "Odometer reported as 90,225 kilometers",
          ],
        },
        {
          id: "19",
          name: "Oil and filter changed",
          type: null,
          date: "Apr 19, 2016",
          mileage: 59149,
          details: [
            "Oil and filter changed",
            "Odometer reported as 95,191 kilometers",
          ],
        },
        {
          id: "20",
          name: "Program #16R01 C1A SIDE DOOR LATCH REGIONAL WARNING NOT ALL VEHICLES REQUIRE REPAIR PLEASE READ 16R01 SERVICE ACTION BEFORE INITIATING REPAIR",
          type: null,
          date: "Sep 12, 2016",
          mileage: null,
          details: [
            "Program #16R01 C1A SIDE DOOR LATCH REGIONAL WARNING NOT ALL VEHICLES REQUIRE REPAIR PLEASE READ 16R01 SERVICE ACTION BEFORE INITIATING REPAIR",
          ],
        },
        {
          id: "21",
          name: "Oil and filter changed",
          type: null,
          date: "Oct 5, 2016",
          mileage: 61759,
          details: [
            "Oil and filter changed",
            "Odometer reported as 99,391 kilometers",
          ],
        },
        {
          id: "22",
          name: "Air filter replaced",
          type: null,
          date: "Feb 21, 2017",
          mileage: 62981,
          details: [
            "Air filter replaced",
            "Oil and filter changed",
            "Odometer reported as 101,358 kilometers",
          ],
        },
        {
          id: "23",
          name: "Oil and filter changed",
          type: null,
          date: "Aug 25, 2017",
          mileage: 64998,
          details: [
            "Oil and filter changed",
            "Odometer reported as 104,604 kilometers",
          ],
        },
        {
          id: "24",
          name: "Oil and filter changed",
          type: null,
          date: "Jan 23, 2018",
          mileage: 69124,
          details: [
            "Oil and filter changed",
            "Odometer reported as 111,244 kilometers",
          ],
        },
        {
          id: "25",
          name: "Cabin air filter replaced/cleaned",
          type: null,
          date: "Sep 7, 2018",
          mileage: 71833,
          details: [
            "Cabin air filter replaced/cleaned",
            "Oil and filter changed",
            "Odometer reported as 115,604 kilometers",
          ],
        },
        {
          id: "26",
          name: "Oil and filter changed",
          type: null,
          date: "Apr 22, 2019",
          mileage: 75239,
          details: [
            "Oil and filter changed",
            "Odometer reported as 121,085 kilometers",
          ],
        },
        {
          id: "27",
          name: "Oil and filter changed",
          type: null,
          date: "Aug 28, 2019",
          mileage: 76867,
          details: [
            "Oil and filter changed",
            "Odometer reported as 123,705 kilometers",
          ],
        },
        {
          id: "28",
          name: "Oil and filter changed",
          type: null,
          date: "Dec 17, 2019",
          mileage: 80400,
          details: [
            "Oil and filter changed",
            "Odometer reported as 129,391 kilometers",
          ],
        },
        {
          id: "29",
          name: "Antifreeze/coolant flushed/changed",
          type: null,
          date: "Feb 7, 2020",
          mileage: 81664,
          details: [
            "Antifreeze/coolant flushed/changed",
            "Power steering checked",
            "Timing belt replaced",
            "Water pump gasket replaced",
            "Water pump replaced",
            "Odometer reported as 131,425 kilometers",
          ],
        },
        {
          id: "30",
          name: "Oil and filter changed",
          type: null,
          date: "Sep 9, 2020",
          mileage: 83477,
          details: [
            "Oil and filter changed",
            "Odometer reported as 134,343 kilometers",
          ],
        },
        {
          id: "31",
          name: "New owner reported",
          type: null,
          date: "Nov 12, 2020",
          mileage: null,
          details: ["New owner reported"],
        },
        {
          id: "32",
          name: "New owner reported",
          type: null,
          date: "Nov 25, 2020",
          mileage: null,
          details: ["New owner reported"],
        },
        {
          id: "33",
          name: "Glass repaired",
          type: null,
          date: "Apr 27, 2021",
          mileage: 89945,
          details: ["Glass repaired"],
        },
        {
          id: "34",
          name: "Maintenance inspection completed",
          type: null,
          date: "Nov 14, 2022",
          mileage: 124445,
          details: [
            "Maintenance inspection completed",
            "Battery/charging system checked",
            "Tire condition and pressure checked",
            "Vehicle washed/detailed",
          ],
        },
        {
          id: "35",
          name: "Maintenance inspection completed",
          type: null,
          date: "Nov 30, 2022",
          mileage: 124927,
          details: [
            "Maintenance inspection completed",
            "Battery/charging system checked",
            "Lower control arm(s) replaced",
            "Sway bar link(s)  replaced",
            "Tire condition and pressure checked",
          ],
        },
        {
          id: "36",
          name: "Maintenance inspection completed",
          type: null,
          date: "Dec 5, 2023",
          mileage: 130014,
          details: [
            "Maintenance inspection completed",
            "Battery/charging system checked",
            "Brakes checked",
            "Drive belts checked",
            "Fluids checked",
            "Oil and filter changed",
            "Tire condition and pressure checked",
            "Tires rotated",
            "Vehicle washed/detailed",
          ],
        },
        {
          id: "37",
          name: "Oil and filter changed",
          type: null,
          date: "Dec 2, 2024",
          mileage: 153639,
          details: ["Oil and filter changed"],
        },
      ],
      title: [
        {
          id: "title-status",
          title: "Title Status",
          description: "Salvage Title",
        },
        {
          id: "odometer",
          title: "Odometer",
          description: "Not Actual Mileage Reported",
        },
        {
          id: "lemon-law",
          title: "Lemon Law",
          description: "No Lemon Law on Record",
        },
        {
          id: "recalls",
          title: "Recalls",
          description:
            "No open recalls reported to CARFAX. A current list of recalls is available at Ford Motor Company.",
        },
      ],

      auctionHistory: [
        {
          auction: "IAAI",
          saleDate: "15/Apr/2024",
          finalBid: 12450,
          status: "Not sold",
          seller: "Mercury Insurance",
        },
        {
          auction: "IAAI",
          saleDate: "22/Apr/2024",
          finalBid: 13325,
          status: "Sold",
          seller: "Mercury Insurance",
        },
        {
          auction: "Copart",
          saleDate: "25/Aug/2025",
          finalBid: 3950,
          status: "Not sold",
          seller: "GEICO",
        },
        {
          auction: "Copart",
          saleDate: "08/Sep/2025",
          finalBid: 9800,
          status: "Sold",
          seller: "GEICO",
        },
      ],
    },
    negotiate: null,
    verdict: null,
    marketCheckRaw: null,
    evaluationRaw: null,
  },
};
