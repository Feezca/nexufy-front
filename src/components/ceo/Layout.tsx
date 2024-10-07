import React from "react";
import NavbarHome from "../Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext
import Sidebar from "./components/Sidebar";

const CeoLayout = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { user } = useContext(AuthenticationContext);

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div
        className={`d-flex flex-column h-100 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="d-flex flex-grow-1">
          <aside>
            <Sidebar />
          </aside>
          <main className="flex-grow-1" style={{ marginLeft: "6rem" }}>
            <div className="d-flex justify-content-between align-items-center ">
              <h1
                className={`fw-bold mt-3 mb-3 ${
                  darkMode ? "text-light" : "text-primary"
                }`}
                style={{ fontSize: "3rem" }}
              >
                Dashboard
              </h1>
              <div
                className={`rounded-pill shadow py-2 me-4 d-flex align-items-center justify-content-around ${
                  darkMode ? "bg-dark-subtle" : "bg-light-subtle"
                }`}
                style={{ width: "6.5rem" }}
              >
                <img
                  src={
                    user.gender === "M"
                      ? "https://avatar.iran.liara.run/public/boy"
                      : user.gender === "F"
                      ? "https://avatar.iran.liara.run/public/girl"
                      : `https://avatar.iran.liara.run/username?username=${
                          user.username ? user.username[0] : "U"
                        }`
                  }
                  style={{ width: "2.5rem" }}
                  alt="Foto de perfil"
                />
                <button
                  className={`rounded-circle ${
                    darkMode ? "bg-dark-subtle" : "bg-light-subtle"
                  }`}
                  style={{ outline: "none", border: "none" }}
                  onClick={closeSession}
                >
                  <i className="bi bi-box-arrow-right fs-4"></i>
                </button>
              </div>
            </div>
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default CeoLayout;
