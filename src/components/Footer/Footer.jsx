import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

function Footer() {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  return (
    <footer
      className={`${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } mt-5`}
    >
      <Container>
        <Row className="py-4">
          <Col md={4} className="text-center text-md-left">
            <h5>Nexufy</h5>
            <p>
              Soluciones innovadoras para la gestión de proyectos y desarrollo
              web.
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Enlaces Útiles</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#about"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Síguenos</h5>
            <a
              href="https://www.facebook.com"
              className={`${darkMode ? "text-light" : "text-dark"} me-3`}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.twitter.com"
              className={`${darkMode ? "text-light" : "text-dark"} me-3`}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              className={`${darkMode ? "text-light" : "text-dark"} me-3`}
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.instagram.com"
              className={`${darkMode ? "text-light" : "text-dark"}`}
            >
              <i className="fab fa-instagram"></i>
            </a>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col className="text-center">
            <p className="mb-0">
              &copy; 2024 Nexufy. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
