import { type SubmitEventHandler, useRef, useState } from "react";

/* ─── shadcn/ui components ─── */
import { Button } from "@carveri/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@carveri/shared/components/ui/card";
import { Input } from "@carveri/shared/components/ui/input";
import { Badge } from "@carveri/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@carveri/shared/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@carveri/shared/components/ui/dialog";
import { Separator } from "@carveri/shared/components/ui/separator";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBolt,
  IconChartBar,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconFileText,
  IconMessageCircle,
  IconPlayerPlay,
  IconSearch,
  IconShield,
  IconShieldFilled,
  IconSparkles,
  IconTrendingUp
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import {
  AnimatedCounter,
  FadeIn,
  FadeUp
} from "@carveri/shared/components/animations.tsx";

/* ─── Assets ─── */
const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663263444526/KfakYGoXfipkejUs.png";
const HERO_DASHBOARD =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-hero-v3-Zxxcvz93JpWTMoLbQmJRBm.webp";
const AI_ANALYSIS =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-ai-analysis-v3-8apLrAQmFkomYzhsFG56Ex.webp";
const REPORT_SAMPLE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-report-sample-v3-bT8qCeeLfrcNjEi8eVGdpc.webp";

/* ─── Data ─── */
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

/* ═══════════════════════════════════════════════════════════════════ */
/* ═══ MAIN COMPONENT ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════ */

