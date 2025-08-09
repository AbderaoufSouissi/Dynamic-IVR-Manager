// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // You'll create this hook next
import SpinnerLoader from "../components/spinner/SpinnerLoader";

// route/ProtectedRoute.tsx
interface ProtectedRouteProps {
  requiredPermissions?: string[];
}

const ProtectedRoute = ({ requiredPermissions }: ProtectedRouteProps) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return <SpinnerLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific permissions are required
  if (requiredPermissions && !requiredPermissions.some((perm) => hasPermission(perm))) {
    return <Navigate to="/403" replace />; // Unauthorized page
  }

  return <Outlet />;
};

export default ProtectedRoute;
