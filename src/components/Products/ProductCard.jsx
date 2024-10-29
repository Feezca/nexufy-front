import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";
import { LanguageContext } from "../themes/LanguageContext";
import translations from "../themes/translations";

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  category,
  isOwner,
  isSuperAdmin,
  handleEdit,
  confirmDelete,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate(); // Asegúrate de inicializar navigate

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
      style={{ height: "28rem", width: "20rem", border: "none" }}
      className="shadow mb-2 mx-auto"
    >
      <Card.Img
        variant="top"
        src={image || "../../assets/img/placeholder.jpg"} // Asegúrate de tener una imagen de placeholder
        alt="Imagen del producto"
        style={{ height: "12rem", objectFit: "cover" }}
      />
      <Card.Body
        className={`bg-secundario d-flex flex-column justify-content-between`}
      >
        <div>
          <Card.Title
            className={`fw-semibold ${
              darkMode ? "text-white" : "text-primary"
            }`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Card.Title>
          <Card.Text
            className={`fw-medium lh-sm ${
              darkMode ? "text-white" : "text-secondary"
            }`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Card.Text>
          <Card.Text
            className={`fw-semibold mb-0 ${
              darkMode ? "text-white" : "text-primary"
            }`}
          >
            $ {price}
          </Card.Text>
          <Card.Text
            className={`fw-medium ${
              darkMode ? "text-white" : "text-secondary"
            }`}
          >
            {category}
          </Card.Text>
        </div>

        {(isOwner || isSuperAdmin) && (
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button
              onClick={() => handleEdit(id)}
              variant={darkMode ? "outline-light" : "outline-secondary"}
              size="sm"
              className="w-25"
            >
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              onClick={() => confirmDelete(id)}
              variant="danger"
              size="sm"
              className="w-25"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        )}

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="button-gradient border-0 shadow-lg"
            onClick={handleDetail}
            style={{ width: "100%" }}
          >
            {t.verMas}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
