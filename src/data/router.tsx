import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";
import TestRouter from "@/pages/test-router.tsx";
import RootLayout from "@/layout/root.tsx";
import TestForm from "@/pages/test-form.tsx";
import TestLightbox from "@/pages/test-lightbox.tsx";
import VehicleDetail from "@/pages/vehicle-details.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "reports", element: <VehicleDetail /> },
      {
        path: "test-router",
        element: <TestRouter />,
      },
      {
        path: "test-form",
        element: <TestForm />,
      },
      {
        path: "test-lightbox",
        element: <TestLightbox />,
      },
    ],
  },
]);

export default router;
