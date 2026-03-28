import {
  IconBolt,
  IconChartBar,
  IconClock,
  IconFileText,
  IconSearch,
  IconShieldFilled,
  IconSparkles,
  IconTrendingUp,
} from "@tabler/icons-react";

const plans = [
  {
    id: 1,
    name: "1 Reporte",
    price: 29,
    cents: "",
    desc: "Para el carro que ya tienes casi decidido.",
    features: [
      "Carfax completo",
      "4 libros de valuación",
      "Historial de subasta",
      "Análisis con IA",
      "Comparables del mercado",
    ],
    badge: null,
    perReport: "$29",
  },
  {
    id: 3,
    name: "3 Reportes",
    price: 59,
    cents: "",
    desc: "La mayoría mira 3 carros antes de decidir.",
    features: [
      "Todo lo del plan básico",
      "Ahorra $28 vs comprar 1×3",
      "Ideal para comparar opciones",
    ],
    badge: "MÁS POPULAR",
    perReport: "~$20/reporte",
  },
  {
    id: 7,
    name: "7 Reportes",
    price: 99,
    cents: "",
    desc: "Para quien está comparando fuerte.",
    features: [
      "Todo lo del plan básico",
      "Mejor costo por reporte",
      "Comparte con familia o amigos",
    ],
    badge: "MEJOR VALOR",
    perReport: "~$14/reporte",
  },
];

const faqs = [
  {
    q: "¿Cuánto tarda el reporte?",
    a: "Dentro de 24 horas. En casos complejos (fuentes lentas o validaciones extra), hasta 48 horas máximo.",
  },
  {
    q: "¿Carfax está incluido?",
    a: "Sí. Todos los paquetes incluyen el reporte completo de Carfax con historial de accidentes, dueños, mantenimiento y más.",
  },
  {
    q: "¿Siempre hay fotos de subasta?",
    a: "Solo si el vehículo pasó por subasta (Copart, IAAI, Manheim, ADESA). Si no existe historial de subasta, se indica explícitamente en el reporte.",
  },
  {
    q: "¿Qué datos necesito enviar?",
    a: "VIN + precio que piden + ZIP code. Las millas y fotos actuales del carro son opcionales, pero ayudan a mejorar el análisis de IA.",
  },
  {
    q: "¿Esto reemplaza un mecánico?",
    a: "No. CarVeri es análisis de data, riesgo y valor de mercado. Siempre recomendamos una inspección mecánica profesional antes de comprar.",
  },
  {
    q: "¿Puedo usar el reporte gratis primero?",
    a: "Sí. Tu primer reporte es completamente gratis, sin tarjeta de crédito. Así puedes ver la calidad antes de comprar un paquete.",
  },
  {
    q: "¿Qué pasa si el carro no tiene historial?",
    a: "Si Carfax no tiene datos del vehículo, te lo informamos y no se cuenta como un reporte usado. Solo pagas por reportes con información real.",
  },
];

const features = [
  {
    icon: <IconShieldFilled className="h-6 w-6" />,
    title: "Carfax Completo",
    desc: "Accidentes, título, odómetro, dueños anteriores y mantenimiento documentado.",
    color: "bg-blue-500",
  },
  {
    icon: <IconChartBar className="h-6 w-6" />,
    title: "4 Libros de Valuación",
    desc: "MMR, KBB, Black Book y J.D. Power — sabrás si el precio es justo.",
    color: "bg-emerald-500",
  },
  {
    icon: <IconSearch className="h-6 w-6" />,
    title: "Historial de Subasta",
    desc: "Fotos y datos de Copart, IAAI, Manheim o ADESA — si el carro pasó por subasta.",
    color: "bg-amber-500",
  },
  {
    icon: <IconSparkles className="h-6 w-6" />,
    title: "Análisis con IA",
    desc: "Recomendación final: Comprar, Negociar o Evitar — con razones concretas.",
    color: "bg-purple-500",
  },
  {
    icon: <IconTrendingUp className="h-6 w-6" />,
    title: "Comparables del Mercado",
    desc: "Carros similares en venta cerca de ti para comparar precio y condición.",
    color: "bg-rose-500",
  },
  {
    icon: <IconClock className="h-6 w-6" />,
    title: "Entrega en 24 Horas",
    desc: "Reporte listo en 24h. En casos complejos, hasta 48h máximo.",
    color: "bg-cyan-500",
  },
];

