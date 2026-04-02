import {
  AnimatedCounter,
  FadeUp,
} from "@carveri/shared/components/animations.tsx";

function StatsBar() {
  return (
    <section className="border-border bg-card border-y py-10">
      <div className="mx-auto max-w-240 px-5">
        <div className="*:last: grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {[
            { value: 2577, suffix: "+", label: "Reportes generados" },
            { value: 11, suffix: "", label: "Fuentes de datos" },
            { value: 24, suffix: "h", label: "Tiempo de entrega" },
          ].map((stat, i) => (
            <FadeUp key={`${stat.suffix}-${stat.value}`} delay={i * 0.05}>
              <div>
                <div className="font-[Outfit] text-[1.75rem] font-black sm:text-[2rem]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground mt-1 text-sm">
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
