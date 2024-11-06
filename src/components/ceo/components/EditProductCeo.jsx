import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../api/productService";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage
import { ThemeContext } from "../../themes/ThemeContext";
import editproduct from "../../../assets/img/editproduct.png";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const { t, language } = useLanguage(); // Obtener las traducciones directamente con el hook

  const { darkMode } = useContext(ThemeContext);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const token = user?.token || localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);
        setProductData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || 0,
          category: product.category || "",
          image: product.image || "",
        });
      } catch (error) {
        setErrorMessage(error.message || t.errorFetchingProduct);
      }
    };

    fetchProduct();
  }, [id, t.errorFetchingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await updateProduct(id, { ...productData }, token);
      navigate("/ceo/products"); // Redirige a la lista de productos después de guardar cambios
    } catch (error) {
      setErrorMessage(error.message || t.errorUpdatingProduct);
    }
  };

  const handleCancel = () => {
    navigate("/ceo/products"); // Redirige a /ceo/products al cancelar
  };

  return (
    <div
      className={`container d-flex w-100 shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <div className="w-50">
        <h2>{t.editProduct}</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
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
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label
              className=" text-secondary"
              style={{ fontSize: "12px" }}
            >
              {t.descriptionLabel}
            </Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label
              className=" text-secondary"
              style={{ fontSize: "12px" }}
            >
              {t.priceLabel}
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label
              className=" text-secondary"
              style={{ fontSize: "12px" }}
            >
              {t.categoryLabel}
            </Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label
              className=" text-secondary"
              style={{ fontSize: "12px" }}
            >
              {t.imageLabel}
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={productData.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mt-3 w-100  ">
            <Col className="d-flex justify-content-end ">
              <Button
                variant="link"
                className="text-secondary fw-medium"
                onClick={handleCancel}
              >
                {t.confirmDeleteCancelButton}
              </Button>
              <Button variant="primary" type="submit" className="me-2">
                {t.saveChangesButton}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="w-50">
        <img src={editproduct} alt="imagen de muestra" />
      </div>
    </div>
  );
};

export default EditProduct;
