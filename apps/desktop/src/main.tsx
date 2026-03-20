import "@carveri/shared/lib/i18n"; // must be first — initializes i18next synchronously
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider as ThemeProviderComponent } from 'next-themes'
import router from "@/data/router.tsx";
import "./index.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ThemeProvider = ThemeProviderComponent as any;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
