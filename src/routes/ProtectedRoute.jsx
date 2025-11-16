import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If no token or user is not admin, redirect to login
  if (!token || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // If admin, allow access
  return <Outlet />;
};

export default ProtectedRoute;

