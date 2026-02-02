/**
 * Bilingual dictionary for Myanmar-English support
 * Exported as named constant to resolve I18nProvider import
 */
export const STRINGS = {
  en: {
    loading: "Loading profile...",
    dashboard: "Dashboard",
  },
  my: {
    loading: "ခေတ္တစောင့်ဆိုင်းပါ...",
    dashboard: "စီမံခန့်ခွဲမှု",
  }
} as const;

export type Lang = keyof typeof STRINGS;