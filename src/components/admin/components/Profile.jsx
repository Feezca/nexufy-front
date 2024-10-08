import { useEffect, useState, useContext } from "react";
import { getCustomerById } from "../../../api/customerService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import EditProfileFormUserAdmin from "../../AuthForm/EditProfileFormUserAdmin";
import EditProfileFormSuperAdmin from "../../AuthForm/EditProfileFormSuperAdmin";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar ThemeContext
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context"; // Importar contexto de autenticación

const Profile = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { user: loggedInUser } = useContext(AuthenticationContext); // Obtener usuario autenticado
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const data = await getCustomerById(user.id, token);
          setData(data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [user]);

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem("token");

    try {
      await updateCustomerProfile(user.id, token, updatedData);
      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  // Lógica para mostrar el formulario correspondiente
  const isSuperAdmin = loggedInUser.roles.includes("ROLE_SUPERADMIN");

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 d-flex flex-column align-items-start ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <p className="fs-3 fw-semibold">Mi Perfil</p>

      <div
        className={`w-100 p-2 px-4 border rounded border-2 ${
          darkMode
            ? "border-light-subtle"
            : "border-secondary border-opacity-25"
        }`}
      >
        {isEditing ? (
          isSuperAdmin ? (
            <EditProfileFormSuperAdmin initialData={data} onSave={handleSave} />
          ) : (
            <EditProfileFormUserAdmin initialData={data} onSave={handleSave} />
          )
        ) : (
          <>
            {/* Mostrar información del usuario */}
            <Row className="text-dark d-flex justify-content-between">
              <Col xs={12} md={4}>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Nombre
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.name || "Nombre no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Email
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.email || "Email no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Dirección
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.address || "Dirección no disponible"}
                  </span>
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Apellido
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.lastname || "Apellido no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Nombre de usuario
                  </Form.Label>
                  <span className="fs-6 mb-4">
                    {data.username || "Usuario no disponible"}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    Fecha de nacimiento
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      data.birthdate ? "" : "text-body-tertiary text-opacity-25"
                    }`}
                  >
                    {data.birthdate
                      ? data.birthdate.split("T")[0]
                      : "Fecha no disponible"}
                  </span>
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <Row className="justify-content-end me-4">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline-secondary"
                    size="sm"
                    className="border border-2 rounded-pill w-25 p-1 d-flex justify-content-center"
                  >
                    <span>
                      Editar <i className="bi bi-pencil"></i>
                    </span>
                  </Button>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
