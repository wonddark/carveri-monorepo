import { Outlet } from "react-router";
import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
      <Toaster />
    </div>
  );
}