const steps = [
  {
    num: "01",
    title: "Envía el VIN",
    desc: "Solo necesitas el VIN, el precio que piden, y tu ZIP code.",
    icon: <IconFileText className="h-7 w-7" />,
  },
  {
    num: "02",
    title: "Analizamos todo",
    desc: "Consultamos Carfax, 4 libros, historial de subasta, comparables y más.",
    icon: <IconSearch className="h-7 w-7" />,
  },
  {
    num: "03",
    title: "Recibe tu CarVeri",
    desc: "Reporte visual con veredicto claro y datos que lo respaldan.",
    icon: <IconBolt className="h-7 w-7" />,
  },
];

const carCheckExamples = [
  {
    id: "JA4J4VA86RZ079851",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=260&fit=crop",
    verdictColor: "bg-green-500",
    miles: "18,420 mi",
    //
    //
    //
    vin: "JA4J4VA86RZ079851",
    year: 2024,
    make: "MITSUBISHI",
    model: "Outlander",
    trim: "SE, Ralliart Edition",
    price: 25000,
    mileage: 33500,
    location: "Tampa, FL",
    color: "Dark Blue",
    engine: "Gasoline",
    transmission: "Continuously Variable (CVT)",
    drivetrain: "AWD",
    daysOnLot: 18,
    previousOwners: 2,
    auction: { name: "IAAI", price: 21600 },
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    ],
    score: 8.2,
    verdict: "BUY",
    aiSummary:
      "This 2024 Mitsubishi Outlander SE is fairly priced compared to market. Clean history, no reported accidents, consistent odometer. Recommend a mechanical inspection before closing.",
    stats: {
      titleStatus: "Clean",
      accidents: 0,
      odometerVerified: true,
      priceDeltaPct: -2.8,
    },
    priceEval: {
      label: "FAIR",
      marketAvgDeltaPct: 17.8,
      bookValues: [
        { source: "MMR", value: 21600, delta: -3400 },
        { source: "KBB", value: 22310, delta: -2690 },
        { source: "JDP", value: 20075, delta: -4925 },
        { source: "BB", value: 20925, delta: -4075 },
      ],
    },
    market: {
      comparables: [
        {
          id: "c1",
          year: 2024,
          make: "Mitsubishi",
          model: "Outlander",
          trim: "SE",
          price: 24200,
          mileage: 28400,
          distanceMi: 8,
          dealer: "Tampa Mitsubishi",
          image:
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
          priceTag: "CHEAPER",
        },
        {
          id: "c2",
          year: 2024,
          make: "Mitsubishi",
          model: "Outlander",
          trim: "SE",
          price: 25800,
          mileage: 22100,
          distanceMi: 15,
          dealer: "Brandon Auto Mall",
          image:
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
          priceTag: "SIMILAR",
        },
        {
          id: "c3",
          year: 2023,
          make: "Mitsubishi",
          model: "Outlander",
          trim: "SEL",
          price: 23500,
          mileage: 41200,
          distanceMi: 22,
          dealer: "Clearwater Motors",
          image:
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
          priceTag: "CHEAPER",
        },
        {
          id: "c4",
          year: 2024,
          make: "Mitsubishi",
          model: "Outlander",
          trim: "SE",
          price: 26900,
          mileage: 19800,
          distanceMi: 31,
          dealer: "Lakeland Mitsubishi",
          image:
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80",
          priceTag: "PRICIER",
        },
        {
          id: "c5",
          year: 2023,
          make: "Mitsubishi",
          model: "Outlander",
          trim: "SE",
          price: 22800,
          mileage: 38900,
          distanceMi: 42,
          dealer: "Sarasota Auto Group",
          image:
            "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
          priceTag: "CHEAPER",
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
          id: "a1",
          title: "Auction Price",
          body: "This vehicle was sold at IAAI auction for $21,600. The dealer margin is $3,400 over acquisition cost.",
          tip: "Use this to justify a lower offer.",
        },
        {
          id: "a2",
          title: "Cheaper Comparables",
          body: "There are 3 similar vehicles (same model, year and trim) within 50 miles for under $24,500.",
          tip: "Show the seller you have other options.",
        },
        {
          id: "a3",
          title: "Limited Service History",
          body: "Only 3 documented services on Carfax for a vehicle with 33,500 miles. This raises questions about actual maintenance.",
          tip: "Ask for a discount due to lack of documentation.",
        },
        {
          id: "a4",
          title: "Days in Inventory",
          body: "This vehicle has been on the dealer's lot for 18 days. Every day that passes, the dealer pays floorplan interest on their inventory.",
          tip: "After 30 days dealers are more willing to negotiate.",
        },
      ],
      costs: {
        state: "Florida",
        taxRatePct: 6,
        tagAndTitle: 450,
        dealerFee: 799,
        monthlyEstimates: [
          { label: "Insurance", low: 180, high: 220 },
          { label: "Gas", low: 150, high: 180 },
          { label: "Maintenance", low: 50, high: 80 },
        ],
      },
    },
    verdictTab: {
      scoreBreakdown: [
        {
          id: "sb1",
          label: "Price vs Market",
          description: "2.8% below fair price",
          delta: 1.5,
          icon: "TrendingDown",
        },
        {
          id: "sb2",
          label: "Accident History",
          description: "No accidents reported",
          delta: 2,
          icon: "ShieldCheck",
        },
        {
          id: "sb3",
          label: "Odometer",
          description: "Mileage consistent with age",
          delta: 1,
          icon: "Gauge",
        },
        {
          id: "sb4",
          label: "Number of Owners",
          description: "2 owners in 1 year (normal for auction)",
          delta: 0.5,
          icon: "Users",
        },
        {
          id: "sb5",
          label: "Service History",
          description: "Limited documented service",
          delta: -0.3,
          icon: "Wrench",
        },
        {
          id: "sb6",
          label: "Auction Origin",
          description: "Vehicle went through IAAI auction",
          delta: -0.5,
          icon: "Building2",
        },
      ],
      risks: [
        {
          id: "r1",
          type: "positive",
          title: "Clean Title",
          description:
            "The title is clean, with no salvage, flood or rebuilt marks.",
        },
        {
          id: "r2",
          type: "positive",
          title: "Verified Odometer",
          description: "Odometer readings are consistent across all records.",
        },
        {
          id: "r3",
          type: "positive",
          title: "No Accidents Reported",
          description: "No accidents found in Carfax or auction records.",
        },
        {
          id: "r4",
          type: "warning",
          title: "Auction Vehicle",
          description:
            "This vehicle went through IAAI auction. Not necessarily negative, but worth verifying the reason for sale.",
        },
        {
          id: "r5",
          type: "warning",
          title: "Limited Service",
          description:
            "Only 3 documented services. There may be services not reported to Carfax.",
        },
        {
          id: "r6",
          type: "positive",
          title: "No Pending Recalls",
          description: "No open recalls for this vehicle according to NHTSA.",
        },
      ],
      checklist: [
        {
          id: "visual",
          category: "Visual Inspection",
          categoryIcon: "Eye",
          items: [
            "Check paint on all panels — look for color differences",
            "Verify panel alignment and uniform gaps",
            "Check tire condition (tread depth)",
            "Inspect windows for chips or cracks",
            "Verify all lights work",
          ],
        },
        {
          id: "mechanical",
          category: "Mechanical Inspection",
          categoryIcon: "Wrench",
          items: [
            "Check CVT transmission — known weak point on Outlander",
            "Listen for abnormal noises on cold start",
            "Test brakes at different speeds",
            "Verify air conditioning (cold and heat)",
            "Check suspension — listen for bumps on rough roads",
            "Verify AWD engages correctly",
          ],
        },
        {
          id: "documentation",
          category: "Documentation",
          categoryIcon: "FileText",
          items: [
            "Confirm title matches VIN: JA4J4VA86RZ079851",
            "Verify odometer shows ~33,500 mi",
            "Request service history from current dealer",
            "Confirm no liens on the title",
            "Verify registration is current",
          ],
        },
      ],
    },
    historyTab: {
      timeline: [
        {
          id: "e1",
          date: "Jan 2024",
          title: "Manufactured",
          description: "Okazaki Plant, Japan",
          type: "manufacture",
        },
        {
          id: "e2",
          date: "Feb 2024",
          title: "Imported to US",
          description: "Port of Long Beach, CA",
          type: "import",
        },
        {
          id: "e3",
          date: "Mar 2024",
          title: "First Owner",
          description: "AutoNation Mitsubishi, Miami FL",
          type: "owner",
        },
        {
          id: "e4",
          date: "Mar 2024",
          title: "Title Issued",
          description: "Florida — Clean Title",
          type: "title",
        },
        {
          id: "e5",
          date: "Jun 2024",
          title: "Service",
          description: "Oil change @ 5,200 mi",
          type: "service",
        },
        {
          id: "e6",
          date: "Sep 2024",
          title: "Service",
          description: "Tire rotation @ 12,400 mi",
          type: "service",
        },
        {
          id: "e7",
          date: "Nov 2024",
          title: "Service",
          description: "Multi-point inspection @ 16,800 mi",
          type: "service",
        },
        {
          id: "e8",
          date: "Dec 2024",
          title: "Second Owner",
          description: "Title transfer — Tampa, FL",
          type: "owner",
        },
        {
          id: "e9",
          date: "Feb 2025",
          title: "IAAI Auction",
          description: "Sold for $21,600 — Run & Drive",
          type: "auction",
        },
        {
          id: "e10",
          date: "Mar 2025",
          title: "Current State",
          description: "33,500 mi — Tampa, FL",
          type: "current",
        },
      ],
      auctionPhotos: [
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
      ],
      accidents: {
        count: 0,
        description:
          "No accidents reported in Carfax, NMVTIS or auction records.",
      },
      owners: [
        {
          id: "o1",
          label: "Owner #1",
          type: "Personal",
          state: "Florida",
          periodStart: "Mar 2024",
          periodEnd: "Dec 2024",
          periodMonths: 9,
          startMileage: 0,
          endMileage: 18200,
        },
        {
          id: "o2",
          label: "Owner #2",
          type: "Personal",
          state: "Florida",
          periodStart: "Dec 2024",
          periodEnd: "Feb 2025",
          periodMonths: 2,
          startMileage: 18200,
          endMileage: 33500,
        },
      ],
      service: [
        {
          id: "s1",
          name: "Oil Change & Filter",
          type: "Routine",
          date: "Jun 2024",
          mileage: 5200,
        },
        {
          id: "s2",
          name: "Tire Rotation",
          type: "Routine",
          date: "Sep 2024",
          mileage: 12400,
        },
        {
          id: "s3",
          name: "Multi-point Inspection",
          type: "Routine",
          date: "Nov 2024",
          mileage: 16800,
        },
      ],
      title: [
        {
          id: "t1",
          title: "Clean Title",
          description:
            "Clean title registered in Florida. No salvage, flood, rebuilt or lemon marks.",
        },
        {
          id: "t2",
          title: "No Pending Recalls",
          description: "No open recalls for this vehicle according to NHTSA.",
        },
        {
          id: "t3",
          title: "No Liens Reported",
          description: "No active liens found on this vehicle's title.",
        },
      ],
    },
  },
  {
    id: "2HKRS6H76RH219194",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=260&fit=crop",
    year: "2023",
    make: "Mercedes",
    model: "GLE 350",
    price: "$48,900",
    verdict: "Precio Alto",
    verdictColor: "bg-red-500",
    miles: "24,100 mi",
    location: "Orlando, FL",
  },
  {
    id: "2HGFC2F81MH516378",
    image:
      "https://images.unsplash.com/photo-1621993202323-f438eec934ff?w=400&h=260&fit=crop",
    year: "2023",
    make: "Toyota",
    model: "Camry SE",
    price: "$24,500",
    verdict: "Buen Precio",
    verdictColor: "bg-green-500",
    miles: "31,200 mi",
    location: "Tampa, FL",
  },
  {
    id: "1FMCU9GX0DUA27119",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=260&fit=crop",
    year: "2022",
    make: "Honda",
    model: "Civic Sport",
    price: "$22,800",
    verdict: "Negociar",
    verdictColor: "bg-amber-500",
    miles: "28,600 mi",
    location: "Hialeah, FL",
  },
  {
    id: "invalid-vin",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=260&fit=crop",
    year: "2022",
    make: "Honda",
    model: "Civic Sport",
    price: "$22,800",
    verdict: "Negociar",
    verdictColor: "bg-amber-500",
    miles: "28,600 mi",
    location: "Hialeah, FL",
  },
];

export { plans, faqs, features, steps, carCheckExamples };
