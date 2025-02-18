import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUser";

export function useUsers() {
  const {
    data: usersData,
    error,
    isPending: isPendingUsers,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: getUsers,
  });

  return { usersData, error, isPendingUsers };
}
