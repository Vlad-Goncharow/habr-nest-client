import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { LOCALS } from './constans'
import { en } from './langs/en'
import { ru } from './langs/ru'
import { ua } from './langs/ua'

const resources = {
  [LOCALS.EN]: {
    translation: en,
  },
  [LOCALS.RU]: {
    translation: ru,
  },
  [LOCALS.UA]: {
    translation: ua,
  },
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ua',

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
