import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/layouts/Root";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
const { user } = useAuth();
  const isAuthenticated = !!user;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;