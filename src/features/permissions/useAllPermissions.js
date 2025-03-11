import { useQuery } from "@tanstack/react-query";
import { getAllPermissions } from "../../services/apiPermissions";

export function useAllPermissions() {
  const token = localStorage.getItem("token");

  const {
    data: allPermissions,
    isPending: pendingAllPermissions,
    error: errorAllPermissions,
  } = useQuery({
    queryKey: ["all-permissions"],
    queryFn: () => getAllPermissions(token),
    enabled: !!token,
  });

  return { allPermissions, pendingAllPermissions, errorAllPermissions };
}
