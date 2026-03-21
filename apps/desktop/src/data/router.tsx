import type { LoaderFunctionArgs } from "react-router";
import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import { fetchVehicleReport } from "@carveri/shared/data/api";
import { transformToSharedReport } from "@/lib/transforms";
import CarVeriLanding from "@/pages/home.tsx";

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response("Not Found", { status: 404 });
  if (!import.meta.env.VITE_API_URL)
    throw new Response("API not configured", { status: 503 });
  const raw = await fetchVehicleReport(params.vin);
  return transformToSharedReport(raw);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <CarVeriLanding />,
      },
      {
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
]);

export default router;
