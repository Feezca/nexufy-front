import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Importar useContext
import { ThemeContext } from "../themes/ThemeContext"; // Importar ThemeContext

const CategoryCard = ({ id, image, name, description }) => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/product/category/${id}`, {
      state: {
        category: {
          id: id,
          name: name,
          description: description,
        },
      },
    });
  };

  return (
    <div
      className="custom-card rounded-5"
      onClick={handleDetail}
      style={{ cursor: "pointer" }}
    >
      <img
        src={image}
        alt={name}
        className="card-image object-fit-cover rounded-5"
      />
      <div
        className={`overlay text-card-custom d-flex flex-column justify-content-center align-items-start ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`} // Cambiar el color según el tema
      >
        <p
          className={`fs-3 fw-semibold ${
            darkMode ? "text-light" : "text-dark"
          }`}
        >
          {name}
        </p>
        <p className={`fs-6 ${darkMode ? "text-light" : "text-dark"}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
