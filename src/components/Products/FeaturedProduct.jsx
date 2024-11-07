import { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ThemeContext } from "../themes/ThemeContext";
import { Link } from "react-router-dom";
import useLanguage from "../themes/useLanguage"; // Importar el hook personalizado
import { getAllProducts } from "../../api/productService";
import { Spinner } from "react-bootstrap";

const FeaturedProduct = () => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook para obtener las traducciones
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching all products...");
        const data = await getAllProducts();
        console.log("Fetched products:", data);
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" />
    </div>
  );

  if (products.length === 0) {
    return (
      <div
        className={`w-100 d-flex justify-content-center fs-2 fw-bold ${
          darkMode ? "text-white" : "text-dark"
        }`}
      >
        {t.unavailableProduct}
      </div>
    );
  }

  return (
    <div className="container">
      <p
        className={`fs-3 text-center fw-bold ${
          darkMode ? "text-white" : "text-primary"
        }`}
      >
        {t.featuredProducts}
      </p>
      <div className="d-flex justify-content-around flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="d-flex justify-content-center mb-4">
            <div style={{ width: "20rem" }}>
              <ProductList products={[product]} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-4 me-4 link-opacity-100-hover">
        <Link
          to="/all"
          className={`fw-medium ${darkMode ? "text-white" : "text-primary"}`}
        >
          {t.viewAllProducts} →
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
