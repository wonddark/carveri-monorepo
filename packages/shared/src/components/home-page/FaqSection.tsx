import { FadeUp } from "@carveri/shared/components/animations.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@carveri/shared/components/ui/accordion.tsx";
import { faqs } from "@carveri/shared/data/static.tsx";

function FaqSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-180 px-5">
        <FadeUp>
          <div className="mb-10 text-center lg:mb-14">
            <span className="text-primary mb-3 inline-block font-[Outfit] text-xs font-bold tracking-widest uppercase">
              FAQ
            </span>
            <h2 className="font-[Outfit] text-[1.75rem] font-black tracking-tight sm:text-[2.25rem]">
              Preguntas frecuentes
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="hover:text-primary font-[Outfit] font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

export default FaqSection;
