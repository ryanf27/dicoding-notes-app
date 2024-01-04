import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, loading, logout } = useContext(AuthContext);
  const content = isAuthenticated ? (
    <>
      <div className="header"></div>
      <h1>
        <Link to="/">Aplikasi Catatan Pribadi</Link>
      </h1>
      <h3>
        <Link to="/archive">Arsip</Link>
      </h3>
      <div className="nav-btn">
        <button onClick={toggleTheme}>
          {theme === "light" ? "Gelap" : "Terang"}
        </button>

        <button onClick={logout}>Logout</button>
      </div>
    </>
  ) : (
    <>
      <h1>
        <Link to="/">Aplikasi Catatan Pribadi</Link>
      </h1>
      <h3>
        <Link to="/archive">Arsip</Link>
      </h3>
      <div className="nav-btn">
        const {(theme, toggleTheme)} = useTheme();
        <Link to="/login">Login</Link>
      </div>
    </>
  );

  return (
    <div className="note-app__header">{loading ? "Loading..." : content}</div>
  );
};

export default Header;
