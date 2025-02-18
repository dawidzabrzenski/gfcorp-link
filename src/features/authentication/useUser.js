import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUser";

export function useUser() {
  const {
    data: userData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
  });

  return { userData, error, isPending };
}

export default useUser;
