import React, { useContext } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import img from "../../../assets/img/logo-png.png";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const navs = [
    {
      id: 1,
      name: "Mis datos",
      icon: "bi bi-person-vcard",
      url: "/ceo/datos",
      active: true,
    },
    {
      id: 2,
      name: "ABM de usuarios",
      icon: "bi bi-person-fill-gear",
      url: "/ceo/users",
      active: false,
    },
    {
      id: 3,
      name: "ABM de productos",
      icon: "bi bi-shop",
      url: "/ceo/products",
      active: false,
    },
    {
      id: 4,
      name: "Estadísticas",
      icon: "bi bi-graph-up-arrow",
      url: "/ceo/estadisticas",
      active: false,
    },
    {
      id: 5,
      name: "Notificaciones",
      icon: "bi bi-bell",
      url: "/ceo/notificaciones",
      active: false,
    },
  ];

  const location = useLocation();

  return (
    <>
      <div
        className={`h-100 position-fixed top-0 left-0 bottom-0 d-flex flex-column justify-content-center align-items-center ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`} // Cambia entre temas oscuro y claro
        style={{ width: "6rem", paddingTop: "2rem" }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "2rem" }}
        >
          <Link to={"/"}>
            <img
              src={img}
              alt="Logo nexufy"
              style={{
                width: "3rem",
                height: "3rem",
              }}
            />
          </Link>
        </div>

        <Col className="mt-2 pt-4 w-100 text-secondary">
          {navs.map((nav) => (
            <Row key={nav.id} className="py-2 justify-content-center">
              <Link
                to={nav.url}
                className={`nav-link d-flex justify-content-center align-items-center text-center ${
                  location.pathname === nav.url
                    ? "fw-bold rounded-circle bg-primary"
                    : ""
                }`}
                style={{
                  width: "3rem", // Asegura que el ancho y el alto sean iguales
                  height: "3rem", // Para asegurar que sea un círculo perfecto
                  display: "flex", // Asegura el uso de flexbox
                  justifyContent: "center", // Centrado horizontal
                  alignItems: "center", // Centrado vertical
                  transition: "transform 0.3s ease", // Animación de desplazamiento
                }}
              >
                <i
                  className={`${nav.icon} fs-3 ${
                    location.pathname === nav.url
                      ? "text-white"
                      : darkMode
                      ? "text-light"
                      : "text-dark"
                  }`} // Condición para cambiar el color del ícono según el tema
                  style={{
                    transform:
                      location.pathname === nav.url
                        ? "translateY(0)"
                        : "translateY(5px)",
                    transition: "transform 0.3s ease", // Suaviza el cambio entre íconos
                  }}
                ></i>
              </Link>
            </Row>
          ))}
        </Col>
      </div>
    </>
  );
};

export default Sidebar;
