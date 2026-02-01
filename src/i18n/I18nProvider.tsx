import React from "react";
import type { Lang } from "./strings";
import { STRINGS } from "./strings";

type I18nState = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const Ctx = React.createContext<I18nState | null>(null);

function initLang(): Lang {
  try {
    const saved = localStorage.getItem("britium_lang");
    return saved === "mm" ? "mm" : "en";
  } catch {
    return "en";
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(initLang);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("britium_lang", l);
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback((k: string) => STRINGS[lang]?.[k] ?? STRINGS.en?.[k] ?? k, [lang]);

  React.useEffect(() => {
    const el = document.documentElement;
    const isMm = lang === "mm";
    el.lang = isMm ? "my" : "en";
    el.dataset.lang = lang;
    el.classList.toggle("lang-mm", isMm);
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}
