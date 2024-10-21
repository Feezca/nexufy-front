// Publications.js
import { useEffect, useState, useContext } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { useOutletContext } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import CreateProductForm from "./CreateProductForm";
import { postProduct } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../../themes/translations"; // Importar las traducciones

const Publications = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

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
      setError(error.message || t.errorFetchingProducts);
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
      setError(err.message || t.errorSavingProduct);
    }
  };

  if (isLoading) {
    return <p>{t.loading}</p>;
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
      {openNewProduct ? (
        <CreateProductForm onSave={handleSave} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2>{t.productsPublishedByYou}</h2>
            <Button
              variant="outline-primary"
              className=""
              onClick={handleCreatePublication}
            >
              {t.publishNew}
            </Button>
          </div>
          <div className="d-flex flex-wrap">
            {/* Contenedor para flexbox */}
            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <p>{t.noProductsPublished}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Publications;
