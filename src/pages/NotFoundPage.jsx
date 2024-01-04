import React from "react";
import Header from "../components/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found-page">
        <h2>404 - Not Found</h2>
        <p>The requested page does not exist.</p>
      </div>
    </>
  );
};

export default NotFoundPage;
