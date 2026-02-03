// src/i18n/LanguageSwitcher.tsx
import React from "react";
import { useI18n } from "./I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex items-center rounded-xl border bg-white p-1"
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={[
          "rounded-lg px-2.5 py-1 text-xs font-extrabold",
          locale === "en" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50",
        ].join(" ")}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLocale("my")}
        className={[
          "rounded-lg px-2.5 py-1 text-xs font-extrabold",
          locale === "my" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50",
        ].join(" ")}
      >
        MY
      </button>
    </div>
  );
}

