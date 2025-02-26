import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../../services/apiPermissions";

export function usePermissions() {
  const token = localStorage.getItem("token");

  const {
    data: permissions,
    isPending: pendingPermissions,
    error: errorPermissions,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions(token),
    enabled: !!token,
  });

  return { permissions, pendingPermissions, errorPermissions };
}
