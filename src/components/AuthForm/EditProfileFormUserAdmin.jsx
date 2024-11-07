import { useState, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import useLanguage from "../themes/useLanguage";

import {
  promoteToAdmin,
  updateCustomerProfile,
} from "../../api/customerService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const EditProfileFormUserAdmin = ({ initialData, onSave, onCancel }) => {
  const { user, reloadUserData } = useContext(AuthenticationContext);
  const { t, language } = useLanguage();
  const token = user?.token || localStorage.getItem("token");

  const [formData, setFormData] = useState({
    ...initialData,
    roles: initialData.roles || [],
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [promoteMessage, setPromoteMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await updateCustomerProfile(formData.id, token, formData);
      setSuccessMessage(t.changesSavedSuccessfully);
      await reloadUserData();
      onSave(formData);
    } catch (error) {
      setErrorMessage(error.message || t.errorUpdatingProfile);
    }
  };

  const handlePromoteToAdmin = async () => {
    setErrorMessage(null);
    setPromoteMessage(null);
    try {
      await promoteToAdmin(user.username, token);
      // Actualizar roles en formData
      const updatedRoles = [...formData.roles, "ROLE_ADMIN"];
      setFormData({ ...formData, roles: updatedRoles });
      setPromoteMessage(t.promoteSuccessMessage);
      await reloadUserData();
    } catch (error) {
      setErrorMessage(error.message || t.errorPromotingUser);
    }
  };

  // Recalcular isUser y isAdmin después de actualizar formData.roles
  const isUser = formData.roles.includes("ROLE_USER");
  const isAdmin = formData.roles.includes("ROLE_ADMIN");

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>{t.nameLabel}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>{t.emailLabel}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>{t.addressLabel}</Form.Label>
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
            <Form.Label>{t.lastnameLabel}</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>{t.phoneLabel}</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>{t.usernameLabel}</Form.Label>
            <Form.Text className="form-control">
              {formData.username || ""}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
      {promoteMessage && <p className="text-success mt-3">{promoteMessage}</p>}

      <Row className="mt-3  w-100 ">
        <Col className="d-flex justify-content-end">
          <Button variant="link" className="text-primary me-2 fw-semibold opacity-75" onClick={onCancel}>
            {t.confirmDeleteCancelButton}
          </Button>
          <Button variant="primary" type="submit" className="">
            {t.saveChangesButton}
          </Button>
        </Col>
      </Row>

      {/* Mostrar el botón solo si el usuario es ROLE_USER y no es ROLE_ADMIN */}
      {isUser && !isAdmin && (
        <Button
          variant="warning"
          onClick={handlePromoteToAdmin}
          className="mt-3"
        >
          {t.promoteToAdminButton}
        </Button>
      )}
    </Form>
  );
};

EditProfileFormUserAdmin.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfileFormUserAdmin;
