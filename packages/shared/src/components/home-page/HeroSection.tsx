import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import VideoModal from "@carveri/shared/components/home-page/VideoModal.tsx";

function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const HERO_DASHBOARD =
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-hero-v3-Zxxcvz93JpWTMoLbQmJRBm.webp";
  return (
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
              <span>PRIMER REPORTE GRATIS — SIN TARJETA</span>
            </Badge>

            <h1 className="mt-4 font-[Outfit] text-[2rem] leading-[1.1] font-black tracking-tight text-white sm:text-[2.75rem] lg:text-[3.5rem]">
              ¿Comprando un auto usado?{" "}
              <span className="bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Verifica antes de pagar.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-150 text-[1.05rem] leading-relaxed text-gray-400 sm:text-lg">
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

      {/* Modal video */}
      <VideoModal open={showModal} onOpenChange={setShowModal} />
    </section>
  );
}

export default HeroSection;
