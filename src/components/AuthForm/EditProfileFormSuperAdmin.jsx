import { useState, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  suspendCustomer,
  unsuspendCustomer,
  deleteCustomer,
} from "../../api/adminService";
import moment from "moment";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context"; // Importar el contexto de autenticación

const EditProfileFormSuperAdmin = ({ initialData, onSave }) => {
  const { user } = useContext(AuthenticationContext); // Obtener el usuario autenticado
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [suspensionEndDate, setSuspensionEndDate] = useState(
    formData.suspendedUntil ? new Date(formData.suspendedUntil) : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await onSave(formData);
      setSuccessMessage("Cambios guardados exitosamente.");
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar el perfil.");
    }
  };

  const handleSuspend = async (days) => {
    try {
      const token = localStorage.getItem("token");
      const newSuspensionEndDate = moment().add(days, "days").toDate();
      await suspendCustomer(formData.id, days, token);
      setFormData({
        ...formData,
        suspended: true,
        suspendedUntil: newSuspensionEndDate,
      });
      setSuspensionEndDate(newSuspensionEndDate);
      setSuccessMessage(`Usuario suspendido por ${days} días.`);
    } catch (error) {
      setErrorMessage(error.message || "Error al suspender al usuario.");
    }
  };

  const handleUnsuspend = async () => {
    try {
      const token = localStorage.getItem("token");
      await unsuspendCustomer(formData.id, token);
      setFormData({ ...formData, suspended: false, suspendedUntil: null });
      setSuspensionEndDate(null);
      setSuccessMessage("Suspensión retirada.");
    } catch (error) {
      setErrorMessage(error.message || "Error al retirar la suspensión.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteCustomer(formData.id, token);
      setSuccessMessage("Usuario eliminado exitosamente.");
    } catch (error) {
      setErrorMessage(error.message || "Error al eliminar al usuario.");
    }
  };

  // Verificar si el usuario actual es el mismo del perfil que se está editando
  const isOwnProfile = user && user.id === formData.id;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="formLastname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Text
              className="form-control"
              style={{
                backgroundColor: "#e9ecef",
                border: "1px solid #ced4da",
              }}
            >
              {formData.username || ""}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      {formData.suspended && suspensionEndDate && (
        <Row className="mt-3">
          <Col>
            <p className="text-warning">
              Este usuario está suspendido hasta{" "}
              {moment(suspensionEndDate).format("DD/MM/YYYY HH:mm")}.
            </p>
          </Col>
        </Row>
      )}

      {/* Solo mostrar los botones de suspensión y eliminación si no es el propio perfil */}
      {!isOwnProfile && (
        <Row className="mt-4">
          <Col>
            <Button
              variant="danger"
              onClick={() => handleSuspend(7)}
              className="me-2"
            >
              Suspender por 7 días
            </Button>
            <Button
              variant="danger"
              onClick={() => handleSuspend(30)}
              className="me-2"
            >
              Suspender por 30 días
            </Button>

            {formData.suspended && (
              <Button
                variant="success"
                onClick={handleUnsuspend}
                className="me-2"
              >
                Levantar suspensión
              </Button>
            )}

            <Button variant="outline-danger" onClick={handleDelete}>
              Eliminar usuario
            </Button>
          </Col>
        </Row>
      )}

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}

      <Button variant="primary" type="submit" className="mt-3">
        Guardar Cambios
      </Button>
    </Form>
  );
};

EditProfileFormSuperAdmin.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string.isRequired,
    suspended: PropTypes.bool,
    suspendedUntil: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileFormSuperAdmin;