export default function CarVeriLanding() {
  const [selectedPlan, setSelectedPlan] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [vinValue, setVinValue] = useState("");
  const vinFormRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentPlan = plans.find((p) => p.id === selectedPlan)!;

  const scrollToVinForm = () => {
    vinFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => vinFormRef.current?.focus(), 600);
  };

  const handleVinSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/register?vin=${vinValue}`);
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0A1628]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-300 px-5 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <FadeUp>
            <div className="mx-auto max-w-200 text-center">
              <Badge className="mb-6 rounded-full border-green-500/20 bg-green-500/15 px-4 py-1.5 font-[Outfit] text-xs font-bold tracking-wider text-green-400">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400" />
                PRIMER REPORTE GRATIS — SIN TARJETA
              </Badge>

              <h1 className="mt-4 font-[Outfit] text-[2rem] leading-[1.1] font-black tracking-tight text-white sm:text-[2.75rem] lg:text-[3.5rem]">
                ¿Comprando un auto usado?{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Verifica antes de pagar.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-[600px] text-[1.05rem] leading-relaxed text-gray-400 sm:text-lg">
                Mira cómo CarVeri analiza un vehículo real — historial, valor de
                mercado, riesgos y recomendación con IA.
              </p>
            </div>
          </FadeUp>

          {/* Video embed area */}
          <FadeUp delay={0.15}>
            <button
              className="group relative mx-auto mt-10 block aspect-video w-full max-w-180 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80"
              onClick={() => setShowModal(true)}
            >
              <img
                src={HERO_DASHBOARD}
                alt="CarVeri Dashboard Preview"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                  <IconPlayerPlay className="ml-1 h-7 w-7 text-[#042CD7] sm:h-8 sm:w-8" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm font-medium text-white/60">
                Ver cómo funciona — 2 min
              </div>
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ═══ VIN FORM SECTION ═══ */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[560px] px-5">
          <FadeUp>
            <div className="mb-8 text-center">
              <h2 className="font-[Outfit] text-[1.5rem] font-black tracking-tight text-[#1D1D1F] sm:text-[1.75rem]">
                Obtén tu primer reporte gratis
              </h2>
              <p className="mt-2 text-[15px] text-gray-500">
                Ingresa el VIN y recibe un análisis completo en 24 horas.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Card className="border-gray-200 py-0 shadow-lg shadow-gray-100/60">
              <CardContent className="p-6">
                <form onSubmit={handleVinSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      ref={vinFormRef}
                      type="text"
                      placeholder="Ingresa el VIN del vehículo"
                      value={vinValue}
                      onChange={(e) =>
                        setVinValue(e.target.value.toUpperCase().slice(0, 17))
                      }
                      maxLength={17}
                      className="h-14 rounded-xl border-gray-200 bg-gray-50 pr-16 font-mono text-base tracking-wider focus-visible:border-[#042CD7] focus-visible:ring-[#042CD7]/20"
                    />
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-gray-400">
                      {vinValue.length}/17
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="h-14 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-[Outfit] text-[16px] font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
                  >
                    OBTENER MI REPORTE GRATIS
                  </Button>
                </form>
                <p className="mt-3 text-center text-xs text-gray-400">
                  Ej. 1HGCM82633A004352 — Encuéntralo en el tablero, puerta del
                  conductor, o título del vehículo.
                </p>
              </CardContent>
            </Card>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-green-500" /> Sin tarjeta de
                crédito
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="h-4 w-4 text-blue-500" /> Entrega en 24h
              </span>
              <span className="flex items-center gap-1.5">
                <IconShield className="h-4 w-4 text-amber-500" /> Carfax
                incluido
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-green-500" /> 100%
                confidencial
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <section className="overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-300 px-5">
          <FadeUp>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                  Reportes recientes
                </span>
                <h2 className="mt-1 font-[Outfit] text-[1.5rem] font-black tracking-tight text-[#1D1D1F] sm:text-[1.75rem]">
                  CarVeris de clientes reales
                </h2>
              </div>
              <div className="hidden gap-2 sm:flex">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollSlider("left")}
                  className="rounded-full border-gray-200 hover:border-gray-300"
                >
                  <IconChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollSlider("right")}
                  className="rounded-full border-gray-200 hover:border-gray-300"
                >
                  <IconChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeUp>

          <FadeIn>
            <div
              ref={sliderRef}
              className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {carCheckExamples.map((car, idx) => (
                <a
                  key={car.id}
                  href={
                    idx === 0 ? `/reports-v2/${car.vin}` : `/reports/${car.id}`
                  }
                  className="group w-65 shrink-0 snap-start sm:w-70"
                >
                  <Card className="gap-0 overflow-hidden border-gray-100 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={car.image}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge
                        className={`absolute top-3 left-3 ${car.verdictColor} rounded-md border-0 px-2 py-0.5 text-[11px] font-bold text-white`}
                      >
                        {car.verdict}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="truncate font-[Outfit] text-[15px] font-bold text-[#1D1D1F]">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-3">
                        <span className="font-[Outfit] text-lg font-black text-[#1D1D1F]">
                          {car.price}
                        </span>
                        <span className="text-xs text-gray-400">
                          {car.miles}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {car.location}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#042CD7] transition-all group-hover:gap-2">
                        Ver reporte completo{" "}
                        <IconArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10">
        <div className="mx-auto max-w-240 px-5">
          <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {[
              { value: 2577, suffix: "+", label: "Reportes generados" },
              { value: 11, suffix: "", label: "Fuentes de datos" },
              { value: 24, suffix: "h", label: "Tiempo de entrega" },
              {
                value: 0,
                suffix: "",
                label: "Tu primer reporte",
                display: "GRATIS",
              },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div>
                  <div className="font-[Outfit] text-[1.75rem] font-black text-[#1D1D1F] sm:text-[2rem]">
                    {stat.display || (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <FadeUp>
            <div className="mx-auto mb-12 max-w-[640px] text-center lg:mb-16">
              <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                Qué incluye tu reporte
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem] lg:text-[2.5rem]">
                Todo lo que necesitas saber,{" "}
                <span className="text-[#042CD7]">en un solo reporte.</span>
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
                Consultamos las fuentes que usan los dealers profesionales — y
                te lo entregamos de forma clara y directa.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Card className="group border-gray-100 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/80">
                  <CardContent className="p-6 lg:p-7">
                    <div
                      className={`h-12 w-12 rounded-xl ${f.color} mb-5 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
                    >
                      {f.icon}
                    </div>
                    <CardTitle className="mb-2 font-[Outfit] text-[1.1rem] font-bold text-[#1D1D1F]">
                      {f.title}
                    </CardTitle>
                    <CardDescription className="text-[15px] leading-relaxed text-gray-500">
                      {f.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <section className="overflow-hidden bg-[#0A1628]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <img
                src={AI_ANALYSIS}
                alt="CarVeri AI Analysis"
                className="w-full rounded-2xl shadow-2xl shadow-black/30"
              />
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <Badge className="mb-4 rounded-full border-blue-500/20 bg-blue-500/15 px-3 py-1 font-[Outfit] text-xs font-bold tracking-wider text-blue-400">
                  Inteligencia artificial
                </Badge>
                <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-white sm:text-[2.25rem]">
                  Análisis inteligente.{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Decisión informada.
                  </span>
                </h2>
                <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
                  Nuestra IA cruza el historial de Carfax, los 4 libros de
                  valuación, datos de subasta y comparables del mercado para
                  darte una recomendación clara.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: <IconAlertTriangle className="h-4 w-4" />,
                      text: "Detecta riesgos ocultos que el vendedor no menciona",
                    },
                    {
                      icon: <IconChartBar className="h-4 w-4" />,
                      text: "Compara el precio contra 4 fuentes de valuación",
                    },
                    {
                      icon: <IconMessageCircle className="h-4 w-4" />,
                      text: "Tips de negociación basados en datos reales",
                    },
                    {
                      icon: <IconSearch className="h-4 w-4" />,
                      text: "Checklist de inspección personalizado para el vehículo",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                        <span className="text-blue-400">{item.icon}</span>
                      </div>
                      <span className="text-[15px] leading-relaxed text-gray-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    onClick={() =>
                      (globalThis.window.location.href = "/vehicle-detail")
                    }
                    className="rounded-xl border-white/15 bg-white/10 px-6 py-3 font-[Outfit] text-sm font-bold text-white hover:bg-white/15 hover:text-white"
                  >
                    Ver reporte ejemplo
                    <IconArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <FadeUp>
            <div className="mx-auto mb-12 max-w-[500px] text-center lg:mb-16">
              <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                Cómo funciona
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem]">
                Así de simple.
              </h2>
              <p className="mt-3 text-[1.05rem] text-gray-500">
                Tres pasos. Sin complicaciones.
              </p>
            </div>
          </FadeUp>

          <div className="mx-auto grid max-w-[960px] gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <Card className="relative border-gray-100 py-0 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#042CD7] text-white">
                      {step.icon}
                    </div>
                    <Badge
                      variant="outline"
                      className="mb-2 border-[#042CD7]/20 font-[Outfit] text-xs font-black tracking-widest text-[#042CD7]"
                    >
                      Paso {step.num}
                    </Badge>
                    <CardTitle className="mt-2 mb-3 font-[Outfit] text-xl font-bold text-[#1D1D1F]">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-[15px] leading-relaxed text-gray-500">
                      {step.desc}
                    </CardDescription>
                  </CardContent>
                  {i < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-200 bg-white lg:flex">
                      <IconArrowRight className="h-3 w-3 text-gray-400" />
                    </div>
                  )}
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REPORT SAMPLE + VIDEO ═══ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <div className="relative mx-auto max-w-[380px] lg:mx-0">
                <img
                  src={REPORT_SAMPLE}
                  alt="Ejemplo de Reporte CarVeri"
                  className="w-full rounded-2xl shadow-2xl shadow-gray-200/80"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <Badge className="mb-4 rounded-full border-[#042CD7]/20 bg-[#042CD7]/10 px-3 py-1 font-[Outfit] text-xs font-bold tracking-wider text-[#042CD7]">
                  Mira cómo funciona
                </Badge>
                <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-[#1D1D1F] sm:text-[2rem]">
                  En 2 minutos entiendes el valor de un CarVeri.
                </h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
                  Mira un ejemplo real de cómo nuestro reporte te ayuda a tomar
                  la decisión correcta — con datos, no con suerte.
                </p>

                <button
                  className="group relative mt-6 aspect-video cursor-pointer overflow-hidden rounded-2xl bg-gray-900"
                  onClick={() => setShowModal(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#042CD7]/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <IconPlayerPlay className="ml-1 h-7 w-7 text-[#042CD7]" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-sm font-medium text-white/50">
                    Video próximamente
                  </div>
                </button>

                <Button
                  onClick={scrollToVinForm}
                  className="mt-6 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 px-7 py-3.5 font-[Outfit] text-[15px] font-bold text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
                >
                  Obtener reporte gratis
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="bg-gray-50 py-16 lg:py-24" id="pricing">
        <div className="mx-auto max-w-300 px-5">
          <FadeUp>
            <div className="mx-auto mb-10 max-w-135 text-center lg:mb-14">
              <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                Planes
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem]">
                Elige tu plan
              </h2>
              <p className="mt-3 text-[1.05rem] text-gray-500">
                Tu primer reporte es gratis. Después, elige el paquete que
                necesites.
              </p>
            </div>
          </FadeUp>

          {/* Free tier */}
          <FadeUp delay={0.05}>
            <Card className="mx-auto mb-8 max-w-120 overflow-hidden border-0 bg-linear-to-r from-green-500 to-emerald-600 py-0 text-center text-white">
              <CardContent className="p-6">
                <CardTitle className="font-[Outfit] text-xl font-black text-white">
                  Primer Reporte — GRATIS
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-green-100">
                  Sin tarjeta de crédito. Prueba la calidad antes de comprar.
                </CardDescription>
                <Button
                  onClick={scrollToVinForm}
                  className="mt-4 rounded-xl bg-white px-7 font-[Outfit] text-sm font-bold text-green-700 hover:bg-green-50 active:scale-[0.97]"
                >
                  Obtener reporte gratis
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Paid plans */}
          <div className="mx-auto grid max-w-[960px] gap-5 sm:grid-cols-3">
            {plans.map((plan, i) => (
              <FadeUp key={plan.id} delay={0.1 + i * 0.08}>
                <Card
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative cursor-pointer py-0 transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "scale-[1.02] border-2 border-[#042CD7] shadow-xl shadow-blue-100/60"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <Badge
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border-0 px-4 py-1.5 font-[Outfit] text-[10px] font-bold tracking-wider ${
                        plan.badge === "MÁS POPULAR"
                          ? "bg-[#042CD7] text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {plan.badge}
                    </Badge>
                  )}

                  <CardContent className="p-6 lg:p-7">
                    <div className="mt-1 mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                          selectedPlan === plan.id
                            ? "border-[#042CD7]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#042CD7]" />
                        )}
                      </div>
                      <span className="font-[Outfit] text-lg font-bold text-[#1D1D1F]">
                        {plan.name}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="font-[Outfit] text-4xl font-black text-[#1D1D1F]">
                        ${plan.price}
                      </span>
                      <span className="text-lg font-bold text-gray-400">
                        {plan.cents}
                      </span>
                    </div>
                    <div className="mb-4 text-xs font-semibold text-[#042CD7]">
                      {plan.perReport}
                    </div>
                    <p className="mb-5 text-sm text-gray-500">{plan.desc}</p>

                    <Separator className="mb-4" />

                    <div className="space-y-2.5">
                      {plan.features.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2.5 text-sm text-gray-600"
                        >
                          <IconCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.35}>
            <div className="mt-10 text-center">
              <Button
                onClick={() =>
                  alert(
                    `TODO: Stripe Checkout — ${currentPlan.name} ($${currentPlan.price}${currentPlan.cents})`,
                  )
                }
                className="rounded-xl bg-[#042CD7] px-10 py-6 font-[Outfit] text-[16px] font-bold text-white shadow-xl shadow-blue-200/50 hover:bg-[#0635f0] active:scale-[0.97]"
              >
                Comprar {currentPlan.name} — ${currentPlan.price}
                {currentPlan.cents}
                <IconArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-3 text-sm text-gray-400">
                Pago seguro con Stripe. Reporte en 24 horas.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[720px] px-5">
          <FadeUp>
            <div className="mb-10 text-center lg:mb-14">
              <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
                FAQ
              </span>
              <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem]">
                Preguntas frecuentes
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-gray-100"
                >
                  <AccordionTrigger className="py-5 font-[Outfit] text-[15px] font-semibold text-[#1D1D1F] hover:text-[#042CD7] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-gray-500">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative overflow-hidden bg-[#042CD7]">
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-175 px-5 py-16 text-center lg:py-20">
          <FadeUp>
            <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-white sm:text-[2.5rem]">
              No compres a ciegas.
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-lg leading-relaxed text-blue-200">
              Tu primer reporte es gratis. Descubre lo que el vendedor no te
              está diciendo.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={scrollToVinForm}
                className="rounded-xl bg-white px-8 py-6 font-[Outfit] text-[16px] font-bold text-[#042CD7] shadow-lg shadow-black/10 hover:bg-blue-50 active:scale-[0.97]"
              >
                Obtener reporte gratis
                <IconArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open("https://wa.me/17866990000", "_blank")
                }
                className="rounded-xl border-white/20 bg-white/10 px-8 py-6 font-[Outfit] text-[16px] font-semibold text-white hover:bg-white/20 hover:text-white"
              >
                <IconMessageCircle className="mr-2 h-5 w-5" />
                Hablar por WhatsApp
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#0A1628] py-10">
        <div className="mx-auto max-w-300 px-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="La Subasta Cubana"
                className="h-6 brightness-200"
              />
              <Separator orientation="vertical" className="h-4 bg-gray-700" />
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} CarVeri
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="transition-colors hover:text-gray-300">
                Términos
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">
                Privacidad
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">
                Contacto
              </a>
            </div>
          </div>
          <Separator className="my-6 bg-gray-800" />
          <div className="text-center">
            <p className="mx-auto max-w-[600px] text-xs leading-relaxed text-gray-600">
              CarVeri es un servicio de análisis de datos vehiculares. No
              reemplaza una inspección mecánica profesional. Los resultados se
              basan en la información disponible en las fuentes consultadas al
              momento de generar el reporte.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <div className="safe-area-bottom fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-xl sm:hidden">
        <Button
          onClick={scrollToVinForm}
          className="h-12 w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[15px] font-bold text-white hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
        >
          OBTENER MI REPORTE GRATIS
        </Button>
      </div>

      {/* ═══ WhatsApp FAB ═══ */}
      <a
        href="https://wa.me/17866990000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-500/30 transition-transform hover:scale-110 sm:bottom-6"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ═══ VIDEO MODAL (Dialog) ═══ */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-200 overflow-hidden rounded-2xl border-gray-800 bg-gray-900 p-0"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            Video explicativo de CarVeri
          </DialogTitle>
          <div className="flex aspect-video items-center justify-center text-sm font-medium text-white/40">
            Video próximamente — espacio reservado para el video explicativo de
            CarVeri
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
