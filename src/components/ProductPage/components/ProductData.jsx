import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage"; // Importar el hook useLanguage

const ProductData = ({ description }) => {
  const { darkMode } = useContext(ThemeContext);
  const { t } = useLanguage(); // Usar el hook useLanguage para obtener las traducciones

  return (
    <div className="container mt-4">
      <Table className="align-middle" style={{ height: "300px" }}>
        <tbody>
          <tr>
            <td
              className={`text-center fw-semibold w-25 ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.descriptionLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {description}
            </td>
          </tr>
          <tr>
            <td
              className={`text-center fw-semibold ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.statusLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {t.productStatus}
            </td>
          </tr>
          <tr>
            <td
              className={`text-center fw-semibold ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.presentationLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {t.productPresentation}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductData;
