import React, { createContext } from "react";
import useLanguageState from "./useLanguageState";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { language, toggleLanguage, t } = useLanguageState();

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
