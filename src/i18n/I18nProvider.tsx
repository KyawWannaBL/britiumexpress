import React, { createContext, useContext, useState, ReactNode } from "react";
import { STRINGS, Lang } from "./strings"; 

interface I18nContextType {
  locale: Lang;
  setLocale: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children, defaultLocale = "en" }: { children: ReactNode; defaultLocale?: Lang }) => {
  const [locale, setLocale] = useState<Lang>(defaultLocale);

  const t = (key: string): string => {
    try {
      // Ensure STRINGS and the specific locale exist before accessing
      const translations = (STRINGS as any)[locale];
      return translations?.[key] || key; 
    } catch (e) {
      console.error("I18n Runtime Crash Prevented:", e);
      return key; // Prevents the white screen by returning raw text
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