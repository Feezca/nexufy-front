import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext";

const CategoryCard = ({ id, image, name, description }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/all", { state: { categoryId: id } });
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
        <p className="fs-3 fw-semibold text-white">{name}</p>
        <p className="fs-6 text-white">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
