// src/i18n/I18nProvider.tsx
import React, { ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { Lang } from "./i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export function useI18n() {
  const { t, i18n: inst } = useTranslation();
  const locale = (inst.language as Lang) || "en";

  const setLocale = (lang: Lang) => {
    localStorage.setItem("lang", lang);
    inst.changeLanguage(lang);
  };

  return { locale, setLocale, t };
}
