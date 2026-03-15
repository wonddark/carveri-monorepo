import { createBrowserRouter } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Report from "@/pages/report.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import { fetchVehicleReport } from "@/data/api.ts";

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  return fetchVehicleReport(params.vin);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "reports/:vin",
        element: <Report />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
]);

export default router;
