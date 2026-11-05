// 🌍 Library imports
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// 📁 Translation files
import en from "./translations/en.json"
import fr from "./translations/fr.json"

/**
 * Initialize i18next for internationalization (i18n) in the app.
 *
 * Loads translations for supported languages and configures React integration.
 *
 * - `resources`: Object containing translation files for each language.
 * - `lng`: Default language of the app.
 * - `fallbackLng`: Language to use if the current language key is missing.
 * - `interpolation.escapeValue`: Disable escaping because React handles it safely.
 *
 * @module i18n
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    fallbackLng: "en",
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng
})

export default i18n
