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
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-125 text-center lg:mb-16">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest uppercase">
              Cómo funciona
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight sm:text-[2.25rem]">
              Así de simple.
            </h2>
            <p className="text-muted-foreground mt-3 text-[1.05rem]">
              Tres pasos. Sin complicaciones.
            </p>
          </div>
        </FadeUp>

        <div className="mx-auto grid max-w-240 gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.1}>
              <Card className="relative overflow-visible py-0 transition-all duration-300 hover:ring-2">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#042CD7] text-white">
                    {step.icon}
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border text-primary mb-2 font-[Outfit] text-xs font-black tracking-widest"
                  >
                    Paso {step.num}
                  </Badge>
                  <CardTitle className="mt-2 mb-3 font-[Outfit] text-xl font-bold">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-[15px] leading-relaxed">
                    {step.desc}
                  </CardDescription>
                </CardContent>
                {i < steps.length - 1 && (
                  <div className="border-border bg-card absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full border lg:flex">
                    <IconArrowRight className="text-muted-foreground h-3 w-3" />
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
