import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import img from "../../assets/img/nexufy-horizontal-png.png";
import registerImage from "../../assets/img/undraw_online_ad_re_ol62-removebg-preview.png";
import { registerService } from "../../api/authService";
import { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import ThemeToggle from "../themes/ThemeToggle"; // Importar el componente de sol y luna
import { ThemeContext } from "../themes/ThemeContext"; // Importar el contexto del tema

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const { darkMode } = useContext(ThemeContext); // Obtener el modo actual desde el contexto

  const registerFields = [
    {
      id: "username",
      label: "Nombre de Usuario",
      type: "text",
      placeholder: "Ingresa tu nombre de usuario",
      image: registerImage,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Ingresa tu email",
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
    },
  ];

  const handleRegister = async (formData) => {
    try {
      await registerService(formData);
      setIsRegistered(true);
      setErrorMessage("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Error al registrarse: " + error.message);
      setErrorMessage(
        "Error al registrarse. Por favor, verifica tus datos e intenta nuevamente."
      );
      setIsRegistered(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <Navbar className="px-3 py-2">
        <Navbar.Brand onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <img src={img} alt="Nexufy Logo" style={{ height: "120px" }} />
        </Navbar.Brand>

        {/* Botón de cambio de tema (sol y luna) */}
        <div className="ms-auto">
          <ThemeToggle />
        </div>
      </Navbar>
      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}{" "}
      {/* Mensaje de éxito */}
      {isRegistered && (
        <div className="alert alert-success text-center" role="alert">
          <h4 className="alert-heading">¡Bien hecho!</h4>
          <p>
            Te has registrado exitosamente. Redirigiendo al inicio de sesión...
          </p>
        </div>
      )}
      <AuthForm
        title="Crea tu cuenta"
        fields={registerFields}
        buttonText="Registrarme"
        linkText="Iniciar sesión"
        linkAction={handleLoginRedirect}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
