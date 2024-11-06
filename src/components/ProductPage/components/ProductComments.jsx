import React, { useEffect, useState, useContext } from "react";
import { getComments } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage

const ProductComments = ({ productId }) => {
  const { darkMode } = useContext(ThemeContext);
  const { t, language } = useLanguage(); // Usar el hook useLanguage para obtener traducciones y el idioma actual

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId);
        setComments(data);
      } catch (error) {
        setError(t.failedToLoadComments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId, t.failedToLoadComments]);

  if (isLoading) {
    return <p>{t.loading}</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container">
      <p
        className={`fw-medium ${darkMode ? "text-light" : "text-dark-subtle"}`}
      >
        {t.comments}
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
            <p>
              {t.rating}: {comment.rating}
            </p>
            <p>
              {t.date}: {new Date(comment.date).toLocaleDateString(language)}
            </p>
          </div>
        ))
      ) : (
        <p className={darkMode ? "text-light" : "text-dark"}>
          {t.noCommentsAvailable}
        </p>
      )}
    </div>
  );
};

export default ProductComments;
