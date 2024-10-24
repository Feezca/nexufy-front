// ProductCard.js
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";
import placeholder from "../../assets/img/placeholder.jpg"

// **Importar el contexto de idioma y las traducciones**
import { LanguageContext } from "../themes/LanguageContext";
import translations from "../themes/translations";

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  category,
  loading,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/product/${id}`, {
      state: {
        product: {
          id,
          image,
          name,
          description,
          price,
          category,
        },
      },
    });
  };

  return (
    <Card
      style={{ height: "28rem", width:"20rem", border: "none" }}
      className="shadow mb-2 mx-auto"
    >
      {loading ? (
        // Mostrar el skeleton mientras carga
        <>
          <Card.Img
            variant="top"
            src={image}
          />
          <Card.Body
            className={`bg-secundario d-flex flex-column justify-content-around`}
          >
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
            <div className="d-flex justify-content-center mt-3">
              <Placeholder.Button xs={6} variant="primary" />
            </div>
          </Card.Body>
        </>
      ) : (
        // Mostrar el contenido real
        <>
          <Card.Img variant="top" src={image ? image : placeholder} alt="Imagen del producto publicado" style={{   
            maxHeight:"12rem",
              width: "100%",
              objectFit: "cover", 
            }} />
          <Card.Body
            className={`bg-secundario d-flex flex-column justify-content-around`}
          >
            {/* Nombre del producto */}
            <Card.Title
              className={`fw-semibold ${
                darkMode ? "text-white" : "text-primary"
              }`}
            >
              {name}
            </Card.Title>

            {/* Descripción del producto */}
            <Card.Text
              className={`fw-medium lh-sm ${
                darkMode ? "text-white" : "text-secondary"
              }`}
            >
              {description}
            </Card.Text>

            {/* Precio del producto */}
            <Card.Text
              className={`fw-semibold mb-0 ${
                darkMode ? "text-white" : "text-primary"
              }`}
            >
              $ {price}{" "}
              <span
                className={`fw-medium ${
                  darkMode ? "text-white" : "text-secondary"
                }`}
              >
                {t.perKg}
              </span>
            </Card.Text>

            {/* Categoría del producto */}
            <Card.Text
              className={`fw-medium ${
                darkMode ? "text-white" : "text-secondary"
              }`}
            >
              <i className="bi bi-star-fill text-primary-custom"></i> {category}
            </Card.Text>

            <div className="d-flex justify-content-center mt-3">
              <Button
                className="button-gradient border-0 shadow-lg"
                style={{ width: "12rem", height: "2rem" }}
                onClick={handleDetail}
              >
                {t.viewMore}
              </Button>
            </div>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
