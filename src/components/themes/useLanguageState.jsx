import { useState, useEffect } from "react";
import translations from "./translations";

const useLanguageState = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));
  };

  const t = translations[language];

  return { language, toggleLanguage, t };
};

export default useLanguageState;
