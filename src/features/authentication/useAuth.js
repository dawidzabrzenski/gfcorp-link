// useAuth.js
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const {
    data: isAuthenticated,
    isPending,
    isError,
  } = useQuery(
    ["authStatus"],
    () => {
      const token = localStorage.getItem("token");
      if (!token) return false;

      return true;
    },
    {
      initialData: false,
    },
  );

  return { isAuthenticated, isPending, isError };
}
