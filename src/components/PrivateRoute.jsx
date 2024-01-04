import React from "react";
import { Navigate } from "react-router-dom";
import { getUserLogged } from "../utils/utils";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = async () => {
    const { error } = await getUserLogged();
    return !error;
  };

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate replace to="/login" state={{ from: props.location }} />
  );
};

export default PrivateRoute;
