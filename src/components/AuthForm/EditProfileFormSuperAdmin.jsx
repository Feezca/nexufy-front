import { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { updateCustomerProfile } from "../../api/customerService";
import {
  suspendCustomer,
  unsuspendCustomer,
  deleteCustomer,
} from "../../api/adminService";
import moment from "moment";
import useLanguage from "../themes/useLanguage";

const EditProfileFormSuperAdmin = ({ initialData, onSave, onCancel }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ ...initialData });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [suspensionEndDate, setSuspensionEndDate] = useState(
    formData.suspendedUntil ? new Date(formData.suspendedUntil) : null
  );
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("formData: ", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const token = localStorage.getItem("token");
      await updateCustomerProfile(formData.id, token, formData);
      setSuccessMessage(t.changesSavedSuccessfully);
      onSave(formData);
    } catch (error) {
      setErrorMessage(error.message || t.errorUpdatingProfile);
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
      setSuccessMessage(t.suspendedUserForDays.replace("{days}", days));
    } catch (error) {
      setErrorMessage(error.message || t.errorSuspendingUser);
    }
  };

  const handleUnsuspend = async () => {
    try {
      const token = localStorage.getItem("token");
      await unsuspendCustomer(formData.id, token);
      setFormData({ ...formData, suspended: false, suspendedUntil: null });
      setSuspensionEndDate(null);
      setSuccessMessage(t.suspensionLifted);
    } catch (error) {
      setErrorMessage(error.message || t.errorLiftingSuspension);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteCustomer(formData.id, token);
      setSuccessMessage(t.userDeletedSuccessfully);
      onCancel(); // Llamamos a onCancel para cerrar el formulario tras eliminar
    } catch (error) {
      setErrorMessage(error.message || t.errorDeletingUser);
    }
  };

  const isOwnProfile = false; // Asumiendo que en SuperAdmin nunca es propio perfil

  return (
    <>
      <h2 className="fs-4">{t.editUser}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.nameLabel}
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.emailLabel}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.addressLabel}
              </Form.Label>
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
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.lastnameLabel}
              </Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.phoneLabel}
              </Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label
                className=" text-secondary"
                style={{ fontSize: "12px" }}
              >
                {t.usernameLabel}
              </Form.Label>
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
                {t.userSuspendedUntil.replace(
                  "{date}",
                  moment(suspensionEndDate).locale(language).format("L LT")
                )}
              </p>
            </Col>
          </Row>
        )}

        {!isOwnProfile && (
          <Row>
            <Col>
              <Form.Group className="w-25" controlId="formUsername">
                <Form.Label
                  className="fw-semibold text-body-tertiary"
                  style={{ fontSize: "14px" }}
                >
                  {t.suspendLabel}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    const days = parseInt(e.target.value, 10);
                    if (days) handleSuspend(days); // Solo llama a la función si `days` es un número
                  }}
                >
                  <option value="">{t.suspendTime}</option>
                  <option value="7">
                    {t.suspendForDays.replace("{days}", 7)}
                  </option>
                  <option value="30">
                    {t.suspendForDays.replace("{days}", 30)}
                  </option>
                </Form.Select>
              </Form.Group>

              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-success mt-3">{successMessage}</p>
              )}

              {formData.suspended && (
                <Button
                  variant="success"
                  onClick={handleUnsuspend}
                  className="me-2"
                >
                  {t.liftSuspension}
                </Button>
              )}

              <Button
                variant="link"
                className="text-danger fw-semibold opacity-50 mt-4"
                onClick={handleDelete}
              >
                {t.deleteUser}
              </Button>
            </Col>
          </Row>
        )}

        <Row className="mt-3 w-100  ">
          <Col className="d-flex justify-content-end ">
            <Button
              variant="link"
              className="text-secondary fw-medium"
              onClick={onCancel}
            >
              {t.confirmDeleteCancelButton}
            </Button>
            <Button variant="primary" type="submit" className="me-2">
              {t.saveChangesButton}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

EditProfileFormSuperAdmin.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string.isRequired,
    suspended: PropTypes.bool,
    suspendedUntil: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfileFormSuperAdmin;
