import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";
import ReportError from "@/pages/ReportError.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import CarVeriLanding from "@/pages/home.tsx";
import { reportLoader } from "@carveri/shared/data/loaders.ts";

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
