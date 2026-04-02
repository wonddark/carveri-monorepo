import type { AppReport, SectionId } from "@/types/app-report";
import ResumenView from "@/components/views/ResumenView";
import TimelineView from "@/components/views/TimelineView";
import AuctionPhotosView from "@/components/views/AuctionPhotosView";
import AccidentsView from "@/components/views/AccidentsView";
import OwnersView from "@/components/views/OwnersView";
import ServiceView from "@/components/views/ServiceView";
import TitleView from "@/components/views/TitleView";
import MarketView from "@/components/views/MarketView";
import VerdictAIView from "@/components/views/VerdictAIView";
import ChecklistView from "@/components/views/ChecklistView";
import StrategyView from "@/components/views/StrategyView";
import ArgumentsView from "@/components/views/ArgumentsView";
import CostsView from "@/components/views/CostsView";

interface Props {
  report: AppReport;
  activeSection: SectionId;
}

export default function MainContent({ report, activeSection }: Props) {
  switch (activeSection) {
    case "resumen":
      return <ResumenView report={report} />;
    case "timeline":
      return <TimelineView items={report.historyTab.timeline} />;
    case "fotos-subasta":
      return <AuctionPhotosView photos={report.historyTab.auctionPhotos} />;
    case "accidentes":
      return <AccidentsView accidents={report.historyTab.accidents} />;
    case "duenos":
      return <OwnersView owners={report.historyTab.owners} />;
    case "servicio":
      return <ServiceView records={report.historyTab.service} />;
    case "titulo":
      return <TitleView title={report.historyTab.title} />;
    case "mercado":
      return <MarketView market={report.market} />;
    case "verdict-ai":
      return <VerdictAIView report={report} />;
    case "checklist":
      return <ChecklistView items={report.verdictTab.checklist} />;
    case "estrategia":
      return <StrategyView strategy={report.negotiate.strategy} />;
    case "argumentos":
      return <ArgumentsView args={report.negotiate.arguments} />;
    case "costos":
      return <CostsView costs={report.negotiate.costs} />;
  }
}
