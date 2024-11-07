import React, { useContext } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import img from "../../../assets/img/logo-png.png";
import { ThemeContext } from "../../themes/ThemeContext";
import useLanguage from "../../themes/useLanguage";

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext);
  const { t, language } = useLanguage();

  const navs = [
    {
      id: 1,
      name: t.myData,
      icon: "bi bi-person-square",
      url: "/ceo/datos",
      active: true,
    },
    {
      id: 2,
      name: t.userManagement,
      icon: "bi bi-person-lines-fill",
      url: "/ceo/users",
      active: false,
    },
    {
      id: 3,
      name: t.productManagement,
      icon: "bi bi-shop",
      url: "/ceo/products",
      active: false,
    },
    {
      id: 4,
      name: t.statistics,
      icon: "bi bi-graph-up-arrow",
      url: "/ceo/estadisticas",
      active: false,
    },
  ];

  const location = useLocation();

  return (
    <>
      <div
        className={`h-100 position-fixed top-0 left-0 bottom-0 d-flex flex-column justify-content-center align-items-center ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        style={{ width: "6rem", paddingTop: "2rem" }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "2rem" }}
        >
          <Link to={"/"}>
            <img
              src={img}
              alt={t.logoAlt}
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
                title={nav.name}
                className={`nav-link d-flex justify-content-center align-items-center text-center ${
                  location.pathname === nav.url
                    ? "fw-bold rounded-circle bg-primary"
                    : ""
                }`}
                style={{
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.3s ease",
                }}
              >
                <i
                  className={`${nav.icon} fs-3 ${
                    location.pathname === nav.url
                      ? "text-white"
                      : darkMode
                      ? "text-light"
                      : "text-dark"
                  }`}
                  style={{
                    transform:
                      location.pathname === nav.url
                        ? "translateY(0)"
                        : "translateY(5px)",
                    transition: "transform 0.3s ease",
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
