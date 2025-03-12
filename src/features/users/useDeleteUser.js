import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserAPI } from "../../services/apiUser";

export function useDeleteUser() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    data,
    error: errorDeletingUser,
    isPending: pendingDeleteUser,
    isSuccess: isSuccessDeletingUser,
  } = useMutation({
    mutationFn: (id) => deleteUserAPI({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersData"] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return {
    deleteUser,
    data,
    errorDeletingUser,
    pendingDeleteUser,
    isSuccessDeletingUser,
  };
}
