import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { SITE } from '../config/site';
import en from './locales/en.json';
import uk from './locales/uk.json';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: SITE.defaultLocale,
    supportedLngs: SITE.supportedLocales,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.resolvedLanguage || SITE.defaultLocale;
}

export default i18n;
