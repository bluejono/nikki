import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export type Language = "pt" | "en";

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

const language = deviceLanguage.startsWith("pt") ? "pt" : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
