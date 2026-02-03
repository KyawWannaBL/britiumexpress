export const STRINGS = {
  en: {
    Language: "Language",
    Services: "Services",
    About: "About",
    Contact: "Contact",
    "Log in": "Log in",
    Dashboard: "Dashboard",

    "auth.signin": "Sign in",
    "auth.portalTitle": "Portal",
    Email: "Email",
    Password: "Password",

    loading: "Loading...",
  },
  my: {
    Language: "ဘာသာစကား",
    Services: "ဝန်ဆောင်မှုများ",
    About: "အကြောင်း",
    Contact: "ဆက်သွယ်ရန်",
    "Log in": "ဝင်ရန်",
    Dashboard: "ဒက်ရှ်ဘုတ်",

    "auth.signin": "ဝင်ရောက်ရန်",
    "auth.portalTitle": "ပေါ်တယ်",
    Email: "အီးမေးလ်",
    Password: "စကားဝှက်",

    loading: "ခေတ္တစောင့်ဆိုင်းပါ...",
  },
} as const;

export type Lang = keyof typeof STRINGS;
