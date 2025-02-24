import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import FullscreenLoading from "../../ui/FullscreenLoading";
import { getPermissions } from "../../services/apiPermissions";
import { useQuery } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isPending, refetch } = useAuth();

  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions(token),
    enabled: !!token,
  });

  useEffect(() => {
    refetch();

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }

    if (!isAuthenticated && !isPending) {
      navigate("/login", { replace: true });
    }

    if (!permissions?.includes(location.pathname.slice(1)))
      navigate("/no-access", { replace: true });
  }, [
    isAuthenticated,
    isPending,
    navigate,
    refetch,
    location.pathname,
    permissions,
  ]);

  if (isPending) return <FullscreenLoading />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
