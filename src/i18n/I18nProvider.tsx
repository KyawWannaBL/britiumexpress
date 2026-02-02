import React, { createContext, useContext, useState, ReactNode } from "react";
import { STRINGS, Lang } from "./strings"; // Ensure strings.ts uses 'export const STRINGS'

interface I18nContextType {
  locale: Lang;
  setLocale: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children, defaultLocale = "en" }: { children: ReactNode; defaultLocale?: Lang }) => {
  const [locale, setLocale] = useState<Lang>(defaultLocale);

  // Safety translation function to prevent white screen crashes
  const t = (key: string): string => {
    try {
      const translations = STRINGS[locale] as any;
      return translations[key] || key;
    } catch (error) {
      console.error("I18n Error:", error);
      return key; // Return raw key instead of crashing
    }
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
};