// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // You'll create this hook next
import SpinnerLoader from "../components/spinner/SpinnerLoader";

// route/ProtectedRoute.tsx
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SpinnerLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

