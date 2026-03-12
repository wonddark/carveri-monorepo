/**
 * CarCheckLanding.tsx — V6 shadcn/ui Refactor
 * Same layout, colors, content — rebuilt with shadcn/ui components:
 * Button, Card, Input, Badge, Accordion, Dialog, Separator, ScrollArea
 * Design: Clean Confidence — Outfit bold headlines, Source Sans 3 body
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── shadcn/ui components ─── */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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
  IconTrendingUp,
} from "@tabler/icons-react";

/* ─── Assets ─── */
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663263444526/KfakYGoXfipkejUs.png";
const HERO_DASHBOARD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-hero-v3-Zxxcvz93JpWTMoLbQmJRBm.webp";
const AI_ANALYSIS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-ai-analysis-v3-8apLrAQmFkomYzhsFG56Ex.webp";
const REPORT_SAMPLE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-report-sample-v3-bT8qCeeLfrcNjEi8eVGdpc.webp";

/* ─── Animation helpers ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: Readonly<{ children: React.ReactNode; delay?: number; className?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Counter animation ─── */
function AnimatedCounter({ end, suffix = "" }: Readonly<{ end: number; suffix?: string }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Data ─── */
const plans = [
  {
    id: 1, name: "1 Reporte", price: 29, cents: "",
    desc: "Para el carro que ya tienes casi decidido.",
    features: ["Carfax completo", "4 libros de valuación", "Historial de subasta", "Análisis con IA", "Comparables del mercado"],
    badge: null, perReport: "$29",
  },
  {
    id: 3, name: "3 Reportes", price: 59, cents: "",
    desc: "La mayoría mira 3 carros antes de decidir.",
    features: ["Todo lo del plan básico", "Ahorra $28 vs comprar 1×3", "Ideal para comparar opciones"],
    badge: "MÁS POPULAR", perReport: "~$20/reporte",
  },
  {
    id: 7, name: "7 Reportes", price: 99, cents: "",
    desc: "Para quien está comparando fuerte.",
    features: ["Todo lo del plan básico", "Mejor costo por reporte", "Comparte con familia o amigos"],
    badge: "MEJOR VALOR", perReport: "~$14/reporte",
  },
];

const faqs = [
  { q: "¿Cuánto tarda el reporte?", a: "Dentro de 24 horas. En casos complejos (fuentes lentas o validaciones extra), hasta 48 horas máximo." },
  { q: "¿Carfax está incluido?", a: "Sí. Todos los paquetes incluyen el reporte completo de Carfax con historial de accidentes, dueños, mantenimiento y más." },
  { q: "¿Siempre hay fotos de subasta?", a: "Solo si el vehículo pasó por subasta (Copart, IAAI, Manheim, ADESA). Si no existe historial de subasta, se indica explícitamente en el reporte." },
  { q: "¿Qué datos necesito enviar?", a: "VIN + precio que piden + ZIP code. Las millas y fotos actuales del carro son opcionales, pero ayudan a mejorar el análisis de IA." },
  { q: "¿Esto reemplaza un mecánico?", a: "No. CarCheck es análisis de data, riesgo y valor de mercado. Siempre recomendamos una inspección mecánica profesional antes de comprar." },
  { q: "¿Puedo usar el reporte gratis primero?", a: "Sí. Tu primer reporte es completamente gratis, sin tarjeta de crédito. Así puedes ver la calidad antes de comprar un paquete." },
  { q: "¿Qué pasa si el carro no tiene historial?", a: "Si Carfax no tiene datos del vehículo, te lo informamos y no se cuenta como un reporte usado. Solo pagas por reportes con información real." },
];

const features = [
  { icon: <IconShieldFilled className="w-6 h-6" />, title: "Carfax Completo", desc: "Accidentes, título, odómetro, dueños anteriores y mantenimiento documentado.", color: "bg-blue-500" },
  { icon: <IconChartBar className="w-6 h-6" />, title: "4 Libros de Valuación", desc: "MMR, KBB, Black Book y J.D. Power — sabrás si el precio es justo.", color: "bg-emerald-500" },
  { icon: <IconSearch className="w-6 h-6" />, title: "Historial de Subasta", desc: "Fotos y datos de Copart, IAAI, Manheim o ADESA — si el carro pasó por subasta.", color: "bg-amber-500" },
  { icon: <IconSparkles className="w-6 h-6" />, title: "Análisis con IA", desc: "Recomendación final: Comprar, Negociar o Evitar — con razones concretas.", color: "bg-purple-500" },
  { icon: <IconTrendingUp className="w-6 h-6" />, title: "Comparables del Mercado", desc: "Carros similares en venta cerca de ti para comparar precio y condición.", color: "bg-rose-500" },
  { icon: <IconClock className="w-6 h-6" />, title: "Entrega en 24 Horas", desc: "Reporte listo en 24h. En casos complejos, hasta 48h máximo.", color: "bg-cyan-500" },
];

const steps = [
  { num: "01", title: "Envía el VIN", desc: "Solo necesitas el VIN, el precio que piden, y tu ZIP code.", icon: <IconFileText className="w-7 h-7" /> },
  { num: "02", title: "Analizamos todo", desc: "Consultamos Carfax, 4 libros, historial de subasta, comparables y más.", icon: <IconSearch className="w-7 h-7" /> },
  { num: "03", title: "Recibe tu CarCheck", desc: "Reporte visual con veredicto claro y datos que lo respaldan.", icon: <IconBolt className="w-7 h-7" /> },
];

const carCheckExamples = [
  {
    id: "JA4J4VA86RZ079851",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=260&fit=crop",
    year: "2024", make: "BMW", model: "X5 xDrive40i",
    price: "$52,500", verdict: "Buen Precio", verdictColor: "bg-green-500",
    miles: "18,420 mi", location: "Miami, FL",
  },
  {
    id: "2HKRS6H76RH219194",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=260&fit=crop",
    year: "2023", make: "Mercedes", model: "GLE 350",
    price: "$48,900", verdict: "Precio Alto", verdictColor: "bg-red-500",
    miles: "24,100 mi", location: "Orlando, FL",
  },
  {
    id: "2HGFC2F81MH516378",
    image: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?w=400&h=260&fit=crop",
    year: "2023", make: "Toyota", model: "Camry SE",
    price: "$24,500", verdict: "Buen Precio", verdictColor: "bg-green-500",
    miles: "31,200 mi", location: "Tampa, FL",
  },
  {
    id: "1FMCU9GX0DUA27119",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=260&fit=crop",
    year: "2022", make: "Honda", model: "Civic Sport",
    price: "$22,800", verdict: "Negociar", verdictColor: "bg-amber-500",
    miles: "28,600 mi", location: "Hialeah, FL",
  },
];

/* ═══════════════════════════════════════════════════════════════════ */
/* ═══ MAIN COMPONENT ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════ */

export default function CarCheckLanding() {
  const [selectedPlan, setSelectedPlan] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [vinValue, setVinValue] = useState("");
  const pricingRef = useRef<HTMLDivElement>(null);
  const vinFormRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentPlan = plans.find((p) => p.id === selectedPlan)!;

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToVinForm = () => {
    vinFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => vinFormRef.current?.focus(), 600);
  };

  const handleVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vinValue.trim().length >= 17) {
      alert(`VIN recibido: ${vinValue.toUpperCase()}\n\nTODO: Conectar flujo de reporte gratuito`);
    } else {
      alert("Por favor ingresa un VIN válido de 17 caracteres.");
    }
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
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>

      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-gray-100/50">
        <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="La Subasta Cubana" className="h-8" />
            <Separator orientation="vertical" className="h-5 bg-gray-200" />
            <span className="font-[Outfit] font-bold text-[#042CD7] text-lg">CarCheck</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/vehicle-detail"}
              className="text-gray-600 hover:text-[#1D1D1F] font-medium text-sm"
            >
              Ver ejemplo
            </Button>
            <Button
              variant="ghost"
              onClick={scrollToPricing}
              className="text-gray-600 hover:text-[#1D1D1F] font-medium text-sm"
            >
              Planes
            </Button>
            <Button
              onClick={scrollToVinForm}
              className="bg-[#042CD7] hover:bg-[#0635f0] text-white font-[Outfit] font-bold text-sm rounded-xl px-5"
            >
              Reporte Gratis
            </Button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative bg-[#0A1628] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-5 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <FadeUp>
            <div className="text-center max-w-[800px] mx-auto">
              <Badge className="bg-green-500/15 text-green-400 border-green-500/20 font-[Outfit] font-bold text-xs tracking-wider px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                PRIMER REPORTE GRATIS — SIN TARJETA
              </Badge>

              <h1 className="font-[Outfit] font-black text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] tracking-tight text-white leading-[1.1] mt-4">
                ¿Comprando un auto usado?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  Verifica antes de pagar.
                </span>
              </h1>

              <p className="mt-5 text-gray-400 text-[1.05rem] sm:text-lg leading-relaxed max-w-[600px] mx-auto">
                Mira cómo CarCheck analiza un vehículo real — historial, valor de mercado, riesgos y recomendación con IA.
              </p>
            </div>
          </FadeUp>

          {/* Video embed area */}
          <FadeUp delay={0.15}>
            <div
              className="mt-10 max-w-[720px] mx-auto relative aspect-video rounded-2xl bg-gray-900/80 border border-white/10 overflow-hidden cursor-pointer group"
              onClick={() => setShowModal(true)}
            >
              <img
                src={HERO_DASHBOARD}
                alt="CarCheck Dashboard Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <IconPlayerPlay className="w-7 h-7 sm:w-8 sm:h-8 text-[#042CD7] ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/60 text-sm font-medium">
                Ver cómo funciona — 2 min
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ VIN FORM SECTION ═══ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[560px] mx-auto px-5">
          <FadeUp>
            <div className="text-center mb-8">
              <h2 className="font-[Outfit] font-black text-[1.5rem] sm:text-[1.75rem] tracking-tight text-[#1D1D1F]">
                Obtén tu primer reporte gratis
              </h2>
              <p className="mt-2 text-gray-500 text-[15px]">
                Ingresa el VIN y recibe un análisis completo en 24 horas.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Card className="border-gray-200 shadow-lg shadow-gray-100/60 py-0">
              <CardContent className="p-6">
                <form onSubmit={handleVinSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      ref={vinFormRef}
                      type="text"
                      placeholder="Ingresa el VIN del vehículo"
                      value={vinValue}
                      onChange={(e) => setVinValue(e.target.value.toUpperCase().slice(0, 17))}
                      maxLength={17}
                      className="h-14 text-base font-mono tracking-wider border-gray-200 bg-gray-50 rounded-xl pr-16 focus-visible:border-[#042CD7] focus-visible:ring-[#042CD7]/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                      {vinValue.length}/17
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-[Outfit] font-bold text-[16px] rounded-xl shadow-lg shadow-green-500/20 active:scale-[0.97] transition-all"
                  >
                    OBTENER MI REPORTE GRATIS
                  </Button>
                </form>
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Ej. 1HGCM82633A004352 — Encuéntralo en el tablero, puerta del conductor, o título del vehículo.
                </p>
              </CardContent>
            </Card>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-green-500" /> Sin tarjeta de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="w-4 h-4 text-blue-500" /> Entrega en 24h
              </span>
              <span className="flex items-center gap-1.5">
                <IconShield className="w-4 h-4 text-amber-500" /> Carfax incluido
              </span>
              <span className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-green-500" /> 100% confidencial
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <section className="py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-[Outfit] font-bold text-xs tracking-widest uppercase text-[#042CD7]">
                  Reportes recientes
                </span>
                <h2 className="font-[Outfit] font-black text-[1.5rem] sm:text-[1.75rem] tracking-tight text-[#1D1D1F] mt-1">
                  CarChecks de clientes reales
                </h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollSlider("left")}
                  className="rounded-full border-gray-200 hover:border-gray-300"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollSlider("right")}
                  className="rounded-full border-gray-200 hover:border-gray-300"
                >
                  <IconChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </FadeUp>

          <FadeIn>
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {carCheckExamples.map((car) => (
              <a
                key={car.id}
                href={`/reports/${car.id}`}
                className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start group"
              >
                <Card className="overflow-hidden border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 py-0 gap-0">
                  <div className="relative h-[160px] overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className={`absolute top-3 left-3 ${car.verdictColor} text-white border-0 text-[11px] font-bold rounded-md px-2 py-0.5`}>
                      {car.verdict}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-[Outfit] font-bold text-[15px] text-[#1D1D1F] truncate">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="font-[Outfit] font-black text-lg text-[#1D1D1F]">{car.price}</span>
                      <span className="text-xs text-gray-400">{car.miles}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {car.location}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-[#042CD7] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver reporte completo <IconArrowRight className="w-3 h-3" />
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
      <section className="py-10 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-[960px] mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: 2577, suffix: "+", label: "Reportes generados" },
              { value: 11, suffix: "", label: "Fuentes de datos" },
              { value: 24, suffix: "h", label: "Tiempo de entrega" },
              { value: 0, suffix: "", label: "Tu primer reporte", display: "GRATIS" },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div>
                  <div className="font-[Outfit] font-black text-[1.75rem] sm:text-[2rem] text-[#1D1D1F]">
                    {stat.display || <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeUp>
            <div className="text-center max-w-[640px] mx-auto mb-12 lg:mb-16">
              <span className="inline-block font-[Outfit] font-bold text-xs tracking-widest uppercase text-[#042CD7] mb-3">
                Qué incluye tu reporte
              </span>
              <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem] tracking-tight text-[#1D1D1F] leading-tight">
                Todo lo que necesitas saber,{" "}
                <span className="text-[#042CD7]">en un solo reporte.</span>
              </h2>
              <p className="mt-4 text-gray-500 text-[1.05rem] leading-relaxed">
                Consultamos las fuentes que usan los dealers profesionales — y te lo entregamos de forma clara y directa.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Card className="group border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 py-0">
                  <CardContent className="p-6 lg:p-7">
                    <div className={`w-12 h-12 rounded-xl ${f.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      {f.icon}
                    </div>
                    <CardTitle className="font-[Outfit] font-bold text-[1.1rem] text-[#1D1D1F] mb-2">
                      {f.title}
                    </CardTitle>
                    <CardDescription className="text-[15px] text-gray-500 leading-relaxed">
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
      <section className="bg-[#0A1628] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp>
              <img
                src={AI_ANALYSIS}
                alt="CarCheck AI Analysis"
                className="rounded-2xl w-full shadow-2xl shadow-black/30"
              />
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/20 font-[Outfit] font-bold text-xs tracking-wider px-3 py-1 rounded-full mb-4">
                  Inteligencia artificial
                </Badge>
                <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.25rem] tracking-tight text-white leading-tight">
                  Análisis inteligente.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Decisión informada.
                  </span>
                </h2>
                <p className="mt-5 text-gray-400 text-[1.05rem] leading-relaxed">
                  Nuestra IA cruza el historial de Carfax, los 4 libros de valuación, datos de subasta y comparables del mercado para darte una recomendación clara.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: <IconAlertTriangle className="w-4 h-4" />, text: "Detecta riesgos ocultos que el vendedor no menciona" },
                    { icon: <IconChartBar className="w-4 h-4" />, text: "Compara el precio contra 4 fuentes de valuación" },
                    { icon: <IconMessageCircle className="w-4 h-4" />, text: "Tips de negociación basados en datos reales" },
                    { icon: <IconSearch className="w-4 h-4" />, text: "Checklist de inspección personalizado para el vehículo" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400">{item.icon}</span>
                      </div>
                      <span className="text-gray-300 text-[15px] leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "/vehicle-detail"}
                    className="bg-white/10 border-white/15 text-white font-[Outfit] font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/15 hover:text-white"
                  >
                    Ver reporte ejemplo
                    <IconArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeUp>
            <div className="text-center max-w-[500px] mx-auto mb-12 lg:mb-16">
              <span className="inline-block font-[Outfit] font-bold text-xs tracking-widest uppercase text-[#042CD7] mb-3">
                Cómo funciona
              </span>
              <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.25rem] tracking-tight text-[#1D1D1F]">
                Así de simple.
              </h2>
              <p className="mt-3 text-gray-500 text-[1.05rem]">
                Tres pasos. Sin complicaciones.
              </p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-3 gap-6 max-w-[960px] mx-auto">
            {steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <Card className="relative border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 py-0">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#042CD7] text-white flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <Badge variant="outline" className="font-[Outfit] font-black text-xs tracking-widest text-[#042CD7] border-[#042CD7]/20 mb-2">
                      Paso {step.num}
                    </Badge>
                    <CardTitle className="font-[Outfit] font-bold text-xl text-[#1D1D1F] mb-3 mt-2">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-[15px] text-gray-500 leading-relaxed">
                      {step.desc}
                    </CardDescription>
                  </CardContent>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center z-10">
                      <IconArrowRight className="w-3 h-3 text-gray-400" />
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
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp>
              <div className="relative max-w-[380px] mx-auto lg:mx-0">
                <img
                  src={REPORT_SAMPLE}
                  alt="Ejemplo de Reporte CarCheck"
                  className="w-full rounded-2xl shadow-2xl shadow-gray-200/80"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <Badge className="bg-[#042CD7]/10 text-[#042CD7] border-[#042CD7]/20 font-[Outfit] font-bold text-xs tracking-wider px-3 py-1 rounded-full mb-4">
                  Mira cómo funciona
                </Badge>
                <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2rem] tracking-tight text-[#1D1D1F] leading-tight">
                  En 2 minutos entiendes el valor de un CarCheck.
                </h2>
                <p className="mt-4 text-gray-500 text-[1.05rem] leading-relaxed">
                  Mira un ejemplo real de cómo nuestro reporte te ayuda a tomar la decisión correcta — con datos, no con suerte.
                </p>

                <button
                  className="mt-6 relative aspect-video rounded-2xl bg-gray-900 overflow-hidden cursor-pointer group"
                  onClick={() => setShowModal(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#042CD7]/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <IconPlayerPlay className="w-7 h-7 text-[#042CD7] ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white/50 text-sm font-medium">
                    Video próximamente
                  </div>
                </button>

                <Button
                  onClick={scrollToVinForm}
                  className="mt-6 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-[Outfit] font-bold text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-green-500/25 active:scale-[0.97]"
                >
                  Obtener reporte gratis
                  <IconArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section ref={pricingRef} className="py-16 lg:py-24 bg-gray-50" id="pricing">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeUp>
            <div className="text-center max-w-135 mx-auto mb-10 lg:mb-14">
              <span className="inline-block font-[Outfit] font-bold text-xs tracking-widest uppercase text-[#042CD7] mb-3">
                Planes
              </span>
              <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.25rem] tracking-tight text-[#1D1D1F]">
                Elige tu plan
              </h2>
              <p className="mt-3 text-gray-500 text-[1.05rem]">
                Tu primer reporte es gratis. Después, elige el paquete que necesites.
              </p>
            </div>
          </FadeUp>

          {/* Free tier */}
          <FadeUp delay={0.05}>
            <Card className="max-w-[480px] mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-center text-white py-0 overflow-hidden">
              <CardContent className="p-6">
                <CardTitle className="font-[Outfit] font-black text-xl text-white">
                  Primer Reporte — GRATIS
                </CardTitle>
                <CardDescription className="text-green-100 text-sm mt-1">
                  Sin tarjeta de crédito. Prueba la calidad antes de comprar.
                </CardDescription>
                <Button
                  onClick={scrollToVinForm}
                  className="mt-4 bg-white text-green-700 hover:bg-green-50 font-[Outfit] font-bold text-sm px-7 rounded-xl active:scale-[0.97]"
                >
                  Obtener reporte gratis
                  <IconArrowRight   className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Paid plans */}
          <div className="grid sm:grid-cols-3 gap-5 max-w-[960px] mx-auto">
            {plans.map((plan, i) => (
              <FadeUp key={plan.id} delay={0.1 + i * 0.08}>
                <Card
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative cursor-pointer transition-all duration-300 py-0 ${
                    selectedPlan === plan.id
                      ? "border-[#042CD7] border-2 shadow-xl shadow-blue-100/60 scale-[1.02]"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <Badge className={`absolute -top-3.5 left-1/2 -translate-x-1/2 font-[Outfit] font-bold text-[10px] tracking-wider px-4 py-1.5 rounded-full border-0 ${
                      plan.badge === "MÁS POPULAR"
                        ? "bg-[#042CD7] text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {plan.badge}
                    </Badge>
                  )}

                  <CardContent className="p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-4 mt-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedPlan === plan.id ? "border-[#042CD7]" : "border-gray-300"
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#042CD7]" />
                        )}
                      </div>
                      <span className="font-[Outfit] font-bold text-lg text-[#1D1D1F]">
                        {plan.name}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="font-[Outfit] font-black text-4xl text-[#1D1D1F]">
                        ${plan.price}
                      </span>
                      <span className="text-lg font-bold text-gray-400">{plan.cents}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#042CD7] mb-4">{plan.perReport}</div>
                    <p className="text-sm text-gray-500 mb-5">{plan.desc}</p>

                    <Separator className="mb-4" />

                    <div className="space-y-2.5">
                      {plan.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
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
            <div className="text-center mt-10">
              <Button
                onClick={() => alert(`TODO: Stripe Checkout — ${currentPlan.name} ($${currentPlan.price}${currentPlan.cents})`)}
                className="bg-[#042CD7] hover:bg-[#0635f0] text-white font-[Outfit] font-bold text-[16px] px-10 py-6 rounded-xl shadow-xl shadow-blue-200/50 active:scale-[0.97]"
              >
                Comprar {currentPlan.name} — ${currentPlan.price}{currentPlan.cents}
                <IconArrowRight className="w-5 h-5 ml-2" />
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
        <div className="max-w-[720px] mx-auto px-5">
          <FadeUp>
            <div className="text-center mb-10 lg:mb-14">
              <span className="inline-block font-[Outfit] font-bold text-xs tracking-widest uppercase text-[#042CD7] mb-3">
                FAQ
              </span>
              <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.25rem] tracking-tight text-[#1D1D1F]">
                Preguntas frecuentes
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-gray-100">
                  <AccordionTrigger className="font-[Outfit] font-semibold text-[15px] text-[#1D1D1F] hover:text-[#042CD7] hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-gray-500 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative bg-[#042CD7] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-[700px] mx-auto px-5 py-16 lg:py-20 text-center">
          <FadeUp>
            <h2 className="font-[Outfit] font-black text-[1.75rem] sm:text-[2.5rem] tracking-tight text-white leading-tight">
              No compres a ciegas.
            </h2>
            <p className="mt-4 text-blue-200 text-lg leading-relaxed max-w-[500px] mx-auto">
              Tu primer reporte es gratis. Descubre lo que el vendedor no te está diciendo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={scrollToVinForm}
                className="bg-white text-[#042CD7] hover:bg-blue-50 font-[Outfit] font-bold text-[16px] px-8 py-6 rounded-xl shadow-lg shadow-black/10 active:scale-[0.97]"
              >
                Obtener reporte gratis
                <IconArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("https://wa.me/17866990000", "_blank")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white font-[Outfit] font-semibold text-[16px] px-8 py-6 rounded-xl"
              >
                <IconMessageCircle className="w-5 h-5 mr-2" />
                Hablar por WhatsApp
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 bg-[#0A1628]">
        <div className="max-w-300 mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="La Subasta Cubana" className="h-6 brightness-200" />
              <Separator orientation="vertical" className="h-4 bg-gray-700" />
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} CarVeri
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Términos</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Contacto</a>
            </div>
          </div>
          <Separator className="my-6 bg-gray-800" />
          <div className="text-center">
            <p className="text-xs text-gray-600 max-w-[600px] mx-auto leading-relaxed">
              CarCheck es un servicio de análisis de datos vehiculares. No reemplaza una inspección mecánica profesional. Los resultados se basan en la información disponible en las fuentes consultadas al momento de generar el reporte.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-3 sm:hidden safe-area-bottom">
        <Button
          onClick={scrollToVinForm}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-[Outfit] font-bold text-[15px] rounded-xl active:scale-[0.97]"
        >
          OBTENER MI REPORTE GRATIS
        </Button>
      </div>

      {/* ═══ WhatsApp FAB ═══ */}
      <a
        href="https://wa.me/17866990000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-5 z-30 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ═══ VIDEO MODAL (Dialog) ═══ */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[800px] p-0 bg-gray-900 border-gray-800 rounded-2xl overflow-hidden" showCloseButton={true}>
          <DialogTitle className="sr-only">Video explicativo de CarCheck</DialogTitle>
          <div className="aspect-video flex items-center justify-center text-white/40 text-sm font-medium">
            Video próximamente — espacio reservado para el video explicativo de CarCheck
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
