// src/i18n/strings.ts
export const STRINGS = {
  en: {
    loading: "Loading...",
    "Synchronizing Portal...": "Synchronizing Portal...",
    "Loading Profile...": "Loading Profile..."
  },
  my: {
    loading: "ခေတ္တစောင့်ဆိုင်းပါ...",
    "Synchronizing Portal...": "စနစ်အား ချိတ်ဆက်နေပါသည်...",
    "Loading Profile...": "အချက်အလက်များ ရယူနေပါသည်..."
  }
} as const;

export type Lang = keyof typeof STRINGS;