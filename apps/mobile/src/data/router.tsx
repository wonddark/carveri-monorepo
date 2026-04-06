import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import RootError from "@/pages/root-error.tsx";
import Login from "@/pages/login.tsx";
import Register, { action as registerAction } from "@/pages/register.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import {
  redirectIfAuthLoader,
  reportLoader,
} from "@carveri/shared/data/loaders.ts";
import HomeTabSection from "@/pages/report-tabs/HomeTabSection.tsx";
import HistoryTabSection from "@/pages/report-tabs/HistoryTabSection.tsx";
import MarketTabSection from "@/pages/report-tabs/MarketTabSection.tsx";
import VerdictTabSection from "@/pages/report-tabs/VerdictTabSection.tsx";
import NegotiateTabSection from "@/pages/report-tabs/NegotiateTabSection.tsx";
import { loginAction } from "@carveri/shared/data/actions.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
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
        id: "report",
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        shouldRevalidate: () => false,
        errorElement: <ReportError />,
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/reports/${params.vin}/home`),
          },
          { path: "home", element: <HomeTabSection /> },
          { path: "history", element: <HistoryTabSection /> },
          { path: "market", element: <MarketTabSection /> },
          { path: "verdict", element: <VerdictTabSection /> },
          { path: "negotiate", element: <NegotiateTabSection /> },
        ],
      },
    ],
  },
]);

export default router;
