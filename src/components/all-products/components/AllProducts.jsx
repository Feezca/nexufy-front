import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductList from "../../Products/ProductList";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage";

const AllProducts = () => {
  const { filteredProducts, loading, filters, setFilters } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { t, language } = useLanguage();

  const removeFilter = (key) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  };

  if (loading) {
    return <div>{t.loadingAllProduct}</div>;
  }

  return (
    <>
      <div className="mx-5 mb-4">
        {Object.entries(filters).map(([key, value]) => {
          let displayValue = value.name || value;

          if (key === "category") {
            const categoryId = value.id;
            const category = t.categoriess.find((cat) => cat.id === categoryId);
            displayValue = category ? category.name : "";
          }

          return (
            <Button
              key={key}
              variant={darkMode ? "outline-light" : "outline-secondary"}
              onClick={() => removeFilter(key)}
              className="mx-1"
              size="sm"
            >
              {`${displayValue} ✖`}
            </Button>
          );
        })}
      </div>
      {filteredProducts.length < 1 ? (
        <p className="fs-3 container">{t.unavailableProduct}</p>
      ) : (
        <div style={{ height: "100vh" }}>
          <ProductList products={filteredProducts} />
        </div>
      )}
    </>
  );
};

export default AllProducts;
