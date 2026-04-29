import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import CheckoutPage from "@/pages/CheckoutPage.tsx";
import CarVeriLanding from "@/pages/home.tsx";
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
import {
  checkoutLoader,
  dashboardLoader,
  redirectIfAuthLoader,
  reportLoader,
} from "@carveri/shared/data/loaders.ts";
import {
  deleteAccountAction,
  loginAction,
  logoutAction,
  registerAction,
} from "@carveri/shared/data/actions.ts";
import ResumenSection from "@/pages/report-sections/ResumenSection.tsx";
import TimelineSection from "@/pages/report-sections/TimelineSection.tsx";
import AuctionHistorySection from "@/pages/report-sections/AuctionHistorySection.tsx";
import PastSalesSection from "@/pages/report-sections/PastSalesSection.tsx";
import AccidentsSection from "@/pages/report-sections/AccidentsSection.tsx";
import OwnersSection from "@/pages/report-sections/OwnersSection.tsx";
import ServiceSection from "@/pages/report-sections/ServiceSection.tsx";
import TitleSection from "@/pages/report-sections/TitleSection.tsx";
import MarketSection from "@/pages/report-sections/MarketSection.tsx";
import DiagnosisSection from "@/pages/report-sections/DiagnosisSection.tsx";
import RisksSection from "@/pages/report-sections/RisksSection.tsx";
import InspectionSection from "@/pages/report-sections/InspectionSection.tsx";
import ValuationSection from "@/pages/report-sections/ValuationSection.tsx";
import StrategySection from "@/pages/report-sections/StrategySection.tsx";
import ArgumentsSection from "@/pages/report-sections/ArgumentsSection.tsx";
import CostsSection from "@/pages/report-sections/CostsSection.tsx";
import UserArea from "@/pages/UserArea.tsx";
import Dashboard from "@/pages/user-area-sections/Dashboard.tsx";
import Reports from "@/pages/user-area-sections/Reports.tsx";
import BuyReports from "@/pages/user-area-sections/BuyReports.tsx";
import Transactions from "@/pages/user-area-sections/Transactions.tsx";
import Settings from "@/pages/user-area-sections/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CarVeriLanding /> },
      {
        path: "login",
        element: <Login />,
        loader: redirectIfAuthLoader,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        loader: redirectIfAuthLoader,
        action: registerAction,
      },
      {
        id: "dashboard",
        path: "dashboard",
        element: <UserArea />,
        loader: dashboardLoader,
        children: [
          {
            id: "dashboard-index",
            index: true,
            element: <Dashboard />,
          },
          {
            id: "reports",
            path: "reports",
            element: <Reports />,
          },
          {
            id: "buy-credits",
            path: "buy-credits",
            element: <BuyReports />,
          },
          {
            id: "transactions",
            path: "transactions",
            element: <Transactions />,
          },
          {
            id: "settings",
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      { path: "logout", action: logoutAction },
      { path: "delete-account", action: deleteAccountAction },
      { path: "checkout", element: <CheckoutPage />, loader: checkoutLoader },
      {
        id: "report",
        path: "reports/:id",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.id}/overview`),
          },
          { path: "overview", element: <ResumenSection /> },
          { path: "timeline", element: <TimelineSection /> },
          { path: "auction-history", element: <AuctionHistorySection /> },
          { path: "past-sales", element: <PastSalesSection /> },
          { path: "accidents", element: <AccidentsSection /> },
          { path: "owners", element: <OwnersSection /> },
          { path: "service", element: <ServiceSection /> },
          { path: "title", element: <TitleSection /> },
          { path: "analysis", element: <MarketSection /> },
          { path: "price-dynamics", element: <MarketSection /> },
          { path: "comparables", element: <MarketSection /> },
          { path: "diagnosis", element: <DiagnosisSection /> },
          { path: "risks", element: <RisksSection /> },
          { path: "inspection", element: <InspectionSection /> },
          { path: "valuation", element: <ValuationSection /> },
          { path: "strategy", element: <StrategySection /> },
          { path: "arguments", element: <ArgumentsSection /> },
          { path: "costs", element: <CostsSection /> },
        ],
      },
    ],
  },
]);

export default router;
