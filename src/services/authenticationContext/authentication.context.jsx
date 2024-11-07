import { createContext, useState } from "react";
import { fetchUserData } from "../../api/customerService";

export const AuthenticationContext = createContext();
const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);

  const handleLogin = (userData) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        roles: userData.roles,
        tokenType: userData.tokenType,
      })
    );
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const reloadUserData = async () => {
    try {
      const updatedUser = await fetchUserData(
        user.id,
        localStorage.getItem("token")
      );
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error al recargar los datos del usuario:", error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, handleLogin, handleLogout, reloadUserData }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
