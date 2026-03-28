import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { steps } from "@carveri/shared/data/static.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";
import { Badge } from "@carveri/shared/components/ui/badge.tsx";
import { IconArrowRight } from "@tabler/icons-react";

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-125 text-center lg:mb-16">
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

        <div className="mx-auto grid max-w-240 gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.1}>
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
  );
}

export default HowItWorks;
