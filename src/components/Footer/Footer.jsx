import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext
import useLanguage from "../themes/useLanguage"; // Importar el hook personalizado de idioma

function Footer() {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { t } = useLanguage(); // Usar el hook para obtener las traducciones

  return (
    <footer
      className={`${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } mt-5`}
    >
      <Container>
        <Row className="py-4 ">
          <Col md={6} className="visually-hidden text-center">
            <h5>{t.usefulLinks}</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#about"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.services}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.contact}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className={`${darkMode ? "text-light" : "text-dark"}`}
                >
                  {t.faq}
                </a>
              </li>
            </ul>
          </Col>
          <Col md={10} className="text-center text-md-left">
            <h5>{t.nexufy}</h5>
            <p>{t.solutions}</p>
          </Col>
          <Col md={2} className="text-center text-md-right">
            <h5>{t.followUs}</h5>
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
            <p className="mb-0">&copy; 2024 Nexufy. {t.rightsReserved}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const MemoizedFooter = React.memo(Footer);

export default MemoizedFooter;
