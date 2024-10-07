import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  suspendCustomer,
  unsuspendCustomer,
  deleteCustomer,
} from "../../api/adminService";
import moment from "moment"; // Importa moment.js para manejar las fechas

const EditProfileForm = ({ initialData, onSave }) => {
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
      await onSave(formData); // Actualizar el perfil del usuario
      setSuccessMessage("Cambios guardados exitosamente.");
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar el perfil.");
    }
  };

  const handleSuspend = async (days) => {
    try {
      const token = localStorage.getItem("token");
      const newSuspensionEndDate = moment().add(days, "days").toDate(); // Calcular la fecha de suspensión
      await suspendCustomer(formData.id, days, token); // Suspender al usuario por 7 o 30 días
      setFormData({
        ...formData,
        suspended: true,
        suspendedUntil: newSuspensionEndDate,
      }); // Actualizar el estado de suspensión
      setSuspensionEndDate(newSuspensionEndDate); // Guardar la fecha de fin de la suspensión
      setSuccessMessage(`Usuario suspendido por ${days} días.`);
    } catch (error) {
      setErrorMessage(error.message || "Error al suspender al usuario.");
    }
  };

  const handleUnsuspend = async () => {
    try {
      const token = localStorage.getItem("token");
      await unsuspendCustomer(formData.id, token); // Retirar suspensión
      setFormData({ ...formData, suspended: false, suspendedUntil: null }); // Actualizar el estado de suspensión
      setSuspensionEndDate(null); // Eliminar la fecha de fin de la suspensión
      setSuccessMessage("Suspensión retirada.");
    } catch (error) {
      setErrorMessage(error.message || "Error al retirar la suspensión.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteCustomer(formData.id, token); // Eliminar usuario
      setSuccessMessage("Usuario eliminado exitosamente.");
    } catch (error) {
      setErrorMessage(error.message || "Error al eliminar al usuario.");
    }
  };

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
                padding: "0.375rem 0.75rem",
                borderRadius: "0.25rem",
              }}
            >
              {formData.username || ""}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      {/* Mostrar el mensaje de suspensión si el usuario está suspendido */}
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

      {/* Botones de acciones para suspender, levantar suspensión o eliminar */}
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

          {/* Mostrar el botón para levantar la suspensión solo si el usuario está suspendido */}
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

      {/* Mostrar mensajes de éxito o error */}
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}

      <Button variant="primary" type="submit" className="mt-3">
        Guardar Cambios
      </Button>
    </Form>
  );
};

EditProfileForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string.isRequired,
    suspended: PropTypes.bool, // Asegúrate de que el objeto de datos contiene la propiedad `suspended`
    suspendedUntil: PropTypes.string, // Nueva propiedad para la fecha de suspensión
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileForm;
