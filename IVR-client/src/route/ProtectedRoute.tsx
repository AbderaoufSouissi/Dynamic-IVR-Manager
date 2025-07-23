// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // You'll create this hook next

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Chargement...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
