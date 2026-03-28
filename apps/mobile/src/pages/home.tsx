import { useRef } from "react";
import HeroSection from "@carveri/shared/components/home-page/HeroSection.tsx";
import VinFormSection from "@carveri/shared/components/home-page/VinFormSection.tsx";
import ExamplesSlider from "@carveri/shared/components/home-page/ExamplesSlider.tsx";
import StatsBar from "@carveri/shared/components/home-page/StatsBar.tsx";
import Features from "@carveri/shared/components/home-page/Features.tsx";
import AIAnalysis from "@carveri/shared/components/home-page/AIAnalysis.tsx";
import HowItWorks from "@carveri/shared/components/home-page/HowItWorks.tsx";
import ReportSample from "@carveri/shared/components/home-page/ReportSample.tsx";
import PricingSection from "@carveri/shared/components/home-page/PricingSection.tsx";
import FaqSection from "@carveri/shared/components/home-page/FaqSection.tsx";
import FinalCta from "@carveri/shared/components/home-page/FinalCta.tsx";
import Footer from "@carveri/shared/components/home-page/Footer.tsx";
import StickyMobileBar from "@carveri/shared/components/home-page/StickyMobileBar.tsx";
import WsFab from "@carveri/shared/components/home-page/WsFab.tsx";

export default function CarVeriLanding() {
  const vinFormRef = useRef<HTMLElement>(null);

  const scrollToVinForm = () => {
    vinFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => vinFormRef.current?.focus(), 600);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ VIN FORM SECTION ═══ */}
      <VinFormSection formRef={vinFormRef} />

      {/* ═══ CARCHECK EXAMPLES SLIDER ═══ */}
      <ExamplesSlider />

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ FEATURES ═══ */}
      <Features />

      {/* ═══ AI ANALYSIS SECTION ═══ */}
      <AIAnalysis />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks />

      {/* ═══ REPORT SAMPLE ═══ */}
      <ReportSample scrollToVinForm={scrollToVinForm} />

      {/* ═══ PRICING ═══ */}
      <PricingSection scrollToVinForm={scrollToVinForm} />

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCta scrollToVinForm={scrollToVinForm} />

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ STICKY MOBILE BAR ═══ */}
      <StickyMobileBar scrollToVinForm={scrollToVinForm} />

      {/* ═══ WhatsApp FAB ═══ */}
      <WsFab />
    </div>
  );
}
