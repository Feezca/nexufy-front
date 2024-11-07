import React from "react";
import { Button } from "react-bootstrap";
import spanish from "../../assets/img/spanish.svg";
import english from "../../assets/img/english.svg";
import useLanguage from "./useLanguage";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      style={{ border: "none", backgroundColor: "transparent" }}
      className="me-3"
    >
      {language === "en" ? (
        <img src={spanish} alt="lenguaje español" style={{ height: "30px" }} />
      ) : (
        <img src={english} alt="lenguaje inglés" style={{ height: "30px" }} />
      )}
    </button>
  );
};

export default LanguageToggle;
