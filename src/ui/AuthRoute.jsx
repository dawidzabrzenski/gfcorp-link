import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isPending) navigate("/dashboard");
    },
    [isAuthenticated, isPending, navigate],
  );

  if (isPending)
    return (
      <div className="flex w-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (!isAuthenticated) return children;
}

export default ProtectedRoute;
