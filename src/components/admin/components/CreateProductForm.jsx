import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import categories from "../../../data/category.json";

const CreateProductForm = ({ onSave }) => {
  const [formData, setFormData] = useState({});

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
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descripción</Form.Label>
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
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="category" onChange={handleChange} required>
              <option>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Precio</Form.Label>
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
            <Form.Label>Stock disponible</Form.Label>
            <Form.Control
              type="text"
              name="stock"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>Selecciona el estado</Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Nuevo"
                name="state"
                type="radio"
                id={`inline-radio-nuevo`}
                value="nuevo"
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Usado"
                name="state"
                type="radio"
                id={`inline-radio-usado`}
                value="usado"
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Como nuevo"
                name="state"
                type="radio"
                id={`inline-radio-como-nuevo`}
                value="como_nuevo"
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="urlImage">
            <Form.Label>Imágen</Form.Label>
            <Form.Control type="text" name="image" onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-3">
        Guardar
      </Button>
    </Form>
  );
};

CreateProductForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CreateProductForm;
