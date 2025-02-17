import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending, refetch } = useAuth();

  useEffect(
    function () {
      refetch();
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [isAuthenticated, isPending, navigate, refetch],
  );

  if (isPending) return <p>Loading</p>;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
