import { useContext } from "react"; // Importar useContext para acceder al ThemeContext
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import img from "../../assets/img/metales.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

const ProductCard = ({ id, image, name, description, price, category }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
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
    <Card style={{ height: "28rem", border: "none" }} className="shadow">
      <Card.Img variant="top" src={img} />
      <Card.Body
        className={`bg-secundario d-flex flex-column justify-content-around`}
      >
        {/* Nombre del producto */}
        <Card.Title
          className={`fw-semibold ${darkMode ? "text-white" : "text-primary"}`}
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
            por kg
          </span>
        </Card.Text>

        {/* Categoría del producto */}
        <Card.Text
          className={`fw-medium ${darkMode ? "text-white" : "text-secondary"}`}
        >
          <i className="bi bi-star-fill text-primary-custom"></i> {category}
        </Card.Text>

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="button-gradient border-0 shadow-lg"
            style={{ width: "12rem", height: "2rem" }}
            onClick={handleDetail}
          >
            Ver más
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
