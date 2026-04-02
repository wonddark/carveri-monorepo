import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Home from "@/pages/home.tsx";
import ReportError from "@/pages/report-error.tsx";
import RootError from "@/pages/root-error.tsx";
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
import ReportPage from "@/pages/ReportPage.tsx";
import { reportLoader } from "@carveri/shared/data/loaders.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "reports/:vin",
        element: <ReportPage />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
