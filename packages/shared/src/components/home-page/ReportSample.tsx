import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Activity, useState } from "react";
import VideoModal from "@carveri/shared/components/home-page/VideoModal.tsx";

type Props = {
  scrollToVinForm: () => void;
};

function ReportSample(props: Readonly<Props>) {
  const { scrollToVinForm } = props;
  const [showModal, setShowModal] = useState(false);
  const REPORT_SAMPLE =
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/eJKAGHfm7BbufMTYZr5k2D/carcheck-report-sample-v3-bT8qCeeLfrcNjEi8eVGdpc.webp";

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <div className="relative mx-auto max-w-95 lg:mx-0">
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
                Mira un ejemplo real de cómo nuestro reporte te ayuda a tomar la
                decisión correcta — con datos, no con suerte.
              </p>

              <button
                className="group relative mt-6 aspect-video cursor-pointer overflow-hidden rounded-2xl bg-gray-900"
                onClick={() => setShowModal(true)}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#042CD7]/30 to-transparent" />
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
      <Activity mode={showModal ? "visible" : "hidden"}>
        <VideoModal open={showModal} onOpenChange={setShowModal} />
      </Activity>
    </section>
  );
}

export default ReportSample;
