import { Col, Nav, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../themes/ThemeContext"; // Importar el ThemeContext
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context"; // Importar el contexto de autenticación
import translations from "../../themes/translations"; // Importar las traducciones

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const { user } = useContext(AuthenticationContext); // Obtener la información del usuario autenticado
  const t = translations[language]; // Obtener las traducciones correspondientes

  // Verificar si el usuario tiene el rol de ROLE_SUPERADMIN
  const isSuperAdmin = user?.roles.includes("ROLE_SUPERADMIN");

  const navs = [
    {
      id: 1,
      name: t.myData,
      icon: "bi bi-person-vcard",
      url: "/admin/datos",
      active: true,
    },
    {
      id: 2,
      name: t.publications,
      icon: "bi bi-shop",
      url: "/admin/publicaciones",
      active: false,
    },
    // Solo agregar la opción de estadísticas si el usuario es SUPERADMIN
    ...(isSuperAdmin
      ? [
          {
            id: 3,
            name: t.statistics,
            icon: "bi bi-graph-up-arrow",
            url: "/admin/estadisticas",
            active: false,
          },
        ]
      : []),
  ];

  const location = useLocation();

  return (
    <>
      <div
        className={`h-100 position-fixed top-0 left-0 ${
          darkMode ? "bg-dark" : "bg-secondary-subtle"
        }`}
        style={{
          width: "17rem",
          paddingTop: "3rem",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Col className="mt-2 pt-5 w-100">
          {navs.map((nav) => (
            <Row key={nav.id} className="py-2 px-5">
              <Link
                to={nav.url}
                title={nav.name}
                className={`nav-link d-flex align-items-center text-center ${
                  location.pathname === nav.url ? "fw-bold rounded " : ""
                } ${darkMode ? "text-light" : "text-dark"}`}
              >
                <i className={`${nav.icon} m-2 fs-5`}></i>
                {nav.name}
              </Link>
            </Row>
          ))}
        </Col>
      </div>
    </>
  );
};

export default Sidebar;
