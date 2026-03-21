import "@carveri/shared/lib/i18n"; // must be first — initializes i18next synchronously
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import router from "@/data/router.tsx";
import "./index.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// next-themes ThemeProviderProps extends React.PropsWithChildren, but pnpm resolves
// next-themes' 'react' peer to a separate type instance, causing a false 'children'
// prop error under moduleResolution:bundler + @types/react v19.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeProvider = NextThemesProvider as any;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
