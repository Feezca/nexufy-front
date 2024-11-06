import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../api/productService";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const { t, language } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones

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
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await updateProduct(id, { ...productData }, token);
      navigate("/"); // Redirige a la página principal o a donde desees después de la edición
    } catch (error) {
      setErrorMessage(error.message || t.errorUpdatingProduct);
    }
  };

  const handleCancel = () => {
    navigate("/admin/publicaciones");
  };

  return (
    <div className="container">
      <h2>{t.editProduct}</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>{t.nameLabel}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>{t.descriptionLabel}</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>{t.priceLabel}</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>{t.categoryLabel}</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>{t.imageLabel}</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex mt-3">
          <Button variant="primary" type="submit" className="me-2">
            {t.saveChangesButton}
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            {t.confirmDeleteCancelButton}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
