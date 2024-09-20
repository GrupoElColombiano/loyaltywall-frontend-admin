// ReactJS & I18n
import React, { createContext, useState } from "react";
import i18n from "../../i18n/i18n";

// Services
import {api}  from "../../service/api";

interface LanguageContextValue {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

interface LanguageProviderProps {
    children: React.ReactNode;
}

export const LanguageContext = createContext<LanguageContextValue>({
    language: "es",
    changeLanguage: (newLanguage: string) => {
        i18n.changeLanguage(newLanguage);
    },
});

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState("es");

    const changeLanguage = (newLanguage: string) => {
        api.defaults.headers.common["Accept-Language"] = language;
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
