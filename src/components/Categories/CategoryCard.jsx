// CategoryCard.jsx

import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Importar useContext
import { ThemeContext } from "../themes/ThemeContext"; // Importar ThemeContext

const CategoryCard = ({ id, image, name, description }) => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate("/all", { state: { category: name } });
  };

  return (
    <div
      className="custom-card rounded-5"
      onClick={() => handleCategoryClick(name)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={image}
        alt={name}
        className="card-image object-fit-cover rounded-5"
      />
      <div
        className={`overlay text-card-custom d-flex flex-column justify-content-center align-items-start`}
      >
        {/* Nombre y descripción siempre en blanco */}
        <p className="fs-3 fw-semibold text-white">{name}</p>
        <p className="fs-6 text-white">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
