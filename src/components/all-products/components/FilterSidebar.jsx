import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage";

const FilterSidebar = ({ setFilters }) => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const navs = [
    {
      id: 1,
      name: t.filterByPrice,
      options: [
        { id: "under10000", name: t.priceUnder10000 },
        { id: "over10000", name: t.priceOver10000 },
        { id: "over25000", name: t.priceOver25000 },
      ],
      type: "price",
    },
    {
      id: 2,
      name: t.filterByCategory,
      options: t.categoriess.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      type: "category",
    },
  ];

  return (
    <div
      className={`h-100 position-fixed top-0 left-0 ${
        darkMode ? "bg-dark" : "bg-secondary-subtle"
      }`}
      style={{
        width: "17rem",
        paddingTop: "3rem",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Col className="mt-2 pt-5 w-100">
        {navs.map((nav) => (
          <Row key={nav.id} className="py-2 px-5">
            <h3
              className={`nav-link fs-5 d-flex align-items-center text-center fw-bold ${
                darkMode ? "text-light" : "text-body-secondary"
              }`}
            >
              {nav.name}
            </h3>
            {nav.options.map((opt) => (
              <p
                key={opt.id}
                className="options"
                onClick={() => handleFilterChange(nav.type, opt)}
                style={{ cursor: "pointer" }}
              >
                {opt.name}
              </p>
            ))}
          </Row>
        ))}
      </Col>
    </div>
  );
};

export default FilterSidebar;
