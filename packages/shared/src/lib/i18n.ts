import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Common namespace
import enCommon from "@carveri/shared/locales/en.json";
import esCommon from "@carveri/shared/locales/es.json";

// Home namespace
import enHome from "@carveri/shared/components/home/locales/en.json";
import esHome from "@carveri/shared/components/home/locales/es.json";

// Vehicle-details namespace
import enVehicleDetails from "@carveri/shared/components/vehicle-details/locales/en.json";
import esVehicleDetails from "@carveri/shared/components/vehicle-details/locales/es.json";

// History namespace
import enHistory from "@carveri/shared/components/history/locales/en.json";
import esHistory from "@carveri/shared/components/history/locales/es.json";

// Market namespace
import enMarket from "@carveri/shared/components/market/locales/en.json";
import esMarket from "@carveri/shared/components/market/locales/es.json";

// Negotiate namespace
import enNegotiate from "@carveri/shared/components/negotiate/locales/en.json";
import esNegotiate from "@carveri/shared/components/negotiate/locales/es.json";

// Verdict namespace
import enVerdict from "@carveri/shared/components/verdict/locales/en.json";
import esVerdict from "@carveri/shared/components/verdict/locales/es.json";

// Homepage namespace
import enHomePage from "@carveri/shared/components/home-page/locales/en.json";
import esHomePage from "@carveri/shared/components/home-page/locales/es.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    defaultNS: "common",
    ns: [
      "common",
      "home",
      "vehicle-details",
      "history",
      "market",
      "negotiate",
      "verdict",
      "homepage",
    ],
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        "vehicle-details": enVehicleDetails,
        history: enHistory,
        market: enMarket,
        negotiate: enNegotiate,
        verdict: enVerdict,
        homepage: enHomePage,
      },
      es: {
        common: esCommon,
        home: esHome,
        "vehicle-details": esVehicleDetails,
        history: esHistory,
        market: esMarket,
        negotiate: esNegotiate,
        verdict: esVerdict,
        homepage: esHomePage,
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
