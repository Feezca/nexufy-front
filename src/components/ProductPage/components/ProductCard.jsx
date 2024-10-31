import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import ProductContact from "./ProductContact";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../../themes/translations"; // Importar las traducciones

const ProductCard = ({ id, name, price, category, customerId, image }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  // Mapear directamente las categorías para obtener la traducción sin efectos adicionales
  const translatedCategory =
    t.categoriess
      .map((item) => (item.name === category ? item.name : null))
      .filter(Boolean)[0] || category;

  return (
    <div className="container-fluid container-md">
      <Row className="flex-lg-row flex-column">
        <Col lg={7} className="mb-3 mb-lg-0">
          <img
            className="rounded w-100"
            style={{ maxHeight: "25rem", objectFit: "contain" }}
            src={image}
            alt={t.productImageAlt}
          />
        </Col>
        <Col lg={5}>
          <Card.Body
            className={`h-100 w-100 ${
              darkMode ? "bg-dark text-light" : "bg-light text-dark"
            }`} // Aplicar clases según el tema
          >
            <div className="h-50 d-flex flex-column justify-content-between">
              <Card.Title
                className={`fs-3 ${darkMode ? "text-light" : "text-dark"}`}
              >
                {name}
              </Card.Title>
              <Card.Title className="fs-2 pt-4 fw-semibold d-flex align-items-baseline">
                <span>${price}</span>{" "}
                <p
                  className={`fs-6 fw-normal ps-2 ${
                    darkMode ? "text-light" : "text-secondary"
                  }`}
                >
                  {t.perUnit}
                </p>
              </Card.Title>
              <Card.Subtitle
                className={`fs-6 fw-normal ${
                  darkMode ? "text-light" : "text-secondary"
                }`}
              >
                {translatedCategory} {/* Usar la categoría traducida */}
              </Card.Subtitle>
              <hr />
            </div>
            <Card.Text className="h-50">
              <ProductContact customerId={customerId} />{" "}
              {/* El componente ProductContact ya tiene el modo oscuro implementado */}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;
