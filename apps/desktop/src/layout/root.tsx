import { Outlet } from "react-router";
import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";
import { TooltipProvider } from "@carveri/shared/components/ui/tooltip.tsx";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <TooltipProvider>
        <Outlet />
        <Toaster />
      </TooltipProvider>
    </div>
  );
}
