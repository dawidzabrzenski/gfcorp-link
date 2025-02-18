import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import FullscreenLoading from "../../ui/FullscreenLoading";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isPending, refetch } = useAuth();

  useEffect(() => {
    refetch(); // Pobierz status autoryzacji na początku

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }

    if (!isAuthenticated && !isPending) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isPending, navigate, refetch, location.pathname]);

  if (isPending) return <FullscreenLoading />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
