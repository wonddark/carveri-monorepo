import { createBrowserRouter } from "react-router";
import App from "@/App.tsx";
import Test from "@/pages/test.tsx";
import RootLayout from "@/layout/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);

export default router;
