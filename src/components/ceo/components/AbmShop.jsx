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

  // Redirige a la página de login si no hay usuario
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    // Función para obtener todos los productos
    const fetchAllProducts = async () => {
      if (user) {
        try {
          const products = await getAllProducts(); // Llama a la API para obtener productos
          setProductos(products); // Actualiza el estado con los productos obtenidos
        } catch (error) {
          setError(error); // Maneja el error
        } finally {
          setIsLoading(false); // Indica que se ha terminado la carga
        }
      }
    };

    fetchAllProducts();
  }, [user]); // Efecto que se ejecuta cuando el usuario cambia

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Muestra el error si ocurre
  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  // Definición de las columnas de la tabla
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

  // Función para manejar la edición de productos
  const handleEdit = (updatedProduct) => {
    setProductos((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product // Actualiza el producto editado
      )
    );
  };

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

      {/* Renderiza la tabla de productos */}
      <CustomTable columns={productColumns} data={productos} onEdit={handleEdit} />
    </div>
  );
};

export default AbmShop;
