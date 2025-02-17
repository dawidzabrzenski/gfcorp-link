import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../../services/apiAuth";

export function useAuth() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthStatus,
  });

  return { isAuthenticated: data, isPending, error, refetch };
}
