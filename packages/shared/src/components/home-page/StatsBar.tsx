import { AnimatedCounter, FadeUp } from "@carveri/shared/components/animations.tsx";
import { useTranslation } from "react-i18next";

const STATS = [
  { value: 11,  suffix: "",  labelKey: "stats.sources"    },
  { value: 4,   suffix: "",  labelKey: "stats.books"      },
  { value: 100, suffix: "+", labelKey: "stats.dataPoints" },
  { value: 24,  suffix: "h", labelKey: "stats.delivery"   },
] as const;

function StatsBar() {
  const { t } = useTranslation("homepage");

  return (
    <section className="border-border bg-card border-y py-10">
      <div className="mx-auto max-w-240 px-5">
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4 lg:divide-x lg:divide-border">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.labelKey} delay={i * 0.05}>
              <div>
                <div className="font-[Outfit] text-[2rem] font-black sm:text-[2.25rem]">
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
