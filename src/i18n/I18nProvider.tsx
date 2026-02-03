import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { STRINGS, Lang } from "./strings";

interface I18nContextType {
  locale: Lang;
  setLocale: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getByPath(obj: any, path: string): any {
  if (!obj) return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function applyMyanmarFont(lang: Lang) {
  const isMy = lang === "my";
  document.documentElement.classList.toggle("lang-mm", isMy);
  document.documentElement.setAttribute("lang", isMy ? "my" : "en");
}

export const I18nProvider = ({
  children,
  defaultLocale = "en",
}: {
  children: ReactNode;
  defaultLocale?: Lang;
}) => {
  const [locale, setLocaleState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    return saved === "en" || saved === "my" ? (saved as Lang) : defaultLocale;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("lang", locale);
    } catch {}
    applyMyanmarFont(locale);
  }, [locale]);

  const setLocale = (lang: Lang) => setLocaleState(lang);

  const t = useMemo(() => {
    return (key: string): string => {
      try {
        const translations = (STRINGS as any)[locale];
        const v = getByPath(translations, key);
        return typeof v === "string" ? v : key;
      } catch (e) {
        console.error("I18n Runtime Crash Prevented:", e);
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
