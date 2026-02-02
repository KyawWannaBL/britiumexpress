// src/i18n/I18nProvider.tsx  (persist + html lang + lang-my class)
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { STRINGS, Lang } from "./strings";

interface I18nContextType {
  locale: Lang;
  setLocale: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function safeReadLocale(defaultLocale: Lang): Lang {
  try {
    const stored = localStorage.getItem("be.locale");
    if (stored === "my" || stored === "en") return stored;
  } catch {}
  return defaultLocale;
}

function applyLocaleSideEffects(locale: Lang) {
  try {
    document.documentElement.lang = locale === "my" ? "my" : "en";
    document.documentElement.classList.toggle("lang-my", locale === "my");
  } catch {}

  try {
    localStorage.setItem("be.locale", locale);
  } catch {}
}

export const I18nProvider = ({
  children,
  defaultLocale = "en",
}: {
  children: ReactNode;
  defaultLocale?: Lang;
}) => {
  const [locale, setLocaleState] = useState<Lang>(() => safeReadLocale(defaultLocale));

  useEffect(() => {
    applyLocaleSideEffects(locale);
  }, [locale]);

  const setLocale = (lang: Lang) => setLocaleState(lang);

  const t = useMemo(() => {
    return (key: string): string => {
      try {
        const translations = STRINGS[locale] as any;
        return translations?.[key] || key;
      } catch (error) {
        console.error("I18n Runtime Error:", error);
        return key;
      }
    };
  }, [locale]);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
};
