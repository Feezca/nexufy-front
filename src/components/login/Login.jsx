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

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const loginFields = [
    {
      id: "username",
      label: "Nombre de Usuario",
      type: "text",
      placeholder: "Ingresa tu nombre de usuario",
      image: loginImage,
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
    },
  ];

  const formatSuspensionTime = (suspensionDateTime) => {
    const dateTime = new Date(suspensionDateTime);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  const handleLoginSubmit = async (formData) => {
    try {
      const result = await loginService(formData);
      handleLogin(result);
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.message.includes("suspendida")) {
        const suspensionTime = error.message.split("hasta")[1].trim();
        const { formattedDate, formattedTime } =
          formatSuspensionTime(suspensionTime);

        let timerInterval;
        Swal.fire({
          icon: "error",
          title: "Cuenta suspendida",
          html: `<p>Tu cuenta está suspendida hasta:</p>
                 <p>Fecha: ${formattedDate}</p>
                 <p>Hora: ${formattedTime}</p>`,
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            const content = Swal.getHtmlContainer();
            const timerDisplay = document.createElement("p");
            content.appendChild(timerDisplay);

            timerInterval = setInterval(() => {
              const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
              timerDisplay.textContent = `Redirigiendo al home en ${timeLeft}...`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
            navigate("/");
          },
        });
      } else {
        setErrorMessage(
          "Error al iniciar sesión. Por favor, verifica tus credenciales."
        );
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
          <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
        </Navbar.Brand>

        <div className="ms-auto">
          <ThemeToggle />
        </div>
      </Navbar>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
      <AuthForm
        title="Bienvenido de vuelta!"
        fields={loginFields}
        buttonText="Iniciar sesión"
        linkText="Registrarme"
        linkAction={handleRegisterRedirect}
        onSubmit={handleLoginSubmit}
        placeholderClass={darkMode ? "placeholder-dark" : "placeholder-light"}
      />
    </div>
  );
};

export default Login;
