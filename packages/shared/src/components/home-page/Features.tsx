import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { features } from "@carveri/shared/data/static.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";

function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-160 text-center lg:mb-16">
            <span className="mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest text-[#042CD7] uppercase">
              Qué incluye tu reporte
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight text-[#1D1D1F] sm:text-[2.25rem] lg:text-[2.5rem]">
              Todo lo que necesitas saber,{" "}
              <span className="text-[#042CD7]">en un solo reporte.</span>
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-500">
              Consultamos las fuentes que usan los dealers profesionales — y te
              lo entregamos de forma clara y directa.
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.06}>
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
  );
}

export default Features;
