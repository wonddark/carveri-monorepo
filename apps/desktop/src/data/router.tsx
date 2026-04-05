import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import CarVeriLanding from "@/pages/home.tsx";
import { reportLoader } from "@carveri/shared/data/loaders.ts";
import ResumenSection from "@/pages/report-sections/ResumenSection.tsx";
import TimelineSection from "@/pages/report-sections/TimelineSection.tsx";
import AuctionPhotosSection from "@/pages/report-sections/AuctionPhotosSection.tsx";
import AccidentsSection from "@/pages/report-sections/AccidentsSection.tsx";
import OwnersSection from "@/pages/report-sections/OwnersSection.tsx";
import ServiceSection from "@/pages/report-sections/ServiceSection.tsx";
import TitleSection from "@/pages/report-sections/TitleSection.tsx";
import MarketSection from "@/pages/report-sections/MarketSection.tsx";
import VerdictAiSection from "@/pages/report-sections/VerdictAiSection.tsx";
import ChecklistSection from "@/pages/report-sections/ChecklistSection.tsx";
import StrategySection from "@/pages/report-sections/StrategySection.tsx";
import ArgumentsSection from "@/pages/report-sections/ArgumentsSection.tsx";
import CostsSection from "@/pages/report-sections/CostsSection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CarVeriLanding /> },
      {
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/overview`),
          },
          { path: "overview", element: <ResumenSection /> },
          { path: "timeline", element: <TimelineSection /> },
          { path: "auction-photos", element: <AuctionPhotosSection /> },
          { path: "accidents", element: <AccidentsSection /> },
          { path: "owners", element: <OwnersSection /> },
          { path: "service", element: <ServiceSection /> },
          { path: "title", element: <TitleSection /> },
          { path: "analysis", element: <MarketSection /> },
          { path: "price-dynamics", element: <MarketSection /> },
          { path: "comparables", element: <MarketSection /> },
          { path: "verdict_ai", element: <VerdictAiSection /> },
          { path: "checklist", element: <ChecklistSection /> },
          { path: "strategy", element: <StrategySection /> },
          { path: "arguments", element: <ArgumentsSection /> },
          { path: "costs", element: <CostsSection /> },
        ],
      },
    ],
  },
]);

export default router;
