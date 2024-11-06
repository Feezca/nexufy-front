import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import loginImage from "../../assets/img/undraw_Login_re_4vu2-removebg-preview.png";
import { loginService } from "../../api/authService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { Navbar } from "react-bootstrap";
import ThemeToggle from "../themes/ThemeToggle";
import { ThemeContext } from "../themes/ThemeContext";
import Swal from "sweetalert2";

// Importar useLanguage y LanguageToggle
import useLanguage from "../themes/useLanguage";
import LanguageToggle from "../themes/LanguageToggle";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  // Usar el hook useLanguage para obtener las traducciones
  const { t, language } = useLanguage();

  const loginFields = [
    {
      id: "username",
      label: t.usernameLabel,
      type: "text",
      placeholder: t.usernamePlaceholder,
      image: loginImage,
    },
    {
      id: "password",
      label: t.passwordLabel,
      type: "password",
      placeholder: t.passwordPlaceholder,
    },
  ];

  const formatSuspensionTime = (suspensionDateTime) => {
    const dateTime = new Date(suspensionDateTime);
    const formattedDate = dateTime.toLocaleDateString(language);
    const formattedTime = dateTime.toLocaleTimeString(language);
    return { formattedDate, formattedTime };
  };

  const handleLoginSubmit = async (formData) => {
    try {
      const result = await loginService(formData);
      handleLogin(result);
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "ACCOUNT_SUSPENDED") {
        const suspensionTime = error.suspensionUntil;
        const { formattedDate, formattedTime } =
          formatSuspensionTime(suspensionTime);

        let timerInterval;
        Swal.fire({
          icon: "error",
          title: t.accountSuspended,
          html: `<p>${t.accountSuspendedUntil}</p>
                 <p>${t.dateLabel}: ${formattedDate}</p>
                 <p>${t.timeLabel}: ${formattedTime}</p>`,
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            const content = Swal.getHtmlContainer();
            const timerDisplay = document.createElement("p");
            content.appendChild(timerDisplay);

            timerInterval = setInterval(() => {
              const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
              timerDisplay.textContent = `${t.redirectingHomeIn} ${timeLeft}...`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
            navigate("/");
          },
        });
      } else {
        setErrorMessage(t.loginErrorMessage);
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar className="px-3 py-2">
        <Navbar.Brand onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <img src={img} alt="Nexufy Logo" style={{ height: "80px" }} />
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </Navbar>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <AuthForm
        title={t.welcomeBack}
        fields={loginFields}
        buttonText={t.loginButtonText}
        linkText={t.registerLinkText}
        linkAction={handleRegisterRedirect}
        onSubmit={handleLoginSubmit}
        placeholderClass={darkMode ? "placeholder-dark" : "placeholder-light"}
      />
    </div>
  );
};

const MemoizedFooter = React.memo(Login);

export default MemoizedFooter;
