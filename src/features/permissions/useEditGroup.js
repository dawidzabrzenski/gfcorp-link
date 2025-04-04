import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGroup as editGroupAPI } from "../../services/apiPermissions";

export function useEditGroup() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: editGroup,
    data,
    error: errorEditingGroup,
    isPending: pendingEditGroup,
    isSuccess: isSuccessEditingGroup,
  } = useMutation({
    mutationFn: (groupData) => editGroupAPI({ ...groupData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["userPermissions"] });
    },
  });

  return {
    editGroup,
    data,
    errorEditingGroup,
    pendingEditGroup,
    isSuccessEditingGroup,
  };
}
