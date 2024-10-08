import products from "../../data/products.json";
import { useLocation } from "react-router-dom";
import ProductList from "../Products/ProductList";

const CategoryPage = () => {
  const location = useLocation();
  const { id, name, description } = location.state.category;

  const filteredByCategory = products.filter((prod) => prod.category === name);
  return (
    <>
      <div className="container">
        <ProductList products={filteredByCategory} />
      </div>
    </>
  );
};

export default CategoryPage;
