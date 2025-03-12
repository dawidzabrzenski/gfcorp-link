import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGroup as editGroupAPI } from "../../services/apiPermissions";

export function useEditGroup() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: editGroup,
    data,
    error,
    isPending: pendingEditGroup,
    isSuccess,
  } = useMutation({
    mutationFn: (groupData) => editGroupAPI({ ...groupData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return { editGroup, data, error, pendingEditGroup, isSuccess };
}
