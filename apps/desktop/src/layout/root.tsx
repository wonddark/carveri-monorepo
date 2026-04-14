import { Outlet } from "react-router";
import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <Toaster />
    </div>
  );
}
