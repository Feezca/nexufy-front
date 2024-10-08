import React, { useEffect, useState, useContext } from "react";
import { getComments } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const ProductComments = ({ productId }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const productHardcode = "66bbd887094da25c9d6e7ef9";
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getComments(productHardcode);
        setComments(data);
      } catch (error) {
        setError("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container">
      <p
        className={`fw-medium ${darkMode ? "text-light" : "text-dark-subtle"}`}
      >
        Comentarios desde fetch
      </p>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className={`rounded border border-dark-subtle border-2 mb-2 p-3 ${
              darkMode ? "bg-dark text-light" : "bg-white text-dark"
            }`}
          >
            <p>{comment.text}</p>
            <p>Rating: {comment.rating}</p>
            <p>Fecha: {new Date(comment.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className={darkMode ? "text-light" : "text-dark"}>
          No comments available
        </p>
      )}
    </div>
  );
};

export default ProductComments;
