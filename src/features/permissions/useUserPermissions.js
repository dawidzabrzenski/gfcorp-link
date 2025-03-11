import { useQuery } from "@tanstack/react-query";
import { getUserPermissions } from "../../services/apiPermissions";

export function useUserPermissions() {
  const token = localStorage.getItem("token");

  const {
    data: userPermissions,
    isPending: pendingUserPermissions,
    error: errorUserPermissions,
  } = useQuery({
    queryKey: ["userPermissions"],
    queryFn: () => getUserPermissions(token),
    enabled: !!token,
  });

  return { userPermissions, pendingUserPermissions, errorUserPermissions };
}
