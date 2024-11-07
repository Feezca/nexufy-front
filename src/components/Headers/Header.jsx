import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import headerImage from "../../assets/img/home-removebg-preview.png";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../themes/ThemeContext";
import useLanguage from "../themes/useLanguage";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage();

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <header
      className={`${
        darkMode ? "bg-dark text-light" : "bg-secundario text-dark"
      } py-4`}
    >
      <div className="container d-flex align-items-center">
        <img
          src={headerImage}
          alt="Nexufy Header"
          className="me-3"
          style={{ maxWidth: "150px" }}
        />
        <div className="flex-grow-1">
          <h1 className={`h4 ${darkMode ? "text-light" : "text-primary"}`}>
            {t.headerTitle}
          </h1>
          {!user ? (
            <div className="text-end mt-3">
              <button
                className={`btn btn-lg ${
                  darkMode ? "btn-outline-light" : "btn-outline-primary"
                }`}
                onClick={handleRegisterClick}
              >
                {t.registerButton}
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
