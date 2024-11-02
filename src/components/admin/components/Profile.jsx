import { useEffect, useState, useContext } from "react";
import {
  getCustomerById,
  updateCustomerProfile,
} from "../../../api/customerService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import EditProfileFormUserAdmin from "../../AuthForm/EditProfileFormUserAdmin";
import EditProfileFormSuperAdmin from "../../AuthForm/EditProfileFormSuperAdmin";
import { ThemeContext } from "../../themes/ThemeContext";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage
import moment from "moment";
import "moment/locale/es";

const Profile = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { user: loggedInUser } = useContext(AuthenticationContext);
  const { t, language } = useLanguage(); // Desestructurar t y language desde useLanguage
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
          console.log("Respuesta completa del backend:", data); // Verificar toda la respuesta
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
    return <p>{t.loading}</p>;
  }

  if (error) {
    return (
      <p className="text-danger">{error.message || t.errorLoadingProfile}</p>
    );
  }

  // Verificación de los roles en la consola
  console.log("Data en Profile:", data.roles);

  // Lógica para mostrar el formulario correspondiente
  const isSuperAdmin = loggedInUser.roles.includes("ROLE_SUPERADMIN");

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 d-flex flex-column align-items-start ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <p className="fs-3 fw-semibold">{t.myProfile}</p>

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
                    {t.nameLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.name || t.nameNotAvailable}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    {t.emailLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.email || t.emailNotAvailable}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    {t.addressLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.address || t.addressNotAvailable}
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
                    {t.lastnameLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.lastname || t.lastnameNotAvailable}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    {t.usernameLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.username || t.usernameNotAvailable}
                  </span>
                </Row>
                <Row>
                  <Form.Label
                    className={`fw-semibold ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                    style={{ fontSize: ".9rem" }}
                  >
                    {t.birthdateLabel}
                  </Form.Label>
                  <span
                    className={`fs-6 mb-4 ${
                      darkMode ? "text-light" : "text-body-tertiary"
                    }`}
                  >
                    {data.birthdate
                      ? moment(data.birthdate).locale(language).format("LL")
                      : t.birthdateNotAvailable}
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
                      {t.editButton} <i className="bi bi-pencil"></i>
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
