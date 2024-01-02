import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="note-app__header">
      <h1>
        <Link to="/">Aplikasi Catatan Pribadi</Link>
      </h1>

      <h3>
        <Link to="/archive">Arsip</Link>
      </h3>
    </div>
  );
};

export default Header;
