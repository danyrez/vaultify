import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated && !loading) return <Navigate to='/login' replace />;
  return <Outlet />;
};
