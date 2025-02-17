import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth"; // Importujemy nasz hook
import { useEffect } from "react";

function ProtectedRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, isError } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isError, navigate, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
