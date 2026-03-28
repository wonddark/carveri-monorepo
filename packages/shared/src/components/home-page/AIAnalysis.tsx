import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconChartBar,
  IconMessageCircle,
  IconSearch,
} from "@tabler/icons-react";
import { Button } from "@carveri/shared/components/ui/button.tsx";

function AiAnalysis() {
  const analysisSteps = [
    {
      id: "1",
      icon: <IconAlertTriangle className="h-4 w-4" />,
      text: "Detecta riesgos ocultos que el vendedor no menciona",
    },
    {
      id: "2",
      icon: <IconChartBar className="h-4 w-4" />,
      text: "Compara el precio contra 4 fuentes de valuación",
    },
    {
      id: "3",
      icon: <IconMessageCircle className="h-4 w-4" />,
      text: "Tips de negociación basados en datos reales",
    },
    {
      id: "4",
      icon: <IconSearch className="h-4 w-4" />,
      text: "Checklist de inspección personalizado para el vehículo",
    },
  ];
  const AI_ANALYSIS =
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-ai-analysis-v3-8apLrAQmFkomYzhsFG56Ex.webp";

  return (
    <section className="overflow-hidden bg-[#0A1628]">
      <div className="mx-auto max-w-300 px-5 py-16 lg:py-24">
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
                <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Decisión informada.
                </span>
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
                Nuestra IA cruza el historial de Carfax, los 4 libros de
                valuación, datos de subasta y comparables del mercado para darte
                una recomendación clara.
              </p>
              <div className="mt-8 space-y-4">
                {analysisSteps.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
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
  );
}

export default AiAnalysis;
