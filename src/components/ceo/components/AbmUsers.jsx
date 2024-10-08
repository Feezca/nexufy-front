import { useEffect, useState, useContext } from "react";
import CustomTable from "./CustomTable";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { getAllCustomers } from "../../../api/customerService";
import { Button, Form } from "react-bootstrap";
import CreateUserForm from "../../AuthForm/CreateUserForm";
import { registerAdminUser } from "../../../api/adminService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext


const AbmUsers = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema oscuro

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openNewUser, setOpenNewUser] = useState(false);

  const handleCreateClick = () => {
    setOpenNewUser(true);
  };

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

  const handleSave = async (newUser) => {
    const token = localStorage.getItem("token");
    try {
      await registerAdminUser(newUser, token);
      setOpenNewUser(false); // Cierra el formulario después de guardar
      await fetchAllCustomers(); // Actualiza la lista de usuarios después de guardar
    } catch (error) {
      console.error(error);
      setError(error); // Manejo de errores, podrías mostrar un mensaje al usuario aquí
    }
  };
  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };


  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
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

  const handleEdit = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      {openNewUser ? (
        <CreateUserForm onSave={handleSave} />
      ) : (
        <>
        
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fs-4 fw-semibold">Usuarios registrados</p>
            <div className="w-50 d-flex justify-content-around">
              <Form className="d-flex w-75">
                <Form.Control type="text" placeholder="Buscar Usuario" className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} />
                <Button className="mx-2" type="submit" variant={darkMode ? "outline-light" : "outline-secondary"}>
                  <i className="bi bi-search"></i>
                </Button>
              </Form>
            </div>
            <Button className="mx-2" onClick={handleCreateClick} variant={darkMode ? "outline-light" : "outline-secondary"}>
              <i className="bi bi-plus"> Agregar</i>
            </Button>
          </div>
          <CustomTable columns={userColumns} data={users} onEdit={handleEdit} onDelete={handleDelete}/>
        </>
      )}
    </div>
  );
};

export default AbmUsers;
