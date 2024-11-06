import { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage
import { getSellerContact } from "../../../api/productService";

const ProductContact = ({ customerId }) => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones
  const [sellerInfo, setSellerInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSellerInfo = async () => {
      try {
        const data = await getSellerContact(customerId, token);
        setSellerInfo(data);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    };

    fetchSellerInfo();
  }, [customerId]);

  return (
    <div>
      <Col>
        <Row>
          <p
            className={`fw-medium text-body-tertiary fs-5 ${
              darkMode ? "text-light" : "text-dark"
            }`}
          >
            {t.contactSeller}
          </p>
        </Row>
        <Row>
          <p
            className={`fw-medium fs-3 ${
              darkMode ? "text-light" : "text-dark"
            }`}
          >
            {sellerInfo.name} {sellerInfo.lastname}
          </p>
        </Row>

        {user ? (
          <div>
            <Row>
              <p
                className={`mt-2 ${darkMode ? "text-light" : "text-secondary"}`}
              >
                <i className="bi bi-geo-alt pe-2"></i>
                {t.locationPrefix}
                {sellerInfo?.address}
              </p>
            </Row>
            <Row>
              <Col>
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
                <a
                  href={`mailto:${sellerInfo?.email}`}
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-envelope text-primary-custom"></i>
                </a>
              </Col>
              <Col>
                <a
                  href={`tel:${sellerInfo?.phone}`}
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-telephone-outbound text-primary-custom"></i>
                </a>
              </Col>
              <Col>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    sellerInfo?.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary shadow rounded-pill w-100"
                >
                  <i className="bi bi-geo-alt-fill text-primary-custom"></i>
                </a>
              </Col>
            </Row>
          </div>
        ) : (
          <p className={darkMode ? "text-light" : "text-dark"}>
            {t.mustLoginToContactSeller} <a href="/login">{t.login}</a>.
          </p>
        )}
      </Col>
    </div>
  );
};

export default ProductContact;
