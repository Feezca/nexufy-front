import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Table, Button, Row, Pagination } from "react-bootstrap";
import EditProfileForm from "../../AuthForm/EditProfileForm";
import { updateCustomerProfile } from "../../../api/customerService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const CustomTable = ({ columns, input }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del modo oscuro
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [data, setData] = useState(input);
  const [error, setError] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  // Paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (userId) => {
    const user = data.find((item) => item.id === userId);
    setUserToEdit(user);
    setEditingUserId(userId);
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");
    try {
      await updateCustomerProfile(updatedData.id, token, updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
      setIsEditing(false);
      setEditingUserId(null);
    } catch (error) {
      setError(error);
    }
  };

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
        <tbody className="text-center" style={{ fontSize: "12px" }}>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{col.render(item)}</td>
              ))}
              <td>
                <Row className="justify-content-end me-4">
                  <Button
                    onClick={() => handleEditClick(item.id)}
                    variant={darkMode ? "outline-light" : "outline-secondary"} // Cambiar estilo del botón
                    size="sm"
                    className="border border-2 rounded-pill w-auto p-1 d-flex align-items-center"
                  >
                    <span>
                      Editar <i className="bi bi-pencil ms-2"></i>
                    </span>
                  </Button>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <p className="text-danger">{error.message}</p>}
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
  columns: PropTypes.array.isRequired,
  input: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default CustomTable;
