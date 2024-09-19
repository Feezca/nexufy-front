import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { sendComments } from "@/services/commentService"; // Asegúrate de que la ruta sea correcta

const ProductCommentsForm = ({ productId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const commentData = {
      productId: productId, // Usa el productId pasado como prop
      text: newComment,
      rating: parseInt(rating, 10),
    };
    console.log(commentData);

    try {
      await sendComments(commentData); // Llama a la función sendComments
      setSuccess("Comentario enviado con éxito");
      setNewComment("");
      setRating("1");
    } catch (error) {
      setError(error.message || "Error al enviar el comentario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="container">
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribí tu comentario acá"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Calificación</Form.Label>
          <Form.Select
            aria-label="Seleccione una calificación"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 - Muy Malo</option>
            <option value="2">2 - Malo</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Bueno</option>
            <option value="5">5 - Excelente</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">{success}</p>}
      </Form>
    </>
  );
};

export default ProductCommentsForm;