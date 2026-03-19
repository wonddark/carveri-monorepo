import type { LoaderFunctionArgs } from "react-router";
import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Report from "@/pages/report.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import RootError from "@/pages/root-error.tsx";
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
import { fetchVehicleReport } from "@carveri/shared/data/api.ts";
import ReportPage from "@/pages/ReportPage.tsx";

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  return fetchVehicleReport(params.vin);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "reports/:vin",
        element: <Report />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
      {
        path: "reports-v2/:vin",
        element: <ReportPage />,
        errorElement: <ReportError />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
