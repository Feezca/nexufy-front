import { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ThemeContext } from "../themes/ThemeContext";
import { Link } from "react-router-dom";
import useLanguage from "../themes/useLanguage"; // Importar el hook personalizado
import { getAllProducts } from "../../api/productService";
import { Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const FeaturedProduct = () => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook para obtener las traducciones
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 8));
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
      <Carousel responsive={responsive} infinite autoPlay>
        {products.map((product) => (
          <div key={product.id} className="d-flex justify-content-center mb-4">
            <div style={{ width: "20rem" }}>
              <ProductList products={[product]} />
            </div>
          </div>
        ))}
      </Carousel>
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
