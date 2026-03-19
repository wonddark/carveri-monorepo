import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="p-8 text-lg font-semibold">
            CarVeri Desktop — coming soon
          </div>
        ),
      },
    ],
  },
]);

export default router;
