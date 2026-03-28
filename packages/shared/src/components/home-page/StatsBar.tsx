import {
  AnimatedCounter,
  FadeUp,
} from "@carveri/shared/components/animations.tsx";

function StatsBar() {
  return (
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
            <FadeUp key={`${stat.suffix}-${stat.value}`} delay={i * 0.05}>
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
  );
}

export default StatsBar;
