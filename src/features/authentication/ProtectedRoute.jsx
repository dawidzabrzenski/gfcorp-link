import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import FullscreenLoading from "../../ui/Loaders/FullscreenLoading";
import { getPermissions } from "../../services/apiPermissions";
import { useQuery } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isPending, refetch } = useAuth();
  const excludedPaths = ["/dashboard", "/login", "/", "/no-access"];

  const { data: permissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions(token),
    enabled: !!token,
  });

  useEffect(() => {
    if (isPending) return;

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    } else if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (
      !permissions?.includes(location.pathname.slice(1)) &&
      !excludedPaths.includes(location.pathname)
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [
    isAuthenticated,
    isPending,
    navigate,
    refetch,
    location.pathname,
    permissions,
    excludedPaths,
  ]);

  if (isPending) return <FullscreenLoading />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
