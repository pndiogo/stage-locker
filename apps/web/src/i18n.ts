import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const detectionOptions = {
  order: ["localStorage", "htmlTag", "navigator"],
  caches: ["localStorage"],
  lookupLocalStorage: "stage-locker-lng",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    detection: detectionOptions,
  });

export default i18n;

export const supportedLanguages = [
  { code: "en-US", name: "English", shortName: "EN" },
  { code: "pt-PT", name: "Português", shortName: "PT" },
];
