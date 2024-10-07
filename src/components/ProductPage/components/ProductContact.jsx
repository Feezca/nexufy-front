import { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
<<<<<<< HEAD
import { getSellerContact } from "../../../api/productService"; // Importa la nueva función
=======
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext
>>>>>>> 151ba8b75a175309c62005d8dc84cdb31cc0e047

const ProductContact = ({ customerId }) => {
  const { user } = useContext(AuthenticationContext);
<<<<<<< HEAD
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    // Llamar al servicio para obtener la información del vendedor
    const fetchSellerInfo = async () => {
      try {
        const data = await getSellerContact(customerId); // Usar el servicio en lugar de fetch directo
        setSellerInfo(data);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    };

    fetchSellerInfo();
  }, [customerId]);
=======
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
>>>>>>> 151ba8b75a175309c62005d8dc84cdb31cc0e047

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
        {user  ? (
          <div>
            <Row>
              <Col>
                {/* Botón de WhatsApp */}
                <a
                  href={`https://wa.me/${sellerInfo?.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-whatsapp text-primary-custom"></i>
                </a>
              </Col>
              <Col>
                {/* Botón de Gmail */}
                <a
                  href={`mailto:${sellerInfo?.email}`}
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-envelope text-primary-custom"></i>
                </a>
              </Col>
              <Col>
                {/* Botón para llamada telefónica */}
                <a
                  href={`tel:${sellerInfo?.phone}`}
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-telephone-outbound text-primary-custom"></i>
                </a>
              </Col>
              <Col>
                {/* Botón de Google Maps */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sellerInfo?.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-browser-chrome text-primary-custom"></i>
                </a>
              </Col>
            </Row>
            <Row>
<<<<<<< HEAD
              <p className="text-secondary mt-2">
                <i className="bi bi-geo-alt pe-2 "></i>Se encuentra en {sellerInfo?.address}
=======
              <p
                className={`mt-2 ${darkMode ? "text-light" : "text-secondary"}`}
              >
                <i className="bi bi-geo-alt pe-2"></i>Se encuentra en La Falda,
                Córdoba
>>>>>>> 151ba8b75a175309c62005d8dc84cdb31cc0e047
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
