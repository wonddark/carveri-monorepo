import { createBrowserRouter, Navigate } from "react-router";
import ReportPage from "@/pages/ReportPage";
import { reportLoader } from "@/data/loader";

const MOCK_VIN = "1FMCU9GX0DUA27119";

const router = createBrowserRouter([
  {
    path: "/reports/:vin",
    element: <ReportPage />,
    loader: reportLoader,
    errorElement: (
      <div style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h2>Error loading report</h2>
      </div>
    ),
  },
  {
    path: "*",
    element: <Navigate to={`/reports/${MOCK_VIN}`} replace />,
  },
]);

export default router;
