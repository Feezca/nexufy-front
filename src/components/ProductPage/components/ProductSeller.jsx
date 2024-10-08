import React, { useContext } from "react";
import img from "../../../assets/img/undraw_factory_dy0a-removebg-preview.png";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const ProductSeller = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  return (
    <div
      className={`container rounded border border-dark-subtle border-2 mb-4 p-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`} // Aplicar clases según el modo
      style={{ height: "auto" }}
    >
      <div className="d-flex">
        <div className="d-flex w-50 flex-column justify-content-between">
          <p className={`fw-semibold ${darkMode ? "text-light" : "text-dark"}`}>
            Información del vendedor
          </p>
          {user ? (
            <div className="d-flex flex-column justify-content-between h-100">
              <p
                className={`fs-3 fw-medium ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                Carlos López{" "}
                <i className="bi bi-star-fill text-primary-custom me-1"></i>
                <i className="bi bi-star-fill text-primary-custom me-1"></i>
                <i className="bi bi-star-fill text-primary-custom"></i>
              </p>

              {/* Actualización de los textos de contacto, ventas y envíos */}
              <p
                className={`fw-semibold ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                Lo han contactado 25 veces
              </p>
              <p
                className={`fw-semibold ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                +20 ventas realizadas
              </p>
              <p
                className={`fw-semibold ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                Realiza envíos a todo el país
              </p>

              <a
                href=""
                className={`fw-semibold ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                Ver más productos de este vendedor →
              </a>
            </div>
          ) : (
            <div className="d-flex h-100 flex-column justify-content-center">
              <p className={darkMode ? "text-light" : "text-dark"}>
                Debes iniciar sesión para ver información del vendedor
              </p>
            </div>
          )}
        </div>
        <div className="d-flex flex-column align-center justify-content-center">
          <img
            src={img}
            style={{ height: "auto" }}
            className="mx-auto"
            alt="Imagen del vendedor"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSeller;
