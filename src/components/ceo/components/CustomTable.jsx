import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Table, Button, Row, Pagination } from "react-bootstrap";
import EditProfileForm from "../../AuthForm/EditProfileFormSuperAdmin";
import { updateCustomerProfile } from "../../../api/customerService";
import Swal from "sweetalert2";
import { deleteCustomer } from "../../../api/adminService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const CustomTable = ({ columns, data, onEdit, onDelete }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del modo oscuro
  const itemsPerPage = 5; // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si se está editando un usuario
  const [userToEdit, setUserToEdit] = useState(null); // Estado para el usuario que se está editando
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState(null);

  // Calcula la paginación
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total de páginas
  const startIndex = (currentPage - 1) * itemsPerPage; // Índice inicial para la paginación
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage); // Datos paginados

  // Cambia la página actual
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Maneja el clic en editar
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
  };

  // Maneja el clic en borrar
  const handleDeleteClick = async (user) => {
    const token = localStorage.getItem("token");
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡bórralo!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCustomer(user.id, token);
        Swal.fire("¡Borrado!", "El usuario ha sido borrado.", "success");
        onDelete(user.id); // Llama a la función de eliminación
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Hubo un problema al borrar el usuario.", "error");
      }
    }
  };

  // Guarda los cambios de edición
  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");
    try {
      await updateCustomerProfile(updatedData.id, token, updatedData);
      onEdit(updatedData); // Llama a la función de edición pasada como prop
      setIsEditing(false);
    } catch (error) {
      console.error(error); // Manejo de errores
    }
  };

  // Renderiza el formulario de edición si se está editando
  if (isEditing && userToEdit) {
    return <EditProfileForm initialData={userToEdit} onSave={handleSave} />;
  }

  return (
    <div className="container">
      <Table
        striped
        bordered
        hover
        variant={darkMode ? "dark" : "light"} // Cambiar el tema de la tabla
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      >
        <thead>
          <tr className="text-center">
            {columns.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center" style={{ fontSize: "14px" }}>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{col.render(item)}</td>
              ))}
              <td>
                <Row className="d-flex justify-content-center gap-2">
                  <Button
                    onClick={() => handleEditClick(item)} // Llama a la función de editar
                    variant={darkMode ? "outline-light" : "outline-secondary"}
                    size="sm"
                    className="w-25"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(item)} // Llama a la función de borrar
                    variant="danger"
                    size="sm"
                    className="w-25"
                  >
                    <i className="bi bi-eraser-fill"></i>
                  </Button>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="w-full d-flex justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired, // Estructura de las columnas
  data: PropTypes.array.isRequired, // Datos a mostrar
  onEdit: PropTypes.func.isRequired, // Función para manejar la edición
};

export default CustomTable;
