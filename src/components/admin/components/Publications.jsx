// Publications.jsx

import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { Button, Alert } from "react-bootstrap";
import CreateProductForm from "./CreateProductForm";
import { postProduct } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage

const Publications = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openNewProduct, setOpenNewProduct] = useState(false);

  const token = localStorage.getItem("token");

  const handleCreatePublication = () => {
    setOpenNewProduct(true);
  };

  const handleCancelCreation = () => {
    setOpenNewProduct(false);
  };

  const fetchUserProducts = async () => {
    try {
      setIsLoading(true);
      if (user && user.id) {
        const data = await getProductsByCustomerId(user.id, token);
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
      setError(error.message || t.errorFetchingProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, [user, token]);

  const handleSave = async (newProduct) => {
    const customerId = user.id;
    const productData = {
      ...newProduct,
      customerId: customerId,
    };
    try {
      await postProduct(productData, customerId, token);
      setOpenNewProduct(false);
      await fetchUserProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err.message || t.errorSavingProduct);
    }
  };

  const canPublish = user?.roles?.some((role) =>
    ["ROLE_ADMIN", "ROLE_SUPERADMIN"].includes(role.toUpperCase())
  );

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
      {!canPublish && (
        <Alert variant="info" className="mt-3">
          {t.needToBeAdminToPublishMessage}
        </Alert>
      )}

      {canPublish ? (
        openNewProduct ? (
          <CreateProductForm
            onSave={handleSave}
            onCancel={handleCancelCreation}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>{t.productsPublishedByYou}</h2>
              <Button
                variant="outline-primary"
                onClick={handleCreatePublication}
              >
                {t.publishNew}
              </Button>
            </div>
            <div className="d-flex flex-wrap justify-content-start gap-4">
              {products.length > 0 ? (
                <ProductList
                  products={products}
                  fetchUserProducts={fetchUserProducts}
                />
              ) : (
                <p>{t.noProductsPublished}</p>
              )}
            </div>
          </>
        )
      ) : (
        <Button
          variant="primary"
          onClick={() => navigate("/admin/datos")}
          className="mt-3"
        >
          {t.goToAdminProfile}
        </Button>
      )}
    </div>
  );
};

export default Publications;
