<<<<<<< HEAD
=======
import React, { useContext } from "react";
>>>>>>> 151ba8b75a175309c62005d8dc84cdb31cc0e047
import Card from "react-bootstrap/Card";
import img from "../../../assets/img/construccion.jpg";
import { Col, Row } from "react-bootstrap";
import ProductContact from "./ProductContact";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const ProductCard = ({ name, price, category }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  return (
    <div className="container-fluid container-md">
      <Row className="flex-lg-row flex-column">
        <Col lg={7} className="mb-3 mb-lg-0">
          <img className="rounded w-100" src={img} alt="Producto" />
        </Col>
        <Col lg={5}>
          <Card.Body
            className={`h-100 w-75 ${
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
                  Por 1000 u.
                </p>
              </Card.Title>
              <Card.Subtitle
                className={`fs-6 fw-normal ${
                  darkMode ? "text-light" : "text-secondary"
                }`}
              >
                {category}
              </Card.Subtitle>
              <hr />
            </div>
            <Card.Text className="h-50">
              <ProductContact />{" "}
              {/* El componente ProductContact ya tiene el modo oscuro implementado */}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;
