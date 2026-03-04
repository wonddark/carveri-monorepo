import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";
import TestRouter from "@/pages/test-router.tsx";
import RootLayout from "@/layout/root.tsx";
import TestForm from "@/pages/test-form.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "test-router",
        element: <TestRouter />,
      },
      {
        path: "test-form",
        element: <TestForm />,
      },
    ],
  },
]);

export default router;
