import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import translationAR from "./ar/translation.json";
import translationEN from "./en/translation.json";

i18n.use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init({
    resources: {
      en: {
        translations: translationEN,
      },
      ar: {
        translations: translationAR,
      },
    },
    fallbackLng: "en",
    debug: false,
    saveMissing: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".",
    load: "languageOnly",

    interpolation: {
      escapeValue: false,
    },
  });
}
export default i18n;
