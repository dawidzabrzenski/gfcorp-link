import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup as deleteGroupAPI } from "../../services/apiPermissions";

export function useDeleteGroup() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: deleteGroup,
    data,
    error: errorDeletingGroup,
    isPending: pendingDeleteGroup,
    isSuccess: isSuccessDeletingGroup,
  } = useMutation({
    mutationFn: (id) => deleteGroupAPI({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["userPermissions"] });
    },
  });

  return {
    deleteGroup,
    data,
    errorDeletingGroup,
    pendingDeleteGroup,
    isSuccessDeletingGroup,
  };
}
