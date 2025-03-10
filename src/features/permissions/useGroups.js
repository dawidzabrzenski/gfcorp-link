import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../../services/apiPermissions";

export function useGroups() {
  const token = localStorage.getItem("token");

  const {
    data: groupsData,
    isPending: pendingGroups,
    error: errorGroups,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(token),
    enabled: !!token,
  });

  return { groupsData, pendingGroups, errorGroups };
}
