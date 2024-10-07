import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Importar íconos de sol y luna

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        marginRight: "1rem",
        strokeWidth: "200",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {darkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
