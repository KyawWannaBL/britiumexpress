// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import my from "./my.json";

// Minimal EN bundle (expand over time)
const en = {
  common: {
    dashboard: "Dashboard",
    shipments: "Shipments",
    users: "Users",
    settings: "Settings",
    loading: "Loading...",
    language: "Language",
  },
  admin: {},
  merchant: {},
};

const saved = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
  resources: { en, my },
  lng: saved === "my" ? "my" : "en",
  fallbackLng: "en",
  supportedLngs: ["en", "my"],
  ns: ["common", "admin", "merchant"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

export default i18n;
export type Lang = "en" | "my";
