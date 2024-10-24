import { useState, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { LanguageContext } from "../themes/LanguageContext";
import translations from "../themes/translations";
import { promoteToAdmin } from "../../api/customerService";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { useNavigate } from "react-router-dom";

const EditProfileFormUserAdmin = ({ initialData, onSave }) => {
  const { token: authToken } = useContext(AuthenticationContext);

  const token = authToken || localStorage.getItem("token");

  const [formData, setFormData] = useState({
    ...initialData,
    roles: initialData.roles || [],
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [promoteMessage, setPromoteMessage] = useState(null);

  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await onSave(formData);
      setSuccessMessage(t.changesSavedSuccessfully);
    } catch (error) {
      setErrorMessage(error.message || t.errorUpdatingProfile);
    }
  };

  const handlePromoteToAdmin = async () => {
    setErrorMessage(null);
    setPromoteMessage(null);
    try {
      await promoteToAdmin(formData.username, token);
      setPromoteMessage(t.Promote);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || t.errorPromotingUser);
    }
  };

  // Verificar si el usuario tiene el rol de USER y no el de ADMIN
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

      <Button variant="primary" type="submit" className="mt-3">
        {t.saveChangesButton}
      </Button>

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
};

export default EditProfileFormUserAdmin;
