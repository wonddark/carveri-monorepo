import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import ExamplesSlider from "@carveri/shared/components/home-page/ExamplesSlider.tsx";
import StatsBar from "@carveri/shared/components/home-page/StatsBar.tsx";
import Features from "@carveri/shared/components/home-page/Features.tsx";
import AIAnalysis from "@carveri/shared/components/home-page/AIAnalysis.tsx";
import HowItWorks from "@carveri/shared/components/home-page/HowItWorks.tsx";
import PricingSection from "@carveri/shared/components/home-page/PricingSection.tsx";
import FaqSection from "@carveri/shared/components/home-page/FaqSection.tsx";
import FinalCta from "@carveri/shared/components/home-page/FinalCta.tsx";
import Footer from "@carveri/shared/components/home-page/Footer.tsx";
import StickyMobileBar from "@carveri/shared/components/home-page/StickyMobileBar.tsx";
import WsFab from "@carveri/shared/components/home-page/WsFab.tsx";

export default function CarVeriLanding() {
  const examplesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToExamples = () => {
    examplesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <HeroSection
        scrollToExamples={scrollToExamples}
        scrollToPricing={scrollToPricing}
      />

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <div ref={examplesRef}>
        <ExamplesSlider />
      </div>

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks />

      {/* ═══ PRICING ═══ */}
      <div ref={pricingRef}>
        <PricingSection />
      </div>

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToPricing={scrollToPricing} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToPricing={scrollToPricing} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
