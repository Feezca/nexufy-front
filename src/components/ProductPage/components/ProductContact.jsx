import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const ProductContact = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  return (
    <div>
      <Col>
        <Row>
          <p
            className={`fw-medium fs-5 ${
              darkMode ? "text-light" : "text-dark"
            }`}
          >
            Contactar al vendedor
          </p>
        </Row>
        {user ? (
          <div>
            <Row>
              <Col>
                <button className="btn btn-outline-primary shadow rounded-pill w-100">
                  <i className="bi bi-whatsapp text-primary-custom"></i>
                </button>
              </Col>
              <Col>
                <button className="btn btn-outline-primary shadow rounded-pill w-100">
                  <i className="bi bi-envelope text-primary-custom"></i>
                </button>
              </Col>
              <Col>
                <button className="btn btn-outline-primary shadow rounded-pill w-100">
                  <i className="bi bi-telephone-outbound text-primary-custom"></i>
                </button>
              </Col>
              <Col>
                <button className="btn btn-outline-primary shadow rounded-pill w-100">
                  <i className="bi bi-browser-chrome text-primary-custom"></i>
                </button>
              </Col>
            </Row>
            <Row>
              <p
                className={`mt-2 ${darkMode ? "text-light" : "text-secondary"}`}
              >
                <i className="bi bi-geo-alt pe-2"></i>Se encuentra en La Falda,
                Córdoba
              </p>
            </Row>
          </div>
        ) : (
          <p className={darkMode ? "text-light" : "text-dark"}>
            Para contactar con el vendedor, <a href="/login">inicia sesión</a>.
          </p>
        )}
        <div className="d-flex align-items-center">
          <i className="bi bi-star-fill text-primary-custom"></i>
          <span
            className={`fs-sm ms-2 ${
              darkMode ? "text-light" : "text-secondary"
            }`}
          >
            15 visitas
          </span>
        </div>
      </Col>
    </div>
  );
};

export default ProductContact;
