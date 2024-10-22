// ProductComments.js
import React, { useEffect, useState, useContext } from "react";
import { getComments } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../../themes/translations"; // Importar las traducciones

const ProductComments = ({ productId }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

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
