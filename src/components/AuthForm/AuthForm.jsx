import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

const AuthForm = ({
  title,
  fields,
  buttonText,
  linkText,
  linkAction,
  onSubmit,
  errorMessage, // Recibir el mensaje de error como prop
}) => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    onSubmit(data);
  };

  return (
    <div
      className={`d-flex align-items-center vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container">
        <div className="row">
          <div
            className={`col-md-6 d-flex flex-column justify-content-center p-5 ${
              darkMode ? "bg-secondary text-light" : "bg-light text-dark"
            }`}
          >
            <h2 className="mb-4">{title}</h2>
            <form onSubmit={handleSubmit}>
              {fields.map((field, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className={`form-control ${
                      darkMode ? "bg-dark text-light" : ""
                    }`} // Cambiar el estilo del input según el tema
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    style={{
                      borderColor: darkMode ? "#ced4da" : "", // Cambiar el borde según el tema
                    }}
                    // Agregar el atributo autoComplete para el campo de contraseña
                    autoComplete={
                      field.type === "password" ? "current-password" : undefined
                    }
                  />
                </div>
              ))}

              {/* Mostrar mensaje de error debajo de Nombre de Usuario si existe */}
              {errorMessage && (
                <div className="mb-3">
                  <p className="text-danger">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                className={`btn ${
                  darkMode ? "btn-outline-light" : "btn-primary"
                } w-100 mb-3`}
              >
                {buttonText}
              </button>
            </form>
            <div className="text-center">
              <button
                className={`btn btn-link ${
                  darkMode ? "text-light" : "text-dark"
                }`}
                onClick={linkAction}
              >
                {linkText}
              </button>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
            <img src={fields[0].image} alt={title} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Definir PropTypes
AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string, // Definir el prop de errorMessage
};

export default AuthForm;
