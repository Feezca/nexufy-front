import ProductCard from "./components/ProductCard";
import ProductData from "./components/ProductData";
import ProductSeller from "./components/ProductSeller";
import { useLocation } from "react-router-dom";
import ProductComments from "./components/ProductComments";
import { ThemeContext } from "../themes/ThemeContext";
import { useContext } from "react";

const ProductItem = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const location = useLocation();
  const { id, image, name, description, price, category } =
    location.state.product;

  return (
    <>
      <ProductCard
        id={id}
        image={image}
        name={name}
        price={price}
        category={category}
      />

      {/* Descripción del producto con condicional para tema oscuro */}
      <ProductData description={description} />

      <hr
        className={`container border-2 ${
          darkMode ? "border-white" : "border-dark"
        }`}
      />

      {/* Sección de información del vendedor */}
      <ProductSeller />

      <h3
        className={`container fs-3 fw-medium my-4 ${
          darkMode ? "text-white" : "text-dark"
        }`}
      >
        Comentarios del producto
      </h3>

      {/* Comentarios del producto */}
      <ProductComments productId={id} />
    </>
  );
};

export default ProductItem;
