import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";
import Report from "@/pages/report.tsx";
import Home from "@/pages/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "reports/:vin", element: <Report /> },
    ],
  },
]);

export default router;
