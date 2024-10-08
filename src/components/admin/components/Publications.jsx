import { useEffect, useState, useContext } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { useOutletContext } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import CreateProductForm from "./CreateProductForm";
import { postProduct } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const Publications = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openNewProduct, setOpenNewProduct] = useState(false);

  const handleCreatePublication = () => {
    setOpenNewProduct(true);
  };

  const fetchUserProducts = async () => {
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

  useEffect(() => {
    fetchUserProducts();
  }, [user]);

  const handleSave = async (newProduct) => {
    const id = user.id;
    const productData = {
      ...newProduct,
      customer: { id: id },
    };
    const token = localStorage.getItem("token");
    try {
      console.log(productData);
      await postProduct(productData, token);
      setOpenNewProduct(false);
      await fetchUserProducts();
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className={`container ${
      darkMode ? "bg-dark text-light" : "bg-light text-dark"
    } p-4 rounded`}>
      {openNewProduct ? (
        <CreateProductForm onSave={handleSave} />
      ) : (
        <>
          <h2>Productos publicados por ti</h2>
          <div className="d-flex flex-wrap"> {/* Contenedor para flexbox */}
            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <p>No tienes productos publicados.</p>
            )}
            <Card
              style={{ height: "28rem", width: "16rem", border: "none" }}
              className="shadow rounded mt-3"
            >
              <Card.Body className="bg-secundario d-flex flex-column justify-content-center align-content-center">
                <Button
                  className="d-flex align-items-center justify-content-center rounded-circle mx-auto border border-primary border-5 bg-transparent"
                  style={{ width: "5rem", height: "5rem" }}
                  onClick={handleCreatePublication}
                >
                  <p className="fs-1 fw-bold pt-3 text-primary">+</p>
                </Button>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Publications;
