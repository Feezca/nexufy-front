import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/nexufy-horizontal-png.png";
import { FaSearch, FaBars, FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../components/themes/ThemeContext";
import categories from "../data/category.json";
import ThemeToggle from "../components/themes/ThemeToggle";

function NavbarHome() {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleCategory = (category) => {
    setShowCategories(false);
    navigate(`/product/category/${category.id}`, {
      state: {
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      },
    });
  };

  const isSuperAdmin =
    user && user.roles && user.roles.includes("ROLE_SUPERADMIN");

  return (
    <Navbar
      expand="lg"
      className="py-0 mb-4 bg-secundario z-3 w-100"
      style={{ height: "100px", color: "var(--color-text-primary)" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <a href="/" style={{ color: "var(--color-text-primary)" }}>
            <img src={img} alt="Nexufy Logo" style={{ height: "6rem" }} />
          </a>
        </Navbar.Brand>

        <Form onSubmit={handleSearch} className="d-flex w-50 flex-grow-1 mx-3">
          <FormControl
            type="text"
            placeholder="¿Qué materia prima buscas?"
            className={`me-2 ${
              darkMode ? "bg-dark text-light placeholder-light" : ""
            }`}
            aria-label="Buscar"
            style={{
              color: darkMode ? "#fff" : "#333",
              "::placeholder": {
                color: darkMode ? "#aaa" : "#555",
              },
            }}
          />
          <Button
            variant="outline-secondary"
            style={{ height: "2.5rem", color: "var(--color-text-primary)" }}
            type="submit"
          >
            <FaSearch />
          </Button>
        </Form>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-lg-none">
            <NavDropdown title="Menú" id="basic-nav-dropdown" className="me-3">
              <NavDropdown.Item
                onClick={() => setShowCategories(!showCategories)}
                style={{ color: "var(--color-text-primary)" }}
              >
                <FaBars className="me-1" /> Categorías
              </NavDropdown.Item>
              {showCategories && (
                <div className="categories-dropdown">
                  {categories.map((category, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={() => handleCategory(category)}
                      className="dropdown-itemCategory"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {category.name} ({category.quantity})
                    </NavDropdown.Item>
                  ))}
                </div>
              )}
              {user ? (
                <>
                  <NavDropdown.Item href="/admin/datos">
                    Mi perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={handleLoginRedirect}>
                  Iniciar Sesión
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center">
          <ThemeToggle />{" "}
          <Nav.Link
            href="#"
            className="d-flex align-items-center me-3 position-relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            style={{ color: "var(--color-text-primary)" }}
          >
            <FaBars className="me-1" /> Categorías
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    onClick={() => handleCategory(category)}
                    className="dropdown-itemCategory text-dark-subtle"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {category.name} ({category.quantity})
                  </a>
                ))}
              </div>
            )}
          </Nav.Link>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                className="d-flex align-items-center"
                variant="outline-secondary"
                id="dropdown-basic"
                style={{ color: "var(--color-text-primary)" }}
              >
                <FaUserCircle className="me-1" /> {user.name || user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/admin/datos">Mi perfil</Dropdown.Item>
                {isSuperAdmin && (
                  <Dropdown.Item href="/ceo/datos">Perfil CEO</Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link
              onClick={handleLoginRedirect}
              className="d-flex align-items-center"
              style={{ color: "var(--color-text-primary)" }}
            >
              <FaUserCircle className="me-1" /> Iniciar Sesión
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
