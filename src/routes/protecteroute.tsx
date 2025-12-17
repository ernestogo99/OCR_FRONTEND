import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenthicated = localStorage.getItem("token");

  if (isAuthenthicated) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
