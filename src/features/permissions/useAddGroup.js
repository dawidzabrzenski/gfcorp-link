import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroup as addGroupAPI } from "../../services/apiPermissions";

export function useAddGroup() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: addGroup,
    data,
    error,
    isPending: pendingAddGroup,
    isSuccess,
  } = useMutation({
    mutationFn: (groupData) => addGroupAPI({ ...groupData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return { addGroup, data, error, pendingAddGroup, isSuccess };
}
