import React, { createContext, useState, useEffect } from "react";
import { getUserLogged, getAccessToken } from "../utils/utils";

export const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const hasToken = await getAccessToken();
      if (hasToken) {
        setIsAuthenticated(true);
      } else {
        const { error } = await getUserLogged();
        setIsAuthenticated(!error);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
