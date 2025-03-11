import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../../services/apiAuth";
import { useEffect, useState } from "react";

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp * 1000;
    return Date.now() > expiration;
  } catch (e) {
    console.error("Invalid token format", e);
    return true;
  }
}

export function useAuth() {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const token = localStorage.getItem("token");

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthStatus,
    onError: (err) => {
      console.error("Auth error:", err);
      if (token) {
        localStorage.removeItem("token");
        refetch();
      }
    },
  });

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");
      if (currentToken && isTokenExpired(currentToken)) {
        setIsTokenValid(false);
        localStorage.removeItem("token");
        refetch();
      } else {
        setIsTokenValid(true);
      }
    };

    checkToken();

    const intervalId = setInterval(checkToken, 30 * 1000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  return {
    isAuthenticated: data && isTokenValid && !!token,
    isPending,
    error,
    refetch,
  };
}
