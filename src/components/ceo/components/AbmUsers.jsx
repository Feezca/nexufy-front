import { useEffect, useState, useContext } from "react";
import CustomTable from "./CustomTable";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { getAllCustomers } from "../../../api/customerService";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const AbmUsers = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema oscuro

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllCustomers = async () => {
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const customers = await getAllCustomers(token);
          setUsers(customers);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllCustomers();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const userColumns = [
    {
      header: "Nombre de usuario",
      accessor: "username",
      render: (item) => item.username,
    },
    {
      header: "Email",
      accessor: "email",
      render: (item) => item.email,
    },
    {
      header: "Rol",
      accessor: "roles",
      render: (item) => item.roles[0]?.name.split("_")[1],
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
        <p className="fs-4 fw-semibold">Usuarios registrados</p>
        <div className="w-50 d-flex justify-content-around">
          <Form className="d-flex w-75">
            <Form.Control
              type="text"
              placeholder="Buscar Usuario"
              className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
            />
            <Button
              className="mx-2"
              type="submit"
              variant={darkMode ? "outline-light" : "outline-secondary"}
            >
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </div>
        <Button
          className="mx-2"
          onClick={() => {
            /* lógica para agregar usuario */
          }}
          variant={darkMode ? "outline-light" : "outline-secondary"}
        >
          <i className="bi bi-plus"> Agregar</i>
        </Button>
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <CustomTable columns={userColumns} input={users} />
    </div>
  );
};

export default AbmUsers;
