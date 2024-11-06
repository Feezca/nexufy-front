import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import ProductContact from "./ProductContact";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar useLanguage

const ProductCard = ({ id, name, price, category, customerId, image }) => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar useLanguage para obtener las traducciones

  // Traducción de la categoría
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
            }`}
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
                {translatedCategory}
              </Card.Subtitle>
              <hr />
            </div>
            <Card.Text className="h-50">
              <ProductContact customerId={customerId} />{" "}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;
