import React, { useEffect, useState, useContext } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import CustomTable from "./CustomTable";
import { getAllProducts } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema oscuro
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (user) {
        try {
          const products = await getAllProducts();
          setProductos(products);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllProducts();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const productColumns = [
    {
      header: "Nombre del producto",
      accessor: "name",
      render: (item) => item.name,
    },
    {
      header: "Precio",
      accessor: "price",
      render: (item) => `$${item.price}`,
    },
    {
      header: "Categoría",
      accessor: "category",
      render: (item) => item.category,
    },
    {
      header: "Acciones",
      accessor: "actions",
      render: (item) => (
        <Button
          style={{ height: "22px", fontSize: "12px", textAlign: "center" }}
          className="py-1"
          variant={darkMode ? "outline-light" : "outline-primary"} // Cambiar el color del botón según el tema
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="fs-4 w-50 fw-semibold">Productos de usuarios</p>
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Buscar producto"
            className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} // Estilo del input según el tema
          />
          <Button
            className="mx-2"
            variant={darkMode ? "outline-light" : "outline-primary"}
          >
            <i className="bi bi-search"></i>
          </Button>
        </Form>
      </div>

      <CustomTable columns={productColumns} input={productos} />
    </div>
  );
};

export default AbmShop;
