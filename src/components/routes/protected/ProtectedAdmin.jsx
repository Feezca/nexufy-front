import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthenticationContext);

  
  if (user?.roles?.includes("ROLE_SUPERADMIN")) {
    return <Outlet />;
  }

  
  return <Navigate to="/notFound" />;
};

export default ProtectedAdmin;
