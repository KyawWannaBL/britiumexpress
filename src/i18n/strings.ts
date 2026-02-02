/**
 * Bilingual String Dictionary (MM-ENG)
 * Named export required for build resolution
 */
export const STRINGS = {
  en: {
    dashboard: "Dashboard",
    login: "Login",
    logout: "Logout",
    welcome: "Welcome to Britium Express",
    pending: "Pending Approval",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading..."
  },
  my: {
    dashboard: "စီမံခန့်ခွဲမှု",
    login: "အကောင့်ဝင်ရန်",
    logout: "အကောင့်ထွက်ရန်",
    welcome: "Britium Express မှ ကြိုဆိုပါသည်",
    pending: "ခွင့်ပြုချက်စောင့်ဆိုင်းဆဲ",
    save: "သိမ်းဆည်းရန်",
    cancel: "ပယ်ဖျက်ရန်",
    loading: "ခေတ္တစောင့်ဆိုင်းပါ..."
  }
} as const;

export type Lang = keyof typeof STRINGS;