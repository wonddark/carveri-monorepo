import {
  AnimatedCounter,
  FadeUp,
} from "@carveri/shared/components/animations.tsx";
import { useTranslation } from "react-i18next";

function StatsBar() {
  const { t } = useTranslation("homepage");

  const stats = [
    { value: 2577, suffix: "+", labelKey: "stats.reports" },
    { value: 11, suffix: "", labelKey: "stats.sources" },
    { value: 24, suffix: "h", labelKey: "stats.delivery" },
  ];

  return (
    <section className="border-border bg-card border-y py-10">
      <div className="mx-auto max-w-240 px-5">
        <div className="*:last: grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeUp key={`${stat.suffix}-${stat.value}`} delay={i * 0.05}>
              <div>
                <div className="font-[Outfit] text-[1.75rem] font-black sm:text-[2rem]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground mt-1 text-sm">
                  {t(stat.labelKey)}
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
