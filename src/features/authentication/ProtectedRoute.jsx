import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import FullscreenLoading from "../../ui/Loaders/FullscreenLoading";
import { useUserPermissions } from "../permissions/useUserPermissions";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isPending, refetch } = useAuth();
  const excludedPaths = ["/dashboard", "/login", "/", "/no-access"];

  // const { data: permissions } = useQuery({
  //   queryKey: ["permissions"],
  //   queryFn: () => getPermissions(token),
  //   enabled: !!token,
  // });

  const { userPermissions, pendingUserPermissions, errorUserPermissions } =
    useUserPermissions();

  useEffect(() => {
    if (isPending) return;

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    } else if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (
      !userPermissions?.includes(location.pathname.slice(1)) &&
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
    userPermissions,
    excludedPaths,
  ]);

  if (isPending) return <FullscreenLoading />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
