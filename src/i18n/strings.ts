/**
 * Ensure 'STRINGS' is a named export for I18nProvider
 */
export const STRINGS = {
  en: {
    "Synchronizing Portal...": "Synchronizing Portal...",
    "Loading Profile...": "Loading Profile...",
    // ... add other keys used in your components
  },
  my: {
    "Synchronizing Portal...": "စနစ်အား ချိတ်ဆက်နေပါသည်...",
    "Loading Profile...": "အချက်အလက်များ ရယူနေပါသည်...",
    // ... add Myanmar translations
  }
} as const;

export type Lang = keyof typeof STRINGS;