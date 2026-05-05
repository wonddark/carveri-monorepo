import { Outlet } from "react-router";
import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";
import { TooltipProvider } from "@carveri/shared/components/ui/tooltip.tsx";
import { useEffect } from "react";
import { getFingerprint } from "@carveri/shared/lib/utils";

export default function RootLayout() {
  useEffect(() => {
    let fingerprint: string | null;
    fingerprint = localStorage.getItem("carveri-fp");
    if (!fingerprint) {
      (async () => {
        fingerprint = await getFingerprint();
        localStorage.setItem("carveri-fp", fingerprint);
      })();
    }
  }, []);

  return (
    <div className="min-h-screen">
      <TooltipProvider>
        <Outlet />
        <Toaster />
      </TooltipProvider>
    </div>
  );
}
