import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { ru } from "./langs/ru";
import { en } from "./langs/en";
import { LOCALS } from "./constans";

const resources = {
  [LOCALS.EN]: {
    translation: en
  },
  [LOCALS.RU]: {
    translation: ru
  }
};

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
  })

export default i18n;