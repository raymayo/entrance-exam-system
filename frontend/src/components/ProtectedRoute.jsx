import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authUser");

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/entrance" state={{ from: location }} />
  );
};

export default ProtectedRoute;
