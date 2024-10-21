// CreateProductForm.js
import { useState, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import categories from "../../../data/category.json";
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../../themes/translations"; // Importar las traducciones

const CreateProductForm = ({ onSave }) => {
  const [formData, setFormData] = useState({});

  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price), // Convertir a double
      stock: parseInt(formData.stock), // Convertir a int
    };
    onSave(formattedData);
  };

  return (
    <div>
      <div className="boton-back mb-4 d-flex align-items-center">
        <i className="bi bi-arrow-left text-body-tertiary" />
        <span className="fw-semibold text-body-tertiary mx-1">{t.back}</span>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>{t.nameLabel}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>{t.descriptionLabel}</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label>{t.categoryLabel}</Form.Label>
              <Form.Select name="category" onChange={handleChange} required>
                <option value="">{t.selectCategory}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>{t.priceLabel}</Form.Label>
              <Form.Control
                type="text"
                name="price"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="stock">
              <Form.Label>{t.stockLabel}</Form.Label>
              <Form.Control
                type="text"
                name="stock"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>{t.stateLabel}</Form.Label>
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  label={t.new}
                  name="state"
                  type="radio"
                  id={`inline-radio-new`}
                  value="nuevo"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={t.used}
                  name="state"
                  type="radio"
                  id={`inline-radio-used`}
                  value="usado"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={t.likeNew}
                  name="state"
                  type="radio"
                  id={`inline-radio-like-new`}
                  value="como_nuevo"
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="urlImage">
              <Form.Label>{t.imageLabel}</Form.Label>
              <Form.Control type="text" name="image" onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          {t.saveButton}
        </Button>
      </Form>
    </div>
  );
};

CreateProductForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CreateProductForm;
