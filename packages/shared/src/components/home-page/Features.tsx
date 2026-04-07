import { FadeUp } from "@carveri/shared/components/animations.tsx";
import { features } from "@carveri/shared/data/static.tsx";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@carveri/shared/components/ui/card.tsx";

function Features() {
  const { t } = useTranslation("homepage");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-160 text-center lg:mb-16">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest uppercase">
              {t("features.eyebrow")}
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] leading-tight font-black tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]">
              {t("features.title")}{" "}
              <span className="text-primary">{t("features.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-[1.05rem] leading-relaxed">
              {t("features.description")}
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.06}>
              <Card className="group py-0 transition-all duration-300 hover:-translate-y-1 hover:ring-2">
                <CardContent className="p-6 lg:p-7">
                  <div
                    className={`h-12 w-12 rounded-xl ${f.color} mb-5 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {f.icon}
                  </div>
                  <CardTitle className="mb-2 font-[Outfit] text-[1.1rem] font-bold">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-[15px] leading-relaxed">
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
