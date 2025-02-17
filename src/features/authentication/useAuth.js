import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../../services/apiAuth";

export function useAuth() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthStatus,
    onError: (err) => {
      console.log(test);
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        refetch();
      }
    },
  });

  return { isAuthenticated: data, isPending, error, refetch };
}
