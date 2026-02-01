import React from "react";
import { useI18n } from "./I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="inline-flex items-center rounded-xl border bg-white p-1" role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={[
          "rounded-lg px-2.5 py-1 text-xs font-extrabold",
          lang === "en" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50",
        ].join(" ")}
      >
        {t("lang.en")}
      </button>
      <button
        type="button"
        onClick={() => setLang("mm")}
        className={[
          "rounded-lg px-2.5 py-1 text-xs font-extrabold",
          lang === "mm" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50",
        ].join(" ")}
      >
        {t("lang.mm")}
      </button>
    </div>
  );
}
