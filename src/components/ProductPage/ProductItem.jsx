import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";
import useLanguage from "../themes/useLanguage"; // Importar el hook useLanguage
import ProductCard from "./components/ProductCard";
import ProductComments from "./components/ProductComments";
import ProductData from "./components/ProductData";
import ProductSeller from "./components/ProductSeller";
import { getProduct } from "../../api/productService";

const ProductItem = () => {
  const [producto, setProducto] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones
  const { id } = useParams();

  if (!id) {
    return <div>{t.productNotFound}</div>;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProducto(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!producto) {
    return <div>{t.loadingProduct}</div>;
  }

  const { image, name, description, price, category, customerId } = producto;

  return (
    <>
      <ProductCard
        id={id}
        image={image}
        name={name}
        price={price}
        category={category}
        customerId={customerId}
      />

      <ProductData description={description} />

      <hr
        className={`container border-2 ${
          darkMode ? "border-white" : "border-dark"
        }`}
      />

      
      {/* <ProductSeller customerId={customerId} /> */}

      {/* <h3
        className={`container fs-3 fw-medium my-4 ${
          darkMode ? "text-white" : "text-dark"
        }`}
      >
        {t.productComments}
      </h3>

      <ProductComments productId={id} /> */}
    </>
  );
};

export default ProductItem;
