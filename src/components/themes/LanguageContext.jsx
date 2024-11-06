import React, { createContext } from "react";
import useLanguageState from "./useLanguageState"; // Importar el nuevo hook

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { language, toggleLanguage, t } = useLanguageState(); // Usar el hook para obtener el estado

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
