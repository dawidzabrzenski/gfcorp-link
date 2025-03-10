import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../../services/apiPermissions";

export function useGroups() {
  const token = localStorage.getItem("token");

  const {
    data: groups,
    isPending: pendingGroups,
    error: errorGroups,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(token),
    enabled: !!token,
  });

  return { groups, pendingGroups, errorGroups };
}
