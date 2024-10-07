import NavbarHome from "../Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext

const AdminLayout = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema

  return (
    <>
      <div
        className={`d-flex flex-column h-100 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <nav>
          <NavbarHome />
        </nav>
        <div className="d-flex flex-grow-1">
          <aside>
            <Sidebar />
          </aside>
          <main className="flex-grow-1" style={{ marginLeft: "18rem" }}>
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
