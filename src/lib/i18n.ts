import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Common namespace
import enCommon from "@/locales/en.json";
import esCommon from "@/locales/es.json";

// Home namespace
import enHome from "@/components/home/locales/en.json";
import esHome from "@/components/home/locales/es.json";

// Vehicle-details namespace
import enVehicleDetails from "@/components/vehicle-details/locales/en.json";
import esVehicleDetails from "@/components/vehicle-details/locales/es.json";

// History namespace
import enHistory from "@/components/history/locales/en.json";
import esHistory from "@/components/history/locales/es.json";

// Market namespace
import enMarket from "@/components/market/locales/en.json";
import esMarket from "@/components/market/locales/es.json";

// Negotiate namespace
import enNegotiate from "@/components/negotiate/locales/en.json";
import esNegotiate from "@/components/negotiate/locales/es.json";

// Verdict namespace
import enVerdict from "@/components/verdict/locales/en.json";
import esVerdict from "@/components/verdict/locales/es.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    defaultNS: "common",
    ns: ["common", "home", "vehicle-details", "history", "market", "negotiate", "verdict"],
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        "vehicle-details": enVehicleDetails,
        history: enHistory,
        market: enMarket,
        negotiate: enNegotiate,
        verdict: enVerdict,
      },
      es: {
        common: esCommon,
        home: esHome,
        "vehicle-details": esVehicleDetails,
        history: esHistory,
        market: esMarket,
        negotiate: esNegotiate,
        verdict: esVerdict,
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
