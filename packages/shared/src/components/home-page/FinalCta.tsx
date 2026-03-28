import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";

type Props = {
  scrollToVinForm: () => void;
};

function FinalCta(props: Readonly<Props>) {
  const { scrollToVinForm } = props;

  return (
    <section className="relative overflow-hidden bg-[#042CD7]">
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-175 px-5 py-16 text-center lg:py-20">
        <FadeUp>
          <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-white sm:text-[2.5rem]">
            No compres a ciegas.
          </h2>
          <p className="mx-auto mt-4 max-w-125 text-lg leading-relaxed text-blue-200">
            Tu primer reporte es gratis. Descubre lo que el vendedor no te está
            diciendo.
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
              onClick={() => window.open("https://wa.me/17866990000", "_blank")}
              className="rounded-xl border-white/20 bg-white/10 px-8 py-6 font-[Outfit] text-[16px] font-semibold text-white hover:bg-white/20 hover:text-white"
            >
              <IconMessageCircle className="mr-2 h-5 w-5" />
              Hablar por WhatsApp
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default FinalCta;
