import { useContext } from "react";
import ProductList from "./ProductList";
import products from "../../data/products.json";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

const FeaturedProduct = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const firstFourProducts = products.slice(0, 4);

  return (
    <div className="container">
      {/* Cambia el color del texto "Productos destacados" según el modo oscuro o claro */}
      <p
        className={`fs-3 text-center fw-bold ${
          darkMode ? "text-white" : "text-primary"
        }`}
      >
        Productos destacados
      </p>
      <ProductList products={firstFourProducts} />
      <div className="text-end mt-4 me-4 link-opacity-100-hover">
        {/* Cambia el color del enlace según el modo oscuro o claro */}
        <a
          href="#"
          className={`fw-medium ${darkMode ? "text-white" : "text-primary"}`}
        >
          Ver todos los productos →
        </a>
      </div>
    </div>
  );
};

export default FeaturedProduct;
