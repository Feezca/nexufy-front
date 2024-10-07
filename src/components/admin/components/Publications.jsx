import { useEffect, useState, useContext } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { useOutletContext } from "react-router-dom";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const Publications = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user && user.id) {
          // Asegúrate de que `user` y `user.id` existen
          const token = localStorage.getItem("token");
          const data = await getProductsByCustomerId(user.id, token);
          setProducts(data);
        }
      } catch (error) {
        setError(error.message || "Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div
      className={`container ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } p-4 rounded`}
    >
      <h2 className="fw-bold mb-4">Productos publicados por ti</h2>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No tienes productos publicados.</p>
      )}
    </div>
  );
};

export default Publications;
