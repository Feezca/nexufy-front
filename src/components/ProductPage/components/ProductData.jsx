import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext"; // Ruta corregida

const ProductData = ({ description }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

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
              Descripción:
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
              Estado:
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              Aquí va el estado del producto
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
              Presentación:
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              Aquí va la presentación del producto
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductData;
