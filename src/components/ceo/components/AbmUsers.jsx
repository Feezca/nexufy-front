// AbmUsers.jsx

import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteCustomer, registerAdminUser } from "../../../api/adminService";
import {
  getAllCustomers,
  updateCustomerProfile,
} from "../../../api/customerService";
import CreateUserForm from "../../AuthForm/CreateUserForm";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProfileFormUserAdmin from "../../AuthForm/EditProfileFormUserAdmin";
import EditProfileFormSuperAdmin from "../../AuthForm/EditProfileFormSuperAdmin";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import { useNavigate } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";

const AbmUsers = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const { searchQuery, setSearchQuery, filteredSearch } = useSearch(
    "",
    users,
    token,
    "customers"
  );
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isSuperAdmin = user?.roles.includes("ROLE_SUPERADMIN");

  const handleCreateClick = () => {
    setOpenNewUser(true);
  };

  const fetchAllCustomers = async () => {
    if (user && user.id) {
      try {
        const customers = await getAllCustomers(token);
        setUsers(customers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [user]);

  const handleSave = async (newUser) => {
    try {
      await registerAdminUser(newUser, token);
      setOpenNewUser(false);
      await fetchAllCustomers();
      Swal.fire({
        icon: "success",
        title: t.userCreatedSuccessfully,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      setError(error);
      Swal.fire(t.error, error.message, "error");
    }
  };

  const handleEdit = (selectedUser) => {
    const isEditingOwnProfile = selectedUser.id === user.id;

    if (!isSuperAdmin && !isEditingOwnProfile) {
      Swal.fire({
        icon: "error",
        title: t.permissionDeniedTitle,
        text: t.permissionDeniedMessage,
      });
      return;
    }
    setSelectedUser(selectedUser);
    setIsEditing(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await updateCustomerProfile(selectedUser.id, token, updatedData);
      setIsEditing(false);
      setSelectedUser(null);
      await fetchAllCustomers();

      Swal.fire({
        icon: "success",
        title: t.changesSavedSuccessfully,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error);
      Swal.fire(t.error, error.message, "error");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  const confirmDeleteCustomer = (id) => {
    Swal.fire({
      title: t.confirmDeleteTitle,
      text: t.confirmDeleteMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t.delete,
      cancelButtonText: t.confirmDeleteCancelButton,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleConfirmDelete(id);
      }
    });
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteCustomer(id, token);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      Swal.fire(t.deleted, t.successMessage, "success");
    } catch (error) {
      setError(error);
      Swal.fire(t.error, error.message, "error");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" />
      </div>
    );

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const toggleDropdown = (id) => {
    console.log("Toggling dropdown for id:", id); // Verifica el id
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      {isEditing ? (
        isSuperAdmin && selectedUser.id !== user.id ? (
          <EditProfileFormSuperAdmin
            initialData={selectedUser}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <EditProfileFormUserAdmin
            initialData={selectedUser}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )
      ) : openNewUser ? (
        <CreateUserForm
          onSave={handleSave}
          onCancel={() => setOpenNewUser(false)}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fs-4 fw-semibold">{t.registeredUsers}</p>
            <div className="w-50 d-flex justify-content-around">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                darkMode={darkMode}
              />
            </div>
            <Button
              className="mx-2"
              onClick={handleCreateClick}
              variant={darkMode ? "outline-light" : "outline-secondary"}
            >
              <i className="bi bi-plus" />
              <span>{t.addUser}</span>
            </Button>
          </div>
          <CustomTable
            columns={[
              {
                header: t.username,
                accessor: "username",
                render: (item) => item.username || t.noData,
              },
              {
                header: t.email,
                accessor: "email",
                render: (item) => item.email || t.noData,
              },
              {
                header: t.role,
                accessor: "roles",
                render: (item) =>
                  item.roles && Array.isArray(item.roles)
                    ? item.roles
                        .map((role) => role.replace("ROLE_", ""))
                        .join(", ")
                    : t.noRole,
              },
              {
                header: "",
                accessor: "actions",
                render: (item) => (
                  <div
                    className="btn-options"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <i
                      className="bi bi-three-dots"
                      onClick={() => toggleDropdown(item.id)}
                    />
                    {activeDropdown === item.id &&
                      isSuperAdmin &&
                      item.id !== user.id && (
                        <div
                          className={`dropdown-menu d-flex flex-column justify-content-center ${
                            darkMode ? "bg-dark text-light" : "bg-light"
                          }`}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

                            borderRadius: "4px",
                          }}
                        >
                          
                            <button
                              className="dropdown-item ps-5 "
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                              onClick={() => handleEdit(item)}
                            >
                              {t.edit}
                            </button>
                            <button
                              className="dropdown-item  ps-5 fw-semibold"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "red",
                                gap: "0.5rem",
                              }}
                              onClick={() => confirmDeleteCustomer(item.id)}
                            >
                              {" "}
                              {t.delete}
                            </button>
                        </div>
                      )}
                  </div>
                ),
              },
            ]}
            data={filteredSearch}
          />
        </>
      )}
    </div>
  );
};

export default AbmUsers;
