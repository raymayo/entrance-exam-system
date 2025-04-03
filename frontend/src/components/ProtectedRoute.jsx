import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("authUser") !== null;

  console.log("Is Authenticated:", isAuthenticated); // Debugging log

  return isAuthenticated ? <Outlet /> : <Navigate to="/entrance" replace />;
};

export default ProtectedRoute;
