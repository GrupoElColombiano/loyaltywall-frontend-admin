// ReactJS & I18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import EN from "./translations/en.json";
import ES from "./translations/es.json";

i18n.use(initReactI18next).init({
    debug: false,
    fallbackLng: "es",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        es: {
            translation: ES,
        },
        en: {
            translation: EN,
        },
    },
});

export default i18n;
